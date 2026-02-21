'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function Header() {
    return (
        <header className="container mx-auto fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-neutral-200">
            <nav className="flex items-center justify-between py-4 px-5 md:px-0">
                <Link href="/" className="text-xl font-bold text-neutral-900">
                    BrightCorner
                </Link>

                <div className="hidden md:flex items-center gap-8">
                    <Link href="#" className="text-sm text-neutral-600 hover:text-neutral-900 transition">
                        MANIFESTO
                    </Link>
                    <Link href="#" className="text-sm text-neutral-600 hover:text-neutral-900 transition">
                        TECHNOLOGY
                    </Link>
                    <Link href="#" className="text-sm text-neutral-600 hover:text-neutral-900 transition">
                        ACCESS
                    </Link>
                </div>

                <Link href="/sign-in">
                    <Button className="bg-[#4338CA] text-white">
                        LOGIN
                    </Button>
                </Link>
            </nav>
        </header>
    )
}
