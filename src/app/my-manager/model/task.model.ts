import { IModel } from 'app/core/generics/models/generic.model';

export class Task implements IModel {
    public id: number;
    public createdAt: Date;
    public updatedAt: Date;
    public title: string;
    public description: string;
    public project: number;
    public state: TaskState = TaskState.TODO;
}

export enum TaskState {
    TODO,
    IN_PROGRESS,
    FINISHED,
    CANCELED
}

export class TaskKaban {
    public groups: Array<any> = [];
    public tasks: Task[] = [];

    public static filterByState(tasks: Task[], state: TaskState): Task[] {
        return tasks.filter(task => {
            return task.state === state;
        });
    }

    constructor(tasks: Task[]) {
        tasks.forEach(task => this.tasks[task.id] = task);
        this.addGroup('TODO', TaskState.TODO, TaskKaban.filterByState(tasks, TaskState.TODO));
        this.addGroup('INPROGRESS', TaskState.IN_PROGRESS, TaskKaban.filterByState(tasks, TaskState.IN_PROGRESS));
        this.addGroup('FINISHED', TaskState.FINISHED, TaskKaban.filterByState(tasks, TaskState.FINISHED));
    }

    public swap(taskId: number, oldState: TaskState, newState: TaskState) {
        const task = this.tasks[taskId];
        task.state = newState;
        return task;
    }

    public createTask(task: Task) {
        this.tasks[task.id] = task;
        this.findByState(task.state).push(task);
    }

    private addGroup(groupName: string, state: TaskState, tasks: Task[]) {
        this.groups[state] = {
            name: groupName,
            items: tasks
        };
    }

    public findTask(taskId: number): Task {
        return this.tasks[taskId];
    }

    public findByState(state: TaskState): Task[] {
        return this.groups[state].items;
    }
}
