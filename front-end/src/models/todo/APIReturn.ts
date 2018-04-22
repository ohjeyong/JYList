import { APIUser } from '../user';
import { Category } from '.';

export interface APITag {
    id: number;
    name: string;
}

export interface APIComment {
    id: number;
    created_at: string;
    content: string;
    author: APIUser;
}

export interface APITodo {
    id: number;
    content: string;
    like: number;
    category: keyof typeof Category;
    is_completed: boolean;
    complete_at: string | null;
    complete_by: APIUser | null;
    author: APIUser;
    created_at: string;
    comment_list: APIComment[];
    tag_list: APITag[];
}
