import { Component, OnInit } from '@angular/core';
import { BagGraph } from './shared/bag-graph';
import { Operations } from './shared/other/operations';
import { tinyG } from './data/tinyG';
import { SearchClient } from './shared/other/search-client';
import { DepthFirstSearch } from './shared/depth-first-search';
import { Graph } from './shared/interfaces/graph';
import { PathClient } from './shared/other/path-client';
import { DepthFirstPath } from './shared/depth-first-path';
import { BreadthFirstPath } from './shared/breadth-first-path';
import { ConnectedComponentsClient } from './shared/other/connected-components-client';
import { Cycle } from './shared/other/cycle';
import { Bipartite } from './shared/other/bipartite';
import { SymbolClient } from './shared/other/symbol-client';
import { routes } from './data/routes';
import { movies } from './data/movies';

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.css']
})
export class GraphsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const bag = new BagGraph(Operations.stringToArrayOfArrays(tinyG));
    console.log(bag.toString());
    // this.depthFirst(bag);
    // this.graph();
  }

  private graph() {
    let route = SymbolClient.client(routes, ' ', 'JFK');
    SymbolClient.adjecentToString(route, 'JFK');
    let list = SymbolClient.client(movies, '/', 'Bacon, Kevin');
    SymbolClient.adjecentToString(list, 'Bacon, Kevin');
  }

  private depthFirst(bag: Graph) {
    console.log('degree of 0:', Operations.degree(bag, 0));
    console.log('average degree:', Operations.avgDegree(bag));
    console.log('max degree:', Operations.maxDegree(bag));
    console.log('number of self loops', Operations.numberOfSelfLoops(bag));
    const dfs = SearchClient.search(tinyG, DepthFirstSearch, 0);
    console.log('connected vertices: ', dfs.join(' '));
    const dfp = PathClient.path(tinyG, DepthFirstPath, 0);
    console.log(PathClient.pathsToString(dfp));
    const bfp = PathClient.path(tinyG, BreadthFirstPath, 0);
    console.log(PathClient.pathsToString(bfp));
    const cc = ConnectedComponentsClient.connect(tinyG);
    console.log(ConnectedComponentsClient.arraysToString(cc));
    console.log('has cycle: ', new Cycle(bag).hasCycle());
    console.log('is bipartite: ', new Bipartite(bag).isBipartite());

  }

  gp = `class BagGraph implements Graph {
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
  }`

  dfs = `class DepthFirstSearch {
    private isMarked: Array<boolean>;
    private n: number;
  
    constructor(G: Graph, sorce: number) {
      this.isMarked = [];
      this.n = 0;
      this.dfs(G, sorce);
    }
  
    private dfs(G: Graph, vertice: number): void {
      this.isMarked[vertice] = true;
      this.n++;
      for (let w of G.adj(vertice)) {
        if (!this.isMarked[w]) {
          this.dfs(G, w);
        }
      }
    }
  
    public marked(vertice: number): boolean {
      return this.isMarked[vertice];
    }
  
    public count(): number {
      return this.n;
    }
  }`

  dfp = `class DepthFirstPath {
    private isMarked: Array<boolean>;
    private edgeTo: Array<number>;
    private source: number;
  
    constructor(G: Graph, source: number) {
      this.isMarked = [];
      this.edgeTo = [];
      this.source = source;
      this.dfs(G, source);
    }
  
    private dfs(G: Graph, v: number): void {
      this.isMarked[v] = true;
      for (let w of G.adj(v)) {
        if (!this.isMarked[w]) {
          this.edgeTo[w] = v;
          this.dfs(G, w);
        }
      }
    }
  
    public hasPathTo(vertice: number): boolean {
      return this.isMarked[vertice];
    }
  
    public pathTo(vertice: number): Iterable<number> {
      if (!this.hasPathTo(vertice)) {
        return null;
      }
      const path = new Stack<number>();
      for (let x = vertice; x != this.source; x = this.edgeTo[x]) {
        path.push(x);
      }
      path.push(this.source);
      return path;
    }
  }`

  bfp = `class BreadthFirstPath {
    private marked: Array<boolean>;
    private edgeTo: Array<number>;
    private source: number;
  
    constructor(G: Graph, source: number) {
      this.marked = []
      this.edgeTo = []
      this.source = source;
      this.bfs(G, source);
    }
  
    private bfs(G: Graph, vertice: number): void {
      const queue = new Queue<number>();
      this.marked[vertice] = true;
      queue.enqueue(vertice);
      while (!queue.isEmpty()) {
        let vertice = queue.dequeue();
        for (let w of G.adj(vertice)) {
          if (!this.marked[w]) {
            this.edgeTo[w] = vertice;
            this.marked[w] = true;
            queue.enqueue(w);
          }
        }
      }
    }
  
    public hasPathTo(vertice: number): boolean {
      return this.marked[vertice];
    }
  
    public pathTo(vertice: number): Iterable<number> {
      if (!this.hasPathTo(vertice)) {
        return null;
      }
      const path = new Stack<number>();
      for (let x = vertice; x != this.source; x = this.edgeTo[x]) {
        path.push(x);
      }
      path.push(this.source);
      return path;
    }
  }`

  ses6 = `class SymbolEs6 implements SymbolGraph {
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
  }`
}
