import React, { useState } from 'react';
import { Sparkles, Send, Bot, User, X, Loader2, RefreshCw } from 'lucide-react';
import { ChatMessage, SimulationParams } from '../types';

interface GeminiAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  params: SimulationParams;
}

export const GeminiAssistant: React.FC<GeminiAssistantProps> = ({
  isOpen,
  onClose,
  params,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'gemini',
      text: 'Greetings! I am Kumi AI — your NeuroBIN Laboratory Assistant. I analyze your Cantor recursion parameters (∞ - n = NeuroBIN), biological action potentials, binary logic gates, and transinfinite signal processing.',
      timestamp: new Date(),
    },
  ]);
  const [inputPrompt, setInputPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSendMessage = async (textToSend?: string) => {
    const prompt = textToSend || inputPrompt;
    if (!prompt.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: prompt,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputPrompt('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/gemini/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          params,
          prompt,
        }),
      });

      const data = await response.json();

      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'gemini',
        text: data.text || 'Analysis completed.',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error('AI Lab Assistant Error:', err);
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'gemini',
        text: 'Unable to connect to Gemini AI server. Please check your API key in Secrets.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div id="gemini-assistant-backdrop" className="fixed inset-0 bg-[#020617]/80 backdrop-blur-xl z-50 flex justify-end p-0 sm:p-4">
      <div id="gemini-assistant-drawer" className="bg-[#080d24]/90 backdrop-blur-2xl border-l sm:border border-white/15 w-full sm:max-w-md h-full sm:h-[90vh] sm:rounded-3xl shadow-2xl flex flex-col justify-between overflow-hidden relative">
        
        {/* Assistant Header */}
        <div className="p-4 bg-white/5 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-gradient-to-r from-indigo-500 to-emerald-500 text-white shadow-lg shadow-indigo-500/20">
              <Sparkles className="w-4 h-4 text-amber-300" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                Kumi AI Assistant
              </h2>
              <p className="text-[10px] text-slate-400 font-mono tracking-widest uppercase">
                NeuroBIN Cognitive Engine
              </p>
            </div>
          </div>

          <button
            id="close-gemini-assistant-btn"
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Message Thread */}
        <div className="p-4 flex-1 overflow-y-auto flex flex-col gap-3">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'gemini' && (
                <div className="w-7 h-7 rounded-xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center shrink-0 text-indigo-300">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-gradient-to-r from-indigo-500 to-emerald-500 text-white font-medium shadow-md'
                    : 'bg-white/5 border border-white/10 text-slate-200 font-sans'
                }`}
              >
                {msg.text}
              </div>

              {msg.sender === 'user' && (
                <div className="w-7 h-7 rounded-xl bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center shrink-0 text-cyan-300">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-2 text-xs text-indigo-300 font-mono bg-white/5 p-3 rounded-2xl border border-white/10 w-fit">
              <Loader2 className="w-4 h-4 animate-spin text-indigo-400" />
              <span>Kumi AI is processing bio-digital pulse dynamics...</span>
            </div>
          )}
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-4 py-2 bg-white/5 border-t border-white/10 flex flex-nowrap overflow-x-auto gap-1.5 text-[11px] font-mono">
          <button
            onClick={() => handleSendMessage(`Analyze Cantor recursion depth n = ${params.cantorDepth} in my simulation.`)}
            className="px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 whitespace-nowrap transition"
          >
            Analyze n = {params.cantorDepth}
          </button>
          <button
            onClick={() => handleSendMessage('Explain how membrane potential thresholds compare to transistor logic gates.')}
            className="px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 whitespace-nowrap transition"
          >
            Membranes vs Transistors
          </button>
          <button
            onClick={() => handleSendMessage('Elaborate on how Kumi AI unifies Cantor transfinite set theory with NeuroBIN.')}
            className="px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 whitespace-nowrap transition"
          >
            Kumi AI & Cantor Theory
          </button>
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-white/5 border-t border-white/10 flex gap-2">
          <input
            id="gemini-input-field"
            type="text"
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask Kumi AI Assistant..."
            className="flex-1 bg-[#020617]/80 border border-white/15 rounded-full px-4 py-2 text-xs text-white focus:outline-none focus:border-indigo-400 font-mono"
          />
          <button
            id="gemini-send-btn"
            onClick={() => handleSendMessage()}
            disabled={isLoading || !inputPrompt.trim()}
            className="p-2.5 bg-indigo-500 hover:bg-indigo-400 disabled:opacity-50 text-white rounded-full transition shadow-lg shadow-indigo-500/20"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
