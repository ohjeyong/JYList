import * as React from 'react';
import { TodoLi } from './TodoLi';
import { Todo, Category as CategoryType, CategoryInner as CategoryInnerType, Tag } from '../../models/todo';
import { CategorySelector } from './CategorySelector';
import blueGrey from 'material-ui/colors/blueGrey';
import AllIcon from '@material-ui/icons/Subject';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import Input, { InputAdornment } from 'material-ui/Input';
import SearchIcon from '@material-ui/icons/Search';

interface Category extends CategoryType {
    ALL: CategoryInnerType;
}

export const Category: Category = {
    ...CategoryType,
    ALL: {
        value: '모두',
        color: blueGrey[800],
        icon: AllIcon
    }
};

const CompleteCategory = {
    all: '모두 보기',
    complete: '완료만 보기',
    notComplete: '미완료만 보기'
};

interface State {
    category: keyof typeof Category;
    completeCategory: keyof typeof CompleteCategory;
    searchTerm: string;
    filteredTodoList: Todo[];
}

interface Props {
    todoList: Todo[];
    emptyTodoListText?: string;
}

export class TodoList extends React.Component<Props, State> {
    readonly state: State;
    constructor(props: Props) {
        super(props);
        this.state = {
            category: 'ALL',
            completeCategory: 'all',
            searchTerm: '',
            filteredTodoList: props.todoList
        };
    }

    onChangeCategory = (category: keyof typeof Category) => {
        this.setState({
            category: category,
            filteredTodoList: this.getFilteredTodoList(category, this.state.completeCategory, this.state.searchTerm)
        });
    }

    onChangeCompleteCategory = (completeCateogry: keyof typeof CompleteCategory) => {
        this.setState({
            completeCategory: completeCateogry,
            filteredTodoList: this.getFilteredTodoList(this.state.category, completeCateogry, this.state.searchTerm)
        });
    }

    onChangeSearchTerm = (searchTerm: string) => {
        this.setState({
            searchTerm,
            filteredTodoList: this.getFilteredTodoList(this.state.category, this.state.completeCategory, searchTerm)
        });
    }

    getFilteredTodoList = (category: keyof typeof Category, completeCategory: keyof typeof CompleteCategory,
                           searchTerm: string): Todo[] => {
        const { todoList } = this.props;
        return todoList.filter((elem: Todo) => {
            if (category !== 'ALL') {
                if (elem.category !== category) {
                    return false;
                }
            }
            if (completeCategory === 'complete') {
                if (!elem.isCompleted) {
                    return false;
                }
            } else if (completeCategory === 'notComplete') {
                if (elem.isCompleted) {
                    return false;
                }
            }
            if (searchTerm !== '') {
                const inContent = elem.content.indexOf(searchTerm) !== -1;
                let inTag = false;
                let tagIdx = 0;
                while (!inTag && tagIdx < elem.tagList.length) {
                    const tag: Tag = elem.tagList[tagIdx];
                    if (tag.name.indexOf(searchTerm) !== -1) {
                        inTag = true;
                    }
                    tagIdx ++;
                }
                if (!inContent && !inTag) {
                    return false;
                }
            }
            return true;
        });
    }

    render() {
        const { emptyTodoListText } = this.props;
        const { category, completeCategory, searchTerm, filteredTodoList } = this.state;
        let categorySelectorMovingBorderLeft = '0';
        if (category === 'ALL') {
            categorySelectorMovingBorderLeft = '0';
        } else if (category === 'FOOD') {
            categorySelectorMovingBorderLeft = '25%';
        } else if (category === 'PLACE') {
            categorySelectorMovingBorderLeft = '50%';
        } else if (category === 'TODO') {
            categorySelectorMovingBorderLeft = '75%';
        }
        return (
            <div className="TodoList">
                <div className="TodoListFilterWrapper">
                    <div className="TodoListFilterUpper">
                        <div
                            className="CategorySelectorMovingBorder"
                            style={{
                                border: `1px solid ${Category[category].color}`,
                                left: categorySelectorMovingBorderLeft
                            }}
                        />
                        <CategorySelector
                            category="ALL"
                            isActive={category === 'ALL'}
                            onClick={this.onChangeCategory}
                        />
                        <CategorySelector
                            category="FOOD"
                            isActive={category === 'FOOD'}
                            onClick={this.onChangeCategory}
                        />
                        <CategorySelector
                            category="PLACE"
                            isActive={category === 'PLACE'}
                            onClick={this.onChangeCategory}
                        />
                        <CategorySelector
                            category="TODO"
                            isActive={category === 'TODO'}
                            onClick={this.onChangeCategory}
                        />
                    </div>
                    <div
                        className="TodoListFilterLower"
                    >
                        <Select
                            style={{
                                fontSize: '0.8em'
                            }}
                            value={completeCategory}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                this.onChangeCompleteCategory(e.target.value as keyof typeof CompleteCategory);
                            }}
                        >
                            <MenuItem value="all">
                                {CompleteCategory.all}
                            </MenuItem>
                            <MenuItem value="complete">
                                {CompleteCategory.complete}
                            </MenuItem>
                            <MenuItem value="notComplete">
                                {CompleteCategory.notComplete}
                            </MenuItem>
                        </Select>
                        <Input
                            fullWidth={true}
                            style={{
                                marginLeft: '20px',
                                fontSize: '0.8em'
                            }}
                            value={searchTerm}
                            placeholder="내용, 태그로 검색"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                this.onChangeSearchTerm(e.currentTarget.value);
                            }}
                            endAdornment={
                                <InputAdornment position="end">
                                    <SearchIcon/>
                                </InputAdornment>
                            }
                        />
                    </div>
                </div>
                {
                    filteredTodoList.length === 0
                    ?
                        <span className="HelpText" style={{margin: 'auto'}}>{emptyTodoListText || 'Todo 가 없습니다.'}</span>
                    :
                        <ul>
                            {filteredTodoList.map((eachTodo: Todo) => {
                                return (
                                    <TodoLi key={eachTodo.id} todo={eachTodo}/>
                                );
                            })}
                        </ul>
                }
            </div>
        );
    }
}
