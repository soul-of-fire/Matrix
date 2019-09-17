import { Comparable } from '../comparable/comparable';
import { Sort } from './sort';
import { Comparator } from '../comparable/comparator';

export class Shell {
  public static sort(a: Comparable[], c?: Comparator): void {
    const N = a.length;
    let h = 1;
    while (h < N / 3) {
      h = ~~(3 * h + 1);
    }
    while (h >= 1) {
      for (let i = h; i < N; i++) {
        for (let j = i; j >= h && Sort.less(a[j], a[j - h], c); j -= h) {
          Sort.exch(a, j, j - h);
        }
      }
      h = ~~(h / 3);
    }
  }
}