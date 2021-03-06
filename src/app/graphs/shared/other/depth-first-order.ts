import { Stack } from 'src/app/fundamentals/data-structures/stack';
import { Digraph } from '../interfaces/di-graph';

export class DepthFirstOrder {
  private marked: Array<boolean>;
  private _reversePost: Stack<number>;

  constructor(G: Digraph) {
    this._reversePost = new Stack<number>();
    this.marked = [];
      for (let v = 0; v < G.V(); v++) {
        if (!this.marked[v]) {
          this.dfs(G, v);
        }
      }
  }

  private dfs(G: Digraph, v: number): void {
    this.marked[v] = true;
    for (let w of G.adj(v)) {
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
