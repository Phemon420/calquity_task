import Image from "next/image";
import ChatPage from "./chat/page";
import ProtectedRoute from '../components/auth/ProtectedRoute';

export default function Home() {
  return (
    <div>
      <ProtectedRoute>
        <ChatPage />
      </ProtectedRoute>
    </div>
  );
}
