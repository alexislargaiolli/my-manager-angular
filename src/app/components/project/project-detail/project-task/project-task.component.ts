import { DragulaService } from 'ng2-dragula/ng2-dragula';
import { Component, OnInit, Inject, Input } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Project } from './../../../../model/project.model';
import { Task, TaskKaban, TaskState } from '../../../../model/task.model';
import { TaskService } from '../../../../services/task.service';

@Component({
  selector: 'project-task',
  templateUrl: './project-task.component.html',
  styleUrls: ['./project-task.component.scss']
})
export class ProjectTaskComponent implements OnInit {
  public TaskState = TaskState;
  public tasks: Task[];
  public kaban: TaskKaban;
  public todoTasks: Task[];
  public inprogressTasks: Task[];
  public finishedTasks: Task[];

  public projectId: number;
  public selectedTask: Task;

  constructor(private taskService: TaskService, private route: ActivatedRoute, private dragulaService: DragulaService) {
    dragulaService.drop.subscribe((value) => {
      console.log('from '+value[3].getAttribute('column-id'))
      console.log('to '+value[2].getAttribute('column-id'))
      console.log(value[1].getAttribute('task-id'));
    });
  }

  public ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.projectId = params['projectId'];
      this.loadTask();
    });
  }

  public selectTask(task: Task) {
    if (this.selectedTask === task) {
      this.unselect();
    } else {
      this.selectedTask = task;
    }
  }

  public unselect() {
    this.selectedTask = null;
  }

  public createTask(form: NgForm) {
    const task = form.value;
    task.project = this.projectId;
    this.taskService.create(task).subscribe(t => {
      form.reset();
      this.tasks.push(t);
    });
  }

  public deleteTask(taskToDelete: Task) {
    this.taskService.delete(taskToDelete).subscribe(res => {
      this.tasks.splice(this.tasks.findIndex((task) => task.id === taskToDelete.id), 1);
      this.unselect();
    });
  }

  public updateSelected() {
    // this.taskService.update(this.selectedTask).subscribe(task => {
    //   this.selectedTask = task;
    // });
  }

  public onDropTodo(task: Task) {
    this.changeState(task, TaskState.TODO);
  }

  public onDropInprogress(task: Task) {
    this.changeState(task, TaskState.IN_PROGRESS);
  }

  public onDropFinished(task: Task) {
    this.changeState(task, TaskState.FINISHED);
  }

  private loadTask() {
    this.taskService.getByProject(this.projectId).subscribe(tasks => {
      this.tasks = tasks;
      this.kaban = new TaskKaban(tasks);
    });
  }

  public changeState(task: Task, newState: TaskState) {
    this.kaban.swap(task, newState);
    task.state = newState;
  }

  get groups() {
    return this.kaban.groups;
  }

}
