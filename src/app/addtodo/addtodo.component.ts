import { Component, OnInit } from '@angular/core';
import { FiredbService } from '../firedb.service';

@Component({
  selector: 'app-addtodo',
  templateUrl: './addtodo.component.html',
  styleUrls: ['./addtodo.component.scss']
})
export class AddtodoComponent implements OnInit {

  constructor(private todoAction: FiredbService) {
     this.todoAction.addtodolist()
  }

  ngOnInit() {
  }

}
