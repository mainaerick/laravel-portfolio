import { useState, useEffect } from "react"
import { router } from '@inertiajs/react'

export type SortOrder = "asc" | "desc"

interface UseTableProps {
    initialSortField?: string
    initialSortOrder?: SortOrder
    perPage?: number
    filters?: any
    baseUrl: string
}

export function useTable({
                             initialSortField,
                             initialSortOrder = "asc",
                             perPage = 10,
                             filters = {},
                             baseUrl,
                         }: UseTableProps) {
    const [search, setSearch] = useState(filters.search ?? "")
    const [sortField, setSortField] = useState<string | null>(initialSortField ?? null)
    const [sortOrder, setSortOrder] = useState<SortOrder>(initialSortOrder as SortOrder)
    const [page, setPage] = useState(filters.page ?? 1)

    useEffect(() => {
        const timeout = setTimeout(() => {
            router.get(
                baseUrl,
                {
                    search,
                    sort: sortField,
                    order: sortOrder,
                    page,
                    per_page: perPage,
                } as any,
                {
                    preserveState: true,
                    replace: true,
                }
            )
        }, 300) // debounce search typing
        return () => clearTimeout(timeout)
    }, [search, sortField, sortOrder, page, perPage])

    const handleSort = (field: string) => {
        if (sortField === field) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc")
        } else {
            setSortField(field)
            setSortOrder("asc")
        }
    }

    return {
        search,
        setSearch,
        sortField,
        sortOrder,
        handleSort,
        page,
        setPage,
    }
}
