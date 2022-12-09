import { Injectable } from '@angular/core';
import { Task } from '../Task';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  public tasks: Task[];

  constructor(private firestore: AngularFirestore) {}

  public getTasks() {
    return this.firestore
      .collection('tasks')
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((a) => {
            const data = a.payload.doc.data() as Task;
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );
  }

  public addTask(task: Task) {
    this.firestore.collection('tasks').add(task);
  }

  public updateTask(task: Task, id: string) {
    this.firestore.doc('tasks/' + id).update(task);
  }

  public removeTask(id: string) {
    this.firestore.collection('tasks').doc(id).delete();
  }

  public getTaskById(id: string) {
    let result = this.firestore.collection('tasks').doc(id).valueChanges();
    return result;
  }
}
