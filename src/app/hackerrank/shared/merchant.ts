import { Speed } from 'src/app/shared/speed';

export class Merchant {

  public performance() {
    const random = [];
    for (let i = 0; i < 100000; i++) {
      random[i] = Speed.random(9, 10);
    }
    const results = [[],[],[],[]];
    for(let i = 0; i<5; i++){
      results[0][i] = this.time(this.sockMerchant, random);
      results[1][i] = this.time(this.sockMerchant1, random);
      results[2][i] = this.time(this.sockMerchant2, random);
      results[3][i] = this.time(this.sockMerchant3, random);
    }
    results.map(a => a.reduce((accu, y) => accu + y)).map(z => console.log(z+'\n'));
  }

  public time(o: any, random: Array<any>) {
    Speed.start();
    for (let i = 0; i < 100000; i++) {
      o(9, random[i]);
    }
    return Speed.stop();
  }

  sockMerchant(n: number, ar: Array<number>) {
    let result = 0;
    const aux = [];
    for (let i = 0; i < n; i++) {
      if (aux[ar[i]]) {
        result += 1;
        aux[ar[i]] = 0;
      } else {
        aux[ar[i]] = 1;
      }
    }
    return result;
  }

  sockMerchant1(n: number, ar: Array<number>) {
    return ar.reduce((accu, x) => {
      accu[x] = (accu[x] || 0) + 1;
      return accu;
    }, []).reduce((accu, y) => {
      accu += y > 1 ? ~~(y / 2) : 0;
      return accu;
    }, 0)
  }
  
  sockMerchant2(n: number, ar: Array<number>) {
    let result = 0;
    const aux = [];
    for (let i = 0; i < n; i++) {
      aux[ar[i]] = (aux[ar[i]] || 0) + 1;
    }
    for (let i = 0; i < aux.length; i++) {
      if (aux[i] > 1) {
        result += ~~(aux[i] / 2);
      }
    }
    return result;
  }

  sockMerchant3(n: number, ar: Array<number>) {
    let result = 0;
    ar.sort();
    for (let i = 0; i < n; i++) {
      if (ar[i] == ar[i + 1]) {
        i++;
        result++;
      }
    }
    return result;
  }
}