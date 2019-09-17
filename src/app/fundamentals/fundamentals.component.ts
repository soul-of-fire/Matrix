import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { BinarySearch } from './shared/binary-search';
import { Client } from '../shared/client';
import { forkJoin } from 'rxjs';
import { Speed } from '../shared/speed';
import { UF } from './shared/union-find';
import { UFQuick } from './shared/union-find-quick';
import { UFWeighted } from './shared/union-find-weighted';

@Component({
  selector: 'app-fundamentals',
  templateUrl: './fundamentals.component.html',
  styleUrls: ['./fundamentals.component.css']
})
export class FundamentalsComponent implements OnInit, AfterViewInit {
  @ViewChild('can', { static: false }) can: ElementRef;

  constructor(private client: Client) { }

  ngOnInit() {
    this.binarySearch();
    // this.unionFindWeighted();
    // this.unionFindQuick();
    // this.unionFind();
  }
  
  public binarySearch() {
    let tinyW = this.client.get('tinyW');
    let tinyT = this.client.get('tinyT');
    forkJoin([tinyW, tinyT]).subscribe(([a, b]) => {
      a.sort();
      for (let i = 0; i < b.length; i++) {
        if (BinarySearch.rank(b[i], a) < 0) {
          console.log('BinarySearch indexOf substract:', b[i]);
        }
      }
    })
  }

  public gcd(a: number, b: number) {
    return b == 0 ? a : this.gcd(b, a % b);
  }

  public unionFindWeighted() {
    this.client.getPairs('tinyUF').subscribe(data => {
      const N = <number>data[0];
      const uf = new UFWeighted(N);
      for (let i = 1; i < data.length; i++) {
        const p = data[i][0];
        const q = data[i][1];
        if (uf.connected(p, q)) {
          console.log('connected: ', p, q);
          continue;
        }
        uf.union(p, q);
      }
      console.log(uf.count() + " components");
    })
  }

  public unionFindQuick() {
    this.client.getPairs('tinyUF').subscribe(data => {
      const N = <number>data[0];
      const uf = new UFQuick(N);
      for (let i = 1; i < data.length; i++) {
        const p = data[i][0];
        const q = data[i][1];
        if (uf.connected(p, q)) {
          console.log('connected: ', p, q);
          continue;
        }
        uf.union(p, q);
      }
      console.log(uf.count() + " components");
    })
  }

  public unionFind() {
    this.client.getPairs('tinyUF').subscribe(data => {
      const N = <number>data[0];
      const uf = new UF(N);
      for (let i = 1; i < data.length; i++) {
        const p = data[i][0];
        const q = data[i][1];
        if (uf.connected(p, q)) {
          console.log('connected: ', p, q);
          continue;
        }
        uf.union(p, q);
      }
      console.log(uf.count() + " components");
    })
  }

  ngAfterViewInit(): void {
    var ctx = (<HTMLCanvasElement>this.can.nativeElement).getContext('2d');
    const a = [84, 48, 68, 10, 18, 98, 12, 23, 54, 57, 33, 16, 77, 11, 29];
    a.sort();
    const map = new Map();
    for (let i = 0; i < 101; i++) {
      map.set(i, { value: 5 });
    }
    const random = Speed.random(1000);
    for (let i = 0; i < random.length; i++) {
      if (BinarySearch.rank(random[i], a) > 0) {
        ctx.fillStyle = "black";
        ctx.fillRect(random[i] * 3, map.get(random[i]).value += 3, 3, 3);
      } else {
        ctx.fillStyle = "red";
        ctx.fillRect(random[i] * 3, map.get(random[i]).value += 3, 3, 3);
      }
    }
  }

  bs = `public static rank(key: number, a: Array<number>): number {
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
  }`;

  euclid = `gcd(a: number, b: number) {
    return b == 0 ? a : this.gcd(b, a % b);
  }`

  bag = `const bag = new Bag();
  bag.add(1);
  for(let s of bag) {
    console.log(s);
  }`

  q = `const q = new Queue();
  q.enqueue(1);
  q.enqueue(2);
  q.enqueue(3);
  for(let s of q) {
    console.log(s);
  }`

  uf =`id: Array<number>;
  sz: Array<number>;

  constructor(N: number) {
    this.id = [];
    this.sz = [];
    for (let i = 0; i < N; i++) {
      this.id[i] = i;
      this.sz[i] = 1;
    }
  }
  
  public find(p: number): number {
    while (p != this.id[p]) {
      p = this.id[p];
    }
    return p;
  }

  public union(p: number, q: number): void {
    const i = this.find(p);
    const j = this.find(q);
    if (i == j) {
      return;
    }
    if (this.sz[i] < this.sz[j]) {
      this.id[i] = j;
      this.sz[j] += this.sz[i];
    } else {
      this.id[j] = i;
      this.sz[i] += this.sz[j];
    }
    this.n--;
  }`
}
