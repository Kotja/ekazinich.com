import React, { useState, useRef, useEffect } from 'react';
import { Send, MessageCircle, Sparkles, RotateCcw } from 'lucide-react';
import { Streamdown } from 'streamdown';
import { useAskChat, getMessageContent, getSuggestedPrompts, STARTER_QUESTIONS } from './ChatContext';
import { getTheme } from '../theme';

const AskChat = ({ mode }) => {
  const {
    messages, input, setInput, isLoading, hasStarted,
    handleRestartChat, handleSend, setIsMainChatVisible,
  } = useAskChat();

  const messagesContainerRef = useRef(null);
  const inputRef = useRef(null);
  const lastUserMessageRef = useRef(null);
  const sectionRef = useRef(null);

  const [shouldScrollToQuestion, setShouldScrollToQuestion] = useState(false);

  const theme = getTheme(mode);

  // --- IntersectionObserver: report main chat visibility to context ---
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsMainChatVisible(entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      // When AskChat unmounts (e.g. navigating away from home), mark as not visible
      // so the MiniChat becomes available on other routes
      setIsMainChatVisible(false);
    };
  }, [setIsMainChatVisible]);

  // Scroll user's question to top when triggered
  useEffect(() => {
    if (shouldScrollToQuestion && lastUserMessageRef.current) {
      setTimeout(() => {
        if (lastUserMessageRef.current) {
          lastUserMessageRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        setShouldScrollToQuestion(false);
      }, 50);
    }
  }, [shouldScrollToQuestion]);

  const handleStarterClick = async (question) => {
    setShouldScrollToQuestion(true);
    await handleSend(question);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    setShouldScrollToQuestion(true);
    await handleSend(input);
  };

  return (
    <section
      ref={sectionRef}
      id="chat-section"
      className={`min-h-[80vh] w-full flex flex-col items-center px-6 md:px-24 py-24 relative overflow-hidden max-w-screen-2xl mx-auto`}
    >
      {/* Intro Section */}
      <div className="text-center mb-12 max-w-2xl">
        <div className="flex items-center justify-center gap-3 mb-6">
          <Sparkles className="text-accent" size={28} />
          <h2 className="font-serif text-5xl md:text-7xl">Ask Me Anything</h2>
        </div>
        <p className={`font-sans text-lg leading-relaxed ${theme.subText}`}>
          Curious about my experience, design process, or projects?
          Chat with my AI assistant to learn more about my work and approach.
          {' '}Prefer to talk with a human?{' '}
          <button
            onClick={() => document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' })}
            className="text-accent hover:underline cursor-pointer"
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
                flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-sans
                transition-all duration-300
                hover:bg-accent hover:text-white
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
        <div ref={messagesContainerRef} className="h-[400px] overflow-y-auto p-6 rounded-[3px]">
          {messages.length === 0 && !hasStarted ? (
            <div className={`flex flex-col items-center justify-center h-full ${theme.subText}`}>
              <MessageCircle size={48} strokeWidth={1} className="mb-4 opacity-30" />
              <p className="font-sans text-center mb-6">
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
                      px-3 py-1.5 rounded-full text-xs font-sans
                      border transition-all duration-300
                      hover:border-accent hover:text-accent hover:scale-105
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
                  const content = message.role === 'assistant' ? getMessageContent(message) : null;
                  if (message.role === 'assistant' && !content) {
                    return null;
                  }

                  // Wrap last user message + everything after in min-height container
                  if (isLastUserMessage) {
                    const remainingMessages = messages.slice(idx);

                    const lastMessage = messages[messages.length - 1];
                    const showLoading = isLoading && (
                      lastMessage?.role === 'user' ||
                      (lastMessage?.role === 'assistant' && !getMessageContent(lastMessage))
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
                              <p className="font-sans text-sm">{getMessageContent(message)}</p>
                            </div>
                          </div>

                          {/* Assistant responses after last user message */}
                          {remainingMessages.slice(1).map((m, i) => {
                            const content = getMessageContent(m);
                            if (!content) return null;
                            return (
                              <div key={m.id || (idx + 1 + i)} className="flex justify-start">
                                <div className={`max-w-[80%] rounded-2xl rounded-bl-md px-4 py-3 ${theme.assistantBubble}`}>
                                  <div className="font-sans text-sm streamdown-content">
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
                          <p className="font-sans text-sm">{getMessageContent(message)}</p>
                        ) : (
                          <div className="font-sans text-sm streamdown-content">
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
                    px-3 py-1.5 rounded-full text-xs font-sans
                    border transition-all duration-300
                    hover:border-accent hover:text-accent hover:scale-105
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
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about my experience, skills, or projects..."
              disabled={isLoading}
              className={`
                flex-1 bg-transparent border-none outline-none
                font-sans text-sm placeholder:opacity-50
                ${theme.text}
              `}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className={`
                p-2 rounded-full transition-all duration-300
                disabled:opacity-30 disabled:cursor-not-allowed
                hover:bg-accent hover:text-white
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
      <p className={`mt-6 font-sans text-xs ${theme.subText} text-center max-w-md`}>
        This AI assistant provides information based on my portfolio.
        For detailed inquiries, feel free to reach out directly.
      </p>
    </section>
  );
};

export default AskChat;
