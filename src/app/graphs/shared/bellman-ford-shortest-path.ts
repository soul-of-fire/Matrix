import { DirectedEdge } from './directed-edge';
import { Queue } from 'src/app/fundamentals/data-structures/queue';
import { EdgeWeightedDigraph } from './edge-weighted-digraph';
import { Stack } from 'src/app/fundamentals/data-structures/stack';
import { EdgeWeightedDirectedCycle } from './other/edge-weight-directed-cycle';

export class BellmanFordSP {
  private _distTo: Array<number>;
  private _edgeTo: Array<DirectedEdge>;
  private _onQ: Array<boolean>;
  private _queue: Queue<number>;
  private _cost: number;
  private _cycle: Iterable<DirectedEdge>;
  private V: number;

  constructor(G: EdgeWeightedDigraph, s: number) {
    this._cost = 0;
    this.V = G.V();
    this._distTo = [];
    this._edgeTo = [];
    this._onQ = [];
    this._queue = new Queue<number>();
    for (let v = 0; v < G.V(); v++) {
      this._distTo[v] = Number.POSITIVE_INFINITY;
    }
    this._distTo[s] = 0.0;
    this._queue.enqueue(s);
    this._onQ[s] = true;
    while (!this._queue.isEmpty() && !this.hasNegativeCycle()) {
      const v = this._queue.dequeue();
      this._onQ[v] = false;
      this.relax(G, v);
    }
  }

  private relax(G: EdgeWeightedDigraph, v: number): void {
    for (let e of G.adj(v)) {
      let w = e.to;
      if (this._distTo[w] > this._distTo[v] + e.weight) {
        this._distTo[w] = this._distTo[v] + e.weight;
        this._edgeTo[w] = e;
        if (!this._onQ[w]) {
          this._queue.enqueue(w);
          this._onQ[w] = true;
        }
      }
      if (this._cost++ % G.V() == 0) {
        this.findNegativeCycle();
        if (this.hasNegativeCycle()) {
          return;
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
    for (let e = this._edgeTo[v]; e != null; e = this._edgeTo[e.from]) {
      path.push(e);
    }
    return path;
  }

  private findNegativeCycle(): void {
    const V = this._edgeTo.length;
    const spt = new EdgeWeightedDigraph(V);
    for (let v = 0; v < V; v++) {
      if (this._edgeTo[v] != null) {
        spt.addEdge(this._edgeTo[v]);
      }
    }
    const cf = new EdgeWeightedDirectedCycle(spt);
    this._cycle = cf.cycle();
  }

  public hasNegativeCycle(): boolean {
    return this._cycle != null;
  }

  public negativeCycle(): Iterable<DirectedEdge> {
    return this._cycle;
  }

  public toString() {
    for (let t = 0; t < this.V; t++) {
      console.log(`0 to ${t} : ` + Array.from(this.pathTo(t)).map(x => x.toString()).join(' -> ') + '\n');
    }
  }
}