// Admin Sidebar — placeholder
// Will contain navigation links for admin routes
export function AdminSidebar() {
    return (
        <aside className="h-full w-64 bg-neutral-900 text-white p-6">
            <h2 className="text-lg font-bold mb-8">Admin Panel</h2>
            <nav className="space-y-2">
                <a href="/dashboard" className="block px-4 py-2 rounded hover:bg-neutral-800 text-sm">Dashboard</a>
                <a href="/users" className="block px-4 py-2 rounded hover:bg-neutral-800 text-sm">Users</a>
                <a href="/settings" className="block px-4 py-2 rounded hover:bg-neutral-800 text-sm">Settings</a>
            </nav>
        </aside>
    )
}
