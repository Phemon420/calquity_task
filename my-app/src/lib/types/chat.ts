export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  createdAt: string;
}

export interface ChatSession {
  id: string;
  title: string;
  updatedAt: string;
}

export interface User {
  id: string;
  name: string;
  avatar?: string;
}
