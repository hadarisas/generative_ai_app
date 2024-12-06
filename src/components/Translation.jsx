import ReactMarkdown from "react-markdown";

const Translation = ({ prompt, TranslationResponse }) => {
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 shadow-xl">
      <div className="text-sm text-slate-600 mb-2">{prompt}</div>
      <div className="bg-white/5 rounded p-3">
        <ReactMarkdown className="font-mono text-slate-700">
          {TranslationResponse}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default Translation;
