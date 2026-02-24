'use client'

import {
    ChevronLeft,
    ChevronRight,
    Eye,
    Mail,
    Bell,
    ShieldCheck,
    Palette,
    Moon,
    HelpCircle,
    FileText,
    Shield,
    Info
} from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

type SettingItem = {
    icon: React.ReactNode
    label: string
    href?: string
    type?: 'toggle'
    value?: boolean
    onChange?: () => void
}

export default function SettingsPage() {
    const [nightMode, setNightMode] = useState(false)

    const settingsGroups: { items: SettingItem[] }[] = [
        {
            items: [
                { icon: <Eye size={18} className="text-red-400" />, label: 'Change Password', href: '/chat-settings/change-password' },
                { icon: <Mail size={18} className="text-blue-400" />, label: 'Change Email', href: '/chat-settings/change-email' },
            ]
        },
        {
            items: [
                {
                    icon: <Bell size={18} className="text-red-400" />,
                    label: 'Notifications',
                    href: '/chat-settings/notifications'
                },
                { icon: <ShieldCheck size={18} className="text-neutral-500" />, label: 'Privacy & Security', href: '#' },
            ]
        },
        {
            items: [
                { icon: <HelpCircle size={18} className="text-yellow-600" />, label: 'Ask a Question', href: '/chat-settings/contact' },
                { icon: <FileText size={18} className="text-emerald-400" />, label: 'Terms & Condition', href: '/terms' },
                { icon: <Shield size={18} className="text-emerald-400" />, label: 'Privacy Policy', href: '/privacy' },
                { icon: <Info size={18} className="text-yellow-600" />, label: 'About Us', href: '/chat-settings/about' },
            ]
        }
    ]

    return (
        <div className="flex-1 h-full bg-[#F8FAFC] flex flex-col overflow-hidden">
            {/* Header */}
            <header className="px-6 py-4 bg-white border-b border-neutral-100 flex items-center justify-between">
                <Link href="/chat" className="flex items-center gap-1 text-cyan-500 hover:text-cyan-600 transition-colors font-medium">
                    <ChevronLeft size={20} />
                    <span>Chats</span>
                </Link>
                <h1 className="text-base font-semibold text-neutral-900 absolute left-1/2 -translate-x-1/2">Settings</h1>
                <Link href="/chat" className="text-cyan-500 hover:text-cyan-600 transition-colors font-medium">
                    Done
                </Link>
            </header>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {settingsGroups.map((group, groupIdx) => (
                    <div key={groupIdx} className="bg-white rounded-2xl border border-neutral-100 overflow-hidden">
                        {group.items.map((item, itemIdx) => (
                            <div key={itemIdx}>
                                {item.type === 'toggle' ? (
                                    <div className="flex items-center justify-between p-4 bg-white">
                                        <div className="flex items-center gap-4">
                                            <div className="w-8 h-8 rounded-lg bg-neutral-50 flex items-center justify-center">
                                                {item.icon}
                                            </div>
                                            <span className="text-sm font-medium text-neutral-700">{item.label}</span>
                                        </div>
                                        <button
                                            onClick={item.onChange}
                                            className={`w-12 h-6 rounded-full transition-colors relative ${item.value ? 'bg-blue-500' : 'bg-neutral-200'}`}
                                        >
                                            <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${item.value ? 'left-7' : 'left-1'}`}>
                                                {item.value && (
                                                    <div className="flex items-center justify-center w-full h-full">
                                                        <div className="w-1.5 h-1 bg-blue-500 rotate-45 translate-x-[-0.5px] translate-y-[1px] rounded-full" />
                                                        <div className="w-2.5 h-1 bg-blue-500 -rotate-45 translate-x-[-1.5px] rounded-full" />
                                                    </div>
                                                )}
                                            </div>
                                        </button>
                                    </div>
                                ) : (
                                    <Link href={item.href as string} className="flex items-center justify-between p-4 hover:bg-neutral-50 transition-colors group">
                                        <div className="flex items-center gap-4">
                                            <div className="w-8 h-8 rounded-lg bg-neutral-50 flex items-center justify-center">
                                                {item.icon}
                                            </div>
                                            <span className="text-sm font-medium text-neutral-700">{item.label}</span>
                                        </div>
                                        <ChevronRight size={18} className="text-neutral-300 group-hover:text-neutral-400 transition-colors" />
                                    </Link>
                                )}
                                {itemIdx < group.items.length - 1 && (
                                    <div className="mx-4 h-[1px] bg-neutral-50" />
                                )}
                            </div>
                        ))}
                    </div>
                ))}

                {/* Footer Actions */}
                <div className="py-8 space-y-4">
                    <button className="w-full py-3 text-red-500 font-medium hover:bg-red-50 rounded-xl transition-colors text-center">
                        Delete Account
                    </button>
                </div>
            </div>
        </div>
    )
}
