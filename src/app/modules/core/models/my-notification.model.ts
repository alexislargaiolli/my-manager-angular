export class MyNotification {
    public static ID_SEQUENCE = 0;
    public id: number;
    constructor(public message: String, public type = NotificationType.INFO, public icon?: String) {
        this.id = MyNotification.ID_SEQUENCE++;
    }
}

export enum NotificationIcon {
    INFO = 'info_outline',
    WARNING = 'warning',
    ERROR = 'error_outline',
    SAVE = 'save',
    CREATE = 'check_circle',
    DELETE = 'delete'
}

export enum NotificationType {
    INFO = '',
    WARNING = 'bg-warning',
    ERROR = 'bg-error',
    SUCCESS = 'bg-success'
}