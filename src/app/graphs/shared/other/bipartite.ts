import { Graph } from '../interfaces/graph';

export class Bipartite {
  private marked: Array<boolean>;
  private color: Array<boolean>;
  private isTwoColorable: boolean = true;

  constructor(G: Graph) {
    this.marked = [];
    this.color = [];
    for (let s = 0; s < G.V(); s++) {
      if (!this.marked[s]) {
        this.dfs(G, s);
      }
    }
  }

  private dfs(G: Graph, v: number): void {
    this.marked[v] = true;
    for (let w of G.adj(v)) {
      if (!this.marked[w]) {
        this.color[w] = !this.color[v];
        this.dfs(G, w);
      } else if (this.color[w] == this.color[v]) {
        this.isTwoColorable = false;
      }
    }
  }

  public isBipartite(): boolean {
    return this.isTwoColorable;
  }
}