import { Component } from '@angular/core';
import { TasksService } from '../services/tasks.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  public tasks: string[];
  public task: string;

  constructor(private tasksService: TasksService) {
    this.tasks = this.tasksService.getTasks();
    this.task = '';
  }

  public addTask() {
    this.tasksService.addTask(this.task);
    this.tasks = this.tasksService.getTasks();
    console.log(this.tasks);
    this.task = '';
  }

  public completeTask(index: number) {
    this.tasksService.completeTask(index);
  }

  public removeTask(index: number) {
    this.tasksService.removeTask(index);
    this.tasks = this.tasksService.getTasks();
  }

  onKeydown(event) {
    if (event.key === 'Enter') {
      this.addTask();
    }
  }
}
