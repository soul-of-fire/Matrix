import { HttpClient } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';

export class Client {
  constructor(private http: HttpClient) {}

  public get(fileName: string) {
    return this.http.get(`assets/files/${fileName}.txt`, {responseType: 'text'}).pipe(
      map(data => data.split('\n').filter(x => x).map(x => ~~x))
    );
  }

  public getPairs(fileName: string) {
    return this.http.get(`assets/files/${fileName}.txt`, {responseType: 'text'}).pipe(
      map(data => data.split('\n').filter(x => x).map(x => {
        const row = x.split(' ');
        if(row.length > 1) {
          return row.map(x => ~~x);
        } else {
          return ~~x;
        }
      }))
    );
  }
}