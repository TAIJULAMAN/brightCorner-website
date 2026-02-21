'use client'

import Link from 'next/link'

export default function ForgotPasswordPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6">
            <div className="w-full max-w-sm">
                <h1 className="text-3xl font-bold text-neutral-900 mb-2">Forgot Password</h1>
                <p className="text-sm text-neutral-500 mb-8">
                    Enter your email and we&apos;ll send you a reset link.
                </p>

                <form className="space-y-4">
                    <div>
                        <label className="block text-xs font-semibold text-neutral-500 tracking-widest uppercase mb-2">
                            Email Address
                        </label>
                        <input
                            type="email"
                            placeholder="jane@example.com"
                            className="w-full border border-neutral-200 rounded px-4 py-3 text-sm text-neutral-800 placeholder:text-neutral-400 outline-none focus:border-cyan-400 transition-colors"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#4338CA] hover:bg-[#3730A3] text-white text-xs font-bold tracking-widest uppercase py-4 rounded-full transition-colors"
                    >
                        Send Reset Link
                    </button>
                </form>

                <p className="text-center text-sm text-neutral-500 mt-8">
                    <Link href="/sign-in" className="text-[#4338CA] font-semibold hover:underline">
                        Back to Sign In
                    </Link>
                </p>
            </div>
        </div>
    )
}
