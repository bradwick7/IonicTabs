import { Component } from '@angular/core';
import { TasksService } from '../services/tasks.service';
import { Task } from '../models/task';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  public completed: Task[] = [];;
  public task: Task;

  constructor(private tasksService: TasksService) {
    this.tasksService.getCompletedTasks().subscribe( res => {
      this.completed = res;
    })
  }

  public uncheckTask(task: Task) {
    this.tasksService.uncheckTask(task);
  }

}
