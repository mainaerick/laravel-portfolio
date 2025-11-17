import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOut, Settings } from "lucide-react"
import { router, usePage } from '@inertiajs/react';

export function AdminNavbar() {
    const pathname = "admin/about"
    const { props } = usePage();
    const user = props.auth?.user;
    const getPageTitle = () => {
        const segments = pathname.split("/").filter(Boolean)
        if (segments.length === 1) return "Dashboard"
        return segments[segments.length - 1].charAt(0).toUpperCase() + segments[segments.length - 1].slice(1)
    }
    const handleLogout = () => {
        router.post(route("logout"));
    };

    return (
        <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6">
            <div>
                <h2 className="text-lg font-semibold text-foreground">{getPageTitle()}</h2>
            </div>

            <div className="flex items-center gap-4">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                            <Avatar className="h-10 w-10">
                                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                <AvatarFallback>AD</AvatarFallback>
                            </Avatar>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                        <div className="flex items-center justify-start gap-2 p-2">
                            <div className="flex flex-col space-y-1 leading-none">
                                <p className="font-medium">{user?.name}</p>
                                <p className="text-xs text-muted-foreground">{user?.email}</p>
                            </div>
                        </div>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <Settings className="mr-2 h-4 w-4" />
                            <span>Settings</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={()=>handleLogout()}>
                            <LogOut className="mr-2 h-4 w-4" />
                            <span>Logout</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    )
}
