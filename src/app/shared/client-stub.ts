import { of } from 'rxjs/internal/observable/of';
import { Client } from './client';

export class ClientStub extends Client {
  public get(fileName: string) {
    return of([81]);
  }
  public getPairs(fileName: string) {
    return of([[1, 0]]);
  }
}