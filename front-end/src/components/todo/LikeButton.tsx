import * as React from 'react';
import { Button } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { LikeButton as Props } from '../../containers/todo/LikeButtonContainer';

export const LikeButton: React.SFC<Props> = (props: Props) => {
    return (
        <Button
            className="LikeButton"
            onClick={() => props.requestAddLike(props.todo.id)}
        >
            <FavoriteIcon
                style={{
                    width: '0.6em',
                    height: '0.6em',
                    marginRight: '5px'
                }}
            />
            {props.todo.like}
        </Button>
    );
};