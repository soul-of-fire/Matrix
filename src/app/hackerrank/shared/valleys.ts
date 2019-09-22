import { Speed } from 'src/app/shared/speed';

export class Valleys {

  public performance() {
    // console.log(this.valley1(8, 'UDDDUDUU'));

    const random = [];
    for (let i = 0; i < 100000; i++) {
      random[i] = Speed.random(8, 10).map(x => x > 5 ? 'U' : 'D').join('');
    }
    const results = [[],[]];
    for(let i = 0; i<10; i++){
      results[0][i] = this.time(this.valley, random);
      results[1][i] = this.time(this.valley1, random);
    }
    results.map(a => a.reduce((accu, y) => accu + y)).map(z => console.log(z+'\n'));
  }

  public time(o: any, random: Array<any>) {
    Speed.start();
    for (let i = 0; i < 100000; i++) {
      o(8, random[i]);
    }
    return Speed.stop();
  }

  valley(n: number, s: string) {
    let result = 0;
    let elevation = 0;
    let state = 0;
    for (let i = 0; i < n; i++) {
      state = elevation;
      if (s.charAt(i) == 'U') {
        ++elevation;
      } else {
        --elevation;
      }
      if (elevation == 0 && state < elevation) {
        result++;
      }
    }
    return result;
  }

  valley1(n: number, s: string) {
    let result = 0;
    let i = 0;
    let level = 0;
    while(i < s.length) {
      if(s.charAt(i) == 'U'){
        ++level
        if(level == 0) {
          result++;
        }
      }else{
        --level;
      }
      i++;
    }
    return result;
  }
}