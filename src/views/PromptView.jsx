import { culturaltranslatorMistral } from "../utils/ai";
import { useState, useEffect, useRef } from "react";
import Translation from "../components/Translation";
import PromptInput from "../components/PromptInput";
import Header from "../components/Header";
import LoadingIndicator from "../components/LoadingIndicator";
import generateImage from "../utils/imageGen";
import ImageView from "../components/ImageView";
import ConversationHistory from "../components/ConversationHistory";

const getUserId = () => {
  let userId = localStorage.getItem("ai-app-user-id");
  if (!userId) {
    userId =
      "user_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9);
    localStorage.setItem("ai-app-user-id", userId);
  }
  return userId;
};

const Prompt = () => {
  const userId = getUserId();
  const LOCAL_STORAGE_KEY = `ai-app-conversations-${userId}`; // Make key unique per user

  const [activeTab, setActiveTab] = useState("translation");
  const [translations, setTranslations] = useState([]);
  const [generatedImages, setGeneratedImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const contentRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [conversations, setConversations] = useState(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  const [activeConversation, setActiveConversation] = useState(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    const parsedConversations = saved ? JSON.parse(saved) : [];
    return parsedConversations.length > 0 ? parsedConversations[0].id : null;
  });

  useEffect(() => {
    if (activeConversation) {
      const currentConv = conversations.find(
        (conv) => conv.id === activeConversation
      );
      if (currentConv) {
        if (currentConv.type === "translation") {
          setTranslations(currentConv.messages || []);
          setGeneratedImages([]);
        } else {
          setGeneratedImages(currentConv.messages || []);
          setTranslations([]);
        }
      }
    }
  }, [activeConversation, conversations]);

  useEffect(() => {
    if (activeConversation) {
      const currentConv = conversations.find(
        (conv) => conv.id === activeConversation
      );
      if (currentConv && currentConv.type !== activeTab) {
        setActiveTab(currentConv.type);
      }
    }
  }, [activeConversation]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(conversations));
  }, [conversations]);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }
  }, [translations, generatedImages]);

  const createNewConversation = () => {
    setTranslations([]);
    setGeneratedImages([]);
    setActiveConversation(null);
  };

  const handleTabChange = (newTab) => {
    setActiveTab(newTab);
    if (activeConversation) {
      createNewConversation();
    }
  };

  const getTranslate = async (event) => {
    event.preventDefault();
    const prompt_query = event.target.prompt_query.value;

    if (!prompt_query) {
      alert("Please fill out all fields");
      return;
    }

    setIsLoading(true);

    try {
      let newMessage;
      if (activeTab === "translation") {
        const response = await culturaltranslatorMistral(prompt_query);
        newMessage = { prompt: prompt_query, response };
        setTranslations((prev) => [...prev, newMessage]);
        setGeneratedImages([]);
      } else {
        console.log("Generating image...");
        const response = await generateImage(prompt_query);
        console.log("Image generated:", response);
        // Convert blob to base64
        const base64Image = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(response);
        });

        newMessage = {
          prompt: prompt_query,
          imageUrl: base64Image, // Store as base64 instead of blob URL
        };
        setGeneratedImages((prev) => [...prev, newMessage]);
        setTranslations([]);
      }

      if (!activeConversation) {
        const newConv = {
          id: Date.now(),
          type: activeTab,
          title: prompt_query.slice(0, 30),
          messages: [newMessage],
        };
        setConversations((prev) => [...prev, newConv]);
        setActiveConversation(newConv.id);
      } else {
        const currentConv = conversations.find(
          (conv) => conv.id === activeConversation
        );
        if (currentConv && currentConv.type === activeTab) {
          setConversations((prev) =>
            prev.map((conv) => {
              if (conv.id === activeConversation) {
                return {
                  ...conv,
                  messages: [...(conv.messages || []), newMessage],
                  title: conv.title || prompt_query.slice(0, 30),
                };
              }
              return conv;
            })
          );
        }
      }
    } catch (error) {
      console.error(error);
      alert("Error generating content. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteConversation = (id) => {
    setConversations((prev) => prev.filter((conv) => conv.id !== id));
    if (activeConversation === id) {
      const remaining = conversations.filter((conv) => conv.id !== id);
      if (remaining.length > 0) {
        setActiveConversation(remaining[0].id);
      } else {
        setActiveConversation(null);
        setTranslations([]);
        setGeneratedImages([]);
      }
    }
  };

  const handleRenameConversation = (id, newTitle) => {
    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === id
          ? { ...conv, title: newTitle || "New conversation" }
          : conv
      )
    );
  };

  return (
    <div className="flex h-screen w-full">
      <ConversationHistory
        conversations={conversations}
        activeConversation={activeConversation}
        onSelectConversation={setActiveConversation}
        onNewChat={createNewConversation}
        onDeleteConversation={handleDeleteConversation}
        onRenameConversation={handleRenameConversation}
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      <div className="flex-1 flex flex-col bg-gray-300/15">
        <Header />

        <div className="flex space-x-2 px-4 py-2 border-b">
          <button
            className={`px-4 py-2 rounded-t-lg ${
              activeTab === "translation"
                ? "bg-slate-200 text-slate-800"
                : "bg-transparent text-slate-600"
            }`}
            onClick={() => handleTabChange("translation")}
          >
            Translation
          </button>
          <button
            className={`px-4 py-2 rounded-t-lg ${
              activeTab === "image"
                ? "bg-slate-200 text-slate-800"
                : "bg-transparent text-slate-600"
            }`}
            onClick={() => handleTabChange("image")}
          >
            Image Generation
          </button>
        </div>

        {isLoading && (
          <div className="w-full">
            <LoadingIndicator />
          </div>
        )}

        <div
          ref={contentRef}
          className="flex-1 overflow-auto p-4 flex flex-col gap-4 scroll-smooth"
        >
          {activeTab === "translation"
            ? translations.map((item, index) => (
                <Translation
                  key={index}
                  prompt={item.prompt}
                  TranslationResponse={item.response}
                />
              ))
            : generatedImages.map((item, index) => (
                <ImageView
                  key={index}
                  title={item.prompt}
                  image={item.imageUrl}
                />
              ))}
        </div>

        <PromptInput
          getTranslate={getTranslate}
          placeholder={
            activeTab === "translation"
              ? "Enter text to translate..."
              : "Describe the image you want to generate..."
          }
        />
      </div>
    </div>
  );
};

export default Prompt;
