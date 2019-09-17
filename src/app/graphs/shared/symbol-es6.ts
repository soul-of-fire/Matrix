import { SymbolGraph } from './interfaces/symbol-graph';
import { Graph } from './interfaces/graph';
import { Operations } from './other/operations';
import { BagGraph } from './bag-graph';
import { Es6Map } from 'src/app/search/shared/es6-map';
import { Comparable } from 'src/app/sort/comparable/comparable';

export class SymbolEs6 implements SymbolGraph {
  private st: Es6Map;
  private keys: Array<Comparable>;
  private _G: Graph;

  constructor(file: string, sp: string) {
    this.st = new Es6Map();
    const arrays = Operations.stringToArrayOfStringArrays(file, sp);
    let size = 0;
    for (let a of arrays) {
      for (let i = 0; i < a.length; i++) {
        if (!this.st.contains(a[i])) {
          this.st.put(a[i], size++);
        }
      }
    }
    this.keys = [];
    for (let e of this.st) {
      this.keys[this.st.get(e.key)] = e.key;
    }
    this._G = new BagGraph(size);
    for (let a of arrays) {
      const v = this.st.get(a[0]);
      for (let i = 1; i < a.length; i++) {
        this._G.addEdge(v, this.st.get(a[i]));
      }
    }
  }

  public contains(s: string): boolean {
    return this.st.contains(s);
  }

  public index(s: string): number {
    return this.st.get(s);
  }

  public name(v: number): Comparable {
    return this.keys[v];
  }

  public G(): Graph {
    return this._G;
  }
}