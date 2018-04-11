import * as React from 'react';
import { MainSwitch } from '../../routers/MainSwitch';

export const TodoIndex: React.SFC<{}> = () => (
    <div className="Todo">
        <div className="Header">
            JY List
        </div>
        <MainSwitch/>
    </div>
);
