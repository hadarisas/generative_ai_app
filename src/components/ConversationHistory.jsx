import { MessageSquare, Image as ImageIcon, Menu, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const ConversationHistory = ({
  conversations,
  activeConversation,
  onSelectConversation,
  onNewChat,
  onDeleteConversation,
  onRenameConversation,
  isOpen,
  onToggle,
}) => {
  const [contextMenu, setContextMenu] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = () => {
      setContextMenu(null);
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleContextMenu = (e, conv) => {
    e.preventDefault();
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      convId: conv.id,
    });
  };

  const startEditing = (conv) => {
    setEditingId(conv.id);
    setEditingTitle(conv.title);
    setContextMenu(null);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const handleRename = (e) => {
    if (e.key === "Enter") {
      onRenameConversation(editingId, editingTitle);
      setEditingId(null);
    } else if (e.key === "Escape") {
      setEditingId(null);
    }
  };

  return (
    <>
      {/* Toggle button for mobile */}
      <button
        onClick={onToggle}
        className="fixed top-4 left-4 z-50 p-2 rounded-md bg-white/50 backdrop-blur-sm shadow-lg hover:bg-white/70 transition-colors duration-200 lg:hidden"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay for mobile when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-gray-100/30 backdrop-blur-sm h-full border-r flex flex-col transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <button
          onClick={onNewChat}
          className="m-4 px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
        >
          New Chat
        </button>

        <div className="flex-1 overflow-auto">
          {conversations.map((conv) => (
            <div
              key={conv.id}
              onContextMenu={(e) => handleContextMenu(e, conv)}
              className={`w-full px-4 py-3 hover:bg-gray-200/50 flex items-center gap-3 ${
                activeConversation === conv.id ? "bg-gray-200/70" : ""
              }`}
            >
              {conv.type === "translation" ? (
                <MessageSquare size={18} className="text-slate-600 shrink-0" />
              ) : (
                <ImageIcon size={18} className="text-slate-600 shrink-0" />
              )}

              {editingId === conv.id ? (
                <input
                  ref={inputRef}
                  value={editingTitle}
                  onChange={(e) => setEditingTitle(e.target.value)}
                  onKeyDown={handleRename}
                  onBlur={() => setEditingId(null)}
                  className="flex-1 bg-transparent border-b border-slate-400 focus:outline-none"
                />
              ) : (
                <button
                  onClick={() => {
                    onSelectConversation(conv.id);
                    if (window.innerWidth < 1024) onToggle(); // Close sidebar on mobile after selection
                  }}
                  className="flex-1 text-left truncate text-sm text-slate-700"
                >
                  {conv.title || "New conversation"}
                </button>
              )}
            </div>
          ))}
        </div>

        {contextMenu && (
          <div
            className="fixed bg-white rounded-lg shadow-lg py-2 z-50"
            style={{ top: contextMenu.y, left: contextMenu.x }}
          >
            <button
              onClick={() => {
                const conv = conversations.find(
                  (c) => c.id === contextMenu.convId
                );
                startEditing(conv);
              }}
              className="w-full px-4 py-2 text-left hover:bg-gray-100 text-sm"
            >
              Rename
            </button>
            <button
              onClick={() => {
                onDeleteConversation(contextMenu.convId);
                setContextMenu(null);
              }}
              className="w-full px-4 py-2 text-left hover:bg-gray-100 text-sm text-red-600"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default ConversationHistory;
