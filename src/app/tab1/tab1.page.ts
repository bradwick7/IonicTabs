import { Component } from '@angular/core';
import { TasksService } from '../services/tasks.service';
import { Task } from '../models/task';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  public tasks: Task[] = [];
  public task: Task;

  constructor(private tasksService: TasksService) {
    this.task = {
      tarea: ''
    }
    this.tasksService.getTasks().subscribe( res => {
      this.tasks = res;
    })
  }

  public addTask() {
    this.tasksService.addTask(this.task);
    this.task.tarea = '';
  }

  public completeTask(task: Task) {
    this.tasksService.completeTask(task);
  }

  public removeTask(id: string) {
    this.tasksService.removeTask(id);
  }

  onKeydown(event) {
    if (event.key === 'Enter') {
      this.addTask();
    }
  }
}
