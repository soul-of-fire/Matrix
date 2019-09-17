import { Graph } from '../interfaces/graph';

export class ConnectedComponents {
  private marked: Array<boolean>;
  private _id: Array<number>;
  private _count: number;

  constructor(G: Graph) {
    this.marked = [];
    this._count = 0;
    this._id = [];
    for (let s = 0; s < G.V(); s++) {
      if (!this.marked[s]) {
        this.dfs(G, s);
        this._count++;
      }
    }
  }

  private dfs(G: Graph, v: number): void {
    this.marked[v] = true;
    this._id[v] = this._count;
    for (let w of G.adj(v)) {
      if (!this.marked[w]) {
        this.dfs(G, w);
      }
    }
  }

  public connected(v: number, w: number): boolean {
    return this._id[v] == this._id[w];
  }

  public id(v: number): number {
    return this._id[v];
  }

  public count(): number {
    return this._count;
  }
}