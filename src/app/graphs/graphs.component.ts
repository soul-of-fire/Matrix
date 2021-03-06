import { Component, OnInit } from '@angular/core';
import { BagGraph } from './shared/bag-graph';
import { Operations } from './shared/other/operations';
import { tinyG } from './data/tinyG';
import { SearchClient } from './shared/clients/search-client';
import { DepthFirstSearch } from './shared/depth-first-search';
import { Graph } from './shared/interfaces/graph';
import { PathClient } from './shared/clients/path-client';
import { DepthFirstPath } from './shared/depth-first-path';
import { BreadthFirstPath } from './shared/breadth-first-path';
import { ConnectedComponentsClient } from './shared/clients/connected-components-client';
import { Cycle } from './shared/other/cycle';
import { Bipartite } from './shared/other/bipartite';
import { SymbolClient } from './shared/clients/symbol-client';
import { routes } from './data/routes';
import { movies } from './data/movies';
import { DegreesOfSeparation } from './shared/other/degrees-of-separation';
import { BagDigraph } from './shared/bag-digraph';
import { tinyDG } from './data/tinyDG';
import { DirectedDepthFirstSearch } from './shared/directed-depth-first-search';
import { DirectedCycle } from './shared/other/directed-cycle';
import { DepthFirstOrder } from './shared/other/depth-first-order';
import { Topological } from './shared/other/topological';
import { TopologicalClient } from './shared/clients/topological-client';
import { jobs } from './data/jobs';
import { StrongConnected } from './shared/other/strong-connected';
import { StrongConnectedComponentsClient } from './shared/clients/strong-connected-components-client';
import { tinyDAG } from './data/tinyDAG';
import { EdgeWeightedGraph } from './shared/edge-weighted-graph';
import { tinyEWG } from './data/tinyEWG';
import { LazyPrimMST } from './shared/lazy-prims-mst';
import { PrimMST } from './shared/prim-mst';
import { KruskalMST } from './shared/kruskal-mst';
import { MinPQ } from '../sort/share/min-pq';
import { Comparable } from '../sort/comparable/comparable';
import { IndexMinPQ } from '../sort/share/index-min-pq';
import { EdgeWeightedDigraph } from './shared/edge-weighted-digraph';
import { tinyEWD } from './data/tinyEWD';
import { DirectedGraphShortestPath } from './shared/directed-graph-shortest-path';
import { AcyclicShortestPath } from './shared/acyclic-shortest-path';
import { tinyEWDAG } from './data/tinyEWDAG';
import { jobsPC } from './data/jobsPC';
import { ParallelSchedule } from './shared/parallel-schedule';
import { tinyEWDn } from './data/tinyEWDn';
import { BellmanFordSP } from './shared/bellman-ford-shortest-path';
import { Arbitrage } from './shared/arbitrage';
import { rates } from './data/rates';

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.css']
})
export class GraphsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // const bag = new BagGraph(Operations.stringToArrayOfArrays(tinyG));
    // console.log(bag.toString());
    // this.depthFirst(bag);
    // this.graph();
    // this.degrees();
    // this.directedGraph();    
    // this.weightedGraph();
    // this.directedWeightGraph();
    // this.schedule();
    // this.directedNegativeCycles();
    // this.arbitrage();
  }

  private arbitrage() {
    Arbitrage.find(rates);
  }

  private directedNegativeCycles() {
    const nc = new EdgeWeightedDigraph(Operations.stringToArrayOfArrays(tinyEWDn));
    console.log(nc);
    const bf = new BellmanFordSP(nc, 0);
    console.log(bf.pathTo(5));
    bf.toString();
  }

  private schedule() {
    const schedule = new ParallelSchedule(Operations.stringToArrayOfArrays(jobsPC));
    console.log(schedule.path().map((a) => `${a[0]}: ${a[1].toFixed(1)}`).join('\n'));
    console.log(schedule.distance().toFixed(1));
  }

  private directedWeightGraph() {
    const ewdg = new EdgeWeightedDigraph(Operations.stringToArrayOfArrays(tinyEWD));
    console.log(ewdg);
    const sp = new DirectedGraphShortestPath(ewdg, 0);
    sp.toString();
    const dg = new EdgeWeightedDigraph(Operations.stringToArrayOfArrays(tinyEWDAG));
    console.log(dg);
    const acyclic = new AcyclicShortestPath(dg, 5);
    acyclic.toString();
  }
 
  private weightedGraph() {
    const ewg = new EdgeWeightedGraph(Operations.stringToArrayOfArrays(tinyEWG));
    // console.log(ewg);
    // const lp = new LazyPrimMST(ewg);
    // lp.toString();
    // const ep = new PrimMST(ewg);
    // ep.toString();
    const kr = new KruskalMST(ewg);
    kr.toString();
  }

  private directedGraph() {
    const tDG = Operations.stringToArrayOfArrays(tinyDG);
    const DG = new BagDigraph(tDG);
    console.log(DG.toString());
    const ddfs = new DirectedDepthFirstSearch(DG, 0);
    console.log('directed depth first search:', Array.from(ddfs).join(' '));
    console.log('has a cycle:', new DirectedCycle(DG).hasCycle());
    console.log('cyle:', Array.from(new DirectedCycle(DG).cycle()).join(' '));

    const sc = new StrongConnected(DG);
    console.log(sc.count());
    const scClient = StrongConnectedComponentsClient.connect(tinyDG);
    console.log(StrongConnectedComponentsClient.arraysToString(scClient));

    const tDAG = Operations.stringToArrayOfArrays(tinyDAG);
    const DAG = new BagDigraph(tDAG);
    const dfo = new DepthFirstOrder(DAG);
    console.log('reverse post:', Array.from(dfo.reversePost()).join(' '));
    
    const topological = new Topological(DAG);
    console.log('topological:', topological.isDAG ? Array.from(topological.order()).join(' ') : 'cyclic');
    console.log(TopologicalClient.client(jobs, '/').join('\n'));
  }
  
  private degrees() {
    const route = DegreesOfSeparation.degrees(routes, ' ', 'LAS', 'MCO');
    console.log(route.join(' '));
    const movie = DegreesOfSeparation.degrees(movies, '/', 'Bacon, Kevin', 'Kidman, Nicole');
    console.log(movie.join('\n'));
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

  ddfs = `private _marked: Array<boolean>;

  constructor(G: Digraph, s: number) {
    this._marked = [];
    this.dfs(G, s);
  }

  private dfs(G: Digraph, v: number): void {
    this._marked[v] = true;
    for (let w of G.adj(v)) {
      if (!this._marked[w]) {
        this.dfs(G, w);
      }
    }
  }

  public marked(v: number): boolean {
    return this._marked[v];
  }`

  dg = `private vertices: number;
  private edges: number;
  private adjesent: Array<Bag<number>>;

  constructor(vertices: number) {
    this.vertices = vertices;
    this.edges = 0;
    this.adjesent = [];
    for (let v = 0; v < this.vertices; v++) {
      this.adjesent[v] = new Bag<number>();
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
  }`

  dfo = `class DepthFirstOrder {
    private marked: Array<boolean>;
    private _reversePost: Stack<number>;
  
    constructor(G: Digraph) {
      this._reversePost = new Stack<number>();
      this.marked = [];
      for (let v = 0; v < G.V(); v++) {
        if (!this.marked[v]) {
          this.dfs(G, v);
        }
      }
    }
  
    private dfs(G: Digraph, v: number): void {
      this.marked[v] = true;
      for (let w of G.adj(v)) {
        if (!this.marked[w]) {
          this.dfs(G, w);
        }
      }
      this._reversePost.push(v);
    }
  
    public reversePost(): Iterable<number> {
      return this._reversePost;
    }
  }`

  sc = `class StrongConnected {
    private marked: Array<boolean>
    private _id: Array<number>;
    private _count: number;
  
    constructor(G: Digraph) {
      this.marked = [];
      this._id = [];
      this._count = 0;
      const order = new DepthFirstOrder(G.reverse());
      for (let s of order.reversePost()) {
        if (!this.marked[s]) {
          this.dfs(G, s);
          this._count++;
        }
      }
    }
  
    private dfs(G: Digraph, v: number): void {
      this.marked[v] = true;
      this._id[v] = this._count;
      for (let w of G.adj(v)) {
        if (!this.marked[w]) {
          this.dfs(G, w);
        }
      }
    }
  
    public stronglyConnected(v: number, w: number): boolean {
      return this._id[v] == this._id[w];
    }
  
    public id(v: number): number {
      return this._id[v];
    }
  
    public count(): number {
      return this._count;
    }
  }`

  primMST = `class LazyPrimMST {
    public weight: number = 0;
    private marked: Array<boolean>;
    private mst: Queue<Edge>;
    private pq: MinPQ<Edge>;
  
    constructor(G: EdgeWeightedGraph) {
      this.pq = new MinPQ<Edge>();
      this.marked = [];
      this.mst = new Queue<Edge>();
      this.visit(G, 0);
      while (!this.pq.isEmpty()) {
        const e = <Edge>this.pq.delMin();
        const v = e.either();
        const w = e.other(v);
        if (this.marked[v] && this.marked[w]) {
          continue;
        }
        this.mst.enqueue(e);
        this.weight += e.weight;
        if (!this.marked[v]) {
          this.visit(G, v);
        }
        if (!this.marked[w]) {
          this.visit(G, w);
        }
      }
    }
  
    private visit(G: EdgeWeightedGraph, v: number): void {
      this.marked[v] = true;
      for (let e of G.adj(v)) {
        if (!this.marked[e.other(v)]) {
          this.pq.insert(e);
        }
      }
    }
  
    public edges(): Iterable<Edge> {
      return this.mst;
    }
  }`

  kr = `private mst: Queue<Edge>;

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
  }`

  dgsp = `private edgeTo: DirectedEdge[];
  private _distTo: number[];
  private pq: IndexMinPQ<number>;

  constructor(G: EdgeWeightedDigraph, s: number) {
    this.edgeTo = [];
    this._distTo = [];
    this.pq = new IndexMinPQ<number>(G.V());
    for (let v = 0; v < G.V(); v++) {
      this._distTo[v] = Number.POSITIVE_INFINITY;
    }
    this._distTo[s] = 0.0;
    this.pq.insert(s, 0.0);
    while (!this.pq.isEmpty()) {
      this.relax(G, this.pq.delMin());
    }
  }

  private relax(G: EdgeWeightedDigraph, v: number): void {
    for (let e of G.adj(v)) {
      let w = e.to;
      if (this._distTo[w] > this._distTo[v] + e.weight) {
        this._distTo[w] = this._distTo[v] + e.weight;
        this.edgeTo[w] = e;
        if (this.pq.contains(w)) {
          this.pq.change(w, this._distTo[w]);
        } else {
          this.pq.insert(w, this._distTo[w]);
        }
      }
    }
  }

  public distTo(v: number): number {
    return this._distTo[v];
  }

  public hasPathTo(v: number): boolean {
    return this._distTo[v] < Number.POSITIVE_INFINITY;
  }

  public pathTo(v: number): Iterable<DirectedEdge> {
    if (!this.hasPathTo(v)) {
      return null;
    }
    const path = new Stack<DirectedEdge>();
    for (let e = this.edgeTo[v]; e != null; e = this.edgeTo[e.from]) {
      path.push(e);
    }
    return path;
  }`

  acyclic = `class AcyclicShortestPath {
    private _edgeTo: Array<DirectedEdge>;
    private _distTo: Array<number>;
    private G: EdgeWeightedDigraph;
  
    constructor(G: EdgeWeightedDigraph, s: number) {
      this.G = G;
      this._edgeTo = [];
      this._distTo = [];
      for (let v = 0; v < G.V(); v++) {
        this._distTo[v] = Number.POSITIVE_INFINITY;
      }
      this._distTo[s] = 0.0;
      const top = new TopologicalWeight(G);
      for (let v of top.order()) {
        this.relax(G, v);
      }
    }
  
    private relax(G: EdgeWeightedDigraph, v: number): void {
      for (let e of G.adj(v)) {
        let w = e.to;
        if (this._distTo[w] > this._distTo[v] + e.weight) {
          this._distTo[w] = this._distTo[v] + e.weight;
          this._edgeTo[w] = e;
        }
      }
    }
  
    public distTo(v: number): number {
      return this._distTo[v];
    }
  
    public hasPathTo(v: number): boolean {
      return this._distTo[v] < Number.POSITIVE_INFINITY;
    }
  
    public pathTo(v: number): Iterable<DirectedEdge> {
      if (!this.hasPathTo(v)) {
        return null;
      }
      const path = new Stack<DirectedEdge>();
      for (let e = this._edgeTo[v]; e != null; e = this._edgeTo[e.from]) {
        path.push(e);
      }
      return path;
    }
  }`

  pschedule = `class ParallelSchedule {
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
  }`

  spBF = `class BellmanFordSP {
    private _distTo: Array<number>;
    private _edgeTo: Array<DirectedEdge>;
    private _onQ: Array<boolean>;
    private _queue: Queue<number>;
    private _cost: number;
    private _cycle: Iterable<DirectedEdge>;
    private V: number;
  
    constructor(G: EdgeWeightedDigraph, s: number) {
      this._cost = 0;
      this.V = G.V();
      this._distTo = [];
      this._edgeTo = [];
      this._onQ = [];
      this._queue = new Queue<number>();
      for (let v = 0; v < G.V(); v++) {
        this._distTo[v] = Number.POSITIVE_INFINITY;
      }
      this._distTo[s] = 0.0;
      this._queue.enqueue(s);
      this._onQ[s] = true;
      while (!this._queue.isEmpty() && !this.hasNegativeCycle()) {
        const v = this._queue.dequeue();
        this._onQ[v] = false;
        this.relax(G, v);
      }
    }
  
    private relax(G: EdgeWeightedDigraph, v: number): void {
      for (let e of G.adj(v)) {
        let w = e.to;
        if (this._distTo[w] > this._distTo[v] + e.weight) {
          this._distTo[w] = this._distTo[v] + e.weight;
          this._edgeTo[w] = e;
          if (!this._onQ[w]) {
            this._queue.enqueue(w);
            this._onQ[w] = true;
          }
        }
        if (this._cost++ % G.V() == 0) {
          this.findNegativeCycle();
          if (this.hasNegativeCycle()) {
            return;
          }
        }
      }
    }
  
    public distTo(v: number): number {
      return this._distTo[v];
    }
  
    public hasPathTo(v: number): boolean {
      return this._distTo[v] < Number.POSITIVE_INFINITY;
    }
  
    public pathTo(v: number): Iterable<DirectedEdge> {
      if (!this.hasPathTo(v)) {
        return null;
      }
      const path = new Stack<DirectedEdge>();
      for (let e = this._edgeTo[v]; e != null; e = this._edgeTo[e.from]) {
        path.push(e);
      }
      return path;
    }
  
    private findNegativeCycle(): void {
      const V = this._edgeTo.length;
      const spt = new EdgeWeightedDigraph(V);
      for (let v = 0; v < V; v++) {
        if (this._edgeTo[v] != null) {
          spt.addEdge(this._edgeTo[v]);
        }
      }
      const cf = new EdgeWeightedDirectedCycle(spt);
      this._cycle = cf.cycle();
    }
  
    public hasNegativeCycle(): boolean {
      return !!this._cycle;
    }
  
    public negativeCycle(): Iterable<DirectedEdge> {
      return this._cycle;
    }
  }`

  arbit = `class Arbitrage {
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
          console.log(e);
        }
      } else {
        console.log("No arbitrage opportunity");
      }
    }`
}
