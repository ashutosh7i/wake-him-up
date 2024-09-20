# Wake Him Up

## 🌟 Introduction

(Made for a friend😉)
Wake Him Up is a progressive web application (PWA) designed for couples to wake each other up using a single button with WebRTC technology. This unique app allows partners to stay connected and ensure they're up when needed, even when apart.

## 🚀 Features

- **One-Click Wake Up**: Simple interface with a large, central "Wake Up" button.
- **Real-Time Communication**: Utilizes WebRTC for instant, peer-to-peer connections.
- **Chat Functionality**: Built-in chat system for quick messages.
- **Audio/Video Calls**: Integrated calling feature for more personal communication.
- **Pairing System**: Secure pairing mechanism to connect partners.
- **Responsive Design**: Works seamlessly across various devices and screen sizes.
- **Dark Mode Support**: Comfortable usage in low-light conditions.

## 🛠 Technology Stack

- **Frontend**: Next.js with React and TypeScript
- **UI Framework**: NextUI for sleek, modern components
- **State Management**: React Hooks for local state management
- **Real-Time Communication**: PeerJS (WebRTC)
- **Authentication**: Custom auth system build with Appwrite
- **Backend Services**: Appwrite for backend functionalities
- **Styling**: Tailwind CSS for utility-first styling
- **Icons**: Lucide React for scalable vector icons
- **Audio**: Web Audio API for custom sound effects

## 🏗 Architecture

The application follows a serverless architecture with Next.js as the core framework. It uses a combination of server-side rendering (SSR) and client-side rendering for optimal performance and SEO.

Key components include:
- `PeerConnection`: Manages WebRTC connections
- `ChatMode`: Handles the chat interface and functionality
- `WakeButton`: Central component for initiating wake-up calls
- `ConnectionStatusManager`: Monitors and displays connection status
- `SettingsModal`: Allows users to manage pairing and preferences

## 🔧 Setup and Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables (see `.env.example`)
4. Run the development server: `npm run dev`
5. Build for production: `npm run build`
6. Start the production server: `npm start`

## 📱 PWA Support

The app is configured as a Progressive Web App, allowing users to install it on their devices for a native-like experience. It includes:
- Customized `manifest.json`
- Service worker for offline functionality
- Responsive design for various screen sizes

## 🔐 Security

- Secure peer-to-peer connections using WebRTC
- User authentication and authorization
- Data encryption for sensitive information

## 🎨 UI/UX Design

The interface is designed to be intuitive and user-friendly, with a focus on the primary "Wake Up" functionality. It features:
- A large, central wake-up button
- Clear status indicators
- Easy access to chat and settings
- Smooth animations and transitions

## 🔊 Audio Features

- Custom wake-up sounds
- Ringtones for incoming calls
- New message notifications

## 🔄 State Management

The application uses React's built-in state management with hooks, including:
- `useState` for local component state
- `useEffect` for side effects and lifecycle management
- `useCallback` for memoized callbacks
- Custom hooks for reusable logic

## 📡 API Integration

The app integrates with Appwrite backend services for:
- User authentication
- Partner pairing
- Storing user preferences and chat history

## 🚀 Deployment

The application is designed to be easily deployable on various platforms that support Next.js, such as Vercel, Netlify, or custom servers.

## 🤝 Contributing

Contributions to Wake Him Up are welcome! Please refer to the `CONTRIBUTING.md` file for guidelines on how to make contributions.

## 📄 License

This project is licensed under the MIT License - see the `LICENSE.md` file for details.

## 👨‍💻 Author

Made with 💖 by [Ashutosh7i](https://github.com/Ashutosh7i)

---

Wake Him Up - Connecting couples, one wake-up call at a time! 😴
