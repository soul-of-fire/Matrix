import { DirectedCycle } from './directed-cycle';
import { Digraph } from '../interfaces/di-graph';
import { DepthFirstOrder } from './depth-first-order';

export class Topological {
  private _order: Iterable<number>;

  constructor(G: Digraph) {
    const cyclefinder = new DirectedCycle(G);
    if (!cyclefinder.hasCycle()) {
      const dfs = new DepthFirstOrder(G);
      this._order = dfs.reversePost();
    }
  }

  public order(): Iterable<number> {
    return this._order;
  }

  public isDAG(): boolean {
    return this._order == null;
  }
}