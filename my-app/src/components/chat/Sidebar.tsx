import React from 'react';
import { ChatSession } from '../../lib/types/chat';
import { cn } from '../../lib/util';

interface SidebarProps {
  sessions: ChatSession[];
  currentSessionId?: string;
  onSelectSession: (id: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export function Sidebar({ sessions, currentSessionId, onSelectSession, isOpen, onToggle }: SidebarProps) {
  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className={cn(
          "fixed inset-0 z-20 bg-black/50 transition-opacity lg:hidden",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onToggle}
      />

      {/* Sidebar Container */}
      <div
        className={cn(
          "fixed top-0 left-0 z-30 h-full w-64 transform bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-transform duration-200 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
            <button 
              className="flex items-center space-x-2 text-gray-900 dark:text-gray-100 font-semibold"
              onClick={() => onSelectSession('new')}
            >
              <span className="text-xl">+</span>
              <span>New Thread</span>
            </button>
            <button onClick={onToggle} className="lg:hidden p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800">
               {/* Close Icon */}
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-2">
            <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 px-2 uppercase tracking-wider">
              History
            </div>
            <ul className="space-y-1">
              {sessions.map((session) => (
                <li key={session.id}>
                  <button
                    onClick={() => onSelectSession(session.id)}
                    className={cn(
                      "w-full text-left px-3 py-2 rounded-md text-sm truncate transition-colors",
                      currentSessionId === session.id
                        ? "bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    )}
                  >
                    {session.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 border-t border-gray-200 dark:border-gray-800">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold">
                U
              </div>
              <div className="text-sm font-medium text-gray-700 dark:text-gray-200">
                User
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
