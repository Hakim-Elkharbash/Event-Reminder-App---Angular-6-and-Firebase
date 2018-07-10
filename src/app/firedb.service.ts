import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class FiredbService {
  todosItemsRef: AngularFireList<any>;
  todosItems: Observable<any[]>;

  constructor(private todoDB: AngularFireDatabase) {
    this.todosItemsRef = todoDB.list('todos');
    // Use snapshotChanges().map() to store the key
    this.todosItems = this.todosItemsRef.snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );  
  }

  viewtodolist(){
    return this.todosItems = this.todoDB.list('todos').valueChanges();
  }

  addtodolist(){
    this.todosItemsRef.push({"Hakim":"test"});
  }

}
