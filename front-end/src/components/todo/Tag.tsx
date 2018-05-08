import * as React from 'react';
import Chip from 'material-ui/Chip';
import { Tag as TagModel } from '../../models/todo';

interface Props {
    onRemove?: (name: string) => void;
    tag: TagModel;
}

export const Tag: React.SFC<Props> = (props: Props) => {
    const { tag, onRemove } = props;
    return (
        <Chip
            className="Tag"
            style={{
                marginBottom: '5px'
            }}
            label={tag.name}
            onDelete={
                onRemove ? () => onRemove(tag.name) :
                undefined
            }
        />
    );
};
