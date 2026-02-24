'use client'

import { useState, useMemo, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Search, X, Check, MessageSquare, Lock, Info, ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

type Step = 'select-user' | 'choose-type' | 'secure-chat'

interface User {
    id: string
    name: string
    handle: string
    role: string
    avatar: string
    status: 'online' | 'offline' | 'away'
    team: 'Design' | 'Engineering' | 'Sales' | 'Marketing' | 'Product'
    isSuggested?: boolean
}

const USER_REGISTRY: User[] = [
    {
        id: '1',
        name: 'John Doe',
        handle: 'johndoe',
        role: 'UX Designer',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
        status: 'online',
        team: 'Design',
        isSuggested: true
    },
    {
        id: '10',
        name: 'Sarah Jenkins',
        handle: 'sjenkins',
        role: 'Visual Designer',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop',
        status: 'online',
        team: 'Design'
    },
    {
        id: '3',
        name: 'Michael Chen',
        handle: 'mchen',
        role: 'Frontend Developer',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
        status: 'offline',
        team: 'Engineering',
        isSuggested: true
    },
    {
        id: '13',
        name: 'Sarah Connor',
        handle: 'sconnor',
        role: 'Product Designer',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
        status: 'online',
        team: 'Design'
    },
    {
        id: '2',
        name: 'Emily Blunt',
        handle: 'eblunt',
        role: 'Product Manager',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
        status: 'offline',
        team: 'Product',
        isSuggested: true
    }
]

export default function NewMessagePage() {
    const router = useRouter()
    const [currentStep, setCurrentStep] = useState<Step>('select-user')
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedUserId, setSelectedUserId] = useState<string | null>('1')
    const [activeFilter, setActiveFilter] = useState('Suggested')
    const [messageType, setMessageType] = useState<'regular' | 'private' | null>(null)
    const [pinEnabled, setPinEnabled] = useState(true)
    const [pin, setPin] = useState(['', '', '', ''])
    const pinInputs = useRef<(HTMLInputElement | null)[]>([])

    const selectedUser = USER_REGISTRY.find(u => u.id === selectedUserId)
    const filters = ['Suggested', 'Design Team', 'Engineering']

    const filteredUsers = useMemo(() => {
        let list = USER_REGISTRY
        if (activeFilter === 'Suggested') list = list.filter(u => u.isSuggested)
        else if (activeFilter === 'Design Team') list = list.filter(u => u.team === 'Design')
        else if (activeFilter === 'Engineering') list = list.filter(u => u.team === 'Engineering')

        if (searchQuery) {
            const query = searchQuery.toLowerCase()
            list = list.filter(u => u.name.toLowerCase().includes(query) || u.handle.toLowerCase().includes(query))
        }
        return list
    }, [activeFilter, searchQuery])

    const handlePinChange = (index: number, value: string) => {
        if (!/^\d*$/.test(value)) return
        const newPin = [...pin]
        newPin[index] = value.slice(-1)
        setPin(newPin)

        if (value && index < 3) {
            pinInputs.current[index + 1]?.focus()
        }
    }

    const handlePinKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === 'Backspace' && !pin[index] && index > 0) {
            pinInputs.current[index - 1]?.focus()
        }
    }

    return (
        <div className="flex-1 flex flex-col bg-white overflow-hidden animate-in fade-in duration-500 relative">

            {/* --- STEP 1: SELECT USER --- */}
            {currentStep === 'select-user' && (
                <>
                    <header className="px-10 pt-12 pb-8 flex items-center justify-between">
                        <h1 className="text-3xl font-bold text-neutral-900 tracking-tight">New Message</h1>
                        <Link href="/chat">
                            <button className="p-2 text-neutral-400 hover:text-neutral-600 transition-colors">
                                <X size={24} />
                            </button>
                        </Link>
                    </header>

                    <div className="px-10 pb-8 space-y-6">
                        <div className="relative group">
                            <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-[#4338CA] transition-colors" size={20} />
                            <input
                                type="text"
                                placeholder="Search people..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-8 pr-4 py-4 bg-transparent border-b border-neutral-100 outline-none focus:border-[#4338CA] transition-all text-base font-medium placeholder:text-neutral-300"
                            />
                        </div>
                        <div className="flex gap-3">
                            {filters.map((filter) => (
                                <button
                                    key={filter}
                                    onClick={() => setActiveFilter(filter)}
                                    className={`px-6 py-2 rounded-full text-[11px] font-bold tracking-tight border transition-all ${activeFilter === filter ? 'bg-indigo-50 border-indigo-100 text-[#4338CA]' : 'bg-white border-neutral-100 text-neutral-400 hover:border-neutral-200'
                                        }`}
                                >
                                    {filter}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto px-10 pb-32 space-y-12 scrollbar-none">
                        <section className="space-y-6">
                            <h2 className="text-[10px] font-black text-neutral-300 uppercase tracking-[0.3em]">{activeFilter === 'Suggested' ? 'Suggested' : 'Team Members'}</h2>
                            <div className="space-y-4">
                                {filteredUsers.map((user) => (
                                    <div key={user.id} onClick={() => setSelectedUserId(user.id)} className={`group flex items-center justify-between p-4 rounded-[24px] cursor-pointer transition-all duration-300 border-2 ${selectedUserId === user.id ? 'bg-cyan-50/30 border-cyan-400/50' : 'bg-transparent border-transparent hover:bg-neutral-50/50'}`}>
                                        <div className="flex items-center gap-4">
                                            <div className="relative">
                                                <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-white shadow-sm ring-2 ring-neutral-50 bg-neutral-100">
                                                    {user.avatar ? <Image src={user.avatar} alt={user.name} width={56} height={56} className="object-cover" /> : <div className="h-full flex items-center justify-center text-neutral-400 font-bold text-lg">{user.name.split(' ').map(n => n[0]).join('')}</div>}
                                                </div>
                                                {user.status === 'online' && <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full" />}
                                            </div>
                                            <div>
                                                <p className="text-base font-bold text-neutral-900 leading-tight">{user.name}</p>
                                                <p className="text-xs text-neutral-400 font-medium">@{user.handle} <span className="mx-1">•</span> {user.role}</p>
                                            </div>
                                        </div>
                                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${selectedUserId === user.id ? 'bg-[#4338CA] border-[#4338CA]' : 'border-neutral-100'}`}>
                                            {selectedUserId === user.id && <Check size={14} className="text-white stroke-[3]" />}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    <div className="absolute bottom-10 right-10">
                        <button onClick={() => setCurrentStep('choose-type')} disabled={!selectedUserId} className="px-16 py-4 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-2xl font-bold text-sm transition-all shadow-xl shadow-indigo-100 active:scale-[0.98]">
                            Next
                        </button>
                    </div>
                </>
            )}

            {/* --- STEP 2: CHOOSE MESSAGE TYPE --- */}
            {currentStep === 'choose-type' && (
                <div className="flex-1 flex flex-col items-center justify-center p-10 bg-neutral-50/30 animate-in slide-in-from-right-8 duration-500">
                    <button onClick={() => setCurrentStep('select-user')} className="absolute top-12 left-10 p-2 text-neutral-400 hover:text-neutral-600"><ChevronLeft size={24} /></button>

                    <div className="text-center mb-16 space-y-3">
                        <h1 className="text-3xl font-bold text-neutral-900 tracking-tight">Choose Message Type</h1>
                        <p className="text-neutral-500 font-medium">Select how you would like to send this message to the recipient.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-2xl">
                        <div
                            onClick={() => setMessageType('regular')}
                            className={`p-10 bg-white border-2 rounded-[32px] cursor-pointer transition-all duration-300 text-center space-y-6 ${messageType === 'regular' ? 'border-[#4338CA] ring-8 ring-indigo-50 shadow-xl' : 'border-neutral-100 hover:border-neutral-200 shadow-sm'}`}
                        >
                            <div className="w-16 h-16 bg-neutral-50 rounded-2xl flex items-center justify-center mx-auto text-neutral-400">
                                <MessageSquare size={32} />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-xl font-bold text-neutral-900">Regular</h3>
                                <p className="text-sm text-neutral-400 leading-relaxed font-medium px-4">Standard encrypted message for general conversation.</p>
                            </div>
                        </div>

                        <div
                            onClick={() => setMessageType('private')}
                            className={`relative p-10 bg-white border-2 rounded-[32px] cursor-pointer transition-all duration-300 text-center space-y-6 ${messageType === 'private' ? 'border-cyan-400 ring-8 ring-cyan-50 shadow-xl' : 'border-neutral-100 hover:border-neutral-200 shadow-sm'}`}
                        >
                            {messageType === 'private' && (
                                <div className="absolute top-6 right-6 w-6 h-6 bg-[#4338CA] rounded-full flex items-center justify-center shadow-lg animate-in zoom-in">
                                    <Check size={14} className="text-white stroke-[4]" />
                                </div>
                            )}
                            <div className="w-16 h-16 bg-cyan-50 rounded-2xl flex items-center justify-center mx-auto text-cyan-500">
                                <Lock size={32} />
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center justify-center gap-2">
                                    <h3 className="text-xl font-bold text-neutral-900">Private</h3>
                                    <span className="px-2 py-0.5 bg-cyan-100 text-cyan-600 text-[10px] font-black uppercase tracking-widest rounded-md">PIN</span>
                                </div>
                                <p className="text-sm text-neutral-400 leading-relaxed font-medium px-4">Protected with a PIN code for sensitive financial data.</p>
                            </div>
                        </div>
                    </div>

                    <div className="w-full max-w-2xl flex items-center justify-between mt-20">
                        <button onClick={() => setCurrentStep('select-user')} className="text-sm font-bold text-neutral-400 hover:text-neutral-600">Cancel</button>
                        <button
                            onClick={() => messageType === 'private' ? setCurrentStep('secure-chat') : router.push('/chat')}
                            disabled={!messageType}
                            className="px-20 py-5 bg-[#4338CA] hover:bg-[#3730A3] disabled:opacity-50 text-white rounded-2xl font-bold text-base transition-all shadow-xl shadow-indigo-100"
                        >
                            Continue
                        </button>
                    </div>
                </div>
            )}

            {/* --- STEP 3: START SECURE CHAT --- */}
            {currentStep === 'secure-chat' && (
                <div className="flex-1 flex flex-col items-center justify-center p-10 bg-neutral-50/20 animate-in slide-in-from-right-8 duration-500 overflow-y-auto">
                    <button onClick={() => setCurrentStep('choose-type')} className="absolute top-12 left-10 p-2 text-neutral-400 hover:text-neutral-600"><ChevronLeft size={24} /></button>

                    <div className="text-center mb-16 space-y-3">
                        <h1 className="text-4xl font-bold text-neutral-900 tracking-tight">Start Secure Chat</h1>
                        <p className="text-neutral-500 font-medium tracking-tight">Select a colleague and set up access controls.</p>
                    </div>

                    <div className="w-full max-w-lg space-y-12">
                        {/* Recipient Card */}
                        <div className="space-y-4">
                            <label className="text-[11px] font-black text-neutral-400 uppercase tracking-[0.2em]">Recipient</label>
                            <div className="flex items-center gap-4 p-5 bg-neutral-100/50 rounded-2xl border border-neutral-100">
                                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm">
                                    <Image src={selectedUser?.avatar || ''} alt={selectedUser?.name || ''} width={48} height={48} className="object-cover" />
                                </div>
                                <div>
                                    <p className="text-base font-bold text-neutral-900 leading-tight">{selectedUser?.name}</p>
                                    <p className="text-xs text-neutral-400 font-medium">{selectedUser?.role}</p>
                                </div>
                                <div className="ml-auto w-3 h-3 bg-emerald-500 rounded-full border-2 border-white" />
                            </div>
                        </div>

                        {/* PIN Toggle */}
                        <div className="flex items-center justify-between pb-8 border-b border-neutral-100">
                            <div>
                                <p className="text-lg font-bold text-neutral-900 tracking-tight">Enable PIN Protection</p>
                                <p className="text-sm text-neutral-400 font-medium">Require a code to read messages</p>
                            </div>
                            <button
                                onClick={() => setPinEnabled(!pinEnabled)}
                                className={`w-14 h-8 rounded-full p-1 transition-all duration-500 flex items-center ${pinEnabled ? 'bg-indigo-600 shadow-lg shadow-indigo-100' : 'bg-neutral-200'}`}
                            >
                                <div className={`w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center transition-all duration-500 ${pinEnabled ? 'translate-x-6' : 'translate-x-0'}`}>
                                    {pinEnabled && <Check size={12} className="text-indigo-600 stroke-[4]" />}
                                </div>
                            </button>
                        </div>

                        {/* PIN Inputs */}
                        {pinEnabled && (
                            <div className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-500">
                                <label className="text-[11px] font-black text-neutral-400 uppercase tracking-[0.2em]">Create PIN</label>
                                <div className="flex gap-4 justify-between">
                                    {pin.map((digit, idx) => (
                                        <input
                                            key={idx}
                                            ref={el => pinInputs.current[idx] = el}
                                            type="text"
                                            maxLength={1}
                                            value={digit}
                                            onChange={(e) => handlePinChange(idx, e.target.value)}
                                            onKeyDown={(e) => handlePinKeyDown(idx, e)}
                                            className={`w-full h-16 text-center text-2xl font-bold bg-white border-2 rounded-2xl focus:outline-none focus:ring-4 transition-all ${digit ? 'border-[#4338CA] ring-indigo-50' : 'border-neutral-100 hover:border-neutral-200 focus:border-cyan-400 focus:ring-cyan-50'}`}
                                            placeholder="•"
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Info Tip */}
                        <div className="flex items-start gap-4 p-6 bg-neutral-100/50 rounded-2xl border border-neutral-100">
                            <div className="w-8 h-8 rounded-full bg-neutral-200 flex items-center justify-center shrink-0">
                                <Info size={16} className="text-neutral-500" />
                            </div>
                            <p className="text-xs text-neutral-400 leading-relaxed font-medium">
                                <span className="text-neutral-500 font-bold">Security Tip:</span> Make sure to share this PIN with the recipient via a different channel (e.g., in person or voice call).
                            </p>
                        </div>

                        <button
                            onClick={() => router.push('/chat')}
                            className="w-full bg-[#4338CA] hover:bg-[#3730A3] text-white py-5 rounded-2xl font-bold text-lg transition-all shadow-2xl shadow-indigo-100 active:scale-[0.98]"
                        >
                            Start Conversation
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
