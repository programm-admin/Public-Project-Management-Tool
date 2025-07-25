import { MessageType } from '../functions/message-functions';

export interface MessageObject {
    life: number; // in ms
    severity: MessageType;
    summary: string;
    detail: string;
}
