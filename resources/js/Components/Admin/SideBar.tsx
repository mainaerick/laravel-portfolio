import { cn } from "@/lib/utils"
import { LayoutDashboard, User, FolderOpen, Tag, Zap, Share2, Mail, Users } from "lucide-react"
import { Link } from '@inertiajs/react';

const navItems = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/about", label: "About", icon: User },
    { href: "/admin/projects", label: "Projects", icon: FolderOpen },
    { href: "/admin/tags", label: "Tags", icon: Tag },
    { href: "/admin/skills", label: "Skills", icon: Zap },
    { href: "/admin/socials", label: "Socials", icon: Share2 },
    { href: "/admin/contacts", label: "Contacts", icon: Mail },
    { href: "/admin/users", label: "Users", icon: Users },
]

export function AdminSidebar() {
    const pathname = "/admin/about"

    return (
        <aside className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
            {/* Logo */}
            <div className="p-6 border-b border-sidebar-border">
                <h1 className="text-xl font-bold bg-gradient-to-r from-neon-purple to-neon-blue bg-clip-text text-transparent">
                    Portfolio Admin
                </h1>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto p-4 space-y-2">
                {navItems.map((item) => {
                    const Icon = item.icon
                    const isActive = pathname === item.href || pathname.startsWith(item.href + "/")

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200",
                                isActive
                                    ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-lg shadow-neon-purple/20"
                                    : "text-sidebar-foreground hover:bg-sidebar-accent/50",
                            )}
                        >
                            <Icon className="w-5 h-5" />
                            <span className="font-medium">{item.label}</span>
                        </Link>
                    )
                })}
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-sidebar-border">
                <p className="text-xs text-sidebar-foreground/60">v1.0.0</p>
            </div>
        </aside>
    )
}
