import { Operations } from '../other/operations';
import { BagGraph } from '../bag-graph';
import { ConnectedComponents } from '../other/connected-components';

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