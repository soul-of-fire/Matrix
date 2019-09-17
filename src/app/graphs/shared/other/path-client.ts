import { Operations } from './operations';
import { BagGraph } from '../bag-graph';

export class PathClient {
  public static path(file: string, o: any, source: number): Array<Array<number>> {
    const G = new BagGraph(Operations.stringToArrayOfArrays(file));
    const search = new o(G, source);
    const a = [];
    for (let v = 0; v < G.V(); v++) {
      if (search.hasPathTo(v)) {
        a[v] = [];
        for (let x of search.pathTo(v)) {
          a[v].push(x);
        }
      }
    }
    return a;
  }

  public static pathsToString(dfp: Array<Array<number>>): string {
    return dfp.reduce((accu, v) => accu + v.join(' ') + '\n', '');
  }
}