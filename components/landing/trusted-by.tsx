'use client'

export function TrustedBy() {
    const organizations = [
        'Global Finance',
        'Legal Counsel',
        'Investigative Journalism',
        'Executive Leadership'
    ]

    return (
        <section className="py-16 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-light text-neutral-900 mb-2">
                        Trusted By
                    </h2>
                    <p className="text-sm text-neutral-500 tracking-wider">
                        SELECT ORGANIZATIONS
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {organizations.map((org, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-center p-8 border border-neutral-200 rounded-lg hover:border-neutral-300 transition"
                        >
                            <p className="text-sm font-medium text-neutral-700 text-center">
                                {org}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
