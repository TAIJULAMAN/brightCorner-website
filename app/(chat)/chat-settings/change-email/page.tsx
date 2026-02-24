'use client'

import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function ChangeEmailPage() {
    return (
        <div className="flex-1 h-full bg-[#F8FAFC] flex flex-col overflow-hidden">
            {/* Header */}
            <header className="px-6 py-4 bg-white border-b border-neutral-100 flex items-center justify-between">
                <Link href="/chat-settings" className="text-neutral-500 hover:text-neutral-700 transition-colors">
                    <ArrowLeft size={20} />
                </Link>
                <h1 className="text-base font-semibold text-neutral-900 absolute left-1/2 -translate-x-1/2">Change Email</h1>
                <div className="w-5" /> {/* Spacer */}
            </header>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-8 flex flex-col items-center justify-center -translate-y-12">
                <div className="w-full max-w-sm space-y-16">
                    <div className="text-center space-y-2">
                        <p className="text-[10px] font-bold text-neutral-400 tracking-[0.2em] uppercase">
                            Current Email
                        </p>
                        <h2 className="text-lg font-semibold text-neutral-900">alexander.w@brightcorner.com</h2>
                    </div>

                    <div className="space-y-10">
                        {/* New Email */}
                        <div className="border-b border-neutral-200 pb-2">
                            <input
                                type="email"
                                placeholder="New Email"
                                className="w-full bg-transparent text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none"
                            />
                        </div>

                        {/* Confirm Email */}
                        <div className="border-b border-neutral-200 pb-2">
                            <input
                                type="email"
                                placeholder="Confirm Email"
                                className="w-full bg-transparent text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none"
                            />
                        </div>
                    </div>

                    <div className="space-y-10">
                        <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 rounded-xl shadow-lg shadow-indigo-200 transition-all active:scale-[0.98]">
                            Update Email
                        </button>

                        <p className="text-center text-[11px] text-neutral-400 leading-relaxed px-4">
                            We will send a verification link to your new address. You must click the link to finalize this change.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
