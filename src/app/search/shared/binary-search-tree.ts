import { BNode } from './b-node';
import { Comparable } from 'src/app/sort/comparable/comparable';
import { Entry } from './entry';
import { Queue } from 'src/app/fundamentals/data-structures/queue';

export class BinarySearchTree<Key extends Comparable, Value> implements Iterable<Entry> {
  private root: BNode;

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

  public min() {
    return this.minRoot(this.root).key;
  }

  private minRoot(x: BNode): BNode {
    if (x.left == null) {
      return x;
    }
    return this.minRoot(x.left);
  }

  public max() {
    return this.maxRoot(this.root).key;
  }

  private maxRoot(x: BNode): BNode {
    if (x.right == null) {
      return x;
    }
    return this.maxRoot(x.right);
  }

  public floor(key: Key) {
    const x = this.floorRoot(this.root, key);
    if (x == null) {
      return null;
    }
    return x.key;
  }

  private floorRoot(x: BNode, key: Key): BNode {
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

  public select(index: number) {
    return this.selectRoot(this.root, index).key;
  }

  private selectRoot(x: BNode, k: number): BNode {
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

  private rankRoot(key: Key, x: BNode): number {
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

  public deleteMin(): void {
    this.root = this.deleteMinRoot(this.root);
  }

  private deleteMinRoot(x: BNode): BNode {
    if (x.left == null) {
      return x.right;
    }
    x.left = this.deleteMinRoot(x.left);
    x.N = this.sizeRoot(x.left) + this.sizeRoot(x.right) + 1;
    return x;
  }

  public deleteMax(): void {
    this.root = this.deleteMaxRoot(this.root);
  }

  private deleteMaxRoot(x: BNode): BNode {
    if (x.right == null) {
      return x.left;
    }
    x.right = this.deleteMaxRoot(x.right);
    x.N = this.sizeRoot(x.left) + this.sizeRoot(x.right) + 1;
    return x;
  }

  public delete(key: Key): void {
    this.root = this.deleteRoot(this.root, key);
  }

  private deleteRoot(x: BNode, key: Key): BNode {
    if (x == null) {
      return null;
    }
    if (key < x.key) {
      x.left = this.deleteRoot(x.left, key);
    }
    else if (key > x.key) {
      x.right = this.deleteRoot(x.right, key);
    } else {
      if (x.right == null) {
        return x.left;
      }
      if (x.left == null) {
        return x.right;
      }
      let t = x;
      x = this.minRoot(t.right);
      x.right = this.deleteMinRoot(t.right);
      x.left = t.left;
    }
    x.N = this.sizeRoot(x.left) + this.sizeRoot(x.right) + 1;
    return x;
  }

  public keys(lo: any, hi: any) {
    const queue = new Queue<Key>();
    this.keysRoot(this.root, queue, lo, hi);
    return queue;
  }

  private keysRoot(x: BNode, queue: Queue<Key>, lo: any, hi: any): void {
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

  private toArray(x: BNode, a = []): BNode[] {
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