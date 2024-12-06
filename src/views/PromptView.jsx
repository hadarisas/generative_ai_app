import { culturaltranslatorMistral } from "../utils/ai";
import { useState, useEffect, useRef } from "react";
import Translation from "../components/Translation";
import PromptInput from "../components/PromptInput";
import Header from "../components/Header";
import LoadingIndicator from "../components/LoadingIndicator";
import generateImage from "../utils/imageGen";
import ImageView from "../components/ImageView";

const Prompt = () => {
  const [activeTab, setActiveTab] = useState("translation"); // 'translation' or 'image'
  const [translations, setTranslations] = useState([]);
  const [generatedImages, setGeneratedImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }
  }, [translations, generatedImages, activeTab]);

  const getTranslate = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const prompt_query = formData.get("prompt_query");

    if (prompt_query === "") {
      alert("Please fill out all fields");
      return;
    }

    setIsLoading(true);

    try {
      if (activeTab === "translation") {
        const response = await culturaltranslatorMistral(prompt_query);
        setTranslations((prev) => [
          ...prev,
          { prompt: prompt_query, response },
        ]);
      } else {
        const response = await generateImage(prompt_query);
        setGeneratedImages((prev) => [
          ...prev,
          {
            prompt: prompt_query,
            imageUrl: URL.createObjectURL(response),
          },
        ]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col bg-gray-300/15 h-screen w-full">
      <Header />

      {/* Tabs */}
      <div className="flex space-x-2 px-4 py-2 border-b">
        <button
          className={`px-4 py-2 rounded-t-lg ${
            activeTab === "translation"
              ? "bg-slate-200 text-slate-800"
              : "bg-transparent text-slate-600"
          }`}
          onClick={() => setActiveTab("translation")}
        >
          Translation
        </button>
        <button
          className={`px-4 py-2 rounded-t-lg ${
            activeTab === "image"
              ? "bg-slate-200 text-slate-800"
              : "bg-transparent text-slate-600"
          }`}
          onClick={() => setActiveTab("image")}
        >
          Image Generation
        </button>
      </div>

      {isLoading && <LoadingIndicator />}

      {/* Content Area  */}
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
  );
};

export default Prompt;
