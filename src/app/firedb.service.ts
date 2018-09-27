import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class FiredbService {
  todosItemsRef: AngularFireList<any>;
  todosItems: Observable<any[]>;

  todosSettingsRef: AngularFireList<any>;
  todossettings: Observable<any>;
  ShearDataOption = new Subject<any>();  // to shear data between componenets (Click option).
  ShearDataSearch = new Subject<any>();  // to shear data between componenets (Search term).

  constructor(private todoDB: AngularFireDatabase) {

    this.todosItemsRef = todoDB.list('todos');
      this.todosItems = this.todosItemsRef.snapshotChanges().pipe(
        map(changes =>
          changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
        )
      );



    this.todosSettingsRef = todoDB.list('settings');
    this.todossettings = this.todosSettingsRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
      
    );
       
  }

  viewtodolist(){
    return this.todosItems;
  }


  viewtodosettings(){
    return this.todossettings;
  }

  addtodoitem(itemSDate:any, itemEDate:any, duration:string, itemDes:any, itemLat: number, itemLng: number, itemSt: any){
    //this.todosItemsRef = this.todoDB.list('todos');
    this.todosItemsRef.push({"Sdate":itemSDate,"Edate":itemEDate, "duration":duration,"item":itemDes,"Latitude":itemLat,"Longitude":itemLng,"flag":itemSt,"lastOp":new Date().toLocaleString()});
  }

  deltodoitem(itemid: any){
    this.todosItemsRef.remove(itemid)
      .catch(error => this.handleError(error));
  }


  delalltodoitems(){
    this.todosItemsRef.remove()
    .catch(error => this.handleError(error));
  }


  updatetodoitem(itemid: any, st: string){
    this.todosItemsRef.update(itemid,{ "flag": st,"lastOp":new Date().toLocaleString()})
      .catch(error => this.handleError(error));
  }


  updateEmail(email:string){
    this.todosSettingsRef.update("general",{ "email": email})
      .catch(error => this.handleError(error));
  }

  ShearDataBetweenComp(){ // Use Subject from rxjs to handel shearing data between components.
    return { ShearDataSearch: this.ShearDataSearch.asObservable(), ShearDataOption: this.ShearDataOption.asObservable() }
  }

  //----- to handle errors
  private handleError(error) {
    console.log(error);
  }

}
