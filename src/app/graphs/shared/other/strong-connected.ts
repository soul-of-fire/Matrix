import { Digraph } from '../interfaces/di-graph';
import { DepthFirstOrder } from './depth-first-order';

export class StrongConnected {
  private marked: Array<boolean>
  private _id: Array<number>;
  private _count: number;

  constructor(G: Digraph) {
    this.marked = [];
    this._id = [];
    this._count = 0;
    const order = new DepthFirstOrder(G.reverse());
    for (let s of order.reversePost()) {
      if (!this.marked[s]) {
        this.dfs(G, s);
        this._count++;
      }
    }
  }

  private dfs(G: Digraph, v: number): void {
    this.marked[v] = true;
    this._id[v] = this._count;
    for (let w of G.adj(v)) {
      if (!this.marked[w]) {
        this.dfs(G, w);
      }
    }
  }

  public stronglyConnected(v: number, w: number): boolean {
    return this._id[v] == this._id[w];
  }

  public id(v: number): number {
    return this._id[v];
  }

  public count(): number {
    return this._count;
  }
}