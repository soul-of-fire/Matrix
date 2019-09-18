import { Digraph } from './interfaces/di-graph';

export class DirectedDepthFirstSearch implements Iterable<number> {
  private _marked: Array<boolean>;

  constructor(G: Digraph, s: number) {
    this._marked = [];
    this.dfs(G, s);
  }

  private dfs(G: Digraph, v: number): void {
    this._marked[v] = true;
    for (let w of G.adj(v)) {
      if (!this._marked[w]) {
        this.dfs(G, w);
      }
    }
  }

  public marked(v: number): boolean {
    return this._marked[v];
  }

  [Symbol.iterator]() {
    let a = this._marked.reduce((accu, v, i) =>
      v ? accu.concat(i) : accu, []
    ).reverse();
    return {
      next(): IteratorResult<any> {
        return {
          done: a.length == 0,
          value: a.pop()
        };
      }
    };
  }
}