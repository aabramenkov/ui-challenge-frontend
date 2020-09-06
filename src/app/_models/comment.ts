import { User } from './user';

export interface Comment {
    id: number;
    created: Date;
    body: string;
    articleId: number;
    author: User;
}
