export class Operations {
  public static max(a: Array<number | string>): number | string {
    let max = a[0];
    for (let i = 1; i < a.length; i++) {
      if (a[i] > max) max = a[i];
    }
    return max;
  }

  public static average(a: Array<number>): number {
    const N = a.length;
    let sum = 0.0;
    for (let i = 0; i < N; i++) {
      sum += a[i];
    }
    return sum / N;
  }

  public static copy(a: Array<number | string>): Array<number | string> {
    const N = a.length;
    const clone = [];
    for (let i = 0; i < N; i++) {
      clone[i] = a[i];
    }
    return clone;
  }

  public static reverse(a: Array<number | string>): void {
    const N = a.length;
    for (let i = 0; i < N / 2; i++) {
      const temp = a[i];
      a[i] = a[N - 1 - i];
      a[N - i - 1] = temp;
    }
  }

  public static abs(x: number): number {
    return x < 0 ? -x : x;
  }

  public static isPrime(N: number): boolean {
    if (N < 2) {
      return false;
    }
    for (let i = 2; i * i <= N; i++) {
      if (N % i == 0) {
        return false;
      }
    }
    return true;
  }
}