export function twoDigitLeadingZero(inputNumber: number | string): string {
    const input = Number(inputNumber);
    if (input < 10) {
        return `0${input.toString()}`;
    }
    return input.toString();
}