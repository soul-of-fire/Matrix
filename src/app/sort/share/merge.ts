import { Comparable } from '../comparable/comparable';
import { Sort } from './sort';
import { Insertion } from './insertion';

export class Merge {
  private static aux: Comparable[];
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
  }
}