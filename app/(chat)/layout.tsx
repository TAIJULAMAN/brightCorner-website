export default function ChatLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="chat-layout">
            {/* Chat navbar will go here */}
            <main className="chat-content">
                {children}
            </main>
        </div>
    )
}
