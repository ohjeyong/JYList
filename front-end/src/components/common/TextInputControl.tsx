import * as React from 'react';
import { Input, InputLabel, FormControl, FormHelperText } from '@material-ui/core';

interface Props {
    errorObject: object;
    name: string;
    className?: string;
    value: string;
    /* tslint:disable:no-any */
    onChange: (e: any) => any;
    /* tslint:enable:no-any */
    autoFocus?: boolean;
    fullWidth: boolean;
    label: string;
    type?: string;
}

export const TextInputControl: React.SFC<Props> = (props: Props) => {
    const { errorObject, name, className, value, onChange, autoFocus, fullWidth, label, type } = props;
    const hasError = errorObject.hasOwnProperty(name);
    return (
        <FormControl
            className={`${className ? className : ''}`}
            fullWidth={fullWidth}
            error={hasError}
        >
            <InputLabel>{label}</InputLabel>
            <Input
                value={value}
                onChange={onChange}
                autoFocus={autoFocus || false}
                type={type || 'text'}
            />
            {hasError ?
                errorObject[name].map((errorMessage: string, idx: number) => (
                    <FormHelperText key={idx}>
                        {errorMessage}
                    </FormHelperText>
                ))
                : null}
        </FormControl>
    );
};
