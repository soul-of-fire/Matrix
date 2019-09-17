import { Graph } from '../interfaces/graph';

export class Cycle {
  private marked: Array<boolean>;
  private _hasCycle: boolean;

  constructor(G: Graph) {
    this.marked = [];
    for (let s = 0; s < G.V(); s++) {
      if (!this.marked[s]) {
        this.dfs(G, s, s);
      }
    }
  }
  private dfs(G: Graph, v: number, u: number): void {
    this.marked[v] = true;
    for (let w of G.adj(v)) {
      if (!this.marked[w]) {
        this.dfs(G, w, v);
      } else if (w != u) {
        this._hasCycle = true;
      }
    }
  }

  public hasCycle(): boolean {
    return this._hasCycle;
  }
}