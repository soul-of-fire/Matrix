import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SortComponent } from './sort.component';
import { Selection } from './share/selection';
import { Speed } from '../shared/speed';
import { Transaction } from './model/transaction';
import { Insertion } from './share/insertion';
import { Shell } from './share/shell';
import { Merge } from './share/merge';
import { MergeBU } from './share/merge-bu';
import { Sort } from './share/sort';
import { Quick } from './share/quick';
import { Quick3Way } from './share/quick-3way';
import { HeapPriorityQueue } from './share/heap-priority-queue';
import { Comparable } from './comparable/comparable';
import { Heap } from './share/heap';
import { Comparator } from './comparable/comparator';
import { Comparators } from './comparable/comparators';

describe('SortComponent', () => {
  let component: SortComponent;
  let fixture: ComponentFixture<SortComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SortComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check sort', () => {
    ordered(Selection);
    ordered(Insertion);
    ordered(Shell);
    ordered(Merge);
    ordered(MergeBU);
    ordered(Quick);
    ordered(Quick3Way);
  });

  it('should check sort comparator', () => {
    ordered(Shell, Comparators.DESC);
  });

  it('should check heap priority queue', () => {
    const a = ['S', 'O', 'R', 'T', 'E', 'X', 'A', 'M', 'P', 'L', 'E'];
    expect(Sort.isSorted(checkHeapPQ(a))).toBeTruthy();
    const b = [50, 40, 100, 10, 30];
    expect(Sort.isSorted(checkHeapPQ(b))).toBeTruthy();
    const c = [new Transaction(50), new Transaction(40), new Transaction(100), new Transaction(10), new Transaction(30)];
    expect(Sort.isSorted(checkHeapPQ(c))).toBeTruthy();
  });

  xit('should check sort performance', () => {
    compare(Selection);
    compare(Insertion);
    compare(Shell);
    compare(Merge);
    compare(MergeBU);
    compare(Quick);
    compare(Quick3Way);
    compare(Heap);
  });
});

const compare = (clazz: any) => {
  const random = Speed.random(10000);
  console.log(clazz.name);
  Speed.start();
  clazz.sort(random);
  Speed.stop();
  expect(Sort.isSorted(random)).toBeTruthy();
};

const ordered = (clazz: any, comparator?: Comparator) => {
  const a = ['S', 'O', 'R', 'T', 'E', 'X', 'A', 'M', 'P', 'L', 'E'];
  clazz.sort(a, comparator);
  expect(Sort.isSorted(a, comparator)).toBeTruthy();
  const b = [50, 40, 100, 10, 30];
  clazz.sort(b, comparator);
  expect(Sort.isSorted(b, comparator)).toBeTruthy();
  const c = [new Transaction(50), new Transaction(40), new Transaction(100), new Transaction(10), new Transaction(30)];
  clazz.sort(c, comparator);
  expect(Sort.isSorted(c, comparator)).toBeTruthy();
}

const checkHeapPQ = (a: Comparable[]) => {
  const pq = new HeapPriorityQueue();
    for (let i of a) {
      pq.insert(i);
    }
    return Array.from(pq).reverse();
}