import { Operations } from './operations';
import { BagGraph } from '../bag-graph';
import { ConnectedComponents } from './connected-components';
import { Bag } from 'src/app/fundamentals/data-structures/bag';

export class ConnectedComponentsClient {
  public static connect(file: string) {
    const G = new BagGraph(Operations.stringToArrayOfArrays(file));
    const cc = new ConnectedComponents(G);
    const M = cc.count();
    const components = [];
    for (let i = 0; i < M; i++) {
      components[i] = [];
    }
    for (let v = 0; v < G.V(); v++) {
      components[cc.id(v)].push(v);
    }
    return components;
  }

  public static arraysToString(cc: Array<Array<number>>): string {
    return cc.reduce((accu, v) => accu + v.join(' ') + '\n', '');
  }
}