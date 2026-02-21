export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="admin-layout flex h-screen">
            {/* Sidebar will go here */}
            <aside className="admin-sidebar w-64 shrink-0" />
            <main className="admin-content flex-1 overflow-y-auto">
                {children}
            </main>
        </div>
    )
}
