# AI Translation & Image Generation App

Generative AI App is a modern web application that combines AI-powered language translation and image generation capabilities. Built with React and Vite, it offers an intuitive interface for translating text and generating images using Hugging Face's AI models.

## ⚠️ Important Security Notice

**This project is for demonstration purposes only!**

The current implementation includes the API key in the frontend, which is **not secure for production use**. In a real-world application:

- API keys and sensitive credentials should **never** be exposed in the frontend code
- All API calls should be routed through a secure backend server
- The backend should handle authentication and API key management
- Implement proper rate limiting and security measures

## 🚀 Features

- **AI Translation**: Translate text with cultural context using Mixtral-8x7B model
- **Image Generation**: Create images from text descriptions using FLUX.1 model
- **Dual Functionality**: Switch between translation and image generation modes
- **Interactive UI**: Real-time responses with loading indicators
- **Fullscreen Image View**: Examine generated images in detail
- **Download Capability**: Save generated images locally

## 🛠️ Tech Stack

- **Frontend Framework**: React + Vite
- **Styling**: Tailwind CSS
- **AI Integration**: Hugging Face Inference API
- **State Management**: React Hooks
- **UI Components**: Custom components with responsive design

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Hugging Face API key

## 🔧 Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/lingualvision.git
cd lingualvision
```

2. Install dependencies:

```bash
npm install
```

or

```bash
yarn install
```

3. 🔑 Environment Variables:

Create a `.env` file with the following variables:

```
REACT_APP_HF_ACCESS_TOKEN=your_huggingface_api_key
```

4. Start the development server:

```bash
npm run dev
```

or

```bash
yarn dev
```

## 🎯 Usage

1. **Translation Mode**:

   - Select the "Translation" tab
   - Enter the output language (e.g. French) and enter the text you want to translate (e.g. "French: Hello, how are you?")
   - Receive translation with cultural context

2. **Image Generation Mode**:
   - Switch to "Image Generation" tab
   - Describe the image you want to create
   - View, download, or examine in fullscreen

## 🔒 Security Considerations

For production deployment:

1. Move API calls to a backend server
2. Implement proper authentication
3. Secure API keys in backend environment
4. Add rate limiting
5. Implement user authentication
6. Add input validation and sanitization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

#

## 🙏 Acknowledgments

- [Hugging Face](https://huggingface.co/) for AI models
- [Mixtral-8x7B](https://huggingface.co/mistralai/Mixtral-8x7B-Instruct-v0.1) for translation
- [FLUX.1](https://huggingface.co/black-forest-labs/FLUX.1-dev) for image generation

## 🐛 Known Issues

- Frontend API key exposure (demonstration only)
- Limited error handling
- No rate limiting implementation
- No user authentication

## 📞 Support

For support, please open an issue in the GitHub repository.

---

**Note**: This project is a demonstration and should not be used in production without implementing proper security measures and moving API calls to a backend server.