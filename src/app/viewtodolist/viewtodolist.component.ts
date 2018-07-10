import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

//import { FiredbService } from '../firedb.service';

@Component({
  selector: 'app-viewtodolist',
  templateUrl: './viewtodolist.component.html',
  styleUrls: ['./viewtodolist.component.scss']
})


export class ViewtodolistComponent implements OnInit {
  todosItemsRef: AngularFireList<any>;
  todosItems: Observable<any[]>;

  constructor(private todoDB: AngularFireDatabase) {

    this.todosItems = todoDB.list('todos').valueChanges();


    // this.todosItemsRef = todoDB.list('/todos');
    // this.todosItems = this.todosItemsRef.snapshotChanges().pipe(
    //   map(changes => 
    //     changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
    //   )
    // );
    console.log(this.todosItems)
    // console.log(this.todosItemsRef)
   }

  ngOnInit() {
   
  }

}
