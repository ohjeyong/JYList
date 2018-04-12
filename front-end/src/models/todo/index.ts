/* tslint:disable:variable-name */
import { User } from '../user';
import { APIComment, APITodo, APITag } from './APIReturn';

export { APITodo, APIComment, APITag };

export class Tag {
    readonly id: number;
    readonly name: string;
    constructor(apiReturn: Tag) {
        this.id = apiReturn.id;
        this.name = apiReturn.name;
    }
}

export const enum Category {
    FOOD = '먹을 것',
    PLACE = '갈 곳',
    TODO = '할 것'
}

export class Comment {
    readonly id: number;
    readonly content: string;
    readonly author: User;
    readonly createdAt: Date;
    constructor(apiReturn: APIComment) {
        this.id = apiReturn.id;
        this.content = apiReturn.content;
        this.author = new User(apiReturn.author);
        this.createdAt = new Date(apiReturn.created_at);
    }
}

export class Todo {
    readonly id: number;
    readonly content: string;
    readonly like: number;
    readonly category: keyof typeof Category;
    readonly isCompleted: boolean;
    readonly completeAt: Date;
    readonly author: User;
    readonly createdAt: Date;
    readonly commentList: Comment[];
    readonly tagList: Tag[];
    constructor(apiReturn: APITodo) {
        this.id = apiReturn.id;
        this.content = apiReturn.content;
        this.like = apiReturn.like;
        this.category = apiReturn.category;
        this.isCompleted = apiReturn.is_completed;
        this.completeAt = new Date(apiReturn.complete_at);
        this.author = new User(apiReturn.author);
        this.createdAt = new Date(apiReturn.created_at);
        this.commentList = [];
        for (let eachComment of apiReturn.comment_list) {
            this.commentList.push(new Comment(eachComment));
        }
        this.tagList = [];
        for (let eachTag of apiReturn.tag_list) {
            this.tagList.push(new Tag(eachTag));
        }
    }
}