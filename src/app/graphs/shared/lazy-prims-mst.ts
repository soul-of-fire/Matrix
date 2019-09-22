import { Queue } from 'src/app/fundamentals/data-structures/queue';
import { Edge } from './edge';
import { EdgeWeightedGraph } from './edge-weighted-graph';
import { MinPQ } from 'src/app/sort/share/min-pq';

export class LazyPrimMST {
  public weight: number = 0;
  private marked: Array<boolean>;
  private mst: Queue<Edge>;
  private pq: MinPQ<Edge>;

  constructor(G: EdgeWeightedGraph) {
    this.pq = new MinPQ<Edge>();
    this.marked = [];
    this.mst = new Queue<Edge>();
    this.visit(G, 0);
    while (!this.pq.isEmpty()) {
      const e = <Edge>this.pq.delMin();
      const v = e.either();
      const w = e.other(v);
      if (this.marked[v] && this.marked[w]) {
        continue;
      }
      this.mst.enqueue(e);
      this.weight += e.weight;
      if (!this.marked[v]) {
        this.visit(G, v);
      }
      if (!this.marked[w]) {
        this.visit(G, w);
      }
    }
  }

  private visit(G: EdgeWeightedGraph, v: number): void {
    this.marked[v] = true;
    for (let e of G.adj(v)) {
      if (!this.marked[e.other(v)]) {
        this.pq.insert(e);
      }
    }
  }

  public edges(): Iterable<Edge> {
    return this.mst;
  }

  public toString() {
    console.log(Array.from(this.edges()).map(x => x.toString()).join('\n'), '\n'+this.weight.toFixed(2));
  }
}