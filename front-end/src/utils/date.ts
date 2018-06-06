import { twoDigitLeadingZero } from './string';

export function beautifyDateTime(dateObject: Date, includeYear: boolean = true, includeTime: boolean = true) {
    const timeString = includeTime ?
        ` ${twoDigitLeadingZero(dateObject.getHours())}:${twoDigitLeadingZero(dateObject.getMinutes())}` : '';
    const dateString =
        `${includeYear ? `${dateObject.getFullYear()}/` : ''}` +
        `${twoDigitLeadingZero(dateObject.getMonth() + 1)}/${twoDigitLeadingZero(dateObject.getDate())}`;
    return `${dateString}${timeString}`;
}