import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchpipe'
})
export class SearchpipePipe implements PipeTransform {

  transform(items: any[], searchText: string) {
    if (!items) {
        return [];
    }
    if (!searchText) {
        return items;
    }
    searchText = searchText.toLowerCase();
    let filterItems = [];
    console.log("items ---" + JSON.stringify(items));
    filterItems = items.filter(it => {     
      console.log("it ---" + JSON.stringify(it));
        var properties = Object.keys(it);
         console.log("properties ---" + JSON.stringify(properties));
        let found = false;
        properties.forEach(property => {
          if(it[property] != null && it[property].toString().toLowerCase().includes(searchText)) {
            found = true;
          }
        }); 
        return found;     
      });
    return filterItems;
}

}
