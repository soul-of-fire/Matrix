import { Graph } from './interfaces/graph';
import { Queue } from 'src/app/fundamentals/data-structures/queue';
import { Stack } from 'src/app/fundamentals/data-structures/stack';

export class BreadthFirstPath {
  private marked: Array<boolean>;
  private edgeTo: Array<number>;
  private source: number;

  constructor(G: Graph, source: number) {
    this.marked = []
    this.edgeTo = []
    this.source = source;
    this.bfs(G, source);
  }

  private bfs(G: Graph, vertice: number): void {
    const queue = new Queue<number>();
    this.marked[vertice] = true;
    queue.enqueue(vertice);
    while (!queue.isEmpty()) {
      let vertice = queue.dequeue();
      for (let w of G.adj(vertice)) {
        if (!this.marked[w]) {
          this.edgeTo[w] = vertice;
          this.marked[w] = true;
          queue.enqueue(w);
        }
      }
    }
  }

  public hasPathTo(vertice: number): boolean {
    return this.marked[vertice];
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