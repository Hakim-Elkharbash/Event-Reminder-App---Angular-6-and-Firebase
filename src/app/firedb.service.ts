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
    
  }

  viewtodolist(){
    return this.todosItems = this.todoDB.list('todos').valueChanges();
  }
}
