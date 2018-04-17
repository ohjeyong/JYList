import * as React from 'react';
import { Category } from '../../models/todo';

interface Props {
    category: keyof typeof Category;
}

export const CategoryChip: React.SFC<Props> = (props: Props) => {
    const { category } = props;
    return (
        <div
            className="CategoryChip"
            style={{
                backgroundColor: Category[category].color,
            }}
        >
            <div>
                {React.createElement(Category[category].icon, { style: { width: '0.6em', height: '0.6em' } })}
                <span>{Category[category].value}</span>
            </div>
        </div>
    );
};