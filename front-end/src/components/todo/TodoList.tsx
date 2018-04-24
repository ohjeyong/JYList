import * as React from 'react';
import { TodoLi } from './TodoLi';
import { Todo, Category as CategoryType, CategoryInner as CategoryInnerType, Tag } from '../../models/todo';
import { CategorySelector } from './CategorySelector';
import blueGrey from 'material-ui/colors/blueGrey';
import AllIcon from '@material-ui/icons/Subject';

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
        };
    }

    onChangeCategory = (category: keyof typeof Category) => {
        this.setState({
            category: category
        });
    }

    getFilteredTodoList = (): Todo[] => {
        const { todoList } = this.props;
        const { category, completeCategory, searchTerm } = this.state;
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
        const { category } = this.state;
        const filteredTodoList = this.getFilteredTodoList();
        if (filteredTodoList.length === 0) {
            return (
                <span className="HelpText" style={{margin: 'auto'}}>{emptyTodoListText || 'Todo 가 없습니다.'}</span>
            );
        } else {
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
                        <div>
                            selector, textfield
                        </div>
                    </div>
                    <ul>
                        {filteredTodoList.map((eachTodo: Todo) => {
                            return (
                                <TodoLi key={eachTodo.id} todo={eachTodo}/>
                            );
                        })}
                    </ul>
                </div>
            );
        }
    }
}
