import { Operations } from '../other/operations';
import { BagDigraph } from '../bag-digraph';
import { StrongConnected } from '../other/strong-connected';

export class StrongConnectedComponentsClient {
  public static connect(file: string) {
    const arrays = Operations.stringToArrayOfArrays(file);
    const G = new BagDigraph(arrays);
    const sc = new StrongConnected(G);
    const M = sc.count();
    const components = [];
    for (let i = 0; i < M; i++) {
      components[i] = [];
    }
    for (let v = 0; v < G.V(); v++) {
      components[sc.id(v)].push(v);
    }
    return components;
  }

  public static arraysToString(cc: Array<Array<number>>): string {
    return cc.reduce((accu, v) => accu + v.join(' ') + '\n', '');
  }
}