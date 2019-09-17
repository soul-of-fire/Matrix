import { Comparable } from '../comparable/comparable';
import { Sort } from './sort';
import { Comparator } from '../comparable/comparator';

export class Selection {
  public static sort(a: Comparable[]): void {
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
  }
}