import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database'

@Injectable({
  providedIn: 'root'
})
export class FiredbService {
todos: AngularFireList<any>;
  constructor(private fdb: AngularFireDatabase) { }

  gettodolist(){
    this.todos = this.fdb.list('todos');
    return this.todos;
  }
}
