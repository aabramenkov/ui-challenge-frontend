import { Article } from '../_models/article';

export class MockModels {
    static get article(): Article{
        return {
            id: 1,
            title: 'string',
            body: 'string',
            description: 'string',
            slug: 'string',
            tagList: [],
            favoriteCount: 1,
            created: new Date(),
            updated: new Date(),
            comments: []
        };
    }
}
