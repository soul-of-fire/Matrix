import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchComponent } from './search.component';
import { tale } from '../shared/test-data/tale';
import { Sequential } from './shared/sequential';
import { FrequencyCounter } from './shared/frequency-counter';
import { Speed } from '../shared/speed';
import { BinarySearch } from './shared/binary-search';
import { BinarySearchTree } from './shared/binary-search-tree';
import { BinarySearchTreeBalanced } from './shared/binary-search-tree-balanced';
import { Transaction } from '../sort/model/transaction';
import { SeparateChainingHash } from './shared/separate-chaining-hash';
import { LinearProbingHash } from './shared/linear-probing-hash';
import { Es6Map } from './shared/es6-map';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should use BinarySearchTree operations.', () => {
    options(new BinarySearchTree<string, number>());
    options(new BinarySearchTreeBalanced<string, number>());
  });

  it('should search types', () => {
    searchTypes(new Sequential<string, number>());
    searchTypes(new BinarySearch<string, number>());
    searchTypes(new BinarySearchTree<string, number>());
    searchTypes(new BinarySearchTreeBalanced<string, number>());
    searchTypes(new SeparateChainingHash<string, number>());
    searchTypes(new LinearProbingHash<string, number>());
  });

  xit('should check insert and serch performance', () => {
    const sub = tale.split(/\s+/g).slice(1 - 5000);
    search(sub, new Sequential<string, number>());
    search(sub, new BinarySearch<string, number>());
    search(sub, new BinarySearchTree<string, number>());
    search(sub, new BinarySearchTreeBalanced<string, number>());
    search(sub, new SeparateChainingHash<string, number>());
    search(sub, new LinearProbingHash<string, number>(sub.length * 2));
    search(sub, new Es6Map());
  });
});

const search = (sub: Array<string>, o: any, ) => {
  const a = [...sub];
  console.log(o.constructor.name);
  Speed.start();
  const fc = FrequencyCounter.count(a, o);
  Speed.stop();
  expect(fc.get('it')).toBeGreaterThanOrEqual(74);
}

const options = (bst: any) => {
  const tale = tinyTale.split(/\s+/g);
  for (let word of tale) {
    bst.put(word, 1);
  }
  expect(bst.min()).toEqual('age');
  expect(bst.max()).toEqual('worst');
  expect(bst.floor('soup')).toEqual('season');
  expect(bst.select(3)).toEqual('darkness');
  expect(bst.rank('it')).toEqual(9);
  bst.deleteMin();
  expect(bst.min()).toEqual('belief');
  bst.deleteMax();
  expect(bst.max()).toEqual('wisdom');
  bst.delete('despair');
  expect(bst.select(3)).toEqual('epoch');
  expect(bst.keys('k', 't').peek()).toEqual('light');
  expect(bst.keys('wase', 'wis').peek()).toEqual('winter');
}

const searchTypes = (st: any) => {
  const one = new Transaction(3);
  const objects = [one, new Transaction(2), new Transaction(4), new Transaction(1), new Transaction(5)];
  for (let x of objects) {
    st.put(+x, x);
  }
  expect(st.contains(one)).toBeTruthy();
  expect(st.get(one)).toEqual(one);
}

const tinyTale = `it was the best of times it was the worst of times
it was the age of wisdom it was the age of foolishness
it was the epoch of belief it was the epoch of incredulity
it was the season of light it was the season of darkness
it was the spring of hope it was the winter of despair`