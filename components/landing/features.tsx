'use client'

export function Features() {
    const features = [
        {
            number: '02',
            title: 'Auditable Architecture',
            description: 'Security requires transparency. Our core crypto-libraries are open sourced and regularly audited. We hide nothing, so you can hide everything.'
        },
        {
            number: '03',
            title: 'Perfect Forward Secrecy',
            description: 'New keys for every message session ensure past communications remain secure. History is written in disappearing ink.'
        },
        {
            number: '04',
            title: 'Forensic Unrecoverability',
            description: 'Once deleted, data is gone. Not archived, not hidden, not archived. Mathematically erased from existence.'
        }
    ]

    return (
        <section className="py-16 px-6 border-t border-neutral-200">
            <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-3 gap-12">
                    {features.map((feature, index) => (
                        <div key={index}>
                            <p className="text-sm text-cyan-500 font-semibold tracking-wider mb-4">
                                {feature.number} — {feature.title.toUpperCase()}
                            </p>
                            <h3 className="text-2xl font-light text-neutral-900 mb-4">
                                {feature.title}
                            </h3>
                            <p className="text-sm text-neutral-600 leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
