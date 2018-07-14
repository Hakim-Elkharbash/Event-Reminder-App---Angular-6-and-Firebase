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
      this.todosItems = this.todosItemsRef.snapshotChanges().pipe(
        map(changes => 
          changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
        )
      );
    
   
  }

  viewtodolist(){

    return this.todosItems;
  }

  addtodolist(){
    //this.todosItemsRef = this.todoDB.list('todos');
    this.todosItemsRef.push({"flag":"pandding","data":"7/7/2018","item":"Check my email"});
  }

}
