import { SymbolEs6Digraph } from '../symbol-es6-digraph';
import { DirectedCycle } from '../other/directed-cycle';
import { DepthFirstOrder } from '../other/depth-first-order';

export class TopologicalClient {
  public static client(file: string, sp: string): Array<any> {
    const sg = new SymbolEs6Digraph(file, sp);
    const G = sg.G();
    const cyclefinder = new DirectedCycle(G);
    if (!cyclefinder.hasCycle()) {
      const dfs = new DepthFirstOrder(G);
      return Array.from(dfs.reversePost()).map(i => sg.name(i));
    }
    return [];
  }
}