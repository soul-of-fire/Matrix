import { EdgeWeightedDigraph } from './edge-weighted-digraph';
import { DirectedEdge } from './directed-edge';
import { LongestPathAcyclic } from './other/longest-path-acyclic';

export class ParallelSchedule {
  private lp: LongestPathAcyclic;
  private N: number;
  private t: number;

  constructor(array: Array<any>) {
    this.N = array.length;
    const G = new EdgeWeightedDigraph(2 * this.N + 2);
    let s = 2 * this.N;
    this.t = 2 * this.N + 1;
    for (let i = 0; i < this.N; i++) {
      const a = array[i];
      let duration = a[0];
      G.addEdge(new DirectedEdge(i, i + this.N, duration));
      G.addEdge(new DirectedEdge(s, i, 0.0));
      G.addEdge(new DirectedEdge(i + this.N, this.t, 0.0));
      for (let j = 1; j < a.length; j++) {
        const successor = a[j];
        G.addEdge(new DirectedEdge(i + this.N, successor, 0.0));
      }
    }
    this.lp = new LongestPathAcyclic(G, s);
  }

  public path() {
    const m = new Map();
    for (let i = 0; i < this.N; i++) {
      m.set(i, this.lp.distTo(i));
    }
    m[Symbol.iterator] = function* () {
      yield* [...this.entries()].sort((a, b) => a[1] - b[1]);
    }
    return Array.from(m);
  }

  public distance() {
    return this.lp.distTo(this.t);
  }
}