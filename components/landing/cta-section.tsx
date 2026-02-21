'use client'

import { Button } from '@/components/ui/button'

export function CTASection() {
    return (
        <section className="py-24 px-6">
            <div className="max-w-3xl mx-auto text-center">
                <p className="text-sm text-cyan-500 font-semibold tracking-wider mb-4">
                    06 — ACCESS
                </p>
                <h2 className="text-5xl md:text-6xl font-light text-neutral-900 mb-8 text-balance">
                    Secure your<br />conversation.
                </h2>

                <Button
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-12 mb-8"
                >
                    START NOW
                </Button>

                <p className="text-xs text-neutral-500">
                    No credit card required • Setup takes 30 seconds
                </p>
            </div>
        </section>
    )
}
