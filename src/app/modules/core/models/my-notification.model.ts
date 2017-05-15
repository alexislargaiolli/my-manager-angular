export class MyNotification {
    id: number;
    type: NotificationType;
    message: any;
}

export enum NotificationType {
    INFO,
    WARNING,
    ERROR
}