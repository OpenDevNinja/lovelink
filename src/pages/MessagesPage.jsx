import { useState, useRef, useEffect } from 'react';
import { Search, Send, Smile, Paperclip, Phone, Video, MoreVertical, ArrowLeft, Image, Mic, Check, CheckCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { profiles, chatConversations, currentUser } from '../data';

export default function MessagesPage() {
  const { t, lang } = useLanguage();
  const [activeChat, setActiveChat] = useState(null);
  const [message, setMessage] = useState('');
  const [conversations, setConversations] = useState(chatConversations);
  const [searchTerm, setSearchTerm] = useState('');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  useEffect(() => scrollToBottom(), [activeChat, conversations]);

  const getParticipant = (participantId) => profiles.find((p) => p.id === participantId);

  const activeChatData = conversations.find((c) => c.id === activeChat);
  const activeParticipant = activeChatData ? getParticipant(activeChatData.participantId) : null;

  const filteredConversations = conversations.filter((conv) => {
    const p = getParticipant(conv.participantId);
    return p?.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleSend = () => {
    if (!message.trim() || !activeChat) return;
    const newMsg = {
      id: Date.now(),
      senderId: currentUser.id,
      text: { en: message, fr: message },
      timestamp: new Date().toISOString(),
      status: 'sent',
    };
    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === activeChat
          ? { ...conv, messages: [...conv.messages, newMsg], lastMessage: { en: message, fr: message }, unread: 0 }
          : conv
      )
    );
    setMessage('');
    inputRef.current?.focus();
  };

  const formatTime = (ts) => {
    const d = new Date(ts);
    return d.toLocaleTimeString(lang === 'fr' ? 'fr-FR' : 'en-US', { hour: '2-digit', minute: '2-digit' });
  };

  const getStatusIcon = (status) => {
    if (status === 'seen') return <CheckCheck className="w-3.5 h-3.5 text-primary-500" />;
    if (status === 'delivered') return <CheckCheck className="w-3.5 h-3.5 text-slate-400" />;
    return <Check className="w-3.5 h-3.5 text-slate-400" />;
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex bg-white dark:bg-surface-dark">
      {/* Sidebar — Conversations list */}
      <div className={`w-full md:w-96 border-r border-slate-200 dark:border-slate-700 flex flex-col ${activeChat !== null ? 'hidden md:flex' : 'flex'}`}>
        {/* Search header */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-700">
          <h2 className="font-display text-xl font-bold mb-3">{t('messages')}</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t('search')}
              className="input-field pl-10 !py-2.5 text-sm"
            />
          </div>
        </div>

        {/* Conversations */}
        <div className="flex-1 overflow-y-auto">
          {filteredConversations.map((conv) => {
            const participant = getParticipant(conv.participantId);
            if (!participant) return null;
            return (
              <button
                key={conv.id}
                onClick={() => setActiveChat(conv.id)}
                className={`w-full flex items-center gap-3 px-4 py-3.5 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors text-left ${
                  activeChat === conv.id ? 'bg-primary-50 dark:bg-primary-900/20 border-r-2 border-primary-500' : ''
                }`}
              >
                <div className="relative flex-shrink-0">
                  <img src={participant.avatar} alt="" className="w-12 h-12 rounded-xl object-cover" />
                  {participant.status === 'online' && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white dark:border-surface-dark" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-sm truncate">{participant.name}</h3>
                    <span className="text-xs text-slate-400 flex-shrink-0">{formatTime(conv.messages[conv.messages.length - 1].timestamp)}</span>
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 truncate mt-0.5">
                    {conv.lastMessage[lang]}
                  </p>
                </div>
                {conv.unread > 0 && (
                  <span className="w-5 h-5 rounded-full bg-primary-500 text-white text-xs flex items-center justify-center flex-shrink-0 font-medium">
                    {conv.unread}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Chat area */}
      {activeChat !== null && activeParticipant ? (
        <div className="flex-1 flex flex-col">
          {/* Chat header */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-surface-dark-card">
            <button onClick={() => setActiveChat(null)} className="md:hidden p-1">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="relative">
              <img src={activeParticipant.avatar} alt="" className="w-10 h-10 rounded-xl object-cover" />
              {activeParticipant.status === 'online' && (
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white dark:border-surface-dark-card" />
              )}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-sm">{activeParticipant.name}</h3>
              <p className="text-xs text-emerald-500">{activeParticipant.status === 'online' ? t('online') : t('offline')}</p>
            </div>
            <div className="flex items-center gap-1">
              <button className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                <Phone className="w-4.5 h-4.5 text-slate-500" />
              </button>
              <button className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                <Video className="w-4.5 h-4.5 text-slate-500" />
              </button>
              <button className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                <MoreVertical className="w-4.5 h-4.5 text-slate-500" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/50 dark:bg-surface-dark">
            {activeChatData?.messages.map((msg) => {
              const isMe = msg.senderId === currentUser.id;
              return (
                <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[75%] ${isMe ? 'order-2' : ''}`}>
                    <div
                      className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                        isMe
                          ? 'bg-primary-500 text-white rounded-br-md'
                          : 'bg-white dark:bg-surface-dark-card text-slate-800 dark:text-slate-200 rounded-bl-md shadow-sm border border-slate-100 dark:border-slate-700'
                      }`}
                    >
                      {msg.text[lang]}
                    </div>
                    <div className={`flex items-center gap-1 mt-1 ${isMe ? 'justify-end' : ''}`}>
                      <span className="text-[10px] text-slate-400">{formatTime(msg.timestamp)}</span>
                      {isMe && getStatusIcon(msg.status)}
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-surface-dark-card">
            <div className="flex items-center gap-2">
              <button className="w-9 h-9 flex-shrink-0 flex items-center justify-center rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                <Paperclip className="w-4.5 h-4.5 text-slate-400" />
              </button>
              <button className="w-9 h-9 flex-shrink-0 flex items-center justify-center rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                <Image className="w-4.5 h-4.5 text-slate-400" />
              </button>
              <div className="flex-1 relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder={t('typeMessage')}
                  className="input-field !py-2.5 pr-10 text-sm"
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2">
                  <Smile className="w-4.5 h-4.5 text-slate-400 hover:text-slate-600 transition-colors" />
                </button>
              </div>
              {message.trim() ? (
                <button onClick={handleSend} className="w-10 h-10 flex-shrink-0 rounded-xl bg-primary-500 flex items-center justify-center hover:bg-primary-600 transition-colors shadow-md shadow-primary-500/20">
                  <Send className="w-4.5 h-4.5 text-white" />
                </button>
              ) : (
                <button className="w-10 h-10 flex-shrink-0 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                  <Mic className="w-4.5 h-4.5 text-slate-500" />
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* Empty state */
        <div className="hidden md:flex flex-1 items-center justify-center bg-slate-50/50 dark:bg-surface-dark">
          <div className="text-center">
            <div className="w-20 h-20 rounded-3xl bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center mx-auto mb-4">
              <Send className="w-8 h-8 text-primary-400" />
            </div>
            <h3 className="font-display text-xl font-semibold mb-2">{t('messages')}</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm max-w-xs">
              {lang === 'en' ? 'Select a conversation to start chatting' : 'Sélectionnez une conversation pour commencer'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
