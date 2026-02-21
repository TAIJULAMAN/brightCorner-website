'use client'

import Link from 'next/link'

export default function SignUpPage() {
    return (
        <div className="min-h-screen grid md:grid-cols-2">
            {/* Left — Brand Panel */}
            <div className="hidden md:flex flex-col justify-center px-16 bg-white border-r border-neutral-100">
                <p className="text-xs text-neutral-400 font-semibold tracking-widest uppercase mb-8">
                    01 — Join the Network
                </p>
                <h1 className="text-5xl font-light text-neutral-900 mb-2">Privacy is</h1>
                <p className="text-5xl font-light text-neutral-400 mb-8">
                    a state of mind.
                </p>
                <p className="text-sm text-neutral-600 leading-relaxed mb-12 max-w-xs">
                    Begin your journey into true digital sovereignty. Your data belongs to you, and only you.
                </p>
                <div className="space-y-4 border-t border-neutral-200">
                    <div className="flex justify-between items-center pt-4">
                        <span className="text-xs text-neutral-400">Access Level</span>
                        <span className="text-xs font-semibold text-neutral-800">Standard / Encrypted</span>
                    </div>
                    <div className="flex justify-between items-center border-t border-neutral-100 pt-4">
                        <span className="text-xs text-neutral-400">Region</span>
                        <span className="text-xs font-semibold text-neutral-800">Global</span>
                    </div>
                </div>
            </div>

            {/* Right — Form Panel */}
            <div className="flex flex-col justify-center px-8 md:px-16 bg-white">
                <div className="w-full max-w-md mx-auto">
                    <h2 className="text-4xl font-light text-neutral-900 mb-2">Create Account</h2>
                    <p className="text-sm text-neutral-500 mb-10">Enter your details to register.</p>

                    <form className="space-y-5">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-neutral-500 tracking-widest uppercase mb-2">
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="Jane"
                                    className="w-full bg-neutral-100 rounded px-4 py-3 text-sm text-neutral-800 placeholder:text-neutral-400 outline-none focus:ring-2 focus:ring-[#4338CA]/30"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-neutral-500 tracking-widest uppercase mb-2">
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="Doe"
                                    className="w-full bg-neutral-100 rounded px-4 py-3 text-sm text-neutral-800 placeholder:text-neutral-400 outline-none focus:ring-2 focus:ring-[#4338CA]/30"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-neutral-500 tracking-widest uppercase mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                placeholder="jane@example.com"
                                className="w-full bg-neutral-100 rounded px-4 py-3 text-sm text-neutral-800 placeholder:text-neutral-400 outline-none focus:ring-2 focus:ring-[#4338CA]/30"
                            />
                        </div>

                        <div>
                            <div className="flex justify-between mb-2">
                                <label className="text-xs font-semibold text-neutral-500 tracking-widest uppercase">
                                    Password
                                </label>
                                <span className="text-xs font-bold text-cyan-500 tracking-widest uppercase">Strong</span>
                            </div>
                            <input
                                type="password"
                                placeholder="············"
                                className="w-full bg-neutral-100 rounded px-4 py-3 text-sm text-neutral-800 placeholder:text-neutral-400 outline-none focus:ring-2 focus:ring-[#4338CA]/30"
                            />
                        </div>

                        <div className="flex items-start gap-3">
                            <input
                                type="checkbox"
                                id="terms"
                                className="mt-0.5 h-4 w-4 accent-[#4338CA] shrink-0"
                            />
                            <label htmlFor="terms" className="text-xs text-neutral-500 leading-relaxed">
                                I agree to the{' '}
                                <Link href="/terms" className="underline text-neutral-700 hover:text-neutral-900">Terms of Service</Link>
                                {' '}and{' '}
                                <Link href="/privacy" className="underline text-neutral-700 hover:text-neutral-900">Privacy Policy</Link>
                                . I understand that my keys are my responsibility.
                            </label>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-[#4338CA] hover:bg-[#3730A3] text-white text-xs font-bold tracking-widest uppercase py-4 rounded-full transition-colors"
                        >
                            Create Account
                        </button>
                    </form>

                    <p className="text-center text-sm text-neutral-500 mt-8">
                        Already have an account?{' '}
                        <Link href="/sign-in" className="text-[#4338CA] font-semibold hover:underline">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
