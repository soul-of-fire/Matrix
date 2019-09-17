import { Comparable } from '../comparable/comparable';
import { Comparator } from '../comparable/comparator';

export class Sort {
  public static less(v: Comparable, w: Comparable, c?: Comparator): boolean {
    return c? c.compare(v, w) : v < w;
  }

  public static exch(a: Comparable[], i: Comparable, j: Comparable): void {
    const t = a[+i];
    a[+i] = a[+j];
    a[+j] = t;
  }

  public static isSorted(a: Comparable[], c?: Comparator): boolean {
    for (let i = 1; i < a.length; i++)
      if (Sort.less(a[i], a[i - 1], c)) {
        return false;
      }
    return true;
  }

  public static toString(a: Comparable[]): void {
     console.log(a.join(' '));
  }
}