# Hospital Chatbot

A simple React-based chatbot interface for interacting with a hospital chatbot API. This application allows users to send messages, receive AI-generated responses, and start new chat threads.

## Features
- **User-friendly Chat Interface**: Clean UI with smooth message rendering.
- **AI-Powered Responses**: Communicates with a hospital chatbot API.
- **Thread Management**: Start new chat threads with a unique thread ID.
- **Markdown Support**: Bot messages support markdown formatting.
- **Auto-Scrolling**: Chat automatically scrolls to the latest message.

## Installation

### 1. Clone the Repository
```sh
git clone https://github.com/shakeel-ai/hospital-chatbot-frontend.git
cd hospital-chatbot
```

### 2. Install Dependencies
```sh
npm install
```

### 3. Start the Development Server
```sh
npm start
```

The app will be available at `http://localhost:3000`.

## Usage
1. Type a message in the input box.
2. Press `Enter` or click `Send` to communicate with the chatbot.
3. Click `New Thread` to start a fresh conversation.

## Project Structure
```
/ hospital-chatbot
├── src/
│   ├── components/
│   │   ├── ChatComponent.js   # Main chat component
│   │   ├── ChatComponent.css  # Styles for the chat interface
│   ├── App.js                 # Main application file
│   ├── index.js               # React entry point
│
├── public/
│   ├── index.html             # Root HTML file
│
├── package.json               # Dependencies and scripts
├── README.md                  # Project documentation
```

## API Endpoint
The chatbot communicates with the following API endpoint:
```
POST https://hospital-chatbot.onrender.com/chat
```
**Request Body:**
```json
{
  "user_input": "Hello!",
  "thread_id": "your-unique-thread-id"
}
```
**Response Format:**
```json
{
  "bot_message": {
    "messages": [
      { "type": "ai", "content": "Hello! How can I assist you?" }
    ]
  }
}
```

## Technologies Used
- React.js
- JavaScript (ES6+)
- Fetch API
- Markdown Parsing (`marked` library)
- CSS for styling


