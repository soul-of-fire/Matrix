import { Operations } from './operations';
import { BagGraph } from '../bag-graph';

export class SearchClient {
  public static search(file: string, searchGraph: any, root: number): Array<number> {
    const G = new BagGraph(Operations.stringToArrayOfArrays(file));
    const search = new searchGraph(G, root);
    return Array.from(search);
  }
}