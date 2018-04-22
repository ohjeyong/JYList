/* tslint:disable:variable-name */
import { User } from '../user';
import { APIComment, APITodo, APITag } from './APIReturn';
import Orange from 'material-ui/colors/orange';
import Teal from 'material-ui/colors/teal';
import Blue from 'material-ui/colors/blue';
import SvgIcon from 'material-ui/SvgIcon';
import FoodIcon from '@material-ui/icons/Restaurant';
import PlaceIcon from '@material-ui/icons/Place';
import TodoIcon from '@material-ui/icons/Star';
import teal from 'material-ui/colors/teal';

export { APITodo, APIComment, APITag };

export class Tag {
    readonly id: number;
    readonly name: string;
    constructor(apiReturn: Tag) {
        this.id = apiReturn.id;
        this.name = apiReturn.name;
    }
}

interface CategoryInner {
    value: string;
    color: string;
    icon: typeof SvgIcon;
}

interface Category {
    FOOD: CategoryInner;
    PLACE: CategoryInner;
    TODO: CategoryInner;
}

export const Category: Category = {
    FOOD: {
        value: '먹을 것',
        color: Orange[500],
        icon: FoodIcon
    },
    PLACE: {
        value: '갈 곳',
        color: Teal[500],
        icon: PlaceIcon
    },
    TODO: {
        value: '할 것',
        color: Blue[500],
        icon: TodoIcon
    }
};

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
    readonly completeAt: Date | null;
    readonly author: User;
    readonly createdAt: Date;
    readonly commentList: Comment[];
    readonly tagList: Tag[];
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
