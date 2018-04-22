import * as React from 'react';
import Tooltip from 'material-ui/Tooltip';
import { beautifyDateTime } from '../../utils/date';
// @ts-ignore
import ReactTimeAgo from 'react-timeago';
// @ts-ignore
import koreanString from 'react-timeago/lib/language-strings/ko';
// @ts-ignore
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';

const formatter = buildFormatter(koreanString);

interface Props {
    date: Date;
    style?: React.CSSProperties;
}

export const TimeAgo: React.SFC<Props> = (props: Props) => {
    const date = props.date;
    return (
        <Tooltip
            title={beautifyDateTime(date)}
        >
            <ReactTimeAgo
                date={date}
                formatter={formatter}
                style={{
                    ...props.style
                }}
            />
        </Tooltip>
    );
};
