import { Graph } from './interfaces/graph';

export class DepthFirstSearch implements Iterable<number> {
  private isMarked: Array<boolean>;
  private n: number;

  constructor(G: Graph, sorce: number) {
    this.isMarked = [];
    this.n = 0;
    this.dfs(G, sorce);
  }

  private dfs(G: Graph, vertice: number): void {
    this.isMarked[vertice] = true;
    this.n++;
    for (let w of G.adj(vertice)) {
      if (!this.isMarked[w]) {
        this.dfs(G, w);
      }
    }
  }

  public marked(vertice: number): boolean {
    return this.isMarked[vertice];
  }

  public count(): number {
    return this.n;
  }

  [Symbol.iterator]() {
    let a = this.isMarked.reduce((accu, v, i) =>
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