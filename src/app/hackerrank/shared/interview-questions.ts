import { Speed } from 'src/app/shared/speed';

export class InterviewQuestions {
  constructor() {
    // this.rw();

    console.log(this.sequentialSum([2, 3, 5, 1, 9, 5, 6, 2, 1, 4, 2], 8));
  }

  public time(o: any) {
    Speed.start();
    for (let i = 0; i < 100000; i++) {
      o('This is test');
    }
    return Speed.stop();
  }

  sequentialSum(a: Array<number>, compare: number) {
    const aux = new Set();
    for(let i = 0; i < a.length; i++) {
      for(let j = i + 1; j < a.length; j++) {
        if(a[i] + a[j] == compare) {
          aux.add(i);
        }
      }
    }
    return aux;
  }

  // ---------------------------

  private rw() {
    console.log(this.reverseWords('This is test'));
    console.log(this.reverseWords1('This is test'));

    const results = [[],[]];
    for(let i = 0; i<5; i++){
      results[0][i] = this.time(this.reverseWords);
      results[1][i] = this.time(this.reverseWords1);
    }
    results.map(a => a.reduce((accu, y) => accu + y)).map(z => console.log(z+'\n'));
  }
  
  reverseWords(s: string) {
    return s.split(' ').map(w => w.split('').reverse().join('')).join(' ');
  }

  reverseWords1(s: string) {
    const array = s.split(' ');
    let result = '';
    for(let w of array) {
      for(let i = w.length - 1; i >= 0; i--) {
        result += w.charAt(i);
      }
      result += ' ';
    }
    return result;
  }
}