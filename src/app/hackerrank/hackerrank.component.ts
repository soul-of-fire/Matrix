import { Component, OnInit } from '@angular/core';
import { Merchant } from './shared/merchant';
import { Valleys } from './shared/valleys';
import { JumpOnClouds } from './shared/jump-on-cluds';
import { RepetedString } from './shared/repeted-string';
import { InterviewQuestions } from './shared/interview-questions';

@Component({
  selector: 'app-hackerrank',
  templateUrl: './hackerrank.component.html',
  styleUrls: ['./hackerrank.component.css']
})
export class HackerrankComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // new Merchant().performance();
    // new Valleys().performance();
    // new JumpOnClouds().performance();
    // new RepetedString().performance();
    // new InterviewQuestions();
  }

  merchant = `sockMerchant(n: number, ar: Array<number>) {
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
  }`

  valleys = `valley(n: number, s: string) {
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
  }`

  jumpOnClouds = `jump(a: Array<number>) {
    let result = 0;
    for (let i = 0; i < a.length - 1; i = i + ((i + 2 < a.length && !a[i + 2]) ? 2 : 1)) {
      result++;
    }
    return result;
  }`

  repeatingString = `count(n: number, s: string) {
    let result = 0;
    const sa = [...s];
    const l = sa.length;
    const t = Math.floor(n / l);
    const occu = sa.reduce((accu, x) => x == 'a' ? accu + 1 : accu, 0);
    result = (occu * t) + (sa.slice(0, n - (l * t)).reduce((accu, x) => x == 'a' ? accu + 1 : accu, 0));
    return result;
  }`
}
