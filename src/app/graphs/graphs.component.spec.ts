import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphsComponent } from './graphs.component';
import { Operations } from './shared/other/operations';
import { BagGraph } from './shared/bag-graph';
import { tinyG } from './data/tinyG';
import { SearchClient } from './shared/other/search-client';
import { DepthFirstSearch } from './shared/depth-first-search';
import { DepthFirstPath } from './shared/depth-first-path';
import { BreadthFirstPath } from './shared/breadth-first-path';
import { ConnectedComponentsClient } from './shared/other/connected-components-client';
import { Cycle } from './shared/other/cycle';
import { Bipartite } from './shared/other/bipartite';
import { SymbolEs6 } from './shared/symbol-es6';
import { routes } from './data/routes';

describe('GraphsComponent', () => {
  let component: GraphsComponent;
  let fixture: ComponentFixture<GraphsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphsComponent ]
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
    expect(search).toEqual([0,1,2,3,4,5,6]);
  });

  it('should find pat from 0 to 3, DFP', () => {
    const G = new BagGraph(Operations.stringToArrayOfArrays(tinyG));
    const dfp = new DepthFirstPath(G, 0);
    expect(dfp.hasPathTo(3)).toBeTruthy();
    expect(Array.from(dfp.pathTo(3))).toEqual([0,6,4,5,3]);
  });

  it('should find pat from 0 to 3, BFP', () => {
    const G = new BagGraph(Operations.stringToArrayOfArrays(tinyG));
    const dfp = new BreadthFirstPath(G, 0);
    expect(dfp.hasPathTo(3)).toBeTruthy();
    expect(Array.from(dfp.pathTo(3))).toEqual([0,5,3]);
  });

  it('should find connected components', () => {
    const cc = ConnectedComponentsClient.connect(tinyG);
    expect(cc).toEqual([[0,1,2,3,4,5,6],[7,8],[9,10,11,12]]);
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
    expect(Array.from(G.adj(sg.index('JFK')))).toEqual([sg.index('ORD'),sg.index('ATL'),sg.index('MCO')]);
    expect(Array.from(G.adj(sg.index('LAX')))).toEqual([9,6]);
    expect(Operations.degree(G, sg.index('ATL'))).toEqual(4);
    expect(Operations.avgDegree(G)).toEqual(3.6);
    expect(Operations.maxDegree(G)).toEqual(6);
    expect(Operations.numberOfSelfLoops(G)).toEqual(0);
  });
});
