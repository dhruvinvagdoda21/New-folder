'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Send, Bot, User, Sparkles, PawPrint, Heart, Stethoscope, Utensils, Dumbbell, Scissors } from 'lucide-react';

const quickTopics = [
  { label: 'Nutrition & Diet', icon: Utensils, emoji: '🍖' },
  { label: 'Exercise Tips', icon: Dumbbell, emoji: '🏃' },
  { label: 'Grooming Guide', icon: Scissors, emoji: '✨' },
  { label: 'Health & Wellness', icon: Stethoscope, emoji: '🏥' },
  { label: 'Training Advice', icon: PawPrint, emoji: '🎓' },
  { label: 'Anxiety Help', icon: Heart, emoji: '💙' },
];

export default function AIAssistantPage() {
  const [messages, setMessages] = useState([
    { role: 'bot', text: "Hello! 🐾 I'm PetConnect's AI assistant. I can help with questions about pet nutrition, exercise, grooming, health, training, and behavior. What would you like to know?", time: new Date() },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const getBotResponse = (msg) => {
    const lower = msg.toLowerCase();
    if (lower.includes('food') || lower.includes('diet') || lower.includes('feed') || lower.includes('nutrition')) {
      return "🍖 **Nutrition Tips:**\n\n• Ensure your pet gets high-quality protein (25-30% for dogs, 30-40% for cats)\n• Include healthy fats and essential vitamins\n• Always provide fresh, clean water\n• **Avoid:** chocolate, grapes, onions, garlic, and xylitol\n• Consider age-appropriate food formulas\n• Consult your vet for breed-specific dietary needs!\n\nWould you like specific recommendations for your pet's breed?";
    } else if (lower.includes('exercise') || lower.includes('walk') || lower.includes('play')) {
      return "🏃 **Exercise Guidelines:**\n\n• **Dogs:** 30-60 min daily (varies by breed)\n• **Puppies:** Short, frequent play sessions\n• **Cats:** 15-20 min interactive play daily\n• **Senior pets:** Gentle, low-impact activities\n\nRegular exercise prevents obesity, reduces anxiety, and strengthens your bond. Try puzzle toys for mental stimulation too!\n\nNeed breed-specific exercise recommendations?";
    } else if (lower.includes('groom') || lower.includes('bath') || lower.includes('brush')) {
      return "✨ **Grooming Guide:**\n\n• **Brushing:** 2-3x/week (daily for long-haired breeds)\n• **Bathing:** Every 4-6 weeks for dogs\n• **Nail trimming:** Every 2-3 weeks\n• **Ear cleaning:** Weekly check, clean as needed\n• **Dental care:** Brush teeth 2-3x/week\n\nCats are self-groomers but benefit from weekly brushing to prevent hairballs!\n\nWant grooming tips for a specific breed?";
    } else if (lower.includes('vet') || lower.includes('sick') || lower.includes('health')) {
      return "🏥 **Health Essentials:**\n\n• **Checkups:** Annually for adults, bi-annually for seniors\n• **Vaccinations:** Keep up to date\n• **Warning signs:** Lethargy, appetite loss, excessive thirst, behavioral changes\n• **Preventive care:** Flea/tick prevention, heartworm medication\n\n⚠️ If your pet shows sudden symptoms, contact your vet immediately!\n\nWant to know about specific health concerns?";
    } else if (lower.includes('train') || lower.includes('behavior') || lower.includes('obedien')) {
      return "🎓 **Training Tips:**\n\n• Use **positive reinforcement** (treats, praise)\n• Start with basics: sit, stay, come, down\n• Keep sessions **short** (5-10 minutes)\n• Be **consistent** with commands\n• Never punish — redirect unwanted behavior\n• Socialize early and often\n\nPatience and consistency are the keys to success!\n\nNeed help with a specific behavior problem?";
    } else if (lower.includes('anxiet') || lower.includes('stress') || lower.includes('scared') || lower.includes('nervous')) {
      return "💙 **Managing Pet Anxiety:**\n\n• Create a **safe space** (crate, quiet room)\n• Maintain consistent **routines**\n• Try **calming aids** (pheromone diffusers, calming treats)\n• **Separation anxiety:** Practice gradual departures\n• **Thunder shirts** for noise phobia\n• Background music or white noise can help\n\nSevere anxiety may benefit from veterinary consultation.\n\nWant tips for a specific type of anxiety?";
    } else if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey')) {
      return "Hey there! 👋🐾 Great to see you! I'm here to help with all your pet care questions. You can ask me about:\n\n• 🍖 Nutrition & Diet\n• 🏃 Exercise Tips\n• ✨ Grooming\n• 🏥 Health & Wellness\n• 🎓 Training\n• 💙 Anxiety & Behavior\n\nWhat's on your mind?";
    } else {
      return "🐾 Great question! While I'm best at answering about pet nutrition, exercise, grooming, health, training, and behavior, I'm always learning!\n\nTry asking me about:\n• What should I feed my [pet type]?\n• How much exercise does my dog need?\n• Tips for grooming a long-haired cat\n• When should I take my pet to the vet?\n\nI'm here to help! 😊";
    }
  };

  const handleSend = (text) => {
    const msgText = text || input;
    if (!msgText.trim()) return;

    const userMsg = { role: 'user', text: msgText, time: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    setTimeout(() => {
      const botResponse = { role: 'bot', text: getBotResponse(msgText), time: new Date() };
      setMessages(prev => [...prev, botResponse]);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="pt-20 lg:pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 text-sm font-semibold mb-4">
              <Sparkles className="w-4 h-4" /> AI-Powered
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold font-[Outfit] text-slate-900 mb-2">Pet Care AI Assistant</h1>
            <p className="text-slate-500">Get instant answers to all your pet care questions</p>
          </div>

          {/* Quick Topics */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
            {quickTopics.map((topic, i) => (
              <motion.button key={i} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                onClick={() => handleSend(topic.label)}
                className="card !p-4 flex items-center gap-3 cursor-pointer hover:!border-indigo-300">
                <span className="text-2xl">{topic.emoji}</span>
                <span className="text-sm font-semibold text-slate-700">{topic.label}</span>
              </motion.button>
            ))}
          </div>

          {/* Chat Area */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex items-center gap-3 bg-gradient-to-r from-indigo-50 to-purple-50">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-sm font-[Outfit]">PetConnect AI</h3>
                <p className="text-xs text-emerald-600 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Online
                </p>
              </div>
            </div>

            <div className="h-[450px] overflow-y-auto p-5 space-y-4">
              <AnimatePresence>
                {messages.map((msg, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`flex items-start gap-2 max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-indigo-100' : 'bg-gradient-to-br from-indigo-500 to-purple-600'}`}>
                        {msg.role === 'user' ? <User className="w-4 h-4 text-indigo-600" /> : <Bot className="w-4 h-4 text-white" />}
                      </div>
                      <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
                        msg.role === 'user'
                          ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-tr-md'
                          : 'bg-slate-100 text-slate-700 rounded-tl-md'
                      }`}>
                        {msg.text}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              {loading && (
                <div className="flex items-start gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-slate-100 rounded-2xl rounded-tl-md px-4 py-3">
                    <div className="flex gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-slate-100">
              <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex items-center gap-3">
                <input type="text" value={input} onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about pet care..." className="flex-1 py-3 px-4 bg-slate-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500/20" />
                <button type="submit" disabled={loading || !input.trim()}
                  className="w-11 h-11 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white hover:shadow-lg transition-all disabled:opacity-50">
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
