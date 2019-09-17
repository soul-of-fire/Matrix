import { Comparable } from 'src/app/sort/comparable/comparable';
import { TNode } from './t-node';
import { Entry } from './entry';
import { Queue } from 'src/app/fundamentals/data-structures/queue';

export class BinarySearchTreeBalanced<Key extends Comparable, Value> implements Iterable<Entry> {
  private root: TNode;

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
  }

  public isEmpty(): boolean {
    return this.root == null;
  }

  private moveRedRight(h: TNode): TNode {
    this.flipColors(h);
    if (this.isRed(h.left.left)) {
      h = this.rotateRight(h);
      this.flipColors(h);
    }
    return h;
  }

  public deleteMax(): void {
    if (!this.isRed(this.root.left) && !this.isRed(this.root.right)) {
      this.root.color = TNode.RED;
    }
    this.root = this.deleteMaxRoot(this.root);
    if (!this.isEmpty()) {
      this.root.color = TNode.BLACK;
    }
  }

  private deleteMaxRoot(h: TNode) {
    if (this.isRed(h.left)) {
      h = this.rotateRight(h);
    }
    if (h.right == null) {
      return null;
    }
    if (!this.isRed(h.right) && !this.isRed(h.right.left)) {
      h = this.moveRedRight(h);
    }
    h.right = this.deleteMaxRoot(h.right);
    return this.balance(h);
  }

  public deleteMin(): void {
    if (!this.isRed(this.root.left) && !this.isRed(this.root.right)) {
      this.root.color = TNode.RED;
    }
    this.root = this.deleteMinRoot(this.root);
    if (!this.isEmpty()) {
      this.root.color = TNode.BLACK;
    }
  }

  private deleteMinRoot(h: TNode): TNode {
    if (h.left == null) {
      return null;
    }
    if (!this.isRed(h.left) && !this.isRed(h.left.left)) {
      h = this.rotateLeft(h);
    }
    h.left = this.deleteMinRoot(h.left);
    return this.balance(h);
  }

  public delete(key: Key): void {
    if (!this.contains(key)) {
      return;
    }
    if (!this.isRed(this.root.left) && !this.isRed(this.root.right)) {
      this.root.color = TNode.RED;
    }
    this.root = this.deleteRoot(this.root, key);
    if (!this.isEmpty()) {
      this.root.color = TNode.BLACK;
    }
  }

  private deleteRoot(h: TNode, key: Key) {
    if (key < h.key) {
      if (!this.isRed(h.left) && !this.isRed(h.left.left)) {
        h = this.rotateLeft(h);
      }
      h.left = this.deleteRoot(h.left, key);
    } else {
      if (this.isRed(h.left)) {
        h = this.rotateRight(h);
      }
      if ((key == h.key) && (h.right == null)) {
        return null;
      }
      if (!this.isRed(h.right) && !this.isRed(h.right.left)) {
        h = this.moveRedRight(h);
      }
      if (key == h.key) {
        const x = this.minRoot(h.right);
        h.key = x.key;
        h.val = x.val;
        h.right = this.deleteMinRoot(h.right);
      } else {
        h.right = this.deleteRoot(h.right, key);
      }
    }
    return this.balance(h);
  }

  private balance(h: TNode): TNode {
    if (this.isRed(h.right)) {
      h = this.rotateLeft(h);
    }
    if (this.isRed(h.left) && this.isRed(h.left.left)) {
      h = this.rotateRight(h);
    }
    if (this.isRed(h.left) && this.isRed(h.right)) {
      this.flipColors(h);
    }
    h.N = this.sizeRoot(h.left) + this.sizeRoot(h.right) + 1;
    return h;
  }

  public min() {
    return this.minRoot(this.root).key;
  }

  private minRoot(x: TNode): TNode {
    if (x.left == null) {
      return x;
    } else {
      return this.minRoot(x.left);
    }
  }

  public max() {
    return this.maxRoot(this.root).key;
  }

  private maxRoot(x: TNode): TNode {
    if (x.right == null) {
      return x;
    } else {
      return this.maxRoot(x.right);
    }
  }

  public select(index: number) {
    return this.selectRoot(this.root, index).key;
  }

  private selectRoot(x: TNode, k: number): TNode {
    if (x == null) {
      return null;
    }
    const t = this.sizeRoot(x.left);
    if (t > k) {
      return this.selectRoot(x.left, k);
    } else if (t < k) {
      return this.selectRoot(x.right, k - t - 1);
    } else {
      return x;
    }
  }

  public rank(key: Key): number {
    return this.rankRoot(key, this.root);
  }

  private rankRoot(key: Key, x: TNode): number {
    if (x == null) {
      return 0;
    }
    if (key < x.key) {
      return this.rankRoot(key, x.left);
    } else if (key > x.key) {
      return 1 + this.sizeRoot(x.left) + this.rankRoot(key, x.right);
    } else {
      return this.sizeRoot(x.left);
    }
  }

  public floor(key: Key) {
    const x = this.floorRoot(this.root, key);
    if (x == null) {
      return null;
    }
    return x.key;
  }

  private floorRoot(x: TNode, key: Key): TNode {
    if (x == null) {
      return null;
    }
    if (key == x.key) {
      return x;
    }
    if (key < x.key) {
      return this.floorRoot(x.left, key);
    }
    const t = this.floorRoot(x.right, key);
    if (t != null) {
      return t;
    } else {
      return x;
    }
  }

  public keys(lo: any, hi: any) {
    const queue = new Queue<Key>();
    this.keysRoot(this.root, queue, lo, hi);
    return queue;
  }

  private keysRoot(x: TNode, queue: Queue<Key>, lo: any, hi: any): void {
    if (x == null) {
      return;
    }
    if (lo < x.key) {
      this.keysRoot(x.left, queue, lo, hi);
    }
    if (lo <= x.key && hi >= x.key) {
      queue.enqueue(<any>x.key);
    }
    if (hi > x.key) {
      this.keysRoot(x.right, queue, lo, hi);
    }
  }

  private toArray(x: TNode, a = []): TNode[] {
    if (x.left) {
      this.toArray(x.left, a);
    }
    a.push(x);
    if (x.right) {
      this.toArray(x.right, a);
    }
    return a;
  }

  [Symbol.iterator]() {
    const array = this.toArray(this.root);
    const iterator = {
      next(): IteratorResult<Entry> {
        if (array.length == 0) {
          return {
            done: true,
            value: null
          };
        }
        const node = <any>array.shift();
        return {
          done: false,
          value: new Entry(node.key, node.val)
        };
      }
    };
    return iterator;
  }
}