/* tslint:disable:variable-name */
import { User } from '../user';
import { APIComment, APITodo, APITag } from './APIReturn';
import { SvgIcon } from '@material-ui/core';
import FoodIcon from '@material-ui/icons/Restaurant';
import PlaceIcon from '@material-ui/icons/Place';
import TodoIcon from '@material-ui/icons/Star';
import { teal, orange, blue } from '@material-ui/core/colors';

export { APITodo, APIComment, APITag };

export class Tag {
    readonly id: number;
    name: string;
    constructor(apiReturn: Tag) {
        this.id = apiReturn.id;
        this.name = apiReturn.name;
    }
}

export interface CategoryInner {
    value: string;
    color: string;
    icon: typeof SvgIcon;
}

export interface Category {
    FOOD: CategoryInner;
    PLACE: CategoryInner;
    TODO: CategoryInner;
}

export const Category: Category = {
    FOOD: {
        value: '먹을 것',
        color: orange[500],
        icon: FoodIcon
    },
    PLACE: {
        value: '갈 곳',
        color: teal[500],
        icon: PlaceIcon
    },
    TODO: {
        value: '할 것',
        color: blue[500],
        icon: TodoIcon
    }
};

export class Comment {
    readonly id: number;
    content: string;
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
    content: string;
    like: number;
    category: keyof typeof Category;
    isCompleted: boolean;
    completeAt: Date | null;
    readonly author: User;
    readonly createdAt: Date;
    commentList: Comment[];
    tagList: Tag[];
    static GetCompleteColor() {
        return teal[500];
    }
    constructor(apiReturn: APITodo) {
        this.id = apiReturn.id;
        this.content = apiReturn.content;
        this.like = apiReturn.like;
        this.category = apiReturn.category;
        this.isCompleted = apiReturn.is_completed;
        this.completeAt = apiReturn.complete_at ? new Date(apiReturn.complete_at) : null;
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
    getCategory() {
        return Category[this.category];
    }
}
