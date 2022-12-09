import { Component } from '@angular/core';
import { TasksService } from '../services/tasks.service';
import { Task } from '../Task';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  public tasks: Task[];
  public task: Task;
  public description: string;
  public id: string;

  constructor(
    private tasksService: TasksService,
    private alertController: AlertController,
    private router: Router
  ) {
    this.tasksService.getTasks().subscribe((res) => {
      this.tasks = res;
      console.log(this.tasks);
    });
  }

  public addTask() {
    this.task = {
      description: this.description,
      completed: false,
    };
    this.tasksService.addTask(this.task);
    this.description = '';
  }

  public checkTask(task: Task, id: string) {
    task.completed = !task.completed;
    this.tasksService.updateTask(task, id);
  }

  public editTask(id: string) {
    this.router.navigate(['/edit-task'], {
      queryParams: { id: id },
    });
  }

  public async removeTask(id: string) {
    const alert = await this.alertController.create({
      header: 'Are you sure?',
      subHeader: 'Do you wish to remove this item?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {},
        },
        {
          text: 'Yes',
          role: 'confirm',
          handler: () => {
            this.tasksService.removeTask(id);
          },
        },
      ],
    });
    await alert.present();
  }
}
