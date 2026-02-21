'use client'

import { useRef, useState } from 'react'

const OTP_LENGTH = 6

export default function TwoFactorPage() {
    const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(''))
    const inputs = useRef<(HTMLInputElement | null)[]>([])

    function handleChange(index: number, value: string) {
        if (!/^\d*$/.test(value)) return
        const newOtp = [...otp]
        newOtp[index] = value.slice(-1)
        setOtp(newOtp)
        if (value && index < OTP_LENGTH - 1) {
            inputs.current[index + 1]?.focus()
        }
    }

    function handleKeyDown(index: number, e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputs.current[index - 1]?.focus()
        }
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        // TODO: handle 2FA verification
        console.log('OTP submitted:', otp.join(''))
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6">
            <div className="w-full max-w-sm">
                <h1 className="text-3xl font-bold text-neutral-900 mb-2">Two-Factor Authentication</h1>
                <p className="text-sm text-neutral-500 mb-10">Enter the verification code sent to your device.</p>

                <form onSubmit={handleSubmit}>
                    {/* OTP Input Boxes */}
                    <div className="flex items-center gap-3 mb-8">
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                ref={(el) => { inputs.current[index] = el }}
                                type="text"
                                inputMode="numeric"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                placeholder="0"
                                className="w-full aspect-square text-center text-lg font-medium text-neutral-700 border border-neutral-200 rounded-lg placeholder:text-neutral-300 outline-none focus:border-[#4338CA] focus:ring-2 focus:ring-[#4338CA]/20 transition-all"
                            />
                        ))}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#4338CA] hover:bg-[#3730A3] text-white text-xs font-bold tracking-widest uppercase py-4 rounded-full transition-colors"
                    >
                        Verify
                    </button>
                </form>

                <p className="text-center text-sm text-neutral-500 mt-8">
                    Didn&apos;t receive a code?{' '}
                    <button className="text-[#4338CA] font-semibold hover:underline">
                        Resend
                    </button>
                </p>
            </div>
        </div>
    )
}
