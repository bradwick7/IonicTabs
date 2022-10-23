import { Component } from '@angular/core';
import { TasksService } from '../services/tasks.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  public completed: string[];
  public task: string;

  constructor(private tasksService: TasksService) {
    this.completed = this.tasksService.getCompletedTasks();
    this.task = '';
  }

  public uncheckTask(index: number) {
    this.tasksService.uncheckTask(index);
    this.completed = this.tasksService.getCompletedTasks();
  }

}
