import { Component, OnInit } from '@angular/core';
import { FiredbService } from '../firedb.service';

@Component({
  selector: 'app-viewtodolist',
  templateUrl: './viewtodolist.component.html',
  styleUrls: ['./viewtodolist.component.scss']
})


export class ViewtodolistComponent implements OnInit {
  todosArray: any[];
  constructor(private todoList: FiredbService) { }

  ngOnInit() {
    // this.todoList.gettodolist().snapshotChanges()
    // .subscribe(
    //   todoList => this.todosArray = todoList
    // )
    // console.log(todosArray)
  }

}
