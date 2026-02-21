'use client'

import { Search, Phone, MoreHorizontal, Paperclip, Smile, Send, Lock, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import { useChat } from '@/context/chat-context'

const messages = [
    { id: 1, sender: 'Alice', time: '09:41 AM', text: 'Hey team! Just wanted to share the latest mockups for the dashboard. Let me know what you think about the color palette.', isMine: false, avatar: 'Alice' },
    { id: 2, sender: 'System', text: 'Encrypted Announcement: This message is pinned and end-to-end encrypted. Only verified members of the channel can view its contents.', type: 'encrypted' },
    { id: 3, sender: 'You', time: '10:42 AM', text: 'Looks great! I really like how the Indigo pops against the light background.', isMine: true, avatar: 'Jane' },
    { id: 4, sender: 'You', time: '10:43 AM', text: 'When are we planning to ship the V1 variant?', isMine: true, avatar: 'Jane', status: 'read' },
]

export function ChatArea() {
    const { activeChat } = useChat()
    const [message, setMessage] = useState('')

    if (!activeChat) return null

    return (
        <main className="flex-1 h-full flex flex-col bg-[#F9FAFB]">
            {/* Header */}
            <header className="h-16 border-b border-neutral-200 bg-white px-6 flex items-center justify-between">
                <div>
                    <div className="flex items-center gap-2">
                        <h2 className="font-bold text-neutral-900">{activeChat.name}</h2>
                        {activeChat.type === 'channel' && (
                            <span className="text-[10px] text-neutral-400 bg-neutral-100 px-1.5 py-0.5 rounded-full font-medium">
                                {activeChat.members} members • {activeChat.online} online
                            </span>
                        )}
                    </div>
                </div>
                <div className="flex items-center gap-4 text-neutral-400">
                    {/* <button className="hover:text-neutral-600 transition-colors"><Search size={20} /></button> */}
                    <button className="hover:text-neutral-600 transition-colors"><Phone size={20} /></button>
                    <button className="hover:text-neutral-600 transition-colors"><MoreHorizontal size={20} /></button>
                </div>
            </header>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                <div className="flex justify-center">
                    <span className="text-[10px] font-bold text-neutral-400 bg-neutral-100 px-3 py-1 rounded-full uppercase tracking-wider">October 24, 2023</span>
                </div>

                {messages.map((msg) => {
                    if (msg.type === 'encrypted') {
                        return (
                            <div key={msg.id} className="max-w-md mx-auto">
                                <div className="bg-cyan-50 border border-cyan-100 rounded-2xl p-6 relative overflow-hidden group">
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-white border border-cyan-100 flex items-center justify-center text-cyan-600 shrink-0 shadow-sm">
                                            <Lock size={20} />
                                        </div>
                                        <div className="space-y-3">
                                            <p className="text-sm font-semibold text-neutral-900">Encrypted Announcement</p>
                                            <p className="text-xs text-neutral-600 leading-relaxed italic">
                                                This message is pinned and end-to-end encrypted. Only verified members of the Product Design channel can view its contents.
                                            </p>
                                            <button className="text-[10px] font-bold text-cyan-600 uppercase tracking-widest flex items-center gap-1 hover:gap-2 transition-all">
                                                Unlock Content <ChevronRight size={14} />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                        <Lock size={80} />
                                    </div>
                                </div>
                            </div>
                        )
                    }

                    return (
                        <div key={msg.id} className={`flex items-end gap-3 ${msg.isMine ? 'flex-row-reverse' : ''}`}>
                            <div className="w-8 h-8 rounded-full bg-neutral-200 overflow-hidden shrink-0">
                                <img
                                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${msg.avatar}`}
                                    alt={msg.sender}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className={`max-w-[70%] space-y-1 ${msg.isMine ? 'items-end' : ''}`}>
                                <div className={`flex items-center gap-2 mb-1 ${msg.isMine ? 'flex-row-reverse' : ''}`}>
                                    <span className="text-[11px] font-bold text-neutral-900">{msg.sender}</span>
                                    <span className="text-[10px] text-neutral-400">{msg.time}</span>
                                </div>
                                <div className={`p-4 rounded-2xl text-sm leading-relaxed ${msg.isMine
                                    ? 'bg-indigo-600 text-white rounded-br-none'
                                    : 'bg-white border border-neutral-100 text-neutral-800 rounded-bl-none shadow-sm'
                                    }`}>
                                    {msg.text}
                                </div>
                                {msg.status === 'read' && (
                                    <div className="flex items-center gap-1 mt-1 justify-end">
                                        <span className="text-[10px] text-neutral-400 italic">read</span>
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-neutral-300"><path d="M2.5 12.5L7.5 17.5L13.5 11.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M8.5 12.5L13.5 17.5L19.5 11.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                    </div>
                                )}
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* Input */}
            <div className="p-6 bg-white border-t border-neutral-200">
                <div className="flex items-center gap-4 bg-neutral-50 border border-neutral-100 rounded-2xl p-2 pl-4">
                    <button className="text-neutral-400 hover:text-neutral-600 transition-colors">
                        <Paperclip size={20} />
                    </button>
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Write a message..."
                        className="flex-1 bg-transparent border-none focus:outline-none text-sm text-neutral-800 placeholder:text-neutral-400"
                    />
                    <div className="flex items-center gap-2">
                        {/* <button className="text-neutral-400 hover:text-neutral-600 transition-colors p-2">
                            <Smile size={20} />
                        </button> */}
                        <button className="bg-indigo-600 text-white p-2.5 rounded-xl hover:bg-indigo-700 transition-all shadow-md shadow-indigo-100 active:scale-95">
                            <Send size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </main>
    )
}
