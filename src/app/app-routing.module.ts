import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewtodolistComponent } from './viewtodolist/viewtodolist.component';
import { AddtodoComponent } from './addtodo/addtodo.component';
import { TodosettingComponent } from './todosetting/todosetting.component';


const routes: Routes = [
  {
    path:'',
    component: ViewtodolistComponent
  },
  {
    path:'addtodo',
    component: AddtodoComponent
  },
  {
    path:'todosetting',
    component: TodosettingComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
