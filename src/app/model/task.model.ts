import { IProjectModel } from './abstract-project.model';

export class Task implements IProjectModel {
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
    public todos: Task[];
    public inprogress: Task[];
    public finished: Task[];
    public groups: Array<any> = [];
    
    constructor(tasks: Task[]) {
        this.addGroup('TODO', TaskKaban.filterByState(tasks, TaskState.TODO));
        this.addGroup('INPROGRESS', TaskKaban.filterByState(tasks, TaskState.IN_PROGRESS));
        this.addGroup('FINISHED', TaskKaban.filterByState(tasks, TaskState.FINISHED));
    }

    private addGroup(groupName:string, tasks:Task[]){
        this.groups.push({
            name : groupName,
            items: tasks
        });
    }

    public getByState(state: TaskState) {
        switch (state) {
            case TaskState.TODO:
                return this.todos;
            case TaskState.IN_PROGRESS:
                return this.inprogress;
            case TaskState.FINISHED:
                return this.finished;
        }
        return null;
    }

    public swap(task: Task, newState: TaskState) {
        let from = this.getByState(task.state);
        let to = this.getByState(newState);
        from.splice(from.findIndex((t) => t.id === task.id), 1);
        to.push(task);
    }

    public static filterByState(tasks: Task[], state: TaskState): Task[] {
        return tasks.filter(task => {
            return task.state === state;
        });
    }
}
