import React, { useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles, RotateCcw } from 'lucide-react';
import { Streamdown } from 'streamdown';
import {
  useAskChat,
  getMessageContent,
  getSuggestedPrompts,
  STARTER_QUESTIONS,
} from './ChatContext';
import { getTheme } from '../theme';

const MiniChat = ({ mode }) => {
  const {
    messages,
    input,
    setInput,
    isLoading,
    handleRestartChat,
    handleSend,
    isMainChatVisible,
    isMiniChatOpen: isOpen,
    setIsMiniChatOpen: setIsOpen,
  } = useAskChat();
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const theme = getTheme(mode);

  useEffect(() => {
    if (isOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    handleSend(input);
  };

  const showLoading =
    isLoading &&
    messages.length > 0 &&
    (messages[messages.length - 1]?.role === 'user' ||
      (messages[messages.length - 1]?.role === 'assistant' &&
        !getMessageContent(messages[messages.length - 1])));

  const chipClass = `
    inline-block px-3 py-1 text-xs font-bold uppercase tracking-widest rounded-tag chat-chip cursor-pointer
    disabled:opacity-50 disabled:cursor-not-allowed
    ${theme.tagBg}
  `;

  return (
    <>
      <div
        className={`
          fixed z-50 right-4 md:right-9
          bottom-[calc(5rem+1rem+3.5rem+0.75rem)] md:bottom-28
          w-[calc(100vw-2rem)] md:w-[360px]
          h-[60vh] max-h-[480px]
          overflow-hidden
          flex flex-col
          border-[2px] border-charcoal
          ${theme.cardBg} ${theme.text}
          transition-all duration-50 origin-bottom-right
          ${isOpen && !isMainChatVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        `}
      >
        <div
          className={`flex items-center justify-between px-4 py-3 border-b-[2px] border-charcoal bg-yellow-500 text-charcoal shrink-0`}
        >
          <div className="flex items-center gap-2">
            <Sparkles className={theme.iconBlue} size={16} />
            <span className="font-serif text-sm uppercase font-semibold tracking-wide">
              Ask Eka
            </span>
          </div>
          <div className="flex items-center gap-1">
            {messages.length > 0 && (
              <button
                onClick={handleRestartChat}
                disabled={isLoading}
                className={`
                  p-1.5 border-2 border-charcoal transition-colors duration-50
                  hover:bg-red-500 hover:text-cream
                  disabled:opacity-50 disabled:cursor-not-allowed
                `}
                title="New chat"
              >
                <RotateCcw size={14} />
              </button>
            )}
            <button
              onClick={() => setIsOpen(false)}
              className={`p-1.5 border-2 border-charcoal transition-colors duration-50 hover:bg-red-500 hover:text-cream`}
            >
              <X size={16} />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto overscroll-contain p-4 space-y-3">
          {messages.length === 0 ? (
            <div className={`flex flex-col items-center justify-center h-full ${theme.subText}`}>
              <div className="bauhaus-idle mb-4" aria-label="System idle">
                <span className="bauhaus-idle__red" />
                <span className="bauhaus-idle__blue" />
                <span className="bauhaus-idle__yellow">
                  <span className="bauhaus-idle__label">
                    System idle.
                    <br />
                    Enter prompt.
                  </span>
                </span>
                <span className="bauhaus-idle__dot" />
                <span className="bauhaus-idle__ring" />
              </div>
              <div className="flex flex-wrap justify-center gap-1.5">
                {STARTER_QUESTIONS.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(q)}
                    disabled={isLoading}
                    className={chipClass}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {messages.map((message, idx) => {
                const content = getMessageContent(message);
                if (message.role === 'assistant' && !content) return null;

                return (
                  <div
                    key={message.id || idx}
                    className={`flex bauhaus-snap ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`
                        max-w-[85%] px-3 py-2
                        ${message.role === 'user' ? theme.userBubble : theme.assistantBubble}
                      `}
                    >
                      {message.role === 'user' ? (
                        <p className="font-sans text-xs font-medium">{content}</p>
                      ) : (
                        <div className="font-sans text-xs streamdown-content">
                          <Streamdown
                            mode={isLoading && idx === messages.length - 1 ? 'streaming' : 'static'}
                            caret="block"
                          >
                            {content}
                          </Streamdown>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              {showLoading && (
                <div className="flex justify-start items-center gap-2 bauhaus-snap">
                  <div className="bauhaus-think" aria-label="AI thinking" />
                  <span className="font-sans text-2xs font-bold uppercase tracking-widest text-gray-500">
                    Processing
                  </span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        {!isLoading && getSuggestedPrompts(messages).length > 0 && (
          <div className={`border-t-2 border-charcoal px-3 py-2 shrink-0`}>
            <div className="flex flex-wrap gap-1.5 justify-center">
              {getSuggestedPrompts(messages).map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(s)}
                  disabled={isLoading}
                  className={chipClass}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        <form onSubmit={onSubmit} className="px-4 pt-2 pb-4 shrink-0">
          <div className={`flex items-center gap-2 border-b-2 ${theme.borderSolid} px-1 py-1.5`}>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              disabled={isLoading}
              className={`
                flex-1 bg-transparent border-none outline-none
                font-sans text-xs placeholder:opacity-50
                ${theme.text}
              `}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className={`
                flex shrink-0 items-center justify-center bg-transparent
                transition-opacity duration-50
                disabled:opacity-30 disabled:cursor-not-allowed
                hover:opacity-70
                ${theme.iconBlue}
              `}
              aria-label="Send message"
            >
              <Send size={14} />
            </button>
          </div>
        </form>
      </div>

      <div
        className={`
          fixed z-[60] right-4 md:right-9
          bottom-[calc(5rem+1rem)] md:bottom-10
          transition-opacity duration-50
          ${isMainChatVisible ? 'opacity-0 pointer-events-none' : 'opacity-100'}
        `}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`
            w-14 h-14 rounded-full bauhaus-circle
            flex items-center justify-center
            bg-blue-500 text-cream border-0
            cursor-pointer transition-colors duration-50
            hover:bg-blue-700
          `}
          aria-label={isOpen ? 'Close chat' : 'Open chat'}
        >
          <div className="relative w-6 h-6">
            <MessageCircle
              size={24}
              className={`absolute inset-0 transition-all duration-50 ${isOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'}`}
            />
            <X
              size={24}
              className={`absolute inset-0 transition-all duration-50 ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}
            />
          </div>
        </button>
      </div>
    </>
  );
};

export default MiniChat;
