'use client'

import { Bell, Search, MoreHorizontal, UserPlus, Hash } from 'lucide-react'
import { useChat } from '@/context/chat-context'

const members = [
    { name: 'Admin User', role: 'Owner', status: 'online', avatar: 'Admin' },
    { name: 'Senior Designer', role: 'online', status: 'online', avatar: 'Senior' },
    { name: 'Guest User', role: 'last seen 2h ago', status: 'offline', avatar: 'Guest' },
]

const media = [
    { id: 1, color: 'bg-orange-200' },
    { id: 2, color: 'bg-stone-300' },
    { id: 3, color: 'bg-teal-200' },
]

export function DetailsPanel() {
    const { activeChat } = useChat()

    if (!activeChat) return null

    return (
        <aside className="w-80 h-full bg-white border-l border-neutral-200 flex flex-col overflow-y-auto">
            {/* Header */}
            <div className="p-8 flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-3xl bg-cyan-100 flex items-center justify-center text-cyan-600 mb-4 shadow-sm">
                    <Hash size={40} />
                </div>
                <h3 className="font-bold text-lg text-neutral-900 mb-1">{activeChat.name}</h3>
                <p className="text-xs text-neutral-500 max-w-[200px] leading-relaxed">
                    {activeChat.description}
                </p>
            </div>

            {/* Shared Media */}
            <div className="px-8 mb-8">
                <div className="flex items-center justify-between mb-4">
                    <h4 className="text-[11px] font-bold text-neutral-900 tracking-wider uppercase">Shared Media</h4>
                    <button className="text-[11px] font-bold text-cyan-500 hover:text-cyan-600">View All</button>
                </div>
                <div className="grid grid-cols-3 gap-2">
                    {media.map((item) => (
                        <div key={item.id} className={`aspect-square rounded-xl ${item.color} opacity-60 hover:opacity-100 transition-opacity cursor-pointer`} />
                    ))}
                </div>
            </div>

            {/* Members List */}
            {activeChat.type === 'channel' && (
                <div className="px-8 flex-1">
                    <div className="flex items-center justify-between mb-4">
                        <h4 className="text-[11px] font-bold text-neutral-900 tracking-wider uppercase">Members ({activeChat.members})</h4>
                        <button className="text-neutral-400 hover:text-neutral-600">
                            <UserPlus size={16} />
                        </button>
                    </div>
                    <div className="space-y-4">
                        {members.map((member) => (
                            <div key={member.name} className="flex items-center gap-3 group cursor-pointer">
                                <div className="relative">
                                    <div className="w-9 h-9 rounded-xl bg-neutral-100 overflow-hidden">
                                        <img
                                            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${member.avatar}`}
                                            alt={member.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 border-2 border-white rounded-full ${member.status === 'online' ? 'bg-green-500' : 'bg-neutral-300'
                                        }`} />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-xs font-bold text-neutral-900 truncate group-hover:text-indigo-600 transition-colors">{member.name}</p>
                                    <p className="text-[10px] text-neutral-400 font-medium capitalize">{member.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </aside>
    )
}
