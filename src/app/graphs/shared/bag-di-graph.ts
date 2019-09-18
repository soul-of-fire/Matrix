import { Digraph } from './interfaces/di-graph';
import { Bag } from 'src/app/fundamentals/data-structures/bag';

export class BagDigraph implements Digraph {
  private _V: number;
  private _E: number;
  private _adj: Array<Bag<number>>;

  constructor(V: number) {
    this._V = V;
    this._E = 0;
    this._adj = [];
    for (let v = 0; v < this._V; v++) {
      this._adj[v] = new Bag<number>();
    }
  }

  public V(): number {
    return this._V;
  }

  public E(): number {
    return this._E;
  }

  public addEdge(v: number, w: number): void {
    this._adj[v].add(w);
    this._E++;
  }

  public adj(v: number): Iterable<number> {
    return this._adj[v];
  }

  public reverse(): Digraph {
    const R = new BagDigraph(this._V);
    for (let v = 0; v < this._V; v++) {
      for (let w of this.adj(v)) {
        R.addEdge(w, v);
      }
    }
    return R;
  }

  public toString(): string {
    let s = this._V + " vertices, " + this._E + " edges\n";
    for (let i = 0; i < this._V; i++) {
      s += i + ": ";
      for (let w of this.adj(i)) {
        s += w + " ";
      }
      s += "\n";
    }
    return s;
  }
}