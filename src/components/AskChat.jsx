import React, { useState, useRef, useEffect } from 'react';
import { useChat } from '@ai-sdk/react';
import { Send, MessageCircle, Sparkles, RotateCcw } from 'lucide-react';
import { Streamdown } from 'streamdown';

const STARTER_QUESTIONS = [
  "What's your design process like?",
  "What tools and tech are you comfortable with?",
  "Tell me about your most impactful project",
];

// API URL - uses Vite env var in dev, relative path in production
const API_URL = import.meta.env.VITE_API_URL || 'https://api.ekazinich.com/api/chat';
const STORAGE_KEY = 'eka-chat-messages';

// Helper to extract text content from UIMessage parts (AI SDK v6 format)
const getMessageContent = (message) => {
  // AI SDK v6 uses parts array
  if (message.parts && Array.isArray(message.parts)) {
    return message.parts
      .filter(part => part.type === 'text')
      .map(part => part.text)
      .join('');
  }
  // Fallback to content if it exists (older format)
  return message.content || '';
};

// Helper to extract suggested prompts from the response text
const getSuggestedPrompts = (messages) => {
  if (!messages || messages.length === 0) return [];
  
  // Find the last assistant message
  const lastAssistantMessage = [...messages].reverse().find(m => m.role === 'assistant');
  if (!lastAssistantMessage) return [];
  
  const content = getMessageContent(lastAssistantMessage);
  if (!content) return [];
  
  // Parse suggestions from the ---SUGGESTIONS--- format
  const suggestionsMatch = content.match(/---SUGGESTIONS---\s*([\s\S]*?)$/i);
  if (!suggestionsMatch) return [];
  
  const suggestionsText = suggestionsMatch[1];
  const suggestions = suggestionsText
    .split('\n')
    .map(line => line.replace(/^[-•*]\s*/, '').trim())
    .filter(line => line.length > 0 && line.length < 100);
  
  return suggestions.slice(0, 2);
};

// Helper to get message content without suggestions section
const getDisplayContent = (message) => {
  const content = getMessageContent(message);
  // Remove the suggestions section for display
  return content.replace(/---SUGGESTIONS---[\s\S]*$/i, '').trim();
};

