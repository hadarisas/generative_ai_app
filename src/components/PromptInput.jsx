import { useState } from "react";

const PromptInput = ({ getTranslate, placeholder }) => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!inputValue.trim()) return;

    const syntheticEvent = {
      preventDefault: () => {},
      target: {
        prompt_query: {
          value: inputValue,
        },
      },
    };

    getTranslate(syntheticEvent);
    setInputValue("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="sticky bottom-0 w-full bg-white/50 backdrop-blur-sm">
      <div className="w-full px-4 pb-2">
        <form onSubmit={handleSubmit} className="relative w-full">
          <textarea
            className="w-full px-5 py-3 bg-transparent placeholder:text-slate-400 text-slate-700 text-base border border-slate-200 rounded-md transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow resize-none"
            placeholder={placeholder}
            name="prompt_query"
            id="prompt_query"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            rows="3"
            style={{ minHeight: "80px" }}
          />
          <button
            className="absolute top-1/2 right-4 -translate-y-1/2 flex items-center justify-center rounded-full hover:bg-slate-100 p-2 transition-all hover:border-none text-slate-700 hover:text-slate-900 focus:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="submit"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3.714 3.048a.498.498 0 0 0-.683.627l2.843 7.627a2 2 0 0 1 0 1.396l-2.842 7.627a.498.498 0 0 0 .682.627l18-8.5a.5.5 0 0 0 0-.904z" />
              <path d="M6 12h16" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default PromptInput;
