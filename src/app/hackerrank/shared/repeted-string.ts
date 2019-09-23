import { Speed } from 'src/app/shared/speed';

export class RepetedString {
  performance() {
    // console.log(this.count2(10, 'aba'));
    // console.log(this.count2(1000000000000, 'a'));
    // console.log(this.count2(9, 'aba'));

    const results = [[], [], [], [], [], [], []];
    for (let i = 0; i < 5; i++) {
      results[0][i] = this.time(this.count);
      results[1][i] = this.time(this.count1);
      results[2][i] = this.time(this.count2);
      results[3][i] = this.time(this.count3);
      results[4][i] = this.time(this.count4);
      results[5][i] = this.time(this.count5);
      results[6][i] = this.time(this.count6);
    }
    results.map(a => a.reduce((accu, y) => accu + y)).map(z => console.log(z + '\n'));
  }

  public time(o: any) {
    Speed.start();
    for (let i = 0; i < 100000; i++) {
      o(10, 'aha');
    }
    return Speed.stop();
  }

  count(n: number, s: string) {
    let result = 0;
    const l = s.length;
    const t = ~~(n / l);
    const occu = s.split('a').length - 1;
    result = (occu * t) + (s.substr(0, n - (l * t)).split('a').length - 1);
    return result;
  }

  count1(n: number, s: string) {
    let result = 0;
    result = s.repeat(~~(n / s.length) + 1).substr(0, n).split('a').length - 1;
    return result;
  }

  count2(n: number, s: string) { // winner
    let result = 0;
    const sa = [...s];
    const l = sa.length;
    const t = Math.floor(n / l);
    const occu = sa.reduce((accu, x) => x == 'a' ? accu + 1 : accu, 0);
    result = (occu * t) + (sa.slice(0, n - (l * t)).reduce((accu, x) => x == 'a' ? accu + 1 : accu, 0));
    return result;
  }

  count3(n: number, s: string) {
    let result = 0;
    result = [...s.repeat(~~(n / s.length) + 1)].slice(0, n).reduce((accu, x) => x == 'a' ? accu + 1 : accu, 0);
    return result;
  }

  count4(n: number, s: string) {
    let result = 0;
    result = [...s.repeat(~~(n / s.length) + 1).substr(0, n)].reduce((accu, x) => x == 'a' ? accu + 1 : accu, 0);
    return result;
  }
// ------------------- not mine below
  count5(n: number, s: string) {
    var noOfa = s.length - s.replace(/a/g, "").length;
    var r = n % (s.length);
    var remaining = (s.substring(0, r)).length - (s.substring(0, r)).replace(/a/g, "").length;
    return noOfa * (Math.floor(n / (s.length))) + remaining;
  }

  count6(n: number, s: string) {
    const as = s.split("").filter(c => c === "a").length;
    const times = Math.floor(n / s.length);
    const rest = n % s.length;
    const totalAs = times * as + s.slice(0, rest).split("").filter(c => c === "a").length
    return totalAs;
  }
}