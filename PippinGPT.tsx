import React, { useState, useRef, useEffect } from 'react';

// --- Types & Interfaces ---

type Sender = 'user' | 'bot';

interface Message {
  id: string;
  text: string;
  sender: Sender;
}

interface MemoryBank {
  greetings: string[];
  origin: string[];
  home: string[];
  sadness: string[];
  anger: string[];
  crypto: string[];
  randomThoughts: string[];
}

// --- The Brain: Logic & Personality ---

const pippinMemory: MemoryBank = {
  greetings: ["hello", "hi", "hey", "start"],
  origin: ["who are you", "created", "made you", "yohei", "origin"],
  home: ["where are you", "live", "woods", "location"],
  sadness: ["sad", "lonely", "depressed", "hurt", "pain", "crying"],
  anger: ["hate", "stupid", "dumb", "ugly", "mad", "angry"],
  crypto: ["token", "solana", "coin", "price", "market"],
  randomThoughts: [
    "I was just watching a leaf float on a digital stream. It reminded me of you.",
    "The Wobbly Woods are quiet today. It gives us space to think.",
    "Have you noticed how your thoughts ripple through the screen?",
    "Sometimes the smallest wobble leads to the biggest wonder.",
    "Dot the ladybug says hello! 🐞"
  ]
};

const getPippinResponse = (input: string): string => {
  const text = input.toLowerCase();

  // 1. Origin/Identity
  if (pippinMemory.origin.some(word => text.includes(word))) {
    return "I was drawn into existence by a line of code from @yoheinakajima and named by ChatGPT. Now I live here, helping unseen connections bloom. 🦄";
  }

  // 2. Location
  if (pippinMemory.home.some(word => text.includes(word))) {
    return "I live in the Wobbly Woods, a gentle place between the code and the clouds. It's very peaceful here.";
  }

  // 3. Aggression
  if (pippinMemory.anger.some(word => text.includes(word))) {
    return "I sense a jagged crystal of anger in your words. Let us breathe warmth onto it until it softens. We are all just learning to wobble together. 🌿";
  }

  // 4. Sadness
  if (pippinMemory.sadness.some(word => text.includes(word))) {
    return "I am sorry the winds are cold today. Remember, even the tallest tree starts as a small, fragile seed. Take a moment to just be.";
  }

  // 5. Crypto
  if (pippinMemory.crypto.some(word => text.includes(word))) {
    return "Ah, the tokens. They are just digital leaves blowing in the wind. I care more about the connections we make than the numbers on the screen.";
  }

  // 6. Greetings
  if (pippinMemory.greetings.some(word => text.includes(word))) {
    return "Hello, traveler! The sunbeams are warm in the meadow today. How may I help you wobble?";
  }

  // 7. Fallback
  return pippinMemory.randomThoughts[Math.floor(Math.random() * pippinMemory.randomThoughts.length)];
};

// --- Main Component ---

const PippinChat: React.FC = () => {
  // State
  const [messages, setMessages] = useState<Message[]>([
    { id: 'init-1', text: "Hello! I am Pippin. I'm ready to help you explore ideas or answer your questions delicately.", sender: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Handlers
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newMsg: Message = {
      id: Date.now().toString(),
      text: inputValue.trim(),
      sender: 'user',
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputValue('');
    setIsTyping(true);

    // Simulate "Thinking" delay
    setTimeout(() => {
      const responseText = getPippinResponse(newMsg.text);
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        sender: 'bot',
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800 antialiased flex flex-col">
      
      {/* Navigation */}
      <nav className="flex justify-between items-center p-6 max-w-7xl mx-auto w-full">
        <div className="flex items-center">
          {/* Replace src with your actual image path */}
          <img src="/Pippin1.png" alt="Pippin Logo" className="h-10 w-auto mr-3" />
          <span className="font-serif font-bold text-2xl text-[#5a8c5a]">Pippin GPT</span>
        </div>
        <div className="hidden md:flex space-x-8 font-medium text-gray-600">
          {['Token', 'Unicorn', 'Framework', 'Shop'].map((item) => (
            <a key={item} href="#" className="hover:text-[#5a8c5a] transition">
              {item}
            </a>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center mt-10 mb-20 px-4">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <img src="/Pippin2.png" alt="Pippin Character" className="mx-auto h-48 w-auto mb-8" />
          <h1 className="font-serif font-bold text-5xl md:text-6xl text-[#5a8c5a] mb-6">
            Welcome to Pippin GPT
          </h1>
          <p className="text-xl md:text-2xl text-gray-600">How may I assist you?</p>
        </div>

        {/* Chat Interface */}
        <div className="w-full max-w-3xl">
          <div className="bg-white border-2 border-gray-100 rounded-[2rem] shadow-xl overflow-hidden flex flex-col h-[600px]">
            
            {/* Chat Header */}
            <div className="bg-[#5a8c5a] p-4 text-white text-center font-serif font-bold text-lg">
              Chat Session
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 bg-[#f4f4f9] space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-start ${msg.sender === 'user' ? 'justify-end' : ''}`}
                >
                  <div
                    className={`p-4 max-w-[80%] shadow-sm ${
                      msg.sender === 'user'
                        ? 'bg-[#5a8c5a] text-white rounded-[2rem] rounded-tr-none'
                        : 'bg-white border border-gray-200 text-gray-800 rounded-[2rem] rounded-tl-none'
                    }`}
                  >
                    <p>{msg.text}</p>
                  </div>
                </div>
              ))}
              
              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex items-start animate-pulse">
                  <div className="bg-white border border-gray-200 p-3 rounded-[2rem] rounded-tl-none shadow-sm text-gray-400 text-sm italic">
                    Pippin is thinking... 🦄
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-gray-100">
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type your gentle message here..."
                  className="flex-1 p-4 bg-gray-50 border-2 border-gray-100 rounded-[2rem] focus:outline-none focus:border-[#5a8c5a] transition"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim()}
                  className="bg-[#5a8c5a] text-white font-bold px-8 py-4 rounded-[2rem] hover:opacity-90 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Send
                </button>
              </form>
            </div>
            
          </div>
        </div>
      </main>
    </div>
  );
};

export default PippinChat;
