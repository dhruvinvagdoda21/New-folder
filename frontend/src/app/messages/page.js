'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import { Send, Search, Phone, Video, MoreVertical, Smile, Paperclip, Check, CheckCheck, ArrowLeft } from 'lucide-react';

const conversations = [
  { id: 1, name: 'Alex Thompson', lastMsg: 'Sure, I can walk Buddy tomorrow at 10am!', time: '2m ago', unread: 2, avatar: 'A', online: true },
  { id: 2, name: 'Maria Garcia', lastMsg: 'Whiskers was so well behaved today 😊', time: '1h ago', unread: 0, avatar: 'M', online: true },
  { id: 3, name: 'David Chen', lastMsg: 'I have availability this weekend', time: '3h ago', unread: 1, avatar: 'D', online: false },
  { id: 4, name: 'Lisa Park', lastMsg: 'The grooming session went great!', time: '1d ago', unread: 0, avatar: 'L', online: false },
];

const chatMessages = [
  { id: 1, sender: 'them', text: 'Hi! I saw your profile and would love to book a walking session for my dog Buddy.', time: '10:30 AM', read: true },
  { id: 2, sender: 'me', text: 'Hello! Of course, I\'d be happy to help with Buddy. What breed is he and how old?', time: '10:32 AM', read: true },
  { id: 3, sender: 'them', text: 'He\'s a 3 year old Golden Retriever, super friendly! He needs about 30-45 min walks.', time: '10:35 AM', read: true },
  { id: 4, sender: 'me', text: 'Perfect! Golden Retrievers are one of my favorites. I have availability tomorrow morning at 10am. Does that work?', time: '10:37 AM', read: true },
  { id: 5, sender: 'them', text: 'That would be perfect! What\'s your rate for a 45 min walk?', time: '10:40 AM', read: true },
  { id: 6, sender: 'me', text: 'It\'s $25 for a 45-minute walk. I also send photo updates during the walk so you can see how Buddy is doing! 📸', time: '10:42 AM', read: true },
  { id: 7, sender: 'them', text: 'That sounds great! Let me book it right away.', time: '10:44 AM', read: true },
  { id: 8, sender: 'me', text: 'Sure, I can walk Buddy tomorrow at 10am!', time: '10:45 AM', read: false },
];

export default function MessagesPage() {
  const [activeChat, setActiveChat] = useState(conversations[0]);
  const [message, setMessage] = useState('');
  const [showMobile, setShowMobile] = useState(false);

  const handleSend = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    setMessage('');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="pt-16 lg:pt-20 h-screen flex flex-col">
        <div className="flex-1 max-w-7xl w-full mx-auto flex overflow-hidden">
          {/* Conversations List */}
          <div className={`w-full md:w-[360px] bg-white border-r border-slate-200 flex flex-col ${showMobile ? 'hidden md:flex' : 'flex'}`}>
            <div className="p-4 border-b border-slate-100">
              <h2 className="text-xl font-bold font-[Outfit] text-slate-800 mb-3">Messages</h2>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input type="text" placeholder="Search conversations..." className="w-full pl-9 pr-4 py-2.5 bg-slate-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500/20" />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              {conversations.map((conv) => (
                <button key={conv.id} onClick={() => { setActiveChat(conv); setShowMobile(true); }}
                  className={`w-full p-4 flex items-center gap-3 hover:bg-slate-50 transition-colors border-b border-slate-100 ${activeChat?.id === conv.id ? 'bg-indigo-50' : ''}`}>
                  <div className="relative flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold">{conv.avatar}</div>
                    {conv.online && <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white"></div>}
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-slate-800 text-sm truncate">{conv.name}</h3>
                      <span className="text-[11px] text-slate-400 flex-shrink-0">{conv.time}</span>
                    </div>
                    <p className="text-xs text-slate-500 truncate mt-0.5">{conv.lastMsg}</p>
                  </div>
                  {conv.unread > 0 && (
                    <div className="w-5 h-5 rounded-full bg-indigo-600 text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0">{conv.unread}</div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className={`flex-1 flex flex-col bg-white ${!showMobile ? 'hidden md:flex' : 'flex'}`}>
            {/* Chat Header */}
            <div className="px-5 py-3.5 border-b border-slate-200 flex items-center justify-between bg-white">
              <div className="flex items-center gap-3">
                <button onClick={() => setShowMobile(false)} className="md:hidden p-1.5 rounded-lg hover:bg-slate-100">
                  <ArrowLeft className="w-5 h-5 text-slate-600" />
                </button>
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">{activeChat?.avatar}</div>
                  {activeChat?.online && <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white"></div>}
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 text-sm">{activeChat?.name}</h3>
                  <p className="text-xs text-emerald-600">{activeChat?.online ? 'Online' : 'Offline'}</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-500"><Phone className="w-5 h-5" /></button>
                <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-500"><Video className="w-5 h-5" /></button>
                <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-500"><MoreVertical className="w-5 h-5" /></button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-gradient-to-b from-slate-50 to-white">
              {chatMessages.map((msg) => (
                <motion.div key={msg.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    msg.sender === 'me'
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-br-md'
                      : 'bg-white text-slate-700 border border-slate-200 rounded-bl-md shadow-sm'
                  }`}>
                    <p>{msg.text}</p>
                    <div className={`flex items-center gap-1 mt-1 ${msg.sender === 'me' ? 'justify-end' : ''}`}>
                      <span className={`text-[10px] ${msg.sender === 'me' ? 'text-white/60' : 'text-slate-400'}`}>{msg.time}</span>
                      {msg.sender === 'me' && (msg.read ? <CheckCheck className="w-3.5 h-3.5 text-white/60" /> : <Check className="w-3.5 h-3.5 text-white/60" />)}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-slate-200 bg-white">
              <form onSubmit={handleSend} className="flex items-center gap-3">
                <button type="button" className="p-2 rounded-lg hover:bg-slate-100 text-slate-500"><Smile className="w-5 h-5" /></button>
                <button type="button" className="p-2 rounded-lg hover:bg-slate-100 text-slate-500"><Paperclip className="w-5 h-5" /></button>
                <input type="text" value={message} onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type a message..." className="flex-1 py-2.5 px-4 bg-slate-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500/20" />
                <button type="submit" className="w-10 h-10 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white hover:shadow-lg transition-shadow">
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
