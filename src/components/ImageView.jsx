import { Download, Expand } from "lucide-react";
import { useState, useEffect } from "react";

const ImageView = (props) => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape" && isFullScreen) {
        setIsFullScreen(false);
      }
    };

    if (isFullScreen) {
      document.addEventListener("keydown", handleEscKey);
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [isFullScreen]);

  const handleDownload = () => {
    if (props.image) {
      const link = document.createElement("a");
      link.href = props.image;
      link.download = `generated-image-${Date.now()}.png`;
      link.click();
    }
  };

  const handleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  return (
    <>
      <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 shadow-xl">
        <div className="text-sm text-slate-600 mb-2">{props.title}</div>
        <div className="relative w-full max-w-2xl mx-auto bg-white/5 rounded p-3">
          {props.image ? (
            <div className="relative aspect-video flex items-center justify-center">
              <img
                src={props.image}
                alt="Generated"
                className="max-w-full max-h-full object-contain rounded-xl"
              />
              <div className="absolute bottom-4 right-4 flex space-x-2">
                <button
                  onClick={handleDownload}
                  className="bg-white/20 hover:bg-white/40 backdrop-blur-md p-2 rounded-full shadow-md transition-all duration-300 group"
                >
                  <Download
                    className="text-slate-700 group-hover:scale-110 transition-transform"
                    size={20}
                  />
                </button>
                <button
                  onClick={handleFullScreen}
                  className="bg-white/20 hover:bg-white/40 backdrop-blur-md p-2 rounded-full shadow-md transition-all duration-300 group"
                >
                  <Expand
                    className="text-slate-700 group-hover:scale-110 transition-transform"
                    size={20}
                  />
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center text-slate-500 p-8">
              <p>No image generated yet</p>
            </div>
          )}
        </div>
      </div>

      {isFullScreen && props.image && (
        <div
          className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm"
          onClick={handleFullScreen}
        >
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <img
              src={props.image}
              alt="Full Screen"
              className="max-w-[95vw] max-h-[95vh] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ImageView;
