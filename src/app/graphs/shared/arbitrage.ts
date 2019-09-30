import { EdgeWeightedDigraph } from './edge-weighted-digraph';
import { DirectedEdge } from './directed-edge';
import { Operations } from './other/operations';
import { BellmanFordSP } from './bellman-ford-shortest-path';

export class Arbitrage {
  public static  find(file: string): void {
    const array = Operations.stringToArrayOfStringArrays(file, ' ');
    const V = array.length;
    const name = [];
    const G = new EdgeWeightedDigraph(V);
    for (let v = 0; v < V; v++) {
      name[v] = array[v][0];
      for (let w = 0; w < V; w++) {
        const rate = +array[v][w + 1];
        const e = new DirectedEdge(v, w, -Math.log(rate));
        G.addEdge(e);
      }
    }
    const spt = new BellmanFordSP(G, 0);
    if (spt.hasNegativeCycle()) {
      let stake = 1000.0;
      for (let e of spt.negativeCycle()) {
        console.log(`${stake.toFixed(4)} ${name[e.from]} = ${(stake *= Math.exp(-e.weight)).toFixed(4)} ${name[e.to]}\n`);
      }
    } else {
      console.log("No arbitrage opportunity");
    }
  }
}