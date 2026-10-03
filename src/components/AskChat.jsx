import React, { useRef, useEffect, useLayoutEffect } from 'react';
import { MessageCircleMore, Sparkles, RotateCcw } from 'lucide-react';
import { Streamdown } from 'streamdown';
import {
  useAskChat,
  getMessageContent,
  getSuggestedPrompts,
  STARTER_QUESTIONS,
} from './ChatContext';
import { getTheme } from '../theme';

const AskChat = ({ mode }) => {
  const {
    messages,
    input,
    setInput,
    isLoading,
    hasStarted,
    handleRestartChat,
    handleSend,
    setIsMainChatVisible,
  } = useAskChat();

  const messagesContainerRef = useRef(null);
  const inputRef = useRef(null);
  const lastUserMessageRef = useRef(null);
  const sectionRef = useRef(null);
  const scrollToQuestionRef = useRef(false);
  const pageScrollRef = useRef(null);

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
      setIsMainChatVisible(false);
    };
  }, [setIsMainChatVisible]);

  // Scroll the question to the top of the chat panel only. scrollIntoView also
  // moves the page, and the page should stay where the reader left it.
  useLayoutEffect(() => {
    if (!scrollToQuestionRef.current) return;
    const container = messagesContainerRef.current;
    const target = lastUserMessageRef.current;
    if (!container || !target) return;

    const paddingTop = parseFloat(getComputedStyle(container).paddingTop) || 0;
    const top =
      target.getBoundingClientRect().top -
      container.getBoundingClientRect().top +
      container.scrollTop -
      paddingTop;
    container.scrollTo({ top, behavior: 'smooth' });

    const savedPage = pageScrollRef.current;
    scrollToQuestionRef.current = false;
    pageScrollRef.current = null;
    if (savedPage != null) {
      window.scrollTo(0, savedPage);
      requestAnimationFrame(() => window.scrollTo(0, savedPage));
    }
  }, [messages]);

  const markQuestionScroll = () => {
    pageScrollRef.current = window.scrollY;
    scrollToQuestionRef.current = true;
  };

  const handleStarterClick = async (question) => {
    markQuestionScroll();
    await handleSend(question);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    markQuestionScroll();
    await handleSend(input);
  };

  const chipClass = `
    inline-block px-3 py-1 text-xs font-bold uppercase tracking-widest rounded-tag chat-chip cursor-pointer
    disabled:opacity-50 disabled:cursor-not-allowed
    ${theme.tagBg}
  `;

  return (
    <section
      ref={sectionRef}
      id="chat-section"
      className={`min-h-[80vh] w-full flex flex-col items-center px-6 md:px-24 py-24 relative overflow-hidden max-w-screen-2xl mx-auto`}
    >
      {/* Intro Section */}
      <div className="text-center mb-12 max-w-2xl">
        <h2 className="font-serif mb-6 flex flex-col items-center">
          <span className="inline-flex items-start gap-3">
            Ask Me
            <Sparkles
              className={`${theme.iconBlue} w-[0.45em] h-[0.45em] shrink-0 -translate-y-[0.24em]`}
              aria-hidden="true"
            />
          </span>
          <span>Anything</span>
        </h2>
        <p className={`font-sans text-lg leading-relaxed font-normal ${theme.subText}`}>
          Curious about my experience, design process, or projects? Chat with my AI assistant to
          learn more about my work and approach. Prefer to talk with a human?{' '}
          <a href="#contact-section" className={`${theme.linkBlue} underline font-semibold`}>
            Message me.
          </a>
        </p>
      </div>

      {/* Chat Container */}
      <div className="relative w-full max-w-2xl">
        <div
          className={`chat-tile relative z-10 w-full ${theme.cardBg} overflow-hidden border-[2px] border-charcoal`}
        >
          {messages.length > 0 && (
            <div className={`flex justify-end px-4 py-2 border-b-2 ${theme.borderSoft}`}>
              <button
                onClick={handleRestartChat}
                disabled={isLoading}
                className={`
                chat-new flex items-center gap-1.5 px-4 py-1.5 text-xs font-sans font-bold uppercase tracking-wide
                bg-transparent border-2 transition-all duration-50
                hover:bg-red-500 hover:text-cream hover:border-red-500
                disabled:opacity-50 disabled:cursor-not-allowed
                ${mode === 'wandering' ? 'text-cream border-cream' : 'text-charcoal border-charcoal'}
              `}
                title="Start new conversation"
              >
                <RotateCcw size={12} />
                New chat
              </button>
            </div>
          )}

          <div
            ref={messagesContainerRef}
            role="log"
            aria-live="polite"
            aria-relevant="additions"
            className={
              messages.length === 0 && !hasStarted
                ? 'px-6 pt-8 pb-10'
                : 'h-[400px] overflow-y-auto p-6'
            }
          >
            {messages.length === 0 && !hasStarted ? (
              <div className="flex flex-col items-center">
                <div className="bauhaus-idle mb-7">
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
                <div className="flex flex-wrap justify-center gap-2 max-w-md">
                  {STARTER_QUESTIONS.map((question, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleStarterClick(question)}
                      disabled={isLoading}
                      className={chipClass}
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {(() => {
                  const lastUserIdx = messages.findLastIndex((m) => m.role === 'user');

                  return messages.map((message, idx) => {
                    const isLastUserMessage = idx === lastUserIdx;

                    if (idx > lastUserIdx) {
                      return null;
                    }

                    const content =
                      message.role === 'assistant' ? getMessageContent(message) : null;
                    if (message.role === 'assistant' && !content) {
                      return null;
                    }

                    if (isLastUserMessage) {
                      const remainingMessages = messages.slice(idx);

                      const lastMessage = messages[messages.length - 1];
                      const showLoading =
                        isLoading &&
                        (lastMessage?.role === 'user' ||
                          (lastMessage?.role === 'assistant' && !getMessageContent(lastMessage)));

                      return (
                        <div
                          key={message.id || idx}
                          ref={lastUserMessageRef}
                          className="min-h-[400px]"
                        >
                          <div className="space-y-4">
                            <div className="flex justify-end bauhaus-snap">
                              <div className={`max-w-[80%] px-4 py-3 ${theme.userBubble}`}>
                                <p className="font-sans text-sm font-medium">
                                  {getMessageContent(message)}
                                </p>
                              </div>
                            </div>

                            {remainingMessages.slice(1).map((m, i) => {
                              const msgContent = getMessageContent(m);
                              if (!msgContent) return null;
                              return (
                                <div
                                  key={m.id || idx + 1 + i}
                                  className="flex justify-start bauhaus-snap"
                                >
                                  <div className={`max-w-[80%] px-4 py-3 ${theme.assistantBubble}`}>
                                    <div className="font-sans text-sm streamdown-content">
                                      <Streamdown
                                        mode={
                                          isLoading && idx + 1 + i === messages.length - 1
                                            ? 'streaming'
                                            : 'static'
                                        }
                                        caret="block"
                                      >
                                        {msgContent}
                                      </Streamdown>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}

                            {showLoading && (
                              <div
                                className="flex justify-start items-center gap-3 bauhaus-snap"
                                role="status"
                                aria-live="polite"
                              >
                                <div className="bauhaus-think" aria-hidden="true" />
                                <span className="font-sans text-xs font-bold uppercase tracking-widest text-gray-500">
                                  Processing…
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    }

                    return (
                      <div
                        key={message.id || idx}
                        className={`flex bauhaus-snap ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`
                          max-w-[80%] px-4 py-3
                          ${message.role === 'user' ? theme.userBubble : theme.assistantBubble}
                        `}
                        >
                          {message.role === 'user' ? (
                            <p className="font-sans text-sm font-medium">
                              {getMessageContent(message)}
                            </p>
                          ) : (
                            <div className="font-sans text-sm streamdown-content">
                              <Streamdown
                                mode={
                                  isLoading && idx === messages.length - 1 ? 'streaming' : 'static'
                                }
                                caret="block"
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

          {!isLoading && getSuggestedPrompts(messages).length > 0 && (
            <div className={`chat-rule border-t-2 ${theme.borderSoft} px-4 py-3`}>
              <div className="flex flex-wrap gap-2 justify-center">
                {getSuggestedPrompts(messages).map((suggestion, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleStarterClick(suggestion)}
                    disabled={isLoading}
                    className={chipClass}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          <form onSubmit={onSubmit} className="px-6 pt-2 pb-6">
            <div className={`flex items-center gap-3 border-b-2 ${theme.borderSolid} px-1 py-2`}>
              <label htmlFor="ask-chat-input" className="sr-only">
                Message
              </label>
              <input
                id="ask-chat-input"
                ref={inputRef}
                type="text"
                name="message"
                autoComplete="off"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about my experience, skills, or projects…"
                disabled={isLoading}
                className={`
                flex-1 bg-transparent border-none
                font-sans text-sm placeholder:opacity-50
                ${theme.text}
              `}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className={`
                chat-send flex h-11 w-11 shrink-0 items-center justify-center
                bauhaus-circle border-0 bg-[#FFCC01] text-charcoal cursor-pointer
                transition-colors duration-50
                enabled:hover:bg-red-500 enabled:hover:text-cream
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2
                disabled:cursor-not-allowed
              `}
                aria-label="Send message"
              >
                <MessageCircleMore size={24} strokeWidth={2.25} />
              </button>
            </div>
          </form>
        </div>
      </div>

      <p
        className={`mt-6 font-sans text-xs ${theme.subText} text-center max-w-md uppercase tracking-widest font-medium`}
      >
        This AI assistant provides information based on my portfolio. For detailed inquiries, feel
        free to reach out directly.
      </p>
    </section>
  );
};

export default AskChat;
