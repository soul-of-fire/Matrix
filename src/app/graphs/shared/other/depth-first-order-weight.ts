import { Stack } from 'src/app/fundamentals/data-structures/stack';
import { EdgeWeightedDigraph } from '../edge-weighted-digraph';

export class DepthFirstOrderWeight {
  private marked: Array<boolean>;
  private _reversePost: Stack<number>;

  constructor(G: EdgeWeightedDigraph) {
    this._reversePost = new Stack<number>();
    this.marked = [];
    for (let v = 0; v < G.V(); v++) {
      if (!this.marked[v]) {
        this.dfs(G, v);
      }
    }
  }

  private dfs(G: EdgeWeightedDigraph, v: number): void {
    this.marked[v] = true;
    for (let e of G.adj(v)) {
      let w = e.to;
      if (!this.marked[w]) {
        this.dfs(G, w);
      }
    }
    this._reversePost.push(v);
  }

  public reversePost(): Iterable<number> {
    return this._reversePost;
  }
}
