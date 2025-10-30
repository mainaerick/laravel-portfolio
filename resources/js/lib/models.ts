export interface About {
    id: number;
    name: string;
    title: string;
    subtitle?: string | null;
    bio?: string | null;
    resume_url?: string | null;
    cta_label: string;      // default: "Get in Touch"
    cta_link: string;       // default: "#contact"
    avatar?: string | null; // optional image path
    created_at: string;     // ISO date string (e.g. "2025-10-30T12:34:56Z")
    updated_at: string;
}

export interface Social {
    id: number;
    provider: string;       // e.g. "github", "linkedin", "twitter", "email"
    url: string;            // full link or mailto
    label: string | null;  // optional display label
    order: number;          // default: 0
    created_at: string;     // ISO date string (e.g. "2025-10-30T12:34:56Z")
    updated_at: string;
}
