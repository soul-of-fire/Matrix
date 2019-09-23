export class JumpOnClouds {
  public performance() {
    const a = [0, 0, 1, 0, 0, 1, 0];
    console.log(this.jump(a));
    const b = [0, 0, 0, 0, 1, 0];
    console.log(this.jump(b));
    const c = [0, 0];
    console.log(this.jump(c));
  }

  jump(a: Array<number>) {
    let result = 0;
    for (let i = 0; i < a.length - 1; i = i + ((i + 2 < a.length && !a[i + 2]) ? 2 : 1)) {
      result++;
    }
    return result;
  }
} 