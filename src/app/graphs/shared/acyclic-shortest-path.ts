import { DirectedEdge } from './directed-edge';
import { EdgeWeightedDigraph } from './edge-weighted-digraph';
import { Stack } from 'src/app/fundamentals/data-structures/stack';
import { TopologicalWeight } from './other/topological-weight';

export class AcyclicShortestPath {
  private _edgeTo: Array<DirectedEdge>;
  private _distTo: Array<number>;
  private G: EdgeWeightedDigraph;

  constructor(G: EdgeWeightedDigraph, s: number) {
    this.G = G;
    this._edgeTo = [];
    this._distTo = [];
    for (let v = 0; v < G.V(); v++) {
      this._distTo[v] = Number.POSITIVE_INFINITY;
    }
    this._distTo[s] = 0.0;
    const top = new TopologicalWeight(G);
    for (let v of top.order()) {
      this.relax(G, v);
    }
  }

  private relax(G: EdgeWeightedDigraph, v: number): void {
    for (let e of G.adj(v)) {
      let w = e.to;
      if (this._distTo[w] > this._distTo[v] + e.weight) {
        this._distTo[w] = this._distTo[v] + e.weight;
        this._edgeTo[w] = e;
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
    for (let e = this._edgeTo[v]; e != null; e = this._edgeTo[e.from]) {
      path.push(e);
    }
    return path;
  }

  public toString() {
    for (let t = 0; t < this.G.V(); t++) {
      console.log(`0 to ${t} : ` + Array.from(this.pathTo(t)).map(x => x.toString()).join(' -> ') + '\n');
    }
  }
}