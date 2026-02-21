'use client'

import Image from 'next/image'

export function Hero() {
    return (
        <section className="pt-32 pb-16 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <p className="text-sm text-cyan-500 font-semibold tracking-wider mb-4">
                            01 — INTRODUCTION
                        </p>
                        <h1 className="text-5xl md:text-6xl font-light text-cyan-500 mb-4 text-balance">
                            Silence
                        </h1>
                        <p className="text-4xl md:text-5xl font-light text-neutral-400 mb-8">
                            is the ultimate luxury.
                        </p>

                        <p className="text-base text-neutral-600 leading-relaxed mb-8 max-w-sm">
                            We built BrightCorner for those who understand that true privacy is not about having something to hide, but about having something to protect.
                        </p>

                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-neutral-500">Encryption Standard</span>
                                <span className="text-sm font-semibold text-neutral-900">P-521 ECC</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-neutral-500">Architecture</span>
                                <span className="text-sm font-semibold text-neutral-900">Zero-Knowledge</span>
                            </div>
                        </div>
                    </div>

                    <div className="relative aspect-square">
                        <Image
                            src="/hero-woman.jpg"
                            alt="Privacy-focused communication"
                            fill
                            className="object-cover rounded-lg"
                            priority
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
