import { Features } from "@/components/landing/features";
import { Header } from "@/components/landing/header";
import { Hero } from "@/components/landing/hero";
import { QuoteSection } from "@/components/landing/quote-section";
import { TrustedBy } from "@/components/landing/trusted-by";
import { CTASection } from "@/components/landing/cta-section";
import { Footer } from "@/components/landing/footer";

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-white">
            <Header />
            <main className="container mx-auto">
                <Hero />
                <Features />
                <QuoteSection />
                <TrustedBy />
                <CTASection />
            </main>
            <Footer />
        </div>
    )
}
