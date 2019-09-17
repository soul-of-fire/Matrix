import { Component, OnInit } from '@angular/core';
import { FrequencyCounter } from './shared/frequency-counter';
import { Sequential } from './shared/sequential';
import { BinarySearch } from './shared/binary-search';
import { BinarySearchTree } from './shared/binary-search-tree';
import { BinarySearchTreeBalanced } from './shared/binary-search-tree-balanced';
import { SeparateChainingHash } from './shared/separate-chaining-hash';
import { LinearProbingHash } from './shared/linear-probing-hash';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // this.test(new Sequential<string, number>());
    // this.test(new BinarySearch<string, number>());
    // this.test(new BinarySearchTree<string, number>());
    // this.test(new BinarySearchTreeBalanced<string, number>());
    // this.test(new SeparateChainingHash());
    // this.test(new LinearProbingHash());
  }

  test(o: any) {
    const tale = tinyTale.split(/\s+/g);
    const st = FrequencyCounter.count(tale, o);
    for (let node of st) {
      console.log(node.key, node.value);
    }
  }

  seq = `private first: Node;

  public get(key: Key): Value {
    for (let x: Node = this.first; x != null; x = x.next) {
      if (key == x.key) {
        return x.val;
      }
    }
    return null;
  }

  public put(key: Key, val: Value): void {
    for (let x: Node = this.first; x != null; x = x.next) {
      if (key == x.key) {
        x.val = val;
        return;
      }
    }
    this.first = new Node(key, val, this.first);
  }

  public contains(key: any): boolean {
    return this.get(key) != null;
  }`

  bs = `private keys: Key[];
  private vals: Value[];
  private N: number;

  constructor() {
    this.keys = [];
    this.vals = [];
    this.N = 0;
  }

  public size(): number {
    return this.N;
  }

  public get(key: Key): Value {
    if (this.isEmpty()) {
      return null;
    }
    let i = this.rank(key);
    if (i < this.N && this.keys[i] == key) {
      return this.vals[i];
    } else {
      return null;
    }
  }

  public rank(key: Key): number {
    let lo = 0;
    let hi = this.N - 1;
    while (lo <= hi) {
      const mid = ~~(lo + (hi - lo) / 2);
      if (key < this.keys[mid]) {
        hi = mid - 1;
      } else if (key > this.keys[mid]) {
        lo = mid + 1;
      } else {
        return mid;
      }
    }
    return lo;
  }

  public put(key: Key, val: Value): void {
    let rank = this.rank(key);
    if (rank < this.N && this.keys[rank] == key) { 
      this.vals[rank] = val; 
      return; 
    }
    for (let n = this.N; n > rank; n--) {
      this.keys[n] = this.keys[n - 1];
      this.vals[n] = this.vals[n - 1];
    }
    this.keys[rank] = key;
    this.vals[rank] = val;
    this.N++;
  }

  public contains(key: any): boolean {
    return this.get(key) != null;
  }

  private isEmpty(): boolean {
    return this.keys.length == 0;
  }`

  bst = `private root: BNode;

  public size(): number {
    return this.sizeRoot(this.root);
  }

  private sizeRoot(x: BNode): number {
    if (x == null) {
      return 0;
    } else {
      return x.N;
    }
  }

  public get(key: Key): Value {
    return this.getRoot(this.root, key);
  }

  private getRoot(x: BNode, key: Key): Value {
    if (x == null) {
      return null;
    }
    if (key < x.key) {
      return this.getRoot(x.left, key);
    } else if (key > x.key) {
      return this.getRoot(x.right, key);
    } else {
      return x.val;
    }
  }

  public put(key: Key, val: Value): void {
    this.root = this.putRoot(this.root, key, val);
  }

  private putRoot(x: BNode, key: Key, val: Value): BNode {
    if (x == null) {
      return new BNode(key, val, 1);
    }
    if (key < x.key) {
      x.left = this.putRoot(x.left, key, val);
    } else if (key > x.key) {
      x.right = this.putRoot(x.right, key, val);
    } else {
      x.val = val;
    }
    x.N = this.sizeRoot(x.left) + this.sizeRoot(x.right) + 1;
    return x;
  }

  public contains(key: any): boolean {
    return this.get(key) != null;
  }
  
  public size(): number {
    return this.sizeRoot(this.root);
  }

  private sizeRoot(x: TNode): number {
    if (x == null) {
      return 0;
    } else {
      return x.N;
    }
  }`

  bstb = `private root: TNode;

  public put(key: Key, val: Value): void {
    this.root = this.putRoot(this.root, key, val);
    this.root.color = TNode.BLACK;
  }

  private putRoot(x: TNode, key: Key, val: Value): TNode {
    if (x == null) {
      return new TNode(key, val, 1, TNode.RED);
    }

    if (key < x.key) {
      x.left = this.putRoot(x.left, key, val);
    } else if (key > x.key) {
      x.right = this.putRoot(x.right, key, val);
    } else {
      x.val = val;
    }

    if (this.isRed(x.right) && !this.isRed(x.left)) {
      x = this.rotateLeft(x);
    }
    if (this.isRed(x.left) && this.isRed(x.left.left)) {
      x = this.rotateRight(x);
    }
    if (this.isRed(x.left) && this.isRed(x.right)) {
      this.flipColors(x);
    }

    x.N = this.sizeRoot(x.left) + this.sizeRoot(x.right) + 1;
    return x;
  }

  public get(key: Key): Value {
    return this.getRoot(this.root, key);
  }

  private getRoot(x: TNode, key: Key): Value {
    if (x == null) {
      return null;
    }
    if (key < x.key) {
      return this.getRoot(x.left, key);
    } else if (key > x.key) {
      return this.getRoot(x.right, key);
    } else {
      return x.val;
    }
  }

  public contains(key: any): boolean {
    return this.get(key) != null;
  }

  private isRed(x: TNode): boolean {
    if (x == null) {
      return false;
    }
    return x.color == TNode.RED;
  }

  private rotateLeft(x: TNode): TNode {
    const right = x.right;
    x.right = right.left;
    right.left = x;
    right.color = x.color;
    x.color = TNode.RED;
    right.N = x.N;
    x.N = 1 + this.sizeRoot(x.left) + this.sizeRoot(x.right);
    return right;
  }

  private rotateRight(x: TNode): TNode {
    const left = x.left;
    x.left = left.right;
    left.right = x;
    left.color = x.color;
    x.color = TNode.RED;
    left.N = x.N;
    x.N = 1 + this.sizeRoot(x.left) + this.sizeRoot(x.right);
    return left;
  }

  private flipColors(h: TNode): void {
    h.color = TNode.RED;
    h.left.color = TNode.BLACK;
    h.right.color = TNode.BLACK;
  }

  public size(): number {
    return this.sizeRoot(this.root);
  }

  private sizeRoot(x: TNode): number {
    if (x == null) {
      return 0;
    } else {
      return x.N;
    }
  }`

  ht = `private st: Sequential<Key, Value>[];

  constructor(private M: number = 997) {
    this.st = [];
    for (let i = 0; i < this.M; i++) {
      this.st[i] = new Sequential();
    }
  }

  private hash(key: Comparable): number {
    key = key + '';
    const H = 31;
    var total = 0;
    for (var i = 0; i < key.length; ++i) {
      total += H * total + key.charCodeAt(i);
    }
    total = total % this.M;
    if (total < 0) {
      total += this.M - 1;
    }
    return total;
  }

  public get(key: Comparable): Value {
    return <Value>this.st[this.hash(key)].get(<any>key);
  }

  public put(key: Comparable, val: Value): void {
    this.st[this.hash(key)].put(<any>key, val);
  }

  public contains(key: Comparable): boolean {
    return this.get(key) != null;
  }`

  lp = `private keys: Comparable[];
  private vals: Value[];

  constructor(private M: number = 16) {
    this.keys = [];
    this.vals = [];
  }

  private hash(key: Comparable): number {
    key = key + '';
    const H = 31;
    var total = 0;
    for (var i = 0; i < key.length; ++i) {
      total += H * total + key.charCodeAt(i);
    }
    total = total % this.M;
    if (total < 0) {
      total += this.M - 1;
    }
    return total;
  }

  public put(key: Comparable, val: Value): void {
    let i;
    for (i = this.hash(key); this.keys[i]; i++) {
      if (this.keys[i] == key) {
        this.vals[i] = val;
        return;
      }
    }
    this.keys[i] = key;
    this.vals[i] = val;
  }

  public get(key: Comparable): Value {
    for (let i = this.hash(key); this.keys[i]; i++)
      if (this.keys[i] == key) {
        return this.vals[i];
      }
    return null;
  }

  public contains(key: Comparable): boolean {
    return this.get(key) != null;
  }`

  es6Map = `class Es6Map implements Iterable<Entry> {
    private m: Map<Comparable, any>;
  
    constructor() {
      this.m = new Map;
    }
  
    public get(key: Comparable) {
      return this.m.get(key);
    }
  
    public put(key: Comparable, val: any): void {
      this.m.set(key, val);
    }
  
    public contains(key: Comparable): boolean {
      return this.m.has(key);
    }
  
    [Symbol.iterator]() {
      const e = this.m.entries();
      const iterator = {
        next(): IteratorResult<Entry> {
          const entry = e.next()
          return {
            done: !(entry && entry.value),
            value: entry && entry.value && new Entry(entry.value[0], entry.value[1] || null)
          };
        }
      };
      return iterator;
    }
  }`
}

const tinyTale = `it was the best of times it was the worst of times
it was the age of wisdom it was the age of foolishness
it was the epoch of belief it was the epoch of incredulity
it was the season of light it was the season of darkness
it was the spring of hope it was the winter of despair`