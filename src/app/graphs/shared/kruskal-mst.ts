import { Queue } from 'src/app/fundamentals/data-structures/queue';
import { Edge } from './edge';
import { EdgeWeightedGraph } from './edge-weighted-graph';
import { MinPQ } from 'src/app/sort/share/min-pq';
import { UF } from 'src/app/fundamentals/shared/union-find';

export class KruskalMST {
  private mst: Queue<Edge>;

  constructor(G: EdgeWeightedGraph) {
    this.mst = new Queue<Edge>();
    const pq = new MinPQ<Edge>(G);
    const uf = new UF(G.V());
    while (!pq.isEmpty() && this.mst.size() < G.V() - 1) {
      const e = pq.delMin();
      const v = e.either();
      const w = e.other(v);
      if (uf.connected(v, w)) {
        continue;
      }
      uf.union(v, w);
      this.mst.enqueue(e);
    }
  }

  public edges(): Iterable<Edge> {
    return this.mst;
  }

  public weight(): number {
    let weight = 0.0;
    for (let e of this.edges()) {
      weight += e.weight;
    }
    return weight;
  }

  public toString() {
    console.log(Array.from(this.edges()).map(x => x.toString()).join('\n'), '\n'+this.weight().toFixed(2));
  }
}