'use client'

import Link from 'next/link'

export default function SignInPage() {
    return (
        <div className="min-h-screen grid md:grid-cols-2">
            {/* Left — Brand Panel */}
            <div className="hidden md:flex flex-col justify-center px-16 bg-white border-r border-neutral-100">
                <p className="text-xs text-neutral-400 font-semibold tracking-widest uppercase mb-8">
                    01 — Access Portal
                </p>
                <h1 className="text-5xl font-light text-neutral-900 mb-2">Welcome Back</h1>
                <p className="text-5xl font-light text-neutral-400 mb-8">
                    Your privacy is<br />waiting.
                </p>
                <p className="text-sm text-neutral-600 leading-relaxed mb-12 max-w-xs">
                    Resume your encrypted session. Your data remains inaccessible to anyone but you.
                </p>
                <div className="space-y-4 border-t border-neutral-200">
                    <div className="flex justify-between items-center pt-4">
                        <span className="text-xs text-neutral-400">Last Login</span>
                        <span className="text-xs font-semibold text-neutral-800">New York, US</span>
                    </div>
                    <div className="flex justify-between items-center border-t border-neutral-100 pt-4">
                        <span className="text-xs text-neutral-400">Session</span>
                        <span className="text-xs font-semibold text-neutral-800">Encrypted</span>
                    </div>
                </div>
            </div>

            {/* Right — Form Panel */}
            <div className="flex flex-col justify-center px-8 md:px-16 bg-white">
                <div className="w-full max-w-md mx-auto">
                    <h2 className="text-4xl font-light text-neutral-900 mb-2">Sign In</h2>
                    <p className="text-sm text-neutral-500 mb-10">Enter your credentials to access your account.</p>

                    <form className="space-y-6">
                        <div>
                            <label className="block text-xs font-semibold text-neutral-500 tracking-widest uppercase mb-2">
                                Email or Username
                            </label>
                            <input
                                type="text"
                                placeholder="jane@example.com"
                                className="w-full bg-neutral-100 rounded px-4 py-3 text-sm text-neutral-800 placeholder:text-neutral-400 outline-none focus:ring-2 focus:ring-[#4338CA]/30"
                            />
                        </div>

                        <div>
                            <div className="flex justify-between mb-2">
                                <label className="text-xs font-semibold text-neutral-500 tracking-widest uppercase">
                                    Password
                                </label>
                                <Link href="/forgot-password" className="text-xs text-cyan-500 hover:text-cyan-600 font-semibold tracking-widest uppercase">
                                    Forgot Password?
                                </Link>
                            </div>
                            <input
                                type="password"
                                placeholder="············"
                                className="w-full bg-neutral-100 rounded px-4 py-3 text-sm text-neutral-800 placeholder:text-neutral-400 outline-none focus:ring-2 focus:ring-[#4338CA]/30"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-[#4338CA] hover:bg-[#3730A3] text-white text-xs font-bold tracking-widest uppercase py-4 rounded-full transition-colors"
                        >
                            Sign In
                        </button>
                    </form>

                    <p className="text-center text-sm text-neutral-500 mt-8">
                        Don&apos;t have an account?{' '}
                        <Link href="/sign-up" className="text-[#4338CA] font-semibold hover:underline">
                            Create one
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
