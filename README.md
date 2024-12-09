# AI Translation & Image Generation App

Generative AI App is a modern web application that combines AI-powered language translation and image generation capabilities. Built with React and Vite, it offers an intuitive interface for translating text and generating images using Hugging Face's AI models.

🔗 **[Live Demo](https://generative-ai-app-sigma.vercel.app/)**

## ⚠️ Important Notes

**This project is for demonstration purposes only!**

- The current implementation includes the API key in the frontend, which is **not secure for production use**
- Image generation may take up to 30-60 seconds, please be patient while the AI model processes your request
- All API calls should be routed through a secure backend server in a production environment
- Implement proper rate limiting and security measures for production use

## 🚀 Features

- **AI Translation**: Translate text with cultural context using Mixtral-8x7B model
- **Image Generation**: Create images from text descriptions using FLUX.1 model (Note: Generation takes time)
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

- Node.js (v16 or higher)
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



## 🙏 Acknowledgments

- [Hugging Face](https://huggingface.co/) for AI models
- [Mixtral-8x7B](https://huggingface.co/mistralai/Mixtral-8x7B-Instruct-v0.1) for translation
- [FLUX.1](https://huggingface.co/black-forest-labs/FLUX.1-dev) for image generation




