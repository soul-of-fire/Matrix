import { Component, OnInit } from '@angular/core';
import { Merchant } from './shared/merchant';
import { Valleys } from './shared/valleys';

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
}
