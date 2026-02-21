'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function ResetPasswordPage() {
    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')
    const [error, setError] = useState(false)

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        if (password !== confirm || confirm === '') {
            setError(true)
        } else {
            setError(false)
            // TODO: handle reset logic
        }
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6">
            <div className="w-full max-w-sm">
                <h1 className="text-3xl font-bold text-neutral-900 mb-2">Reset Password</h1>
                <p className="text-sm text-neutral-500 mb-8">Please enter your new password below.</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* New Password */}
                    <div className="relative">
                        <input
                            type="password"
                            placeholder="New Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border border-neutral-200 rounded px-4 py-3 text-sm text-neutral-800 placeholder:text-neutral-400 outline-none focus:border-cyan-400 peer"
                        />
                        {/* Cyan underline on focus */}
                        <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-cyan-400 transition-all peer-focus:w-full rounded" />
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            value={confirm}
                            onChange={(e) => { setConfirm(e.target.value); setError(false) }}
                            className={`w-full border rounded px-4 py-3 text-sm text-neutral-800 placeholder:text-neutral-400 outline-none transition-colors ${error ? 'border-red-400 focus:border-red-400' : 'border-neutral-200 focus:border-cyan-400'
                                }`}
                        />
                        {error && (
                            <p className="text-xs text-red-500 mt-1">Passwords do not match. Please try again.</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#4338CA] hover:bg-[#3730A3] text-white text-xs font-bold tracking-widest uppercase py-4 rounded-full transition-colors mt-2"
                    >
                        Reset Password
                    </button>
                </form>

                <p className="text-center text-sm text-neutral-500 mt-8">
                    Remember your password?{' '}
                    <Link href="/sign-in" className="text-[#4338CA] font-semibold hover:underline">
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    )
}
