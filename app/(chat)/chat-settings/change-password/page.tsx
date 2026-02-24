'use client'

import { ArrowLeft, EyeOff, Info } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export default function ChangePasswordPage() {
    const [showCurrent, setShowCurrent] = useState(false)
    const [showNew, setShowNew] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)

    return (
        <div className="flex-1 h-full bg-[#F8FAFC] flex flex-col overflow-hidden">
            {/* Header */}
            <header className="px-6 py-4 bg-white border-b border-neutral-100 flex items-center justify-between">
                <Link href="/chat-settings" className="text-neutral-500 hover:text-neutral-700 transition-colors">
                    <ArrowLeft size={20} />
                </Link>
                <h1 className="text-base font-semibold text-neutral-900 absolute left-1/2 -translate-x-1/2">Change Password</h1>
                <div className="w-5" /> {/* Spacer */}
            </header>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-8 flex flex-col items-center">
                <div className="w-full max-w-md space-y-12">
                    <div className="text-center space-y-2">
                        <h2 className="text-2xl font-semibold text-neutral-900">Change Password</h2>
                        <p className="text-[10px] font-bold text-neutral-400 tracking-[0.2em] uppercase">
                            Secure your account with a strong password
                        </p>
                    </div>

                    <div className="space-y-8">
                        {/* Current Password */}
                        <div className="relative border-b border-neutral-200 pb-2">
                            <input
                                type={showCurrent ? "text" : "password"}
                                placeholder="Current Password"
                                className="w-full bg-transparent text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none pr-10"
                            />
                            <button
                                onClick={() => setShowCurrent(!showCurrent)}
                                className="absolute right-0 top-0 text-neutral-400 hover:text-neutral-600"
                            >
                                <EyeOff size={18} />
                            </button>
                        </div>

                        {/* New Password */}
                        <div className="space-y-3">
                            <div className="relative border-b border-neutral-200 pb-2">
                                <input
                                    type={showNew ? "text" : "password"}
                                    placeholder="New Password"
                                    className="w-full bg-transparent text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none pr-10"
                                />
                                <button
                                    onClick={() => setShowNew(!showNew)}
                                    className="absolute right-0 top-0 text-neutral-400 hover:text-neutral-600"
                                >
                                    <EyeOff size={18} />
                                </button>
                            </div>
                            <div className="space-y-2">
                                <div className="h-1 w-full bg-neutral-100 rounded-full overflow-hidden">
                                    <div className="h-full w-[65%] bg-cyan-400 rounded-full" />
                                </div>
                                <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider">Strong</span>
                            </div>
                        </div>

                        {/* Confirm New Password */}
                        <div className="relative border-b border-neutral-200 pb-2">
                            <input
                                type={showConfirm ? "text" : "password"}
                                placeholder="Confirm New Password"
                                className="w-full bg-transparent text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none pr-10"
                            />
                            <button
                                onClick={() => setShowConfirm(!showConfirm)}
                                className="absolute right-0 top-0 text-neutral-400 hover:text-neutral-600"
                            >
                                <EyeOff size={18} />
                            </button>
                        </div>
                    </div>

                    <div className="space-y-6 pt-4">
                        <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 rounded-xl shadow-lg shadow-indigo-200 transition-all active:scale-[0.98]">
                            Update Password
                        </button>

                        <div className="flex gap-2 text-red-400">
                            <Info size={14} className="shrink-0 mt-0.5" />
                            <p className="text-[11px] leading-relaxed">
                                Note: Changing your password will log you out of all other active sessions on other devices.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
