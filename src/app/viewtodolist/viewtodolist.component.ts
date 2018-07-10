import { Component, OnInit } from '@angular/core';
import { FiredbService } from '../firedb.service';

@Component({
  selector: 'app-viewtodolist',
  templateUrl: './viewtodolist.component.html',
  styleUrls: ['./viewtodolist.component.scss']
})


export class ViewtodolistComponent implements OnInit {
  todosItems: Object;

  constructor(private todoAction: FiredbService) {
    this.todosItems = this.todoAction.viewtodolist()
   console.log(this.todosItems)
  }

  ngOnInit() {
   
  }

}
