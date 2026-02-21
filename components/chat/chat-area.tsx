'use client'

import { Search, Phone, MoreHorizontal, Paperclip, Smile, Send, Lock, ChevronRight, Pin, Reply, Copy, Trash2, X, Info } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { useChat } from '@/context/chat-context'
import { JoinFlow } from './join-flow'

const initialMessages = [
    { id: 1, sender: 'Alice', time: '09:41 AM', text: 'Hey team! Just wanted to share the latest mockups for the dashboard. Let me know what you think about the color palette.', isMine: false, avatar: 'Alice' },
    { id: 2, sender: 'System', text: 'Encrypted Announcement: This message is pinned and end-to-end encrypted. Only verified members of the channel can view its contents.', type: 'encrypted' },
    { id: 3, sender: 'You', time: '10:42 AM', text: 'Looks great! I really like how the Indigo pops against the light background.', isMine: true, avatar: 'Jane' },
    { id: 4, sender: 'You', time: '10:43 AM', text: 'When are we planning to ship the V1 variant?', isMine: true, avatar: 'Jane', status: 'read' },
]

export function ChatArea() {
    const { activeChat, chats } = useChat()
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState(initialMessages)
    const [contextMenu, setContextMenu] = useState<{ x: number, y: number, msgId: number } | null>(null)
    const [showPins, setShowPins] = useState(false)
    const [showDetails, setShowDetails] = useState(false)

    if (!activeChat) return null

    const isJoined = activeChat.joinStatus === 'joined'

    const handleContextMenu = (e: React.MouseEvent, msgId: number) => {
        e.preventDefault()
        setContextMenu({ x: e.clientX, y: e.clientY, msgId })
    }

    const closeContextMenu = () => setContextMenu(null)

    return (
        <div className="flex-1 h-full flex overflow-hidden">
            <main className="flex-1 h-full flex flex-col bg-[#F9FAFB] relative overflow-hidden" onClick={closeContextMenu}>
                {/* Header */}
                <header className="h-16 border-b border-neutral-200 bg-white px-6 flex items-center justify-between shrink-0 z-20">
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                            <h2 className="font-bold text-neutral-900 truncate">{activeChat.name}</h2>
                            {activeChat.type === 'channel' && (
                                <span className="text-[10px] text-neutral-400 bg-neutral-100 px-1.5 py-0.5 rounded-full font-medium shrink-0">
                                    {activeChat.members} members • {activeChat.online || 0} online
                                </span>
                            )}
                            {!activeChat.isPublic && activeChat.type === 'channel' && (
                                <Lock size={14} className="text-neutral-400 shrink-0" />
                            )}
                        </div>
                    </div>
                    <div className="flex items-center gap-4 text-neutral-400 ml-4">
                        <button className="hover:text-neutral-600 transition-colors"><Phone size={20} /></button>
                        <button
                            onClick={() => setShowDetails(!showDetails)}
                            className={`hover:text-neutral-600 transition-colors ${showDetails ? 'text-indigo-600' : ''}`}
                        >
                            <MoreHorizontal size={20} />
                        </button>
                    </div>
                </header>

                {!isJoined ? (
                    <JoinFlow chat={activeChat} />
                ) : (
                    <>
                        {/* Pinned Messages Banner */}
                        <div className="mx-6 mt-4 z-10">
                            <div className="bg-white border border-neutral-100 rounded-2xl p-3 pl-4 flex items-center justify-between shadow-sm">
                                <div className="flex items-center gap-3 overflow-hidden">
                                    <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0">
                                        <Pin size={16} fill="currentColor" />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-xs font-bold text-neutral-900 truncate">
                                            <span className="text-indigo-600">Reminder:</span> The quarterly roadmap meeting has...
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 shrink-0">
                                    <span className="text-[9px] font-bold text-cyan-500 bg-cyan-50 px-2 py-0.5 rounded-full">3 PINS</span>
                                    <div className="w-px h-4 bg-neutral-100" />
                                    <button
                                        onClick={() => setShowPins(true)}
                                        className="text-[10px] font-bold text-indigo-600 hover:text-indigo-700 uppercase tracking-wider"
                                    >
                                        View All
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-6 pt-2 space-y-6">
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
                                                            This message is pinned and end-to-end encrypted. Only verified members of the {activeChat.name} channel can view its contents.
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
                                        <div className={`max-w-[70%] space-y-1 ${msg.isMine ? 'items-end' : ''} group/msg relative`}>
                                            <div className={`flex items-center gap-2 mb-1 ${msg.isMine ? 'flex-row-reverse' : ''}`}>
                                                <span className="text-[11px] font-bold text-neutral-900">{msg.sender}</span>
                                                <span className="text-[10px] text-neutral-400">{msg.time}</span>
                                            </div>
                                            <div className={`flex items-center gap-2 ${msg.isMine ? 'flex-row-reverse' : ''}`}>
                                                <div
                                                    onContextMenu={(e) => handleContextMenu(e, msg.id)}
                                                    className={`p-4 rounded-2xl text-sm leading-relaxed cursor-pointer transition-all ${msg.isMine
                                                        ? 'bg-indigo-600 text-white rounded-br-none hover:bg-indigo-700'
                                                        : 'bg-white border border-neutral-100 text-neutral-800 rounded-bl-none shadow-sm hover:border-neutral-200'
                                                        }`}
                                                >
                                                    {msg.text}
                                                </div>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
                                                        setContextMenu({ x: rect.right, y: rect.bottom, msgId: msg.id })
                                                    }}
                                                    className={`p-1.5 rounded-lg text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 transition-all opacity-0 group-hover/msg:opacity-100 shrink-0 ${msg.isMine ? 'mr-1' : 'ml-1'}`}
                                                >
                                                    <MoreHorizontal size={14} />
                                                </button>
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
                        <div className="p-6 bg-white border-t border-neutral-200 z-20">
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
                                    <button className="bg-indigo-600 text-white p-2.5 rounded-xl hover:bg-indigo-700 transition-all shadow-md shadow-indigo-100 active:scale-95">
                                        <Send size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {/* Context Menu Modal/Overlay */}
                {contextMenu && (
                    <div
                        className="fixed inset-0 z-[100]"
                        onClick={closeContextMenu}
                    >
                        <div
                            style={{ left: contextMenu.x, top: contextMenu.y }}
                            className="absolute w-56 bg-white rounded-2xl shadow-2xl border border-neutral-100 overflow-hidden py-1.5 animate-in fade-in zoom-in duration-150"
                        >
                            <button className="w-full px-4 py-2.5 text-left text-sm font-semibold text-neutral-600 hover:bg-neutral-50 flex items-center gap-3 transition-colors">
                                <Reply size={16} /> Reply in Thread
                            </button>
                            <button className="w-full px-4 py-2.5 text-left text-sm font-semibold text-neutral-600 hover:bg-neutral-50 flex items-center gap-3 transition-colors">
                                <Copy size={16} /> Copy Text
                            </button>
                            <button className="w-full px-4 py-2.5 text-left text-sm font-semibold text-indigo-600 hover:bg-indigo-50/50 flex items-center gap-3 transition-colors bg-indigo-50/30">
                                <Pin size={16} fill="currentColor" /> Pin Message
                            </button>
                            <div className="h-px bg-neutral-100 my-1" />
                            <button className="w-full px-4 py-2.5 text-left text-sm font-semibold text-red-500 hover:bg-red-50 flex items-center gap-3 transition-colors">
                                <Trash2 size={16} /> Delete Message
                            </button>
                        </div>
                    </div>
                )}

                {/* Pinned Messages Modal */}
                {showPins && (
                    <div className="fixed inset-0 bg-black/20 backdrop-blur-[2px] z-[200] flex items-center justify-center p-6" onClick={() => setShowPins(false)}>
                        <div className="bg-white rounded-[32px] w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in slide-in-from-bottom-4" onClick={e => e.stopPropagation()}>
                            <div className="p-8 pb-4 flex items-center justify-between border-b border-neutral-50">
                                <h2 className="text-xl font-bold text-neutral-900">Pinned Messages</h2>
                                <button onClick={() => setShowPins(false)} className="text-neutral-400 hover:text-neutral-600 transition-colors">
                                    <X size={20} />
                                </button>
                            </div>
                            <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
                                {[
                                    { user: 'Marcus Chen', time: 'Yesterday, 4:20 PM', text: 'Reminder: The quarterly roadmap meeting has been moved to Friday at 3 PM EST due to conflicts. Please update your calendar...', avatar: 'Marcus' },
                                    { user: 'Sarah Connor', time: 'Oct 24, 10:00 AM', text: 'Here is the link to the new design system documentation: figma.com/file/ds-v2. Make sure to review the typography sectio...', avatar: 'Sarah' },
                                    { user: 'Elena Fisher', time: 'Oct 22, 2:15 PM', file: 'Q4_Goals_Final.pdf', size: '1.2 MB', avatar: 'Elena' },
                                    { user: 'You', time: 'Oct 20, 9:30 AM', text: 'Please make sure all PRs are submitted by EOD Thursday so we can do a proper code freeze on Friday.', avatar: 'Jane' }
                                ].map((pin, i) => (
                                    <div key={i} className="bg-white border border-neutral-100 rounded-3xl p-6 relative group hover:border-indigo-100 transition-all cursor-pointer">
                                        <div className="flex items-start gap-4">
                                            <div className="w-10 h-10 rounded-full overflow-hidden bg-neutral-200">
                                                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${pin.avatar}`} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="text-sm font-bold text-neutral-900">{pin.user}</span>
                                                    <span className="text-[10px] text-neutral-400 font-medium">{pin.time}</span>
                                                </div>
                                                {pin.text && <p className="text-xs text-neutral-600 leading-relaxed font-medium line-clamp-3">{pin.text}</p>}
                                                {pin.file && (
                                                    <div className="mt-3 flex items-center gap-3 bg-neutral-50 p-3 rounded-2xl border border-neutral-100">
                                                        <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-indigo-600 shadow-sm border border-neutral-100">
                                                            <Paperclip size={18} />
                                                        </div>
                                                        <div className="min-w-0">
                                                            <p className="text-[11px] font-bold text-neutral-900 truncate">{pin.file}</p>
                                                            <p className="text-[9px] text-neutral-400 font-bold uppercase tracking-wider">{pin.size}</p>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="text-indigo-600 shrink-0">
                                                <Pin size={16} fill="currentColor" />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </main>

            {/* Right Sidebar - Thread/Details */}
            {showDetails && (
                <aside className="w-80 h-full bg-white border-l border-neutral-200 flex flex-col shrink-0 animate-in slide-in-from-right duration-300">
                    <header className="h-16 border-b border-neutral-200 px-6 flex items-center justify-between shrink-0">
                        <h3 className="font-bold text-neutral-900 text-sm italic">Channel Info</h3>
                        <button onClick={() => setShowDetails(false)} className="text-neutral-400 hover:text-neutral-600">
                            <X size={18} />
                        </button>
                    </header>
                    <div className="flex-1 overflow-y-auto">
                        <div className="p-8 flex flex-col items-center border-b border-neutral-50">
                            <div className="w-20 h-20 rounded-[28px] bg-neutral-100 overflow-hidden mb-6 shadow-sm ring-1 ring-black/5">
                                <img
                                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${activeChat.name}`}
                                    alt={activeChat.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <h2 className="text-lg font-bold text-neutral-900 mb-1">{activeChat.name}</h2>
                            <p className="text-[11px] text-neutral-400 font-medium text-center px-4 leading-relaxed">
                                {activeChat.description || 'Design system discussions and handoffs.'}
                            </p>
                        </div>

                        <div className="p-6 border-b border-neutral-50">
                            <div className="flex items-center justify-between mb-4">
                                <h4 className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Shared Media</h4>
                                <button className="text-[10px] font-bold text-cyan-500 hover:underline">View All</button>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="aspect-square rounded-xl bg-neutral-100 overflow-hidden ring-1 ring-black/5">
                                        <img src={`https://picsum.photos/seed/${activeChat.id}${i}/200`} className="w-full h-full object-cover opacity-80" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {activeChat.type === 'channel' && (
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h4 className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Members ({activeChat.members})</h4>
                                    <button className="text-neutral-400 hover:text-neutral-600 transition-colors">
                                        <Search size={14} />
                                    </button>
                                </div>
                                <div className="space-y-4">
                                    {[
                                        { name: 'Admin User', role: 'Owner', avatar: 'Admin', online: true },
                                        { name: 'Senior Designer', role: 'Member', avatar: 'Senior', online: true },
                                        { name: 'Guest User', role: 'Member', avatar: 'Guest', status: 'last seen 2h ago' }
                                    ].map((member, i) => (
                                        <div key={i} className="flex items-center gap-3">
                                            <div className="relative">
                                                <div className="w-9 h-9 rounded-full bg-neutral-200 overflow-hidden">
                                                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${member.avatar}`} className="w-full h-full object-cover" />
                                                </div>
                                                {member.online && <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full" />}
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-[11px] font-bold text-neutral-900 truncate flex items-center gap-2">
                                                    {member.name}
                                                    {member.role === 'Owner' && <span className="text-[8px] font-bold text-cyan-500 tracking-tighter uppercase">Owner</span>}
                                                </p>
                                                <p className="text-[9px] text-neutral-400 font-medium">
                                                    {member.online ? 'Online' : member.status}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </aside>
            )}
        </div>
    )
}
