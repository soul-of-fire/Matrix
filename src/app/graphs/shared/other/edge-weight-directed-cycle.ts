import { DirectedEdge } from '../directed-edge';
import { Stack } from 'src/app/fundamentals/data-structures/stack';
import { EdgeWeightedDigraph } from '../edge-weighted-digraph';

export class EdgeWeightedDirectedCycle {
  private marked: Array<boolean>;
  private edgeTo: Array<DirectedEdge>;
  private onStack: Array<boolean>;
  private _cycle: Stack<DirectedEdge>;

  constructor(G: EdgeWeightedDigraph) {
    this.marked = [];
    this.onStack = [];
    this.edgeTo = [];
    for (let v = 0; v < G.V(); v++) {
      if (!this.marked[v]) {
        this.dfs(G, v);
      }
    }
  }

  private dfs(G: EdgeWeightedDigraph, v: number): void {
    this.onStack[v] = true;
    this.marked[v] = true;
    for (const e of G.adj(v)) {
      let w = e.to;
      if (this._cycle != null) {
        return;
      } else if (!this.marked[w]) {
        this.edgeTo[w] = e;
        this.dfs(G, w);
      } else if (this.onStack[w]) {
        this._cycle = new Stack<DirectedEdge>();
        let f = e;
        while (f.from != w) {
          this._cycle.push(f);
          f = this.edgeTo[f.from];
        }
        this._cycle.push(f);
        return;
      }
    }
    this.onStack[v] = false;
  }

  public hasCycle(): boolean {
    return this._cycle != null;
  }

  public cycle(): Iterable<DirectedEdge> {
    return this._cycle;
  }
}