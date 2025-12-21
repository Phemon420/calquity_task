import React, { useRef, useEffect } from 'react';
import { cn } from '../../lib/util';

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  isSidebarOpen: boolean;
}

export function ChatInput({ value, onChange, onSubmit, isLoading, isSidebarOpen }: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [value]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSubmit(e);
    }
  };

  return (
    <div 
      className={cn(
        "fixed bottom-0 left-0 right-0 p-4 bg-gradient from-white via-white to-transparent dark:from-black dark:via-black pb-8 transition-all duration-200 ease-in-out",
        isSidebarOpen ? "lg:pl-64" : "lg:pl-0"
      )}
    >
      <div className="max-w-3xl mx-auto">
        <form onSubmit={onSubmit} className="relative">
          <div className="relative flex items-end w-full p-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl shadow-lg focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-transparent transition-all">
            <textarea
              ref={textareaRef}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything..."
              className="w-full max-h-200px py-2 pl-2 pr-10 bg-transparent border-0 focus:ring-0 resize-none text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none"
              rows={1}
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!value.trim() || isLoading}
              className="absolute right-3 bottom-3 p-1.5 bg-indigo-600 text-white rounded-md disabled:bg-gray-300 dark:disabled:bg-gray-700 disabled:cursor-not-allowed hover:bg-indigo-700 transition-colors"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
              )}
            </button>
          </div>
          <div className="text-center mt-2 text-xs text-gray-400 dark:text-gray-500">
            AI can make mistakes. Consider checking important information.
          </div>
        </form>
      </div>
    </div>
  );
}
