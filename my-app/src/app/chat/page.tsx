'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ChatLayout } from '../../components/chat/ChatLayout';
import { MessageBubble } from '../../components/chat/MessageBubble';
import { ChatInput } from '../../components/chat/ChatInput';
import { ChatSession, Message } from '../../lib/types/chat';
import { fetchChatHistory, fetchSessionMessages, sendMessageStream } from '../../lib/api/chatService';

export default function ChatPage() {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | undefined>(undefined);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const selectSession = async (id: string) => {
    // Close sidebar on mobile when a session is selected
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }

    if (id === 'new') {
        setCurrentSessionId(undefined);
        setMessages([]);
        return;
    }
    
    setCurrentSessionId(id);
    setMessages([]); // Clear while loading
    // In a real app, you might want to show a loading state for messages too
    const msgs = await fetchSessionMessages(id);
    setMessages(msgs);
  };


  // Initial Data Fetch
  useEffect(() => {
    async function loadData() {
      const history = await fetchChatHistory();
      setSessions(history);
      if (history.length > 0) {
        selectSession(history[0].id);
      }
      // Optional: Auto-open sidebar on large screens
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(true);
      }
    }
    loadData();
  }, []);


  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessageContent = inputValue.trim();
    setInputValue('');
    setIsLoading(true);

    // Optimistic UI update
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: userMessageContent,
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);

    // Create a placeholder for the assistant message
    const assistantMessageId = (Date.now() + 1).toString();
    const assistantMessage: Message = {
        id: assistantMessageId,
        role: 'assistant',
        content: '',
        createdAt: new Date().toISOString()
    };
    
    setMessages((prev) => [...prev, assistantMessage]);

    // Stream the response
    await sendMessageStream(
      userMessageContent,
      (chunk) => {
        setMessages((prev) => {
            const newMessages = [...prev];
            const lastIndex = newMessages.length - 1;
            const lastMsg = newMessages[lastIndex];
            
            if (lastMsg.id === assistantMessageId) {
                // Correctly creating a new object for immutability
                newMessages[lastIndex] = {
                    ...lastMsg,
                    content: lastMsg.content + chunk
                };
            }
            return newMessages;
        });
      },
      () => {
        setIsLoading(false);
        // Maybe refresh history if it was a new chat
      },
      (error) => {
        console.error('Error sending message:', error);
        setIsLoading(false);
        setMessages((prev) => [
            ...prev,
            { id: Date.now().toString(), role: 'assistant', content: 'Sorry, an error occurred.', createdAt: new Date().toISOString() }
        ])
      }
    );
  };

  return (
    <ChatLayout
      sessions={sessions}
      currentSessionId={currentSessionId}
      onSelectSession={selectSession}
      isSidebarOpen={isSidebarOpen}
      setIsSidebarOpen={setIsSidebarOpen}
    >
      <div className="h-full overflow-y-auto pb-40">
        <div className="flex flex-col min-h-full">
            {messages.length === 0 ? (
                <div className="flex-1 flex items-center justify-center p-8">
                    <div className="text-center space-y-4">
                        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">Where knowledge begins</h1>
                        <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                            Ask anything to explore knowledge, generate content, or solve problems.
                        </p>
                    </div>
                </div>
            ) : (
                <div className="flex-1">
                    {messages.map((msg) => (
                        <MessageBubble key={msg.id} message={msg} />
                    ))}
                    <div ref={messagesEndRef} />
                </div>
            )}
        </div>
      </div>
      
      <ChatInput
        value={inputValue}
        onChange={setInputValue}
        onSubmit={handleSubmit}
        isLoading={isLoading}
        isSidebarOpen={isSidebarOpen}
      />
    </ChatLayout>
  );
}
