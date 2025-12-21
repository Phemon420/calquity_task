import { ChatSession, Message } from '../types/chat';

// Mock Data
const MOCK_SESSIONS: ChatSession[] = [
  { id: '1', title: 'React Hooks Explanation', updatedAt: '2023-10-27T10:00:00Z' },
  { id: '2', title: 'Next.js Routing', updatedAt: '2023-10-26T14:30:00Z' },
  { id: '3', title: 'Tailwind CSS Tips', updatedAt: '2023-10-25T09:15:00Z' },
];

export async function fetchChatHistory(): Promise<ChatSession[]> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  return MOCK_SESSIONS;
}

export async function fetchSessionMessages(sessionId: string): Promise<Message[]> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    // Return some dummy messages for the session
    return [
        { id: 'm1', role: 'user', content: 'Tell me about React Hooks.', createdAt: '2023-10-27T10:00:00Z' },
        { id: 'm2', role: 'assistant', content: 'React Hooks are functions that let you hook into React state and lifecycle features from function components.', createdAt: '2023-10-27T10:00:05Z' }
    ]
}

/**
 * Simulates sending a message and receiving a stream of events (SSE).
 * In a real app, this would use fetch with EventSource or a ReadableStream.
 */
export async function sendMessageStream(
  message: string,
  onChunk: (chunk: string) => void,
  onComplete: () => void,
  onError: (error: any) => void
) {
  try {
    // In a real application, you would do something like this:
    /*
    const response = await fetch('/api/chat', {
      method: 'POST',
      body: JSON.stringify({ message }),
      headers: { 'Content-Type': 'application/json' }
    });
    
    if (!response.body) throw new Error('No body');
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const text = decoder.decode(value);
      onChunk(text);
    }
    onComplete();
    */

    // Simulating streaming response
    const responseText = `Here is a simulated response to: "${message}". \n\nI am streaming this text chunk by chunk to demonstrate how Server-Sent Events (SSE) would feel in the UI. \n\n- Point 1\n- Point 2\n- Point 3`;
    const chunks = responseText.split(/(?=[ \n])/); // Split by words/spaces roughly

    let i = 0;
    const interval = setInterval(() => {
      if (i >= chunks.length) {
        clearInterval(interval);
        onComplete();
        return;
      }
      onChunk(chunks[i]);
      i++;
    }, 50); // Emit a chunk every 50ms

  } catch (err) {
    onError(err);
  }
}
