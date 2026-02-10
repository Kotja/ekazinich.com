import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles, RotateCcw } from 'lucide-react';
import { Streamdown } from 'streamdown';
import { useAskChat, getMessageContent, getSuggestedPrompts, STARTER_QUESTIONS, getChatTheme } from './ChatContext';

const MiniChat = ({ mode }) => {
  const {
    messages, input, setInput, isLoading,
    handleRestartChat, handleSend, isMainChatVisible,
  } = useAskChat();

  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const theme = getChatTheme(mode);

  // Auto-scroll messages to bottom
  useEffect(() => {
    if (isOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  // Focus input when panel opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    handleSend(input);
  };

  const showLoading = isLoading && messages.length > 0 && (
    messages[messages.length - 1]?.role === 'user' ||
    (messages[messages.length - 1]?.role === 'assistant' && !getMessageContent(messages[messages.length - 1]))
  );

  return (
    <div
      className={`
        fixed bottom-3 right-20 md:bottom-10 md:right-9 z-50
        transition-opacity duration-500
        ${isMainChatVisible ? 'opacity-0 pointer-events-none' : 'opacity-100'}
      `}
    >
      {/* Chat Panel */}
      <div
        className={`
          absolute bottom-[calc(100%+12px)] -right-16 md:right-0
          w-[calc(100vw-2rem)] md:w-[360px]
          h-[60vh] max-h-[480px]
          rounded-2xl overflow-hidden
          flex flex-col
          border
          ${theme.cardBg} ${theme.text} ${theme.borderSoft}
          transition-all duration-300 origin-bottom-right
          ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'}
        `}
        style={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}
      >
        {/* Header */}
        <div className={`flex items-center justify-between px-4 py-3 border-b ${theme.borderSoft} shrink-0`}>
          <div className="flex items-center gap-2">
            <Sparkles className="text-[#C25E00]" size={16} />
            <span className="font-playfair text-sm font-semibold">Ask Eka</span>
          </div>
          <div className="flex items-center gap-1">
            {messages.length > 0 && (
              <button
                onClick={handleRestartChat}
                disabled={isLoading}
                className={`
                  p-1.5 rounded-full transition-colors
                  hover:bg-[#C25E00]/10
                  disabled:opacity-50 disabled:cursor-not-allowed
                  ${theme.subText}
                `}
                title="New chat"
              >
                <RotateCcw size={14} />
              </button>
            )}
            <button
              onClick={() => setIsOpen(false)}
              className={`p-1.5 rounded-full transition-colors hover:bg-[#C25E00]/10 ${theme.subText}`}
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.length === 0 ? (
            /* Empty State */
            <div className={`flex flex-col items-center justify-center h-full ${theme.subText}`}>
              <MessageCircle size={32} strokeWidth={1} className="mb-3 opacity-30" />
              <p className="font-lato text-xs text-center mb-4">
                Ask about experience, skills, or projects
              </p>
              <div className="flex flex-wrap justify-center gap-1.5">
                {STARTER_QUESTIONS.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(q)}
                    disabled={isLoading}
                    className={`
                      px-2.5 py-1 rounded-full text-[11px] font-lato
                      border transition-all duration-300
                      hover:border-[#C25E00] hover:text-[#C25E00]
                      disabled:opacity-50 disabled:cursor-not-allowed
                      ${theme.borderSoft} ${theme.text}
                    `}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Message Bubbles */
            <>
              {messages.map((message, idx) => {
                const content = getMessageContent(message);
                if (message.role === 'assistant' && !content) return null;

                return (
                  <div
                    key={message.id || idx}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`
                        max-w-[85%] rounded-2xl px-3 py-2
                        ${message.role === 'user' ? theme.userBubble : theme.assistantBubble}
                        ${message.role === 'user' ? 'rounded-br-md' : 'rounded-bl-md'}
                      `}
                    >
                      {message.role === 'user' ? (
                        <p className="font-lato text-xs">{content}</p>
                      ) : (
                        <div className="font-lato text-xs streamdown-content">
                          <Streamdown
                            mode={isLoading && idx === messages.length - 1 ? 'streaming' : 'static'}
                            caret="circle"
                          >
                            {content}
                          </Streamdown>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              {/* Loading Indicator */}
              {showLoading && (
                <div className="flex justify-start">
                  <div className={`rounded-2xl rounded-bl-md px-3 py-2 ${theme.assistantBubble}`}>
                    <div className="flex gap-0.5">
                      <span className="w-1 h-1 rounded-full bg-current opacity-60 animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1 h-1 rounded-full bg-current opacity-60 animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1 h-1 rounded-full bg-current opacity-60 animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        {/* Suggested Follow-up Prompts */}
        {!isLoading && getSuggestedPrompts(messages).length > 0 && (
          <div className={`border-t ${theme.borderSoft} px-3 py-2 shrink-0`}>
            <div className="flex flex-wrap gap-1.5 justify-center">
              {getSuggestedPrompts(messages).map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(s)}
                  disabled={isLoading}
                  className={`
                    px-2.5 py-1 rounded-full text-[11px] font-lato
                    border transition-all duration-300
                    hover:border-[#C25E00] hover:text-[#C25E00]
                    disabled:opacity-50 disabled:cursor-not-allowed
                    ${theme.borderSoft} ${theme.text}
                  `}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <form onSubmit={onSubmit} className={`border-t ${theme.borderSoft} p-3 shrink-0`}>
          <div className={`flex items-center gap-2 rounded-full ${theme.inputBg} px-3 py-1.5`}>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              disabled={isLoading}
              className={`
                flex-1 bg-transparent border-none outline-none
                font-lato text-xs placeholder:opacity-50
                ${theme.text}
              `}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className={`
                p-1.5 rounded-full transition-all duration-300
                disabled:opacity-30 disabled:cursor-not-allowed
                hover:bg-[#C25E00] hover:text-white
                ${theme.text}
              `}
              aria-label="Send message"
            >
              <Send size={14} />
            </button>
          </div>
        </form>
      </div>

      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-14 h-14 rounded-full
          flex items-center justify-center
          transition-all duration-300
          bg-[#C25E00] text-white
          hover:scale-110
          active:scale-95
        `}
        style={{ boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.15), 0 4px 6px -4px rgba(0, 0, 0, 0.1)' }}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        <div className="relative w-6 h-6">
          <MessageCircle
            size={24}
            className={`absolute inset-0 transition-all duration-300 ${isOpen ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'}`}
          />
          <X
            size={24}
            className={`absolute inset-0 transition-all duration-300 ${isOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'}`}
          />
        </div>
      </button>
    </div>
  );
};

export default MiniChat;
