import { Edge } from './edge';
import { EdgeWeightedGraph } from './edge-weighted-graph';
import { IndexMinPQ } from 'src/app/sort/share/index-min-pq';
import { Bag } from 'src/app/fundamentals/data-structures/bag';

export class PrimMST {
  private edgeTo: Array<Edge>;
  private distTo: Array<number>;
  private marked: Array<boolean>;
  private pq: IndexMinPQ<number>;

  constructor(G: EdgeWeightedGraph) {
    this.edgeTo = [];
    this.distTo = [];
    this.marked = [];
    for (let v = 0; v < G.V(); v++) {
      this.distTo[v] = Number.POSITIVE_INFINITY;
    }
    this.pq = new IndexMinPQ<number>(G.V());
    this.distTo[0] = 0.0;
    this.pq.insert(0, 0.0);
    while (!this.pq.isEmpty()) {
      this.visit(G, this.pq.delMin());
    }
  }

  private visit(G: EdgeWeightedGraph, v: number): void {
    this.marked[v] = true;
    for (let e of G.adj(v)) {
      let w = e.other(v);
      if (this.marked[w]) {
        continue;
      }
      if (e.weight < this.distTo[w]) {
        this.edgeTo[w] = e;
        this.distTo[w] = e.weight;
        if (this.pq.contains(w)) {
          this.pq.change(w, this.distTo[w]);
        } else {
          this.pq.insert(w, this.distTo[w]);
        }
      }
    }
  }

  public edges(): Iterable<Edge> {
    const mst = new Bag<Edge>();
    for (let v = 1; v < this.edgeTo.length; v++) {
      mst.add(this.edgeTo[v]);
    }
    return mst;
  }

  public weight(): number {
    let weight = 0.0;
    for (let e of this.edges()) {
      weight += e.weight;
    }
    return weight;
  }

  public toString() {
    console.log(Array.from(this.edges()).map(x => x.toString()).join('\n'), '\n' + this.weight().toFixed(2));
  }
}