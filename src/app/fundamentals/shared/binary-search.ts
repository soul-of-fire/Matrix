export class BinarySearch {
  public static rank(key: number, a: Array<number>): number {
    let lo = 0;
    let hi = a.length - 1;
    while (lo <= hi) {
      const mid = ~~(lo + (hi - lo) / 2);
      if (key < a[mid]) {
        hi = mid - 1;
      } else if (key > a[mid]) {
        lo = mid + 1;
      } else {
        return mid;
      }
    }
    return -1;
  }
  
  public static brute(key: number, a: Array<number>): number {
    for (let i = 0; i < a.length; i++) {
      if (a[i] == key) {
        return i;
      }
    }
    return -1;
  }

  public static rec(key: number, a: Array<number>): number { // slower implementation twice
    return this.recursive(key, 0, a.length - 1, a);
  }

  private static recursive(key: number, lo: number, hi: number, a: Array<number>): number {
    if (hi < lo || lo < 0 || hi < 0) {
      return -1;
    }
    const mid = ~~(lo + (hi - lo) / 2);
    if (key < a[mid]) {
      hi = mid - 1;
      return this.recursive(key, lo, hi, a);
    } else if (key > a[mid]) {
      lo = mid + 1;
      return this.recursive(key, lo, hi, a);
    } else {
      return mid;
    }
  }
}