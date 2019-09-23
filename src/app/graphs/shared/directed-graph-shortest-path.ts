import { DirectedEdge } from './directed-edge';
import { IndexMinPQ } from 'src/app/sort/share/index-min-pq';
import { EdgeWeightedDigraph } from './edge-weighted-digraph';
import { Stack } from 'src/app/fundamentals/data-structures/stack';

export class DirectedGraphShortestPath {
  private edgeTo: DirectedEdge[];
  private _distTo: number[];
  private pq: IndexMinPQ<number>;
  private G: EdgeWeightedDigraph;

  constructor(G: EdgeWeightedDigraph, s: number) {
    this.G = G;
    this.edgeTo = [];
    this._distTo = [];
    this.pq = new IndexMinPQ<number>(G.V());
    for (let v = 0; v < G.V(); v++) {
      this._distTo[v] = Number.POSITIVE_INFINITY;
    }
    this._distTo[s] = 0.0;
    this.pq.insert(s, 0.0);
    while (!this.pq.isEmpty()) {
      this.relax(G, this.pq.delMin());
    }
  }

  private relax(G: EdgeWeightedDigraph, v: number): void {
    for (let e of G.adj(v)) {
      let w = e.to;
      if (this._distTo[w] > this._distTo[v] + e.weight) {
        this._distTo[w] = this._distTo[v] + e.weight;
        this.edgeTo[w] = e;
        if (this.pq.contains(w)) {
          this.pq.change(w, this._distTo[w]);
        } else {
          this.pq.insert(w, this._distTo[w]);
        }
      }
    }
  }

  public distTo(v: number): number {
    return this._distTo[v];
  }

  public hasPathTo(v: number): boolean {
    return this._distTo[v] < Number.POSITIVE_INFINITY;
  }

  public pathTo(v: number): Iterable<DirectedEdge> {
    if (!this.hasPathTo(v)) {
      return null;
    }
    const path = new Stack<DirectedEdge>();
    for (let e = this.edgeTo[v]; e != null; e = this.edgeTo[e.from]) {
      path.push(e);
    }
    return path;
  }

  public toString() {
    for (let t = 1; t < this.G.V(); t++) {
      console.log(`0 to ${t} : `+Array.from(this.pathTo(t)).map(x => x.toString()).join(' -> ')+'\n');
    }
  }
}