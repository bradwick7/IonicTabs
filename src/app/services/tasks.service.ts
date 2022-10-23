import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private tasks: string[] = [];
  private completedTasks: string[] = [];

  constructor() {}

  public getTasks(): string[] {
    return this.tasks;
  }

  public addTask(task: string) {
    this.tasks.push(task);
  }

  public completeTask(index: number) {
    this.completedTasks.push(this.tasks[index]);
    this.removeTask(index);
    console.log('Completed Tasks:' + this.completedTasks);
  }

  public removeTask(index: number) {
    this.tasks.splice(index, 1);
  }

  public getCompletedTasks(): string[] {
    return this.completedTasks;
  }

  public uncheckTask(index: number){
    this.tasks.push(this.completedTasks[index]);
    this.completedTasks.splice(index, 1);
  }
}
