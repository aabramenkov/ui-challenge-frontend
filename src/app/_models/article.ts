import { Comment } from './comment';

export interface Article {
  id: number;
  title: string;
  body: string;
  description: string;
  slug: string;
  tagList: string[];
  favoriteCount: number;
  created: Date;
  updated: Date;
  comments: Comment[];
}
