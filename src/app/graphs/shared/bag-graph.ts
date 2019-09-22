import { Bag } from 'src/app/fundamentals/data-structures/bag';
import { Graph } from './interfaces/graph';
import { Comparable } from 'src/app/sort/comparable/comparable';

export class BagGraph implements Graph {
  private vertices: number;
  private edges: number;
  private a: Bag<Comparable>[];

  constructor(entries: Array<Array<Comparable>> | number) {
    if (entries instanceof Array) {
      this.vertices = entries.length;
      this.edges = 0;
      this.a = [];
      for (let i = 0; i < this.vertices; i++) {
        this.a[i] = new Bag<number>();
      }
      for (let i = 0; i < this.vertices; i++) {
        this.addEdge(entries[i][0], entries[i][1]);
      }
    } else {
      this.vertices = entries;
      this.edges = 0;
      this.a = [];
      for (let v = 0; v < this.vertices; v++) {
        this.a[v] = new Bag<Comparable>();
      }
    }
  }
  
  public V(): number {
    return this.vertices;
  }

  public E(): number {
    return this.edges;
  }

  public addEdge(vertice1: Comparable, vertice2: Comparable): void {
    this.a[+vertice1].add(vertice2);
    this.a[+vertice2].add(vertice1);
    this.edges++;
  }

  public adj(vertice: number): Iterable<number> {
    return this.a[vertice];
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