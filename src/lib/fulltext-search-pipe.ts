import { Injectable, Pipe } from '@angular/core';
@Pipe({
  name: 'FullTextSearch'
})
@Injectable()
/**
 * FulltextSearchPipe
 * @author Thiago Przyczynski <przyczynski@gmail.com>
 */
export class FulltextSearchPipe {

  constructor() {}

  /**
   * Transform method pipe
   * @param string value
   * @param string query
   * @param any field
   */
  public transform(value: any, query: string, field: any): any {
    return query ? value.reduce((prev: any, next: any) => {
      if(typeof field == 'string') {
        query = query.toString();
        if (next[field] && this.removeAccents(next[field].toLowerCase()).includes(this.removeAccents(query.toLowerCase()))) { prev.push(next); }
      } else {
        for(let i in field) {
          if (next[field[i]] && this.removeAccents(next[field[i]].toLowerCase()).includes(this.removeAccents(query.toLowerCase()))) { prev.push(next); break; }
        }
      }
      return prev;
    }, []) : value;
  }

  /**
   * Removing accents
   * @param string value
   */
  removeAccents(value: string) {
    return value
      .replace(/á/g, 'a')
      .replace(/ã/g, 'a')
      .replace(/à/g, 'a')
      .replace(/é/g, 'e')
      .replace(/í/g, 'i')
      .replace(/ó/g, 'o')
      .replace(/ô/g, 'o')
      .replace(/õ/g, 'o')
      .replace(/ú/g, 'u');
  }

}
