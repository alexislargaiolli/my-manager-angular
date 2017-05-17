export class ActionUtils {
    /**
     * Action state for server request sent and waiting for a response
     */
    public static readonly REQUEST = 'REQUEST';

    /**
     * Action state for success server response
     */
    public static readonly SUCCESS = 'SUCCESS';

    /**
     * Action state for error server response
     */
    public static readonly ERROR = 'ERROR';

    /**
     * Create an asynchrone action as { type: <modelName>_<actionType>_<actionState>, payload? : <payload> }
     * @param {string} actionSource source of the action (Project, Session, User...)
     * @param {string} actionName name of the action (LOAD, GET, SAVE...)
     * @param {string} actionState state of the action (REQUEST, SUCCESS, ERROR)
     * @param {Object} payload parameters of the action
     */
    public static createAction(actionSource: string, actionName: string, actionState: string, payload: any) {
        const action = {
            type: ActionUtils.asyncActionType(actionSource, actionName, actionState)
        }
        if (payload != null) {
            action['payload'] = payload;
        }
        return action;
    }

    /**
     * Generate an asynchrone action name
     * @param {string} actionSource source of the action (Project, Session, User...)
     * @param {string} actionName name of the action (LOAD, GET, SAVE...)
     * @param {string} actionState state of the action (REQUEST, SUCCESS, ERROR)
     */
    public static asyncActionType(actionSource: string, actionName: string, actionState: string): string {
        return `${actionSource}_${actionName}_${actionState}`;
    }
}
