import { DragulaService } from 'ng2-dragula/ng2-dragula';
import { Component, OnInit, Inject, Input, HostBinding } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Task, TaskState, TaskKaban } from 'app/models';
import { TaskService } from '../../../services/task.service';
import { slideInDownAnimation } from 'app/animations';

@Component({
  selector: 'app-project-task',
  templateUrl: './project-task.component.html',
  styleUrls: ['./project-task.component.scss'],
  animations: [slideInDownAnimation]
})
export class ProjectTaskComponent implements OnInit {
  @HostBinding('@routeAnimation') routeAnimation = true;
  
  public projectId: number;
  public state = TaskState;
  public kaban: TaskKaban;
  public selectedTask: Task;

  constructor(private route: ActivatedRoute, private taskService: TaskService, private dragulaService: DragulaService) {
    this.kaban = new TaskKaban();

    dragulaService.drop.subscribe((value) => {
      const taskId = +value[1].getAttribute('task-id');
      const oldState: number = +value[3].getAttribute('column-id');
      const newState: number = +value[2].getAttribute('column-id');
      this.changeState(taskId, oldState, newState);
    });
  }

  public ngOnInit() {
    this.route.parent.params.subscribe(params => {
      this.projectId = +params['projectId'];
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
    this.taskService.createByProject(this.projectId, form.value).subscribe(t => {
      form.reset();
      this.kaban.createTask(t);
    });
  }

  public deleteTask(taskToDelete: Task) {
    this.taskService.delete(taskToDelete).subscribe(res => {
      this.unselect();
    });
  }

  public updateSelected() {
    // this.taskService.update(this.selectedTask).subscribe(task => {
    //   this.selectedTask = task;
    // });
  }

  private loadTask() {
    this.taskService.getByProject(this.projectId).subscribe(tasks => {
      this.kaban.setTask(tasks);
    });
  }

  public changeState(taskId: number, oldState: TaskState, newState: TaskState) {
    // console.log('swap %d from %s to %s', taskId, oldState, newState);
    const task = this.kaban.swap(taskId, oldState, newState);
    this.taskService.updateByProject(this.projectId, task).subscribe();
  }

}