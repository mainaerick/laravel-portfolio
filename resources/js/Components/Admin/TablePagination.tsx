import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface TablePaginationProps {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
    totalItems: number
    itemsPerPage?: number
}

export function TablePagination({
                                    currentPage,
                                    totalPages,
                                    onPageChange,
                                    totalItems,
                                    itemsPerPage = 10,
                                }: TablePaginationProps) {
    const startItem = (currentPage - 1) * itemsPerPage + 1
    const endItem = Math.min(currentPage * itemsPerPage, totalItems)

    return (
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/50">
            <p className="text-sm text-muted-foreground">
                Showing {startItem} to {endItem} of {totalItems} results
            </p>
            <div className="flex gap-2">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="border-border/50"
                >
                    <ChevronLeft className="h-4 w-4" />
                </Button>
                <div className="flex items-center gap-1">
                    {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
                        let pageNum = i + 1
                        if (totalPages > 5 && currentPage > 3) {
                            pageNum = currentPage - 2 + i
                        }
                        if (pageNum > totalPages) return null

                        return (
                            <Button
                                key={pageNum}
                                variant={currentPage === pageNum ? "default" : "outline"}
                                size="sm"
                                onClick={() => onPageChange(pageNum)}
                                className={currentPage === pageNum ? "bg-neon-purple hover:bg-neon-purple/90" : "border-border/50"}
                            >
                                {pageNum}
                            </Button>
                        )
                    })}
                </div>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="border-border/50"
                >
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </div>
        </div>
    )
}
