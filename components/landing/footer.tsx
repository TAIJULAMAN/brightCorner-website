'use client'

import Link from 'next/link'
import { Twitter } from 'lucide-react'

export function Footer() {
    return (
        <footer className="bg-neutral-50 border-t border-neutral-200 py-12 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-4 gap-8 mb-12">
                    <div>
                        <h3 className="font-semibold text-neutral-900 mb-4">
                            BrightCorner
                        </h3>
                        <p className="text-sm text-neutral-600">
                            Privacy-first encrypted messaging for those who refuse to be monitored.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-sm font-semibold text-neutral-900 mb-4">
                            PRODUCT
                        </h4>
                        <ul className="space-y-2">
                            <li><Link href="#" className="text-sm text-neutral-600 hover:text-neutral-900">Features</Link></li>
                            <li><Link href="#" className="text-sm text-neutral-600 hover:text-neutral-900">Pricing</Link></li>
                            <li><Link href="#" className="text-sm text-neutral-600 hover:text-neutral-900">Security</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-sm font-semibold text-neutral-900 mb-4">
                            COMPLIANCE
                        </h4>
                        <ul className="space-y-2">
                            <li><Link href="#" className="text-sm text-neutral-600 hover:text-neutral-900">Legal</Link></li>
                            <li><Link href="#" className="text-sm text-neutral-600 hover:text-neutral-900">Privacy</Link></li>
                            <li><Link href="#" className="text-sm text-neutral-600 hover:text-neutral-900">Terms</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-sm font-semibold text-neutral-900 mb-4">
                            SOCIAL
                        </h4>
                        <ul className="space-y-2">
                            <li>
                                <Link href="#" className="text-sm text-neutral-600 hover:text-neutral-900 flex items-center gap-2">
                                    <Twitter size={16} />
                                    Twitter
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-neutral-200 pt-8 flex flex-col md:flex-row items-center justify-between">
                    <p className="text-sm text-neutral-600">
                        © 2024 BrightCorner. Privacy is fundamental.
                    </p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <Link href="#" className="text-sm text-neutral-600 hover:text-neutral-900">
                            Status
                        </Link>
                        <Link href="#" className="text-sm text-neutral-600 hover:text-neutral-900">
                            Documentation
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
