import React from 'react';
import { Message } from '../../lib/types/chat';
import { cn } from '../../lib/util';

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user';

  return (
    <div className={cn("w-full py-6", isUser ? "bg-white dark:bg-black" : "bg-gray-50 dark:bg-gray-900")}>
      <div className="max-w-3xl mx-auto px-4 flex gap-4">
        <div className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm",
          isUser ? "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200" : "bg-teal-600 text-white"
        )}>
          {isUser ? 'U' : 'AI'}
        </div>
        
        <div className="flex-1 space-y-2 overflow-hidden">
            <div className="font-semibold text-sm text-gray-900 dark:text-gray-100">
                {isUser ? 'User' : 'Assistant'}
            </div>
            <div className="prose dark:prose-invert max-w-none text-gray-800 dark:text-gray-200 leading-relaxed whitespace-pre-wrap">
                {message.content}
            </div>
        </div>
      </div>
    </div>
  );
}
