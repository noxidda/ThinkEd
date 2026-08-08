# ThinkEd

> A production-grade, minimalistic AI-powered learning platform that allows students to upload notes, generate study material automatically, and chat with their documents using RAG.

## Features

- **Smart Note Upload**: Upload PDFs, extract text, OCR support for scanned documents
- **AI Summaries**: Generate short, medium, and detailed summaries using Gemini 2.5 Pro
- **Flashcards**: Auto-generated flashcards for effective revision
- **Quiz Generation**: AI-powered MCQs with difficulty levels and explanations
- **Chat with Notes (RAG)**: Ask questions about your study materials with source citations
- **Analytics Dashboard**: Track study progress, quiz scores, and topic mastery
- **Study Planner**: AI-generated personalized study schedules
- **Weakness Detection**: Adaptive learning based on performance analysis

## Tech Stack

### Frontend
- **React** with **Vite**
- **Tailwind CSS** for styling
- **TanStack Query** (React Query) for data fetching
- **Recharts** for analytics visualization
- **Framer Motion** for micro-animations
- **Axios** for API calls

### Backend
- **Node.js** with **Express.js**
- **MongoDB Atlas** with **Mongoose**
- **JWT** for authentication
- **Multer** for file uploads
- **Cloudinary** for file storage

### AI & RAG
- **Google AI Studio** with **Gemini 2.5 Pro**
- **Gemini Embeddings** for vectorization
- **LangChain.js** for RAG pipeline
- **Pinecone** for vector database

## Quick Start

### Prerequisites
- Node.js 18+
- MongoDB Atlas account
- Cloudinary account
- Google AI Studio API key
- Pinecone account

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/smartnotes-ai.git
cd smartnotes-ai
```

2. **Install dependencies**
```bash
npm run install:all
```

3. **Set up environment variables**
```bash
cp server/.env.example server/.env
# Edit .env with your API keys and configuration
```

4. **Run development server**
```bash
npm run dev
```

The app will be available at:
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`

## Project Structure

```
smartnotes-ai/
├── client/                    # React frontend
│   ├── src/
│   │   ├── components/        # Reusable components
│   │   ├── pages/            # Page components
│   │   ├── layouts/          # Layout components
│   │   ├── hooks/            # Custom hooks
│   │   ├── services/         # API services
│   │   ├── context/          # React context
│   │   └── utils/            # Utility functions
│   └── ...
├── server/                    # Express backend
│   ├── controllers/          # Route controllers
│   ├── routes/              # API routes
│   ├── middleware/           # Express middleware
│   ├── services/            # Business logic
│   ├── models/              # MongoDB models
│   └── ...
├── docs/                     # Documentation
├── architecture/             # Architecture docs
└── README.md
```

## Design System

SmartNotes AI follows a minimal, dark-themed design inspired by Notion, Linear, and Raycast.

- **Background**: `#111111`
- **Cards**: `#171717`
- **Borders**: `#2a2a2a`
- **Typography**: DM Sans with sharp, modern aesthetics
- **All elements square** (rounded-none)
- **Minimal shadows** (shadow-sm only)

## Authentication

The app uses JWT-based authentication with:
- Email/password registration
- Secure login with password hashing (bcrypt)
- Password reset functionality
- Protected API routes

## License

MIT License - see [LICENSE](LICENSE) for details

## Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details.

## Acknowledgments

- Google AI Studio for Gemini API
- Pinecone for vector database
- MongoDB Atlas for database hosting
- All open-source libraries used in this project