const AskChat = ({ mode, playSound }) => {
  const [input, setInput] = useState('');
  const isHydratedRef = useRef(false);
  const messagesContainerRef = useRef(null);
  const inputRef = useRef(null);
  const lastUserMessageRef = useRef(null);

  // Theme configuration matching the site's design system
  const isWandering = mode === 'wandering';
  const theme = {
    bg: isWandering ? 'bg-[#1A1A1A]' : 'bg-[#FDFBF7]',
    text: isWandering ? 'text-[#FDFBF7]' : 'text-[#1A1A1A]',
    subText: isWandering ? 'text-[#FDFBF7]/60' : 'text-[#1A1A1A]/60',
    borderSoft: isWandering ? 'border-[#FDFBF7]/20' : 'border-[#1A1A1A]/20',
    borderSolid: isWandering ? 'border-[#FDFBF7]' : 'border-[#1A1A1A]',
    cardBg: isWandering ? 'bg-[#2A2A2A]' : 'bg-white',
    inputBg: isWandering ? 'bg-[#333]' : 'bg-[#F5F3ED]',
    userBubble: isWandering ? 'bg-[#C25E00] text-white' : 'bg-[#1A1A1A] text-[#FDFBF7]',
    assistantBubble: isWandering ? 'bg-[#333] text-[#FDFBF7]' : 'bg-[#F5F3ED] text-[#1A1A1A]',
  };

  // AI SDK v6 useChat hook
  const { messages, sendMessage, setMessages, status, error } = useChat({
    api: API_URL,
  });

  const isLoading = status === 'streaming' || status === 'submitted';
  const hasStarted = messages.length > 0;

  // Load messages from localStorage on mount (client-side only)
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

  // Save messages to localStorage on each update (only when not streaming and after hydration)
  useEffect(() => {
    if (isHydratedRef.current && messages.length > 0 && status !== 'streaming') {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
      } catch {
        // Ignore storage errors
      }
    }
  }, [messages, status]);

  // Restart chat - clear messages and localStorage
  const handleRestartChat = () => {
    playSound?.('general');
    setMessages([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  // Track when to scroll (set by submit handlers, not by message updates)
  const [shouldScrollToQuestion, setShouldScrollToQuestion] = useState(false);
  
  // Scroll user's question to top when triggered
  useEffect(() => {
    if (shouldScrollToQuestion && lastUserMessageRef.current) {
      // Small delay to ensure DOM is updated
      setTimeout(() => {
        if (lastUserMessageRef.current) {
          lastUserMessageRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        setShouldScrollToQuestion(false);
      }, 50);
    }
  }, [shouldScrollToQuestion]);

  // Log errors
  useEffect(() => {
    if (error) {
      console.error('Chat error:', error);
    }
  }, [error]);

  const handleStarterClick = async (question) => {
    playSound?.('general');
    setShouldScrollToQuestion(true);
    await sendMessage({ text: question });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    playSound?.('general');
    setShouldScrollToQuestion(true);
    const message = input;
    setInput('');
    await sendMessage({ text: message });
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <section
      id="chat-section"
      className={`min-h-[80vh] w-full flex flex-col items-center px-6 md:px-24 py-24 relative overflow-hidden max-w-screen-2xl mx-auto`}
    >
      {/* Intro Section */}
      <div className="text-center mb-12 max-w-2xl">
        <div className="flex items-center justify-center gap-3 mb-6">
          <Sparkles className="text-[#C25E00]" size={28} />
          <h2 className="font-playfair text-5xl md:text-7xl">Ask Me Anything</h2>
        </div>
        <p className={`font-lato text-lg leading-relaxed ${theme.subText}`}>
          Curious about my experience, design process, or projects? 
          Chat with my AI assistant to learn more about my work and approach.
          {' '}Prefer to talk with a human?{' '}
          <button
            onClick={() => document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' })}
            className="text-[#C25E00] hover:underline cursor-pointer"
          >
            Message me.
          </button>
        </p>
      </div>

      {/* Chat Container */}
      <div className={`w-full max-w-2xl rounded-2xl border ${theme.borderSoft} ${theme.cardBg} shadow-lg overflow-hidden`}>
        {/* Chat Header with Restart Button */}
        {messages.length > 0 && (
          <div className={`flex justify-end px-4 py-2 border-b ${theme.borderSoft}`}>
            <button
              onClick={handleRestartChat}
              disabled={isLoading}
              className={`
                flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-lato
                transition-all duration-300
                hover:bg-[#C25E00] hover:text-white
                disabled:opacity-50 disabled:cursor-not-allowed
                ${theme.subText}
              `}
              title="Start new conversation"
            >
              <RotateCcw size={12} />
              New chat
            </button>
          </div>
        )}

        {/* Messages Area */}
        <div ref={messagesContainerRef} className="h-[400px] overflow-y-auto p-6">
          {messages.length === 0 && !hasStarted ? (
            <div className={`flex flex-col items-center justify-center h-full ${theme.subText}`}>
              <MessageCircle size={48} strokeWidth={1} className="mb-4 opacity-30" />
              <p className="font-lato text-center mb-6">
                Start a conversation by clicking a question below<br />
                or type your own
              </p>
              <div className="flex flex-wrap justify-center gap-2 max-w-md">
                {STARTER_QUESTIONS.map((question, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleStarterClick(question)}
                    disabled={isLoading}
                    className={`
                      px-3 py-1.5 rounded-full text-xs font-lato
                      border transition-all duration-300
                      hover:border-[#C25E00] hover:text-[#C25E00] hover:scale-105
                      disabled:opacity-50 disabled:cursor-not-allowed
                      ${theme.borderSoft} ${theme.text}
                    `}
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {(() => {
                // Find the index of the last user message to apply min-height from there
                const lastUserIdx = messages.findLastIndex(m => m.role === 'user');
                
                return messages.map((message, idx) => {
                  const isLastUserMessage = idx === lastUserIdx;
                  
                  // Skip messages after the last user message - they're rendered in the min-height container
                  if (idx > lastUserIdx) {
                    return null;
                  }
                  
                  // Skip rendering assistant messages with no displayable content (e.g., during reasoning phase)
                  const displayContent = message.role === 'assistant' ? getDisplayContent(message) : null;
                  if (message.role === 'assistant' && !displayContent) {
                    return null;
                  }
                  
                  // Wrap last user message + everything after in min-height container
                  if (isLastUserMessage) {
                    // Get messages from last user message onwards
                    const remainingMessages = messages.slice(idx);
                    
                    // Check if we need loading indicator
                    const lastMessage = messages[messages.length - 1];
                    const showLoading = isLoading && (
                      lastMessage?.role === 'user' || 
                      (lastMessage?.role === 'assistant' && !getDisplayContent(lastMessage))
                    );
                    
                    return (
                      <div 
                        key={message.id || idx}
                        ref={lastUserMessageRef}
                        className="min-h-[400px]"
                      >
                        <div className="space-y-4">
                          {/* Last user message */}
                          <div className="flex justify-end">
                            <div className={`max-w-[80%] rounded-2xl rounded-br-md px-4 py-3 ${theme.userBubble}`}>
                              <p className="font-lato text-sm">{getMessageContent(message)}</p>
                            </div>
                          </div>
                          
                          {/* Assistant responses after last user message */}
                          {remainingMessages.slice(1).map((m, i) => {
                            const content = getDisplayContent(m);
                            if (!content) return null;
                            return (
                              <div key={m.id || (idx + 1 + i)} className="flex justify-start">
                                <div className={`max-w-[80%] rounded-2xl rounded-bl-md px-4 py-3 ${theme.assistantBubble}`}>
                                  <div className="font-lato text-sm streamdown-content">
                                    <Streamdown
                                      mode={isLoading && (idx + 1 + i) === messages.length - 1 ? 'streaming' : 'static'}
                                      caret="circle"
                                    >
                                      {content}
                                    </Streamdown>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                          
                          {/* Loading indicator */}
                          {showLoading && (
                            <div className="flex justify-start">
                              <div className={`rounded-2xl rounded-bl-md px-3 py-2 ${theme.assistantBubble}`}>
                                <div className="flex gap-0.5">
                                  <span className="w-1.5 h-1.5 rounded-full bg-current opacity-60 animate-bounce" style={{ animationDelay: '0ms' }} />
                                  <span className="w-1.5 h-1.5 rounded-full bg-current opacity-60 animate-bounce" style={{ animationDelay: '150ms' }} />
                                  <span className="w-1.5 h-1.5 rounded-full bg-current opacity-60 animate-bounce" style={{ animationDelay: '300ms' }} />
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  }
                  
                  // Regular messages before the last user message
                  return (
                    <div
                      key={message.id || idx}
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`
                          max-w-[80%] rounded-2xl px-4 py-3
                          ${message.role === 'user' ? theme.userBubble : theme.assistantBubble}
                          ${message.role === 'user' ? 'rounded-br-md' : 'rounded-bl-md'}
                        `}
                      >
                        {message.role === 'user' ? (
                          <p className="font-lato text-sm">{getMessageContent(message)}</p>
                        ) : (
                          <div className="font-lato text-sm streamdown-content">
                            <Streamdown
                              mode={isLoading && idx === messages.length - 1 ? 'streaming' : 'static'}
                              caret="circle"
                            >
                              {displayContent}
                            </Streamdown>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                });
              })()}
            </div>
          )}
        </div>

        {/* Suggested Follow-up Questions */}
        {!isLoading && getSuggestedPrompts(messages).length > 0 && (
          <div className={`border-t ${theme.borderSoft} px-4 py-3`}>
            <div className="flex flex-wrap gap-2 justify-center">
              {getSuggestedPrompts(messages).map((suggestion, idx) => (
                <button
                  key={idx}
                  onClick={() => handleStarterClick(suggestion)}
                  disabled={isLoading}
                  className={`
                    px-3 py-1.5 rounded-full text-xs font-lato
                    border transition-all duration-300
                    hover:border-[#C25E00] hover:text-[#C25E00] hover:scale-105
                    disabled:opacity-50 disabled:cursor-not-allowed
                    ${theme.borderSoft} ${theme.text}
                  `}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <form onSubmit={onSubmit} className={`border-t ${theme.borderSoft} p-4`}>
          <div className={`flex items-center gap-3 rounded-full ${theme.inputBg} px-4 py-2`}>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={handleInputChange}
              placeholder="Ask about my experience, skills, or projects..."
              disabled={isLoading}
              className={`
                flex-1 bg-transparent border-none outline-none
                font-lato text-sm placeholder:opacity-50
                ${theme.text}
              `}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className={`
                p-2 rounded-full transition-all duration-300
                disabled:opacity-30 disabled:cursor-not-allowed
                hover:bg-[#C25E00] hover:text-white
                ${theme.text}
              `}
              aria-label="Send message"
            >
              <Send size={18} />
            </button>
          </div>
        </form>
      </div>

      {/* Disclaimer */}
      <p className={`mt-6 font-lato text-xs ${theme.subText} text-center max-w-md`}>
        This AI assistant provides information based on my portfolio. 
        For detailed inquiries, feel free to reach out directly.
      </p>
    </section>
  );
};

export default AskChat;
