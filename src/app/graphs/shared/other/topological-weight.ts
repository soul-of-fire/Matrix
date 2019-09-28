import { DirectedCycle } from './directed-cycle';
import { Digraph } from '../interfaces/di-graph';
import { DepthFirstOrder } from './depth-first-order';
import { EdgeWeightedDigraph } from '../edge-weighted-digraph';
import { EdgeWeightedDirectedCycle } from './edge-weight-directed-cycle';
import { DepthFirstOrderWeight } from './depth-first-order-weight';

export class TopologicalWeight {
  private _order: Iterable<number>;

  constructor(G: EdgeWeightedDigraph) {
    const cyclefinder = new EdgeWeightedDirectedCycle(G);
    if (!cyclefinder.hasCycle()) {
      const dfs = new DepthFirstOrderWeight(G);
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