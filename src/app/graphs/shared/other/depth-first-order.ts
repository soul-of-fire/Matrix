import { Queue } from 'src/app/fundamentals/data-structures/queue';
import { Stack } from 'src/app/fundamentals/data-structures/stack';
import { Digraph } from '../interfaces/di-graph';

export class DepthFirstOrder {
  private marked: Array<boolean>;
  private _pre: Queue<number>;
  private _post: Queue<number>;
  private _reversePost: Stack<number>;

  constructor(G: Digraph) {
    this._pre = new Queue<number>();
    this._post = new Queue<number>();
    this._reversePost = new Stack<number>();
    this.marked = [];
    for (let v = 0; v < G.V(); v++) {
      if (!this.marked[v]) {
        this.dfs(G, v);
      }
    }
  }

  private dfs(G: Digraph, v: number): void {
    this._pre.enqueue(v);
    this.marked[v] = true;
    for (let w of G.adj(v)) {
      if (!this.marked[w]) {
        this.dfs(G, w);
      }
    }
    this._post.enqueue(v);
    this._reversePost.push(v);
  }

  public pre(): Iterable<number> {
    return this._pre;
  }

  public post(): Iterable<number> {
    return this._post;
  }

  public reversePost(): Iterable<number> {
    return this._reversePost;
  }
}