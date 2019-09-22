import { Bag } from 'src/app/fundamentals/data-structures/bag';
import { Edge } from './edge';
import { Operations } from './other/operations';

export class EdgeWeightedGraph {
  private _V: number;
  private _E: number;
  private _adj: Bag<Edge>[];

  constructor(entries: Array<Array<number>> | number) {
    if (entries instanceof Array) {
      this._V = Operations.numberOfVertices(entries);
      this._E = 0;
      this._adj = [];
      for (let i = 0; i < this._V; i++) {
        this._adj[i] = new Bag<Edge>();
      }
      for (let i = 0; i < entries.length; i++) {
        this.addEdge(new Edge(entries[i][0], entries[i][1], entries[i][2]));
      }
    } else {
      this._V = entries;
      this._E = 0;
      this._adj = [];
      for (let v = 0; v < entries; v++) {
        this._adj[v] = new Bag<Edge>();
      }
    }
  }

  public V(): number {
    return this._V;
  }

  public E(): number {
    return this._E;
  }

  public addEdge(e: Edge): void {
    const v = e.either();
    const w = e.other(v);
    this._adj[v].add(e);
    this._adj[w].add(e);
    this._E++;
  }

  public adj(v: number): Iterable<Edge> {
    return this._adj[v];
  }

  public edges(): Iterable<Edge> {
    const b = new Bag<Edge>();
    for (let v = 0; v < this._V; v++) {
      for (let e of this._adj[v]) {
        if (e.other(v) > v) {
          b.add(e);
        }
      }
    }
    return b;
  }
}