import { Component, OnInit } from '@angular/core';
import { FiredbService } from '../firedb.service';

@Component({
  selector: 'app-addtodo',
  templateUrl: './addtodo.component.html',
  styleUrls: ['./addtodo.component.scss']
})
export class AddtodoComponent implements OnInit {
  statusList: string[] = ['Pending', 'Completed'];
  model: any = {};

  constructor(private todoAction: FiredbService) {

  }

  ngOnInit() {
  }

  onSubmit(){
    console.log(this.model)
    this.todoAction.addtodoitem(this.model.dp,this.model.description,this.model.status)
  }

}
