import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Task } from '../Task';
import { TasksService } from '../services/tasks.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.page.html',
  styleUrls: ['./edit-task.page.scss'],
})
export class EditTaskPage implements OnInit {
  public task: Task;
  public id: string;
  public myForm: FormGroup;

  constructor(
    private taskService: TasksService,
    private activatedRouteService: ActivatedRoute,
    private alertController: AlertController,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.task = {
      description: '',
      completed: false,
    };
  }

  ngOnInit() {
    this.activatedRouteService.queryParams.subscribe((params) => {
      this.id = params.id;
      this.taskService.getTaskById(params.id).subscribe((item) => {
        this.task = item as Task;
      });
    });

    this.myForm = this.formBuilder.group({
      description: ['', Validators.compose([Validators.required])],
    });
  }

  updateTask() {
    if (this.myForm.valid) {
      this.task = {
        description: this.myForm.get('description').value,
        completed: false,
      };
      this.taskService.updateTask(this.task, this.id);
      console.log(this.task);

      this.back();
    } else {
      this.presentAlert('All values are required');
    }
  }

  async presentAlert(msg: string) {
    const alert = await this.alertController.create({
      header: msg,
      buttons: ['OK'],
    });

    await alert.present();
  }

  back(): void {
    this.router.navigate(['..']);
  }
}
