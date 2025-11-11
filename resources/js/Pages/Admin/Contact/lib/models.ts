import { PaginatedResponse } from '@/Pages/Admin/Projects/lib/models';
import { Social } from '@/lib/models';

export interface Message {
    id?: number;
    name: string;
    email: string;
    subject: string;
    message: string;
    ip?: string;
    is_read: boolean;
    created_at?: string;
    updated_at?: string;
}
export type PaginatedMessages = PaginatedResponse<Message>;
