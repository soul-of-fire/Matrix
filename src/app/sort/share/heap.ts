import { Comparable } from '../comparable/comparable';

export class Heap {
  public static sort(pq: Comparable[]): void {
    let n = pq.length;
    for (let i = ~~(n / 2); i >= 1; i--) { // sort parents
      Heap.sink(pq, i, n); // parent
    }
    while (n > 1) { // sink top down
      Heap.exch(pq, 1, n--); // move max to final position to the end
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
  }
}