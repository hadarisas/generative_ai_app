const LoadingIndicator = () => {
  return (
    <div className="absolute inset-0 flex justify-center items-center bg-black/10 backdrop-blur-sm z-50">
      <div className="flex justify-center items-center gap-3">
        {[
          "bg-blue-500",
          "bg-gray-500",
          "bg-green-500",
          "bg-red-500",
          "bg-yellow-500",
          "bg-cyan-500",
        ].map((color) => (
          <div
            key={color}
            className={`inline-block h-8 w-8 animate-pulse rounded-full ${color} opacity-75`}
            role="status"
          >
            <span className="sr-only">Loading...</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoadingIndicator;
