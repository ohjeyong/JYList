import * as React from 'react';
import { Tooltip } from '@material-ui/core';
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
    const beautifiedDateTime = beautifyDateTime(date);
    return (
        <Tooltip
            title={beautifiedDateTime}
        >
            <ReactTimeAgo
                date={date}
                formatter={formatter}
                title={null}
                style={{
                    ...props.style,
                    color: 'rgba(0,0,0,0.54)'
                }}
            />
        </Tooltip>
    );
};
