import { useState } from "react";

const PromptInput = ({ getTranslate, placeholder }) => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    getTranslate(event);

    setInputValue("");
  };
  return (
    <div className="sticky bottom-0 flex items-center justify-center  h-22 w-screen ">
      <div className="relative mx-4 mb-2">
        <form onSubmit={handleSubmit}>
          <input
            className="h-20 w-screen px-5 py-2 bg-transparent placeholder:text-slate-400 text-slate-700 text-base border border-slate-200 rounded-md transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
            placeholder={placeholder}
            name="prompt_query"
            id="prompt_query"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button
            className="absolute top-4 right-1 flex items-center rounded bg-transparent py-1 px-2.5  text-center text-sm  transition-all  hover:border-none text-slate-700 hover:text-slate-900 focus:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="submit"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10"
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
