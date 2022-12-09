import { Component } from '@angular/core';
import { TasksService } from '../services/tasks.service';
import { Task } from '../Task';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  public tasks: Task[];
  public task: Task;
  public id: string;

  constructor(private tasksService: TasksService) {
    this.tasksService.getTasks().subscribe((res) => {
      this.tasks = res;
      console.log(this.tasks);
    });
  }

  public checkTask(task: Task, id: string) {
    task.completed = !task.completed;
    this.tasksService.updateTask(task, id);
  }
}
