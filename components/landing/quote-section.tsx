'use client'

export function QuoteSection() {
    return (
        <section className="bg-neutral-900 py-24 px-6">
            <div className="max-w-4xl mx-auto text-center">
                <p className="text-sm text-neutral-500 font-semibold tracking-wider mb-8">
                    05 — MANIFESTO
                </p>
                <blockquote className="text-4xl md:text-5xl font-light text-cyan-400">
                    <span className="text-cyan-400">"</span>In an age of constant surveillance, privacy is the<br />
                    only true act of rebellion.<span className="text-cyan-400">"</span>
                </blockquote>
            </div>
        </section>
    )
}
