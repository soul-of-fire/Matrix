import { Graph } from './interfaces/graph';
import { Stack } from 'src/app/fundamentals/data-structures/stack';

export class DepthFirstPath {
  private isMarked: Array<boolean>;
  private edgeTo: Array<number>;
  private source: number;

  constructor(G: Graph, source: number) {
    this.isMarked = [];
    this.edgeTo = [];
    this.source = source;
    this.dfs(G, source);
  }

  private dfs(G: Graph, v: number): void {
    this.isMarked[v] = true;
    for (let w of G.adj(v)) {
      if (!this.isMarked[w]) {
        this.edgeTo[w] = v;
        this.dfs(G, w);
      }
    }
  }

  public hasPathTo(vertice: number): boolean {
    return this.isMarked[vertice];
  }

  public pathTo(vertice: number): Iterable<number> {
    if (!this.hasPathTo(vertice)) {
      return null;
    }
    const path = new Stack<number>();
    for (let x = vertice; x != this.source; x = this.edgeTo[x]) {
      path.push(x);
    }
    path.push(this.source);
    return path;
  }
}