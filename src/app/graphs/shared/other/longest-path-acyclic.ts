import { DirectedEdge } from '../directed-edge';
import { EdgeWeightedDigraph } from '../edge-weighted-digraph';
import { TopologicalWeight } from './topological-weight';
import { Stack } from 'src/app/fundamentals/data-structures/stack';

export class LongestPathAcyclic {
  private _distTo: Array<number>;
  private _edgeTo: Array<DirectedEdge>;

  constructor(G: EdgeWeightedDigraph, s: number) {
    this._distTo = [];
    this._edgeTo = []

    for (let v = 0; v < G.V(); v++) {
      this._distTo[v] = Number.NEGATIVE_INFINITY;
    }
    this._distTo[s] = 0.0;

    const topological = new TopologicalWeight(G);
    for (let v of topological.order()) {
      for (let e of G.adj(v)) {
        this.relax(e);
      }
    }
  }

  private relax(e: DirectedEdge): void {
    let v = e.from;
    let w = e.to;
    if (this._distTo[w] < this._distTo[v] + e.weight) {
      this._distTo[w] = this._distTo[v] + e.weight;
      this._edgeTo[w] = e;
    }
  }

  public distTo(v: number): number {
    return this._distTo[v];
  }

  public hasPathTo(v: number): boolean {
    return this._distTo[v] > Number.NEGATIVE_INFINITY;
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
}