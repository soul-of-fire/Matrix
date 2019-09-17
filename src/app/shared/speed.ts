export class Speed {
  private static time;

  public static start(): void {
    this.time = new Date().getTime();
  }

  public static stop(): number {
    const result = new Date().getTime() - this.time;
    console.log('Performance: ', result);
    return result;
  }

  public static random(n: number, range: number = 100) {
    const result = [];
    for(let i = 0; i < n; i++) {
      result.push(~~(Math.random() * range) + 1);
    } 
    return result;
  }
}