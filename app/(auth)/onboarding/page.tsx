'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
    User, Check, Camera,
    Shield, Bell, Lock, EyeOff, MessageSquare,
    Mail, AtSign, Smartphone
} from 'lucide-react'
import Link from 'next/link'

type Step = 'username' | 'profile' | 'privacy' | 'notifications' | 'success'

interface OnboardingData {
    username: string
    bio: string
    avatar: string | null
    onlineStatus: boolean
    publicProfile: boolean
    anonymousMode: boolean
    messagePrivacy: 'everyone' | 'contacts' | 'nobody'
    pinProtection: boolean
    emailNotifications: boolean
    channelMentions: boolean
    pinAlerts: boolean
    joinRequestAlerts: boolean
}

export default function OnboardingPage() {
    const router = useRouter()
    const [currentStep, setCurrentStep] = useState<Step>('username')
    const [data, setData] = useState<OnboardingData>({
        username: '',
        bio: '',
        avatar: null,
        onlineStatus: false,
        publicProfile: true,
        anonymousMode: false,
        messagePrivacy: 'everyone',
        pinProtection: false,
        emailNotifications: false,
        channelMentions: true,
        pinAlerts: true,
        joinRequestAlerts: false,
    })

    const steps: Step[] = ['username', 'profile', 'privacy', 'notifications', 'success']
    const stepIndex = steps.indexOf(currentStep)

    const nextStep = () => {
        const currentIndex = steps.indexOf(currentStep)
        if (currentIndex < steps.length - 1) {
            setCurrentStep(steps[currentIndex + 1])
        }
    }

    const prevStep = () => {
        const currentIndex = steps.indexOf(currentStep)
        if (currentIndex > 0) {
            setCurrentStep(steps[currentIndex - 1])
        }
    }

    return (
        <div className="min-h-screen bg-neutral-50 flex flex-col items-center justify-center p-6 font-sans">
            {/* Minimal Progress Bar */}
            {currentStep !== 'success' && (
                <div className="w-full max-w-md mb-12">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest">Setup Progress</span>
                        <span className="text-[11px] font-bold text-neutral-900 uppercase tracking-widest">{stepIndex + 1} / 4</span>
                    </div>
                    <div className="flex gap-2">
                        {[0, 1, 2, 3].map((i) => (
                            <div
                                key={i}
                                className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${i <= stepIndex ? 'bg-[#4338CA]' : 'bg-neutral-200'}`}
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* Main Application Card */}
            <div className="w-full max-w-2xl bg-white border border-neutral-200 rounded-[32px] shadow-sm overflow-hidden animate-in fade-in duration-500">

                {currentStep === 'username' && (
                    <div className="p-12 md:p-16 text-center">
                        <div className="w-16 h-16 bg-neutral-50 rounded-2xl flex items-center justify-center mx-auto mb-8 border border-neutral-100 text-[#4338CA]">
                            <AtSign size={32} />
                        </div>
                        <h1 className="text-2xl font-bold text-neutral-900 mb-2">Choose your username</h1>
                        <p className="text-sm text-neutral-500 mb-10">This unique identifier will be visible to other members.</p>

                        <div className="space-y-6 text-left">
                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest">Username</label>
                                <div className="relative group">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 font-medium italic">@</span>
                                    <input
                                        type="text"
                                        placeholder="bright_corner"
                                        value={data.username}
                                        onChange={(e) => setData({ ...data, username: e.target.value.toLowerCase().replace(/\s+/g, '_') })}
                                        className="w-full pl-8 pr-12 py-4 bg-neutral-50 border border-neutral-200 rounded-xl text-sm font-semibold text-neutral-900 outline-none focus:ring-2 focus:ring-[#4338CA]/20 focus:border-[#4338CA] transition-all"
                                    />
                                    {data.username.length > 2 && (
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-500">
                                            <Check size={20} className="stroke-[3]" />
                                        </div>
                                    )}
                                </div>
                                {data.username.length > 2 && (
                                    <p className="text-[11px] font-medium text-emerald-600">Username is available</p>
                                )}
                            </div>

                            <button
                                onClick={nextStep}
                                className="w-full bg-[#4338CA] hover:bg-[#3730A3] text-white py-4 rounded-xl font-bold text-sm transition-all shadow-md shadow-indigo-100 active:scale-[0.98]"
                            >
                                Continue to Profile
                            </button>

                            <p className="text-center">
                                <button className="text-[11px] font-bold text-neutral-400 hover:text-neutral-600 transition-colors uppercase tracking-widest">
                                    Use email instead
                                </button>
                            </p>
                        </div>
                    </div>
                )}

                {currentStep === 'profile' && (
                    <div className="p-12 md:p-16">
                        <div className="mb-12">
                            <h1 className="text-2xl font-bold text-neutral-900 mb-2">Profile Setup</h1>
                            <p className="text-sm text-neutral-500">Complete your professional profile details.</p>
                        </div>

                        <div className="flex items-center gap-8 mb-12 pb-12 border-b border-neutral-100">
                            <div className="relative">
                                <div className="w-24 h-24 rounded-2xl bg-neutral-100 border border-neutral-200 flex items-center justify-center overflow-hidden">
                                    <User size={40} className="text-neutral-300" />
                                </div>
                                <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-white border border-neutral-200 rounded-lg flex items-center justify-center text-[#4338CA] shadow-sm hover:bg-neutral-50 transition-colors">
                                    <Camera size={14} />
                                </button>
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm font-bold text-neutral-900">Profile Picture</p>
                                <p className="text-xs text-neutral-400 mb-3">PNG, JPG or GIF. Max 2MB.</p>
                                <button className="text-xs font-bold text-[#4338CA] hover:underline">Replace image</button>
                            </div>
                        </div>

                        <div className="space-y-10">
                            <div className="space-y-3">
                                <div className="flex justify-between items-end">
                                    <label className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest">Bio</label>
                                    <span className="text-[10px] font-bold text-neutral-300">
                                        {data.bio.length}/160
                                    </span>
                                </div>
                                <textarea
                                    placeholder="Briefly describe your role or interests..."
                                    value={data.bio}
                                    onChange={(e) => setData({ ...data, bio: e.target.value.slice(0, 160) })}
                                    rows={3}
                                    className="w-full px-5 py-4 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4338CA]/20 focus:border-[#4338CA] transition-all text-sm font-medium placeholder:text-neutral-300 resize-none shadow-sm"
                                />
                            </div>

                            <div className="space-y-4">
                                <label className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest">Display Preferences</label>

                                <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl border border-neutral-100">
                                    <div>
                                        <p className="text-sm font-bold text-neutral-900">Online Status</p>
                                        <p className="text-xs text-neutral-400">Manage visibility of your active state.</p>
                                    </div>
                                    <button
                                        onClick={() => setData({ ...data, onlineStatus: !data.onlineStatus })}
                                        className={`w-10 h-5 rounded-full p-1 transition-all duration-300 ${data.onlineStatus ? 'bg-indigo-600' : 'bg-neutral-200'}`}
                                    >
                                        <div className={`w-3 h-3 bg-white rounded-full shadow-sm transition-all duration-300 ${data.onlineStatus ? 'translate-x-5' : 'translate-x-0'}`} />
                                    </button>
                                </div>

                                <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl border border-neutral-100">
                                    <div>
                                        <p className="text-sm font-bold text-neutral-900">Public Profile</p>
                                        <p className="text-xs text-neutral-400">Make your profile discoverable to others.</p>
                                    </div>
                                    <button
                                        onClick={() => setData({ ...data, publicProfile: !data.publicProfile })}
                                        className={`w-10 h-5 rounded-full p-1 transition-all duration-300 ${data.publicProfile ? 'bg-indigo-600' : 'bg-neutral-200'}`}
                                    >
                                        <div className={`w-3 h-3 bg-white rounded-full shadow-sm transition-all duration-300 ${data.publicProfile ? 'translate-x-5' : 'translate-x-0'}`} />
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-4">
                                <button onClick={prevStep} className="text-[11px] font-bold text-neutral-400 hover:text-neutral-600 transition-colors uppercase tracking-widest">Previous Step</button>
                                <button
                                    onClick={nextStep}
                                    className="bg-[#4338CA] hover:bg-[#3730A3] text-white px-10 py-4 rounded-xl font-bold text-sm transition-all shadow-md active:scale-[0.98]"
                                >
                                    Save & Continue
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {currentStep === 'privacy' && (
                    <div className="p-12 md:p-16">
                        <div className="mb-12">
                            <h1 className="text-2xl font-bold text-neutral-900 mb-2">Privacy Settings</h1>
                            <p className="text-sm text-neutral-500">Configure your security and interaction boundaries.</p>
                        </div>

                        <div className="space-y-4">
                            <div className="p-6 border border-neutral-100 rounded-2xl flex items-start gap-5 hover:border-neutral-200 transition-all">
                                <div className="w-10 h-10 bg-neutral-50 rounded-xl flex items-center justify-center text-[#4338CA] shrink-0">
                                    <EyeOff size={20} />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-1">
                                        <p className="text-sm font-bold text-neutral-900">Anonymous Mode</p>
                                        <button
                                            onClick={() => setData({ ...data, anonymousMode: !data.anonymousMode })}
                                            className={`w-10 h-5 rounded-full p-1 transition-all duration-300 ${data.anonymousMode ? 'bg-indigo-600' : 'bg-neutral-200'}`}
                                        >
                                            <div className={`w-3 h-3 bg-white rounded-full shadow-sm transition-all duration-300 ${data.anonymousMode ? 'translate-x-5' : 'translate-x-0'}`} />
                                        </button>
                                    </div>
                                    <p className="text-xs text-neutral-400 leading-relaxed">Hide your identity and profile picture in public channels by default.</p>
                                </div>
                            </div>

                            <div className="p-6 border border-neutral-100 rounded-2xl space-y-6">
                                <div className="flex items-center gap-5">
                                    <div className="w-10 h-10 bg-neutral-50 rounded-xl flex items-center justify-center text-[#4338CA] shrink-0">
                                        <MessageSquare size={20} />
                                    </div>
                                    <p className="text-sm font-bold text-neutral-900">Direct Message Permissions</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pl-[60px]">
                                    {(['everyone', 'contacts', 'nobody'] as const).map((option) => (
                                        <button
                                            key={option}
                                            onClick={() => setData({ ...data, messagePrivacy: option })}
                                            className={`py-3 px-4 rounded-xl border text-center transition-all ${data.messagePrivacy === option ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-neutral-100 bg-white text-neutral-500 hover:border-neutral-200'}`}
                                        >
                                            <span className="text-xs font-bold capitalize">{option}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="p-6 border border-neutral-100 rounded-2xl flex items-start gap-5 hover:border-neutral-200 transition-all">
                                <div className="w-10 h-10 bg-neutral-50 rounded-xl flex items-center justify-center text-[#4338CA] shrink-0">
                                    <Lock size={20} />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-1">
                                        <p className="text-sm font-bold text-neutral-900">PIN Protection</p>
                                        <button
                                            onClick={() => setData({ ...data, pinProtection: !data.pinProtection })}
                                            className={`w-10 h-5 rounded-full p-1 transition-all duration-300 ${data.pinProtection ? 'bg-indigo-600' : 'bg-neutral-200'}`}
                                        >
                                            <div className={`w-3 h-3 bg-white rounded-full shadow-sm transition-all duration-300 ${data.pinProtection ? 'translate-x-5' : 'translate-x-0'}`} />
                                        </button>
                                    </div>
                                    <p className="text-xs text-neutral-400">Require a secure PIN to access the application.</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between pt-12">
                            <button onClick={prevStep} className="text-[11px] font-bold text-neutral-400 hover:text-neutral-600 transition-colors uppercase tracking-widest">Previous Step</button>
                            <button
                                onClick={nextStep}
                                className="bg-[#4338CA] hover:bg-[#3730A3] text-white px-10 py-4 rounded-xl font-bold text-sm transition-all"
                            >
                                Continue to Notifications
                            </button>
                        </div>
                    </div>
                )}

                {currentStep === 'notifications' && (
                    <div className="p-12 md:p-16">
                        <div className="mb-12">
                            <h1 className="text-2xl font-bold text-neutral-900 mb-2">Notifications</h1>
                            <p className="text-sm text-neutral-500">Select how you want to be alerted about activity.</p>
                        </div>

                        <div className="divide-y divide-neutral-100">
                            {[
                                { id: 'emailNotifications', label: 'Email Notifications', desc: 'New messages, mentions and security alerts.' },
                                { id: 'channelMentions', label: 'Channel Mentions', desc: 'Direct @mentions and replies in channels.' },
                                { id: 'pinAlerts', label: 'PIN Message Alerts', desc: 'When you are added to prioritized chats.' },
                                { id: 'joinRequestAlerts', label: 'Join Request Alerts', desc: 'When somebody requests to join your channels.' },
                            ].map((item) => (
                                <div key={item.id} className="flex items-center justify-between py-6">
                                    <div className="space-y-1">
                                        <p className="text-sm font-bold text-neutral-900">{item.label}</p>
                                        <p className="text-xs text-neutral-400">{item.desc}</p>
                                    </div>
                                    <button
                                        onClick={() => setData({ ...data, [item.id]: !data[item.id as keyof OnboardingData] })}
                                        className={`w-10 h-5 rounded-full p-1 transition-all duration-300 ${data[item.id as keyof OnboardingData] ? 'bg-indigo-600' : 'bg-neutral-200'}`}
                                    >
                                        <div className={`w-3 h-3 bg-white rounded-full shadow-sm transition-all duration-300 ${data[item.id as keyof OnboardingData] ? 'translate-x-5' : 'translate-x-0'}`} />
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className="flex items-center justify-between pt-12">
                            <button onClick={prevStep} className="text-[11px] font-bold text-neutral-400 hover:text-neutral-600 transition-colors uppercase tracking-widest">Adjust previous</button>
                            <button
                                onClick={nextStep}
                                className="bg-[#4338CA] hover:bg-[#3730A3] text-white px-10 py-4 rounded-xl font-bold text-sm transition-all shadow-md shadow-indigo-100"
                            >
                                Finish Setup
                            </button>
                        </div>
                    </div>
                )}

                {currentStep === 'success' && (
                    <div className="p-16 md:p-24 text-center">
                        <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-10 border border-emerald-100">
                            <Check className="text-emerald-500 stroke-[3]" size={40} />
                        </div>

                        <h1 className="text-3xl font-bold text-neutral-900 mb-4 tracking-tight">You&apos;re all set</h1>
                        <p className="text-base text-neutral-500 font-medium mb-16 max-w-sm mx-auto">Your professional profile is active. Welcome to BrightCorner.</p>

                        <div className="space-y-4 max-w-sm mx-auto">
                            <Link href="/chat">
                                <button className="w-full bg-[#4338CA] hover:bg-[#3730A3] text-white py-5 rounded-xl font-bold text-sm transition-all shadow-md">
                                    Continue to Dashboard
                                </button>
                            </Link>
                        </div>
                    </div>
                )}
            </div>

            {/* Subtle Footer */}
            <div className="mt-12 text-center">
                <p className="text-[10px] font-bold text-neutral-300 uppercase tracking-[0.3em]">
                    BrightCorner &copy; 2026 Secured Enterprise Space
                </p>
            </div>
        </div>
    )
}
