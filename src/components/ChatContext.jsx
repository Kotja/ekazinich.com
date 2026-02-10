import React, { createContext, useContext, useState, useRef, useEffect, useMemo } from 'react';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';

const API_URL = 'https://api.ekazinich.com/api/chat';
const STORAGE_KEY = 'eka-chat-messages';

const ChatContext = createContext(null);

export const useAskChat = () => {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error('useAskChat must be used within ChatProvider');
  return ctx;
};

// Helper to extract text content from UIMessage parts (AI SDK v6 format)
export const getMessageContent = (message) => {
  if (message.parts && Array.isArray(message.parts)) {
    return message.parts
      .filter(part => part.type === 'text')
      .map(part => part.text)
      .join('');
  }
  return message.content || '';
};

// Helper to extract suggested prompts from tool calls
export const getSuggestedPrompts = (messages) => {
  if (!messages || messages.length === 0) return [];
  const lastAssistantMessage = [...messages].reverse().find(m => m.role === 'assistant');
  if (!lastAssistantMessage || !lastAssistantMessage.parts) return [];
  const toolPart = lastAssistantMessage.parts.find(
    part => part.type === 'tool-suggest_questions' && part.output
  );
  if (!toolPart || !toolPart.output?.questions) return [];
  return toolPart.output.questions;
};

export const STARTER_QUESTIONS = [
  "What's your design process like?",
  "What tools and tech are you comfortable with?",
  "Tell me about your most impactful project",
];

export const ChatProvider = ({ children }) => {
  const [input, setInput] = useState('');
  const isHydratedRef = useRef(false);
  const [isMainChatVisible, setIsMainChatVisible] = useState(false);

  const transport = useMemo(() => new DefaultChatTransport({ api: API_URL }), []);
  const { messages, sendMessage, setMessages, status, error } = useChat({ transport });

  const isLoading = status === 'streaming' || status === 'submitted';
  const hasStarted = messages.length > 0;

  // Load messages from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed);
        }
      }
    } catch {
      // Ignore storage errors
    }
    isHydratedRef.current = true;
  }, [setMessages]);

  // Save messages to localStorage (skip during streaming and before hydration)
  useEffect(() => {
    if (isHydratedRef.current && messages.length > 0 && status !== 'streaming') {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
      } catch {
        // Ignore storage errors
      }
    }
  }, [messages, status]);

  // Log errors
  useEffect(() => {
    if (error) console.error('Chat error:', error);
  }, [error]);

  const handleRestartChat = () => {
    setMessages([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  const handleSend = async (text) => {
    if (!text.trim() || isLoading) return;
    setInput('');
    await sendMessage({ text });
  };

  const value = {
    messages,
    input,
    setInput,
    isLoading,
    hasStarted,
    status,
    error,
    handleRestartChat,
    handleSend,
    isMainChatVisible,
    setIsMainChatVisible,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
