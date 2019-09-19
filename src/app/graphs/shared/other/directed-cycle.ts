import { Stack } from 'src/app/fundamentals/data-structures/stack';
import { Digraph } from '../interfaces/di-graph';

export class DirectedCycle {
  private marked: Array<boolean>;
  private edgeTo: Array<number>;
  private _cycle: Stack<number>;
  private onStack: Array<boolean>;

  constructor(G: Digraph) {
    this.onStack = [];
    this.edgeTo = [];
    this.marked = [];
    for (let v = 0; v < G.V(); v++) {
      if (!this.marked[v]) {
        this.dfs(G, v);
      }
    }
  }

  private dfs(G: Digraph, v: number): void {
    this.onStack[v] = true;
    this.marked[v] = true;
    for (let w of G.adj(v)) {
      if (this.hasCycle()) {
        return;
      } else if (!this.marked[w]) {
        this.edgeTo[w] = v;
        this.dfs(G, w);
      } else if (this.onStack[w]) {
        this._cycle = new Stack<number>();
        for (let x = v; x != w; x = this.edgeTo[x]) {
          this._cycle.push(x);
        }
        this._cycle.push(w);
        this._cycle.push(v);
      }
    }
    this.onStack[v] = false;
  }

  public hasCycle(): boolean {
    return this._cycle != null;
  }

  public cycle(): Iterable<number> {
    return this._cycle;
  }
}