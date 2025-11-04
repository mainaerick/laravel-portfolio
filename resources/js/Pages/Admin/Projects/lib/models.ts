export interface Tag {
    id: number;
    name: string;
    slug?:string
}

export interface Project {
    id: number;
    title: string;
    slug: string;
    description?: string;
    thumbnail?: string | null;
    github?: string | null;
    live_url?: string | null;
    is_featured: boolean;
    order: number;
    tags?: Tag[];
    created_at?: string;
    updated_at?: string;
    thumbnail_file: File | null
    _method: string
    tag_ids?: number[]; // selected IDs for form

}
interface PaginationLink {
    url: string | null; // Can be a string URL or null
    label: string;
    page: number | null; // Can be a number or null
    active: boolean;
}
interface PaginatedResponse<T> {
    current_page: number;
    data: T[];
    first_page_url: string;
    from: number | null; // Null if data is empty
    last_page: number;
    last_page_url: string;
    links: PaginationLink[];
    next_page_url: string | null; // Can be a string URL or null
    path: string;
    per_page: number;
    prev_page_url: string | null; // Can be a string URL or null
    to: number | null; // Null if data is empty
    total: number;
}

// Specific type for your project data
export type PaginatedProjects = PaginatedResponse<Project>;
export type PaginatedTags = PaginatedResponse<Tag>;
