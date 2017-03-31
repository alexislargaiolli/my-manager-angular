import { Component, OnInit, Inject, Input } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Project } from './../../../../model/project.model';
import { Task, TaskState } from '../../../../model/task.model';
import { TaskService } from '../../../../services/task.service';

@Component({
  selector: 'project-task',
  templateUrl: './project-task.component.html',
  styleUrls: ['./project-task.component.css']
})
export class ProjectTaskComponent implements OnInit {
  public states = TaskState;
  public tasks: Task[];
  public projectId: number;
  public selectedTask: Task;

  constructor(private taskService: TaskService, private route: ActivatedRoute) { }

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
    this.taskService.update(this.selectedTask).subscribe(task => {
      this.selectedTask = task;
    });
  }

  private loadTask() {
    this.taskService.getByProject(this.projectId).subscribe(tasks => {
      this.tasks = tasks;
    });
  }

}
