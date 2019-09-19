import { Digraph } from './interfaces/di-graph';
import { Bag } from 'src/app/fundamentals/data-structures/bag';
import { Operations } from './other/operations';

export class BagDigraph implements Digraph {
  private vertices: number;
  private edges: number;
  private adjesent: Array<Bag<number>>;

  constructor(entry: Array<any> | number) {
    if (entry instanceof Array) {
      this.vertices = Operations.numberOfVertices(entry);
      this.edges = 0;
      this.adjesent = [];
      for (let v = 0; v < this.vertices; v++) {
        this.adjesent[v] = new Bag<number>();
      }
      for (let a of entry) {
        this.addEdge(a[0], a[1]);
      }
    } else {
      this.vertices = entry;
      this.edges = 0;
      this.adjesent = [];
      for (let v = 0; v < this.vertices; v++) {
        this.adjesent[v] = new Bag<number>();
      }
    }
  }

  public V(): number {
    return this.vertices;
  }

  public E(): number {
    return this.edges;
  }

  public addEdge(v: number, w: number): void {
    this.adjesent[v].add(w);
    this.edges++;
  }

  public adj(v: number): Iterable<number> {
    return this.adjesent[v];
  }

  public reverse(): Digraph {
    const R = new BagDigraph(this.vertices);
    for (let v = 0; v < this.vertices; v++) {
      for (let w of this.adj(v)) {
        R.addEdge(w, v);
      }
    }
    return R;
  }

  public toString(): string {
    let s = this.vertices + " vertices, " + this.edges + " edges\n";
    for (let i = 0; i < this.vertices; i++) {
      s += i + ": ";
      for (let w of this.adj(i)) {
        s += w + " ";
      }
      s += "\n";
    }
    return s;
  }
}