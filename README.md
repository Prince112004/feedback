# Feedback Tracker App

A simple full-stack app to track user feedback and interact with an LLM (Openrouter.ai).

## Features

- Add feedback messages
- Ask questions to an LLM using Openrouter.ai
- Clear, minimal UI

## Tech Stack

- **Frontend**: React + Vite+Tailwind
- **Backend**: Node.js + Express
- **LLM API**: Openrouter.ai

## Setup Instructions

### 1. Clone the Repo

```bash
git clone https://github.com/YOUR_USERNAME/feedback-tracker-app.git
cd feedback-tracker-app
```

### 2. Setup Backend

```bash
cd server
npm install
echo "OPENAI_API_KEY=your_key_here" > .env
npm start
```

### 3. Setup Frontend

```bash
cd ../client
npm install
npm run dev
```

App runs at `http://localhost:5173` and interacts with backend on `http://localhost:5000`.
