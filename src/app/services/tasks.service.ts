/* eslint-disable arrow-body-style */
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private task: Task;

  constructor(private firestore: AngularFirestore) {}

  public getTasks() {
    return this.firestore.collection('tasks').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Task;
          const id = a.payload.doc.id;
          return  { id, ...data };
        });
      })
    )
  }

  public addTask(task: Task) {
    this.firestore.collection('tasks').add(task);
  }

  public completeTask(task: Task) {
    this.task = {
      tarea: task.tarea
    }
    console.log('Task complete: '+ task.id)
    this.firestore.collection('tasks').doc(task.id).delete();
    this.firestore.collection('completed').add(this.task);
  }

  public removeTask(id: string) {
    this.firestore.collection('tasks').doc(id).delete();
  }

  public getCompletedTasks() {
    return this.firestore.collection('completed').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Task;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    )
  }

  public uncheckTask(task: Task){
    this.task = {
      tarea: task.tarea
    }
    this.firestore.collection('tasks').add(this.task);
    this.firestore.collection('completed').doc(task.id).delete();
  }
}
