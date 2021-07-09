import {Pipe, PipeTransform} from '@angular/core';
import {App} from "../../../@data/model/app";

@Pipe({
  name: 'filterApps',
})
export class FilterAppsPipe implements PipeTransform {

  transform(items: App[], searchText: string): any[] {

    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLocaleLowerCase();

    return items.filter(it => {
      return it.nombre.toLocaleLowerCase().includes(searchText);
    });
  }

}
