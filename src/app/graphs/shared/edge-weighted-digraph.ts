import { Bag } from 'src/app/fundamentals/data-structures/bag';
import { DirectedEdge } from './directed-edge';
import { Operations } from './other/operations';

export class EdgeWeightedDigraph {
  private v: number;
  private e: number;
  private adjecent: Bag<DirectedEdge>[];

  constructor(entries: Array<Array<number>> | number) {
    this.e = 0;
    this.adjecent = [];
    if (entries instanceof Array) {
      this.v = Operations.numberOfVertices(entries);
      for (let i = 0; i < this.v; i++) {
        this.adjecent[i] = new Bag<DirectedEdge>();
      }
      for (let i = 0; i < entries.length; i++) {
        this.addEdge(new DirectedEdge(entries[i][0], entries[i][1], entries[i][2]));
      }
    } else {
      this.v = entries;
      for (let i = 0; i < this.v; i++) {
        this.adjecent[i] = new Bag<DirectedEdge>();
      }
    }
  }

  public V(): number {
    return this.v;
  }

  public E(): number {
    return this.e;
  }

  public addEdge(e: DirectedEdge): void {
    this.adjecent[e.from].add(e);
    this.e++;
  }

  public adj(v: number): Iterable<DirectedEdge> {
    return this.adjecent[v];
  }

  public edges(): Iterable<DirectedEdge> {
    const bag = new Bag<DirectedEdge>();
    for (let i = 0; i < this.v; i++) {
      for (let e of this.adjecent[i]) {
        bag.add(e);
      }
    }
    return bag;
  }
}