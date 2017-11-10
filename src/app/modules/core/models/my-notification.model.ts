export class MyNotification {
    public static ID_SEQUENCE = 0;
    public id: number;
    public icon: String;
    public iconBackgroundClass: String;
    constructor(public type: NotificationType, public message: String) {
        this.id = MyNotification.ID_SEQUENCE++;
    }
}

export enum NotificationType {
    INFO,
    WARNING,
    ERROR,
    SAVE
}

export class NotificationWarning extends MyNotification {
    constructor(public message: String) {
        super(NotificationType.INFO, message);
        this.icon = 'warning';
        this.iconBackgroundClass = 'bg-warning';
    }
}

export class NotificationError extends MyNotification {
    constructor(public message: String) {
        super(NotificationType.INFO, message);
        this.icon = 'error_outline';
        this.iconBackgroundClass = 'bg-danger';
    }
}

export class NotificationSaveSuccess extends MyNotification {
    constructor(public message: String) {
        super(NotificationType.INFO, message);
        this.icon = 'save';
        this.iconBackgroundClass = 'bg-success';
    }
}
