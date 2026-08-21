"use client";

import React, { useState, useRef, useEffect } from "react";
import Button from "./ui/Button";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTED_QUESTIONS = [
  "What is his core tech stack?",
  "Tell me about the RailVista project.",
  "Tell me about the CleanMess project.",
  "Is he available for internships?",
];

export default function AskWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi! I'm Sadik's AI assistant. Ask me anything about his technical skills, projects, work experience, or education. You can also click one of the suggested questions below!",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of conversation
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Close when clicking outside of the widget
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        isOpen &&
        panelRef.current &&
        !panelRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isOpen]);

  const handleSend = async (textToSend: string) => {
    const trimmed = textToSend.trim();
    if (!trimmed || isLoading) return;

    // Append user message
    setMessages((prev) => [...prev, { role: "user", content: trimmed }]);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: trimmed }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to get response.");
      }

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.answer },
      ]);
    } catch (err: any) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: err.message?.includes("Too many requests")
            ? "⚠️ Rate limit exceeded. You've asked quite a few questions! Please try again in an hour or contact Sadik directly at sadikmondal789@gmail.com."
            : "⚠️ I encountered an error connecting to my server. Please try again or reach out to Sadik directly at sadikmondal789@gmail.com.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSend(inputValue);
  };

  return (
    <div ref={panelRef} className="fixed bottom-6 right-6 z-40 font-sans">
      {/* Expanded Chat Widget */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-[calc(100vw-2rem)] sm:w-[380px] h-[500px] bg-card/95 border border-border-muted rounded-2xl shadow-2xl flex flex-col overflow-hidden backdrop-blur-md transition-all duration-300 animate-scale-in origin-bottom-right">
          
          {/* Header */}
          <div className="h-14 border-b border-border-muted flex items-center justify-between px-5 bg-[#FAFAF9] dark:bg-[#141416]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse"></span>
              <h3 className="text-xs font-mono font-bold text-text-primary uppercase tracking-wider">
                Ask About Sadik
              </h3>
            </div>
            
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface-low border border-transparent hover:border-border-muted transition-all"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 custom-scrollbar bg-[#FAFAF9] dark:bg-[#0B0B0D]/30">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex flex-col max-w-[85%] ${
                  msg.role === "user" ? "self-end items-end" : "self-start items-start"
                }`}
              >
                <div
                  className={`p-3 text-xs leading-relaxed rounded-2xl ${
                    msg.role === "user"
                      ? "bg-primary text-white rounded-br-sm"
                      : "bg-surface-low border border-border-muted text-text-primary rounded-bl-sm"
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.content}</p>
                </div>
              </div>
            ))}

            {/* Loading Indicator Bubble */}
            {isLoading && (
              <div className="self-start max-w-[85%] flex items-start gap-1">
                <div className="p-3 bg-surface-low border border-border-muted rounded-2xl rounded-bl-sm flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce delay-75"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce delay-150"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce delay-200"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick-suggest chips (Shown when not loading) */}
          {!isLoading && messages.length <= 2 && (
            <div className="px-4 py-2 flex flex-col gap-1.5 bg-[#FAFAF9] dark:bg-[#0B0B0D]/30 border-t border-border-muted/50">
              <span className="text-[9px] font-mono font-bold text-text-secondary/70 uppercase tracking-wider">
                Suggested Questions
              </span>
              <div className="flex flex-wrap gap-1.5">
                {SUGGESTED_QUESTIONS.map((question) => (
                  <button
                    key={question}
                    onClick={() => handleSend(question)}
                    className="text-[10px] text-left font-medium text-text-primary hover:text-primary bg-card border border-border-muted hover:border-primary/50 px-2.5 py-1.5 rounded-full transition-all cursor-pointer"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Panel */}
          <form
            onSubmit={handleFormSubmit}
            className="h-16 border-t border-border-muted bg-[#FAFAF9] dark:bg-[#141416] flex items-center px-4 gap-2.5"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={isLoading}
              maxLength={300}
              placeholder={isLoading ? "Thinking..." : "Ask about skills, projects, education..."}
              className="flex-1 h-10 px-4 text-xs rounded-xl border border-border-muted bg-card text-text-primary focus:outline-none focus:border-primary disabled:opacity-50"
            />
            
            <button
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center hover:bg-primary-hover disabled:opacity-30 disabled:hover:bg-primary transition-all cursor-pointer shrink-0"
            >
              <svg className="w-4 h-4 rotate-90" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9-7-9-7v14z" />
              </svg>
            </button>
          </form>
        </div>
      )}

      {/* Floating Collapse Chat Bubble Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Ask about Sadik"
        className="w-14 h-14 rounded-full bg-primary hover:bg-primary-hover text-white flex items-center justify-center shadow-xl hover:scale-105 transition-all duration-200 cursor-pointer relative group"
      >
        {isOpen ? (
          <svg className="w-6 h-6 transition-transform group-hover:rotate-90 duration-200" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <>
            <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            {/* Notification Green Dot positioned relative to the outer button */}
            <span className="absolute top-1 right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-white dark:border-[#0B0B0D] animate-ping"></span>
            <span className="absolute top-1 right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-white dark:border-[#0B0B0D]"></span>
          </>
        )}
      </button>
    </div>
  );
}
