import { MessageObject } from '../interfaces/message-interfaces';

export type MessageType =
    | 'error'
    | 'warn'
    | 'success'
    | 'info'
    | 'danger'
    | 'secondary'
    | 'contrast';

export const getMessageObject = (
    severity: MessageType,
    summary: string = '',
    detail: string = ''
): MessageObject => {
    return {
        life: 7000, // in ms
        severity,
        summary,
        detail,
    };
};
