import { Button } from "@/components/ui/button"
import { ArrowUp, ArrowDown } from "lucide-react"

interface TableSortHeaderProps {
    label: string
    sortable?: boolean
    isSorted?: boolean
    sortOrder?: "asc" | "desc"
    onClick?: () => void
}

export function TableSortHeader({
                                    label,
                                    sortable = false,
                                    isSorted = false,
                                    sortOrder,
                                    onClick,
                                }: TableSortHeaderProps) {
    if (!sortable) return <>{label}</>

    return (
        <Button variant="ghost" size="sm" onClick={onClick} className="p-0 hover:bg-transparent">
            <div className="flex items-center gap-2">
                {label}
                {isSorted && (
                    <>
                        {sortOrder === "asc" && <ArrowUp className="h-4 w-4 text-neon-purple" />}
                        {sortOrder === "desc" && <ArrowDown className="h-4 w-4 text-neon-purple" />}
                    </>
                )}
            </div>
        </Button>
    )
}
