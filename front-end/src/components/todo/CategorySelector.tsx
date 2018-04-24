import * as React from 'react';
import { Category } from './TodoList';

interface Props {
    category: keyof typeof Category;
    isActive: boolean;
    onClick: (category: keyof typeof Category) => void;
}

export const CategorySelector: React.SFC<Props> = (props: Props) => {
    const { category, isActive, onClick } = props;
    let style: React.CSSProperties;
    if (isActive) {
        style = {
            color: Category[category].color,
            fontWeight: 'bold'
        };
    } else {
        style = {
            color: 'rgba(0,0,0,0.35)',
            border: 'none'
        };
    }
    return (
        <div
            className="CategorySelector"
            style={style}
            onClick={() => onClick(category)}
        >
            {React.createElement(Category[category].icon, { style: { width: '0.6em', height: '0.6em' } })}
            <span style={{marginLeft: '5px'}}>{Category[category].value}</span>
        </div>
    );
};
