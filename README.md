# MindSpace - Digital Mental Health Journal

MindSpace is a comprehensive digital mental health journal application designed to help users track their mood, set goals, practice mindfulness, and engage with a supportive community.

## 🚀 Features

- **Mood Tracking**: Log your daily mood and visualize trends over time.
- **Journaling**: Securely write and store personal thoughts and reflections.
- **Meditation & Breathing**: Guided timers for mindfulness exercises.
- **Goal Setting**: Set, track, and achieve personal wellness goals.
- **Community Support**: Share insights and connect with others (anonymously or publicly).
- **Insights**: Get analytics on your mood and activities.

## 🛠️ Technology Stack

- **Frontend**: React (Vite), React Router, Framer Motion (Animations), Axios
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **Authentication**: JWT (JSON Web Tokens)
- **Styling**: Vanilla CSS with modern adaptive design

## 📋 Prerequisites

Before you begin, ensure you have met the following requirements:
- **Node.js**: v14.0.0 or higher
- **npm**: v6.0.0 or higher
- **MongoDB**: Local installation or MongoDB Atlas account

## ⚙️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/mindspace.git
   cd mindspace
   ```

2. **Install Server Dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install Client Dependencies**
   ```bash
   cd ../client
   npm install
   ```

## 🔧 Configuration

1. **Server Configuration**
   Create a `.env` file in the `server` directory:
   ```env
   NODE_ENV=development
   PORT=5001
   MONGODB_URI=mongodb://localhost:27017/mindspace # or your Atlas URI
   JWT_SECRET=your_super_secret_key
   FRONTEND_URL=http://localhost:5173
   ```

2. **Client Configuration**
   Create a `.env` file in the `client` directory:
   ```env
   VITE_API_URL=http://localhost:5001/api
   ```

## 🏃‍♂️ Running the Application

To run the application locally, you need to start both the backend and frontend servers.

**Option 1: Two Terminals**

Terminal 1 (Server):
```bash
cd server
npm run dev
```

Terminal 2 (Client):
```bash
cd client
npm run dev
```

The application will be available at [http://localhost:5173](http://localhost:5173).

## 🧪 Verification
Refer to [verification_guide.md](./verification_guide.md) for manual testing steps.

## 📄 License
This project is licensed under the MIT License.
