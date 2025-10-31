import type React from "react"
import { AdminSidebar } from '@/Components/Admin/SideBar';
import { AdminNavbar } from '@/Components/Admin/NavBar';
import { Toaster } from 'sonner';

export default function AdminLayout({
                                        children,
                                    }: {
    children: React.ReactNode
}) {
    return (
        <div className="flex h-screen bg-background">
            <AdminSidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <AdminNavbar />
                <main className="flex-1 overflow-auto">{children}</main>
                <Toaster />
            </div>
        </div>
    )
}
