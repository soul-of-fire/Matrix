import { Component, OnInit } from '@angular/core';
import { Sort } from './share/sort';
import { Selection } from './share/selection';
import { Comparable } from './comparable/comparable';
import { Transaction } from './model/transaction';
import { Insertion } from './share/insertion';
import { Shell } from './share/shell';
import { Merge } from './share/merge';
import { Quick } from './share/quick';
import { Quick3Way } from './share/quick-3way';
import { HeapPriorityQueueMax } from './share/heap-priority-queue-max';
import { Heap } from './share/heap';
import { Comparators } from './comparable/comparators';

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.css']
})
export class SortComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // this.compareObjects();

    const a = ['S', 'O', 'R', 'T', 'E', 'X', 'A', 'M', 'P', 'L', 'E'];
    const b = [50, 40, 100, 10, 30];
    const mse = ['M', 'E', 'R', 'G', 'E', 'S', 'O', 'R', 'T', 'E', 'X', 'A', 'M', 'P', 'L', 'E'];
    const qse = ['Q', 'U', 'I', 'C', 'K', 'S', 'O', 'R', 'T', 'E', 'X', 'A', 'M', 'P', 'L', 'E'];
    const suffle = ['K', 'R', 'A', 'T', 'E', 'L', 'E', 'P', 'U', 'I', 'M', 'Q', 'C', 'X', 'O', 'S'];
    // this.sort(Selection, b);
    // this.sort(Selection, a);
    // this.sort(Insertion, a);
    // this.sort(Shell, a);
    // this.sort(Merge, mse);
    // this.sort(Quick, suffle);
    // this.sort(Quick3Way, suffle);
    // this.sort(Heap, a);
    // this.heapPriorityQueue(a);
    // this.comparators();
  }

  private comparators() {
    const o = [new Transaction(3, 'B'), new Transaction(2, 'C'), new Transaction(1, 'A')];
    const clone = [...o];
    Shell.sort(o, Comparators.ASC);
    console.log(o);
    Shell.sort(clone, Transaction.NAME_ASC);
    console.log(clone);
  }

  private heapPriorityQueue(a: Comparable[]) {
    const pq = new HeapPriorityQueueMax()
    for (let s of a) {
      pq.insert(s);
    }
    const result = Array.from(pq).reverse();
    console.log(result.join(' '));
    if (!Sort.isSorted(result)) {
      throw 'Not sorted!';
    }
  }

  private sort(clazz: any, a: Comparable[]) {
    console.log(clazz.name);
    clazz.sort(a);
    if (!Sort.isSorted(a)) {
      throw 'Not sorted!';
    }
    Sort.toString(a);
  }

  private compareObjects() {
    const one = new Transaction(20);
    const two = new Transaction(50);
    console.log('object toPrimitive:', +one);
    console.log('o1 < o2:', one < two);
  }

  comparable = `export interface Compare {
    [Symbol.toPrimitive]: () => number | string;
  }

  export type Comparable = number | string | Compare;
  
  export class Transaction implements Compare {
    constructor(public amount: number) { }
    [Symbol.toPrimitive]() {
      return this.amount;
    }
  }`

  iterable = `export class PriorityQueue implements Iterable<Comparable> {
  
    public delMax(): Comparable {
      return 1;
    }
  
    [Symbol.iterator]() {
      const _this = this;
      const iterator = {
        next(): IteratorResult<Comparable> {
          const el = _this.delMax();
          if (!el) {
            return { 
              done: true, 
              value: null 
            };
          }
          return { 
            done: false, 
            value: el 
          };
        }
      };
      return iterator;
    }
  }`

  selection = `public static sort(a: Comparable[]): void {
    const N = a.length;
    for (let i = 0; i < N; i++) {
      let min = i;
      for (let j = i + 1; j < N; j++) {
        if (Sort.less(a[j], a[min])) {
          min = j;
        }
      }
      Sort.exch(a, i, min);
    }
  }`

  insertion = `public static sort(a: Comparable[]): void {
    const N = a.length;
    for (let i = 1; i < N; i++) {
      for (let j = i; j > 0 && Sort.less(a[j], a[j - 1]); j--) {
        Sort.exch(a, j, j - 1);
      }
    }
  }`

  shell = `public static sort(a: Comparable[]): void {
    const N = a.length;
    let h = 1;
    while (h < N / 3) {
      h = ~~(3 * h + 1);
    }
    while (h >= 1) {
      for (let i = h; i < N; i++) {
        for (let j = i; j >= h && Sort.less(a[j], a[j - h]); j -= h) {
          Sort.exch(a, j, j - h);
        }
      }
      h = ~~(h / 3);
    }
  }`

  ms = `private static aux: Comparable[];
  private static CUTOFF = 7;

  public static sort(a: Comparable[]): void {
    Merge.aux = [];
    Merge.mergeSort(a, 0, a.length - 1);
  }

  private static mergeSort(a: Comparable[], lo: number, hi: number): void {
    if (hi <= lo + Merge.CUTOFF) {
      Insertion.sortRange(a, lo, hi);
      return;
    }
    
    const mid = ~~(lo + (hi - lo) / 2);
    Merge.mergeSort(a, lo, mid);
    Merge.mergeSort(a, mid + 1, hi);

    if (!Sort.less(a[mid + 1], a[mid])) {
      for (let i = lo; i <= hi; i++) {
        a[i] = a[i];
      }
      return;
    }

    Merge.merge(a, lo, mid, hi);
  }

  public static merge(a: Comparable[], lo: number, mid: number, hi: number): void {
    let currLo = lo;
    let currMid = mid + 1;
    for (let k = lo; k <= hi; k++) {
      Merge.aux[k] = a[k];
    }
    for (let k = lo; k <= hi; k++) {
      if (currLo > mid) {
        a[k] = Merge.aux[currMid++];
      } else if (currMid > hi) {
        a[k] = Merge.aux[currLo++];
      } else if (Sort.less(Merge.aux[currMid], Merge.aux[currLo])) {
        a[k] = Merge.aux[currMid++];
      } else {
        a[k] = Merge.aux[currLo++];
      }
    }
  }`

  quick = `public static sort(a: Comparable[]): void {
    Quick.quickSort(a, 0, a.length - 1);
  }
  
  private static quickSort(a: Comparable[], lo: number, hi: number): void {
    if (hi <= lo) {
      return;
    }
    const j = Quick.partition(a, lo, hi);
    Quick.quickSort(a, lo, j - 1);
    Quick.quickSort(a, j + 1, hi);
  }
  
  private static partition(a: Comparable[], lo: number, hi: number): number {
    let currLo = lo;
    let currHi = hi + 1;
    const v = a[lo];
    while (true) {
      while (Sort.less(a[++currLo], v)) {
        if (currLo == hi) {
          break;
        }
      }
      while (Sort.less(v, a[--currHi])) {
        if (currHi == lo) {
          break;
        }
      }
      if (currLo >= currHi) {
        break;
      }
      Sort.exch(a, currLo, currHi);
    }
    Sort.exch(a, lo, currHi);
    return currHi;
  }`

  q3w = `public static CUTOFF = 7;

  public static sort(a: Comparable[]): void {
    Quick3Way.quickSort(a, 0, a.length - 1);
  }

  private static quickSort(a: Comparable[], lo: number, hi: number): void {
    if (hi <= lo) return;

    let lt = lo;
    let i = lo + 1;
    let gt = hi;
    const v = a[lo];
    while (i <= gt) {
      if (a[i] < (v)) {
        Sort.exch(a, lt++, i++);
      } else if (a[i] > (v)) {
        Sort.exch(a, i, gt--);
      } else {
        i++;
      }
    }
    Quick3Way.quickSort(a, lo, lt - 1);
    Quick3Way.quickSort(a, gt + 1, hi);
  }`

  hs = `public static sort(pq: Comparable[]): void {
    let n = pq.length;
    for (let i = ~~(n / 2); i >= 1; i--) { // sort parents
      Heap.sink(pq, i, n); // parent
    }
    while (n > 1) { // sink top down
      Heap.exch(pq, 1, n--); // move max to it final position to the end
      Heap.sink(pq, 1, n); // order sub array
    }
  }

  private static sink(pq: Comparable[], i: number, n: number): void {
    while (2 * i <= n) { // has childs
      let j = 2 * i; // child
      if (j < n && Heap.less(pq, j, j + 1)) { // next child is bigger
        j++;
      }
      if (!Heap.less(pq, i, j)) { // parent is bigger than bigger child
        break;
      } 
      Heap.exch(pq, i, j); // exchange bigger child with parent
      i = j;
    }
  }

  private static less(pq: Comparable[], i: number, j: number): boolean {
    return pq[i - 1] < pq[j - 1];
  }

  private static exch(pq: Comparable[], i: number, j: number): void {
    const swap = pq[+i - 1];
    pq[+i - 1] = pq[+j - 1];
    pq[+j - 1] = swap;
  }`

  comp = `export interface Comparator  {
    compare(a: Comparable, b: Comparable): boolean;
  }
  
  export class Comparators {
    public static DESC: Comparator = {
      compare(a: Comparable, b: Comparable) {
        return a > b;
      }
    }
  }
  
  or in object:
  {
    .....
    public static NAME_ASC: Comparator = {
      compare(a: Transaction, b: Transaction) {
        return a.name < b.name;
      }
    }
  }`

  pq = `class MinPQ<Key> implements Iterable<Key> {
    private pq: Key[];
    private n: number;
  
    constructor(G?: EdgeWeightedGraph) {
      this.pq = [];
      this.n = 0;
      if (G) {
        for (let e of G.edges()) {
          this.insert(e);
        }
      }
    }
  
    public isEmpty(): boolean {
      return this.n == 0;
    }
  
    public size(): number {
      return this.n;
    }
  
    public min(): Key {
      return this.pq[1];
    }
  
    public insert(x: any): void {
      this.pq[++this.n] = x;
      this.swim(this.n);
    }
  
    public delMin(): Key {
      const min = this.pq[1];
      this.exch(1, this.n--);
      this.sink(1);
      this.pq[this.n + 1] = null;
      return min;
    }
  
    private swim(k: number): void {
      while (k > 1 && this.greater(~~(k / 2), k)) {
        this.exch(k, ~~(k / 2));
        k = ~~(k / 2);
      }
    }
  
    private sink(k: number): void {
      while (2 * k <= this.n) {
        let j = 2 * k;
        if (j < this.n && this.greater(j, j + 1)) {
          j++;
        }
        if (!this.greater(k, j)) {
          break;
        }
        this.exch(k, j);
        k = j;
      }
    }
  
    private greater(i: number, j: number): boolean {
      return this.pq[i] > this.pq[j];
    }
  
    private exch(i: number, j: number): void {
      const swap = this.pq[i];
      this.pq[i] = this.pq[j];
      this.pq[j] = swap;
    }
  
    [Symbol.iterator]() {
      const _this = this;
      const iterator = {
        next(): IteratorResult<Key> {
          const el = _this.delMin();
          return {
            done: !el,
            value: el
          };
        }
      };
      return iterator;
    }
  }`
}
