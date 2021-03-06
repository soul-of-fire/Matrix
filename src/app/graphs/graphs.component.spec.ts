import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { GraphsComponent } from './graphs.component';
import { Operations } from './shared/other/operations';
import { BagGraph } from './shared/bag-graph';
import { tinyG } from './data/tinyG';
import { SearchClient } from './shared/clients/search-client';
import { DepthFirstSearch } from './shared/depth-first-search';
import { DepthFirstPath } from './shared/depth-first-path';
import { BreadthFirstPath } from './shared/breadth-first-path';
import { ConnectedComponentsClient } from './shared/clients/connected-components-client';
import { Cycle } from './shared/other/cycle';
import { Bipartite } from './shared/other/bipartite';
import { SymbolEs6 } from './shared/symbol-es6';
import { routes } from './data/routes';
import { DegreesOfSeparation } from './shared/other/degrees-of-separation';
import { tinyDG } from './data/tinyDG';
import { BagDigraph } from './shared/bag-digraph';
import { DirectedDepthFirstSearch } from './shared/directed-depth-first-search';
import { DirectedCycle } from './shared/other/directed-cycle';
import { jobs } from './data/jobs';
import { SymbolEs6Digraph } from './shared/symbol-es6-digraph';
import { DepthFirstOrder } from './shared/other/depth-first-order';
import { StrongConnected } from './shared/other/strong-connected';
import { EdgeWeightedGraph } from './shared/edge-weighted-graph';
import { tinyEWG } from './data/tinyEWG';
import { LazyPrimMST } from './shared/lazy-prims-mst';
import { KruskalMST } from './shared/kruskal-mst';
import { EdgeWeightedDigraph } from './shared/edge-weighted-digraph';
import { tinyEWD } from './data/tinyEWD';
import { DirectedGraphShortestPath } from './shared/directed-graph-shortest-path';
import { EdgeWeightedDirectedCycle } from './shared/other/edge-weight-directed-cycle';
import { tinyEWDAG } from './data/tinyEWDAG';
import { DepthFirstOrderWeight } from './shared/other/depth-first-order-weight';
import { AcyclicShortestPath } from './shared/acyclic-shortest-path';
import { ParallelSchedule } from './shared/parallel-schedule';
import { jobsPC } from './data/jobsPC';
import { tinyEWDn } from './data/tinyEWDn';
import { BellmanFordSP } from './shared/bellman-ford-shortest-path';

describe('GraphsComponent', () => {
  let component: GraphsComponent;
  let fixture: ComponentFixture<GraphsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GraphsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create graph and check options', () => {
    const bag = new BagGraph(Operations.stringToArrayOfArrays(tinyG));
    expect(Operations.degree(bag, 0)).toEqual(4);
    expect(Operations.avgDegree(bag)).toEqual(2);
    expect(Operations.maxDegree(bag)).toEqual(4);
    expect(Operations.numberOfSelfLoops(bag)).toEqual(0);
  });

  it('should find connected vertices from 0, DFS', () => {
    const search = SearchClient.search(tinyG, DepthFirstSearch, 0);
    expect(search).toEqual([0, 1, 2, 3, 4, 5, 6]);
  });

  it('should find pat from 0 to 3, DFP', () => {
    const G = new BagGraph(Operations.stringToArrayOfArrays(tinyG));
    const dfp = new DepthFirstPath(G, 0);
    expect(dfp.hasPathTo(3)).toBeTruthy();
    expect(Array.from(dfp.pathTo(3))).toEqual([0, 6, 4, 5, 3]);
  });

  it('should find pat from 0 to 3, BFP', () => {
    const G = new BagGraph(Operations.stringToArrayOfArrays(tinyG));
    const dfp = new BreadthFirstPath(G, 0);
    expect(dfp.hasPathTo(3)).toBeTruthy();
    expect(Array.from(dfp.pathTo(3))).toEqual([0, 5, 3]);
  });

  it('should find connected components', () => {
    const cc = ConnectedComponentsClient.connect(tinyG);
    expect(cc).toEqual([[0, 1, 2, 3, 4, 5, 6], [7, 8], [9, 10, 11, 12]]);
  });

  it('should check for cyrcular connection', () => {
    const G = new BagGraph(Operations.stringToArrayOfArrays(tinyG));
    const cycle = new Cycle(G).hasCycle();
    expect(cycle).toBeTruthy();
  });

  it('should check if it is bipartite', () => {
    const G = new BagGraph(Operations.stringToArrayOfArrays(tinyG));
    const bipartite = new Bipartite(G).isBipartite();
    expect(bipartite).toBeFalsy();
  });

  it('should create SymbolGraph', () => {
    const sg = new SymbolEs6(routes, ' ');
    const G = sg.G();
    expect(Array.from(G.adj(sg.index('JFK')))).toEqual([sg.index('ORD'), sg.index('ATL'), sg.index('MCO')]);
    expect(Array.from(G.adj(sg.index('LAX')))).toEqual([9, 6]);
    expect(Operations.degree(G, sg.index('ATL'))).toEqual(4);
    expect(Operations.avgDegree(G)).toEqual(3.6);
    expect(Operations.maxDegree(G)).toEqual(6);
    expect(Operations.numberOfSelfLoops(G)).toEqual(0);
  });

  it('should find degrees of separation', () => {
    const degree = DegreesOfSeparation.degrees(routes, ' ', 'LAS', 'MCO');
    expect(degree).toEqual(['LAS', 'PHX', 'ORD', 'ATL', 'MCO']);
  });

  it('should create digraph', () => {
    const DG = diGraph();
    expect(Array.from(DG.adj(5))).toEqual([4]);
  });

  it('should find connected elements in digraph', () => {
    const DG = diGraph();
    const ddfs = new DirectedDepthFirstSearch(DG, 0);
    expect(Array.from(ddfs)).toEqual([0, 1, 2, 3, 4, 5]);
  });

  it('should find cycle in digraph', () => {
    const DG = diGraph();
    const dc = new DirectedCycle(DG);
    expect(dc.hasCycle()).toBeTruthy();
    expect(Array.from(dc.cycle())).toEqual([3, 5, 4, 3]);
  });

  it('should order directed graph topologicaly', () => {
    const sg = new SymbolEs6Digraph(jobs, '/');
    const DG = sg.G();
    const dfo = new DepthFirstOrder(DG);
    expect(Array.from(dfo.reversePost()).map(i => sg.name(i))).toEqual([
      'Calculus',
      'Linear Algebra',
      'Introduction to CS',
      'Advanced Programming',
      'Algorithms',
      'Theoretical CS',
      'Artificial Intelligence',
      'Robotics',
      'Machine Learning',
      'Neural Networks',
      'Databases',
      'Scientific Computing',
      'Computational Biology'
    ]);
  });

  it('should find strongly connected components (vertices)', () => {
    const DG = diGraph();
    const sc = new StrongConnected(DG);
    expect(sc.count()).toEqual(5);
    expect(sc.stronglyConnected(2, 3)).toBeTruthy();
    expect(sc.stronglyConnected(0, 6)).toBeFalsy();
  });

  it('should find prim MST lazy', () => {
    const ewg = new EdgeWeightedGraph(Operations.stringToArrayOfArrays(tinyEWG));
    expect(Array.from(ewg.adj(0)).map(x => +x)).toEqual([0.58, 0.26, 0.38, 0.16]);
    const lp = new LazyPrimMST(ewg);
    expect(Array.from(lp.edges()).map(x => +x)).toEqual([0.16, 0.19, 0.26, 0.17, 0.28, 0.35, 0.4]);
    expect(lp.weight).toEqual(1.81);
  });

  it('should find kruskal MST', () => {
    const ewg = new EdgeWeightedGraph(Operations.stringToArrayOfArrays(tinyEWG));
    const kr = new KruskalMST(ewg);
    expect(Array.from(kr.edges()).map(x => +x)).toEqual([0.16, 0.17, 0.19, 0.26, 0.28, 0.35, 0.4]);
    expect(kr.weight()).toEqual(1.81);
  });

  it('should find shortest path in directed graph Dijkrsta', () => {
    const dg = new EdgeWeightedDigraph(Operations.stringToArrayOfArrays(tinyEWD));
    expect(Array.from(dg.adj(0)).map(x => +x)).toEqual([0.26, 0.38]);
    const sp = new DirectedGraphShortestPath(dg, 0);
    expect(Array.from(sp.pathTo(6)).map(x => +x)).toEqual([0.26, 0.34, 0.39, 0.52]);
    expect(sp.distTo(1)).toEqual(1.05);
  });

  it('should find cycle in weighted digraph', () => {
    const DG = weightedDiGraph();
    const dc = new EdgeWeightedDirectedCycle(DG);
    expect(dc.hasCycle()).toBeFalsy();
  });

  it('should find shortest path in weighted directed graph', () => {
    const dg = new EdgeWeightedDigraph(Operations.stringToArrayOfArrays(tinyEWDAG));
    const acyclic = new AcyclicShortestPath(dg, 5);
    expect(acyclic.distTo(6)).toEqual(1.13);
  });

  it('should schedule acyclic weighted graph', () => {
    const schedule = new ParallelSchedule(Operations.stringToArrayOfArrays(jobsPC));
    expect(schedule.path()[2][1]).toBe(41);
    expect(schedule.path()[9][1]).toBe(123);
    expect(schedule.distance()).toBe(173);
  });

  it('should find shortest path in cyclic weighted graph Bellman-Ford', () => {
    const nc = new EdgeWeightedDigraph(Operations.stringToArrayOfArrays(tinyEWDn));
    const bf = new BellmanFordSP(nc, 0);
    console.log(bf.pathTo(5));
    expect(Array.from(bf.pathTo(5)).map(x => +x)).toEqual([0.26, 0.34, 0.39, 0.52, -1.25, 0.35]);
  });
});

const diGraph = (file: string = tinyDG) => {
  const array = Operations.stringToArrayOfArrays(file);
  return new BagDigraph(array);
}

const weightedDiGraph = (file: string = tinyEWDAG) => {
  const array = Operations.stringToArrayOfArrays(file);
  return new EdgeWeightedDigraph(array);
}