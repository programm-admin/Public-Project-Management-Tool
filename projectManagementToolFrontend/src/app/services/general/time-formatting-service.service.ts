import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class TimeFormattingServiceService {
    constructor() {}

    public formatDateToGermanDate = (date: Date): string => {
        // a function that returns a string representation of a given date in format dd.mm.yyyy
        // if date or month < 10 then it will insert a zero: (0date) or (0month)

        if (date.getDate() < 10 && date.getMonth() + 1 < 10) {
            return `0${date.getDate()}.0${
                date.getMonth() + 1
            }.${date.getFullYear()}`;
        } else if (date.getDate() > 10 && date.getMonth() + 1 < 10) {
            return `${date.getDate()}.0${
                date.getMonth() + 1
            }.${date.getFullYear()}`;
        } else if (date.getDate() < 10 && date.getMonth() + 1 > 10) {
            return `0${date.getDate()}.${
                date.getMonth() + 1
            }.${date.getFullYear()}`;
        } else {
            return `${date.getDate()}.${
                date.getMonth() + 1
            }.${date.getFullYear()}`;
        }
    };

    public formatDateForInput = (date: Date): string => {
        // if ((date.getDate() < 10) && (date.getMonth() + 1 < 10)) {
        //     return `0${ date.getFullYear() }-0${ date.getMonth() }-${ date.getDate() }`;

        // } else if ((date.getDate() > 10) && (date.getMonth() + 1 < 10)) {
        //     return `${ date.getFullYear() }-0${ date.getMonth() }-${ date.getDate() }`;

        // } else if ((date.getDate() < 10) && (date.getMonth() + 1 > 10)) {
        //     return `0${ date.getFullYear() }-${ date.getMonth() + 1 }-${ date.getDate() }`;

        // } else {
        //     return `${ date.getFullYear() }-${ date.getMonth() + 1 }-${ date.getDate() }`;
        // }

        return date.toISOString().split('T')[0];
    };

    public calculateTimeDifference = (date1: Date, date2: Date): number => {
        const difference: number =
            Math.abs(
                Math.round(
                    (date1.getTime() - date2.getTime()) / (1000 * 60 * 60 * 24)
                )
            ) + 1;

        if (date1.getTime() === date2.getTime()) {
            return 1;
        } else if (difference === 0) {
            return 1;
        } else {
            return Math.abs(difference);
        }
    };

    calculateDateDifference = (date1: Date, date2: Date) => {
        return (
            Math.abs(
                Math.round(
                    (date1.getTime() - date2.getTime()) / (1000 * 3600 * 24)
                )
            ) + 1
        );
    };
}
