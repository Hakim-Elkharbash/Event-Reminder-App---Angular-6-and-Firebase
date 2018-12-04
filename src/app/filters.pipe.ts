import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filters'
})
export class FiltersPipe implements PipeTransform {

  transform(values: any[], txtSearch?: any, searchOption?:any): any {
    console.log(!txtSearch , !searchOption)
    if(!values) return [];
    if(!txtSearch && !searchOption) {
      return values
    }else{
      if(txtSearch) {
        txtSearch = txtSearch.toLowerCase();
      }else{
        txtSearch=""
      }

      //console.log(values, " --- ", txtSearch) 
     return values.filter((item) => {

       if (searchOption == "All" || searchOption == null){
        return JSON.stringify(item.item).toLowerCase().includes(txtSearch); //item.item: to search only in item description, item: to search everywhere on the array item
       }else if (searchOption == "Completed"){
        return JSON.stringify(item.item).toLowerCase().includes(txtSearch) && (item.itemStauts == "Completed"); //item.item: to search only in item description, item: to search everywhere on the array item
       }else if (searchOption == "Up Coming"){
        return JSON.stringify(item.item).toLowerCase().includes(txtSearch) && (item.itemStauts == "Up Coming"); //item.item: to search only in item description, item: to search everywhere on the array item
       }else if (searchOption == "Happening Now"){
        return JSON.stringify(item.item).toLowerCase().includes(txtSearch) && (item.itemStauts == "Happening Now"); //item.item: to search only in item description, item: to search everywhere on the array item
       }
      });
    }
     }
    }
