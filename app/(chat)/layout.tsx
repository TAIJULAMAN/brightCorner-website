import { Sidebar } from "@/components/chat/sidebar"
import { ChatProvider } from "@/context/chat-context"

export default function ChatLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <ChatProvider>
            <div className="flex h-screen bg-white overflow-hidden">
                <Sidebar />
                <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
                    {children}
                </main>
            </div>
        </ChatProvider>
    )
}
