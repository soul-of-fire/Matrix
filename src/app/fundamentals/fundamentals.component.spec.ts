import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FundamentalsComponent } from './fundamentals.component';
import { Operations } from './shared/operations';
import { Client } from '../shared/client';
import { HttpClientModule } from '@angular/common/http';
import { ClientStub } from '../shared/client-stub';
import { BinarySearch } from './shared/binary-search';
import { Speed } from '../shared/speed';
import { Bag } from './data-structures/bag';
import { Queue } from './data-structures/queue';
import { Stack } from './data-structures/stack';
import { EvaluateExpression } from './shared/evaluate-expression';
import { UF } from './shared/union-find';
import { mediumUF } from './test-data/mediumUF';
import { tinyUF } from './test-data/tinyUF';
import { UFQuick } from './shared/union-find-quick';
import { UFWeighted } from './shared/union-find-weighted';

describe('FundamentalsComponent', () => {
  let component: FundamentalsComponent;
  let fixture: ComponentFixture<FundamentalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [FundamentalsComponent],
      providers: [{ provide: Client, useClass: ClientStub }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FundamentalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should find greatest common divisor (Euclid)', () => {
    expect(component.gcd(6, 2)).toEqual(2);
    expect(component.gcd(9, 4)).toEqual(1);
    expect(component.gcd(72, 8)).toEqual(8);
    expect(component.gcd(12, 8)).toEqual(4);
  });

  it('should find max value in array', () => {
    expect(Operations.max([1, 3, 7, 2, 6, 16])).toEqual(16);
    expect(Operations.max(['a', 'b', 'c'])).toEqual('c');
  });

  it('should find average value in array', () => {
    expect(Operations.average([9, 3, 4, 2, 6, 12])).toEqual(6);
  });

  it('should clone an array', () => {
    const numbers = [1, 3, 7, 2, 6, 16];
    const array = Operations.copy(numbers);
    expect(array[0]).toEqual(1);
    expect(array).not.toBe(numbers);
  });

  it('should reverse the same array', () => {
    const numbers = [1, 3, 7, 2, 6, 16];
    Operations.reverse(numbers);
    expect(numbers).toEqual([16, 6, 2, 7, 3, 1]);
  });

  it('should return absolute number', () => {
    expect(Operations.abs(-3)).toEqual(3);
  });

  it('should check isPrime number', () => {
    expect(Operations.isPrime(3)).toBeTruthy();
    expect(Operations.isPrime(4)).toBeFalsy();
    expect(Operations.isPrime(5)).toBeTruthy();
    expect(Operations.isPrime(6)).toBeFalsy();
    expect(Operations.isPrime(7)).toBeTruthy();
  });

  it('should test BinarySearch', () => {
    const a = [84, 48, 68, 10, 18, 98, 12, 23, 54, 57, 33, 16, 77, 11, 29];
    a.sort();
    expect(BinarySearch.rank(12, a)).toEqual(2);
    expect(BinarySearch.rank(1, a)).toEqual(-1);
  });

  it('should test BinarySearch recursive', () => {
    const a = [84, 48, 68, 10, 18, 98, 12, 23, 54, 57, 33, 16, 77, 11, 29];
    a.sort();
    expect(BinarySearch.rec(10, a) == 0).toBeTruthy();
    expect(BinarySearch.rec(98, a) > 0).toBeTruthy();
    expect(BinarySearch.rec(1, a)).toEqual(-1);
  });

  it('should evaluate expression', () => {
    expect(EvaluateExpression.evaluate('(1+((2+3)*(4*5)))')).toEqual(101);
    expect(EvaluateExpression.evaluate('(2*((2*3)+(4+5)))')).toEqual(30);
  });

  xit('should BinarySearch speed for 1000000 searches in array of 15 el', () => {
    const a = [84, 48, 68, 10, 18, 98, 12, 23, 54, 57, 33, 16, 77, 11, 29];
    a.sort();
    speedTestBS('rank', a);
    speedTestBS('rec', a);
    speedTestBS('brute', a);
    expect(true).toBeTruthy();
  });

  it('should union find "Quick Find"), quadratic', () => {
    const data = [[4, 3], [3, 8], [6, 5], [9, 4], [2, 1], [8, 9], [5, 0], [7, 2], [6, 1]];
    const uf = new UF(10);
    for (let i = 0; i < data.length; i++) {
      const p = data[i][0];
      const q = data[i][1];
      uf.union(p, q);
    }
    expect(uf.connected(6, 7)).toBeTruthy();
    expect(uf.connected(1, 0)).toBeTruthy();
    expect(uf.connected(0, 1)).toBeTruthy();
    expect(uf.count()).toEqual(2);
  });

  xit('should check Bag performance to array', () => {
    const random = Speed.random(1000000);
    const bag = new Bag();
    console.log('Bag:');
    Speed.start();
    for (let i = 0; i < random.length; i++) {
      bag.add(random[i]);
    }
    Speed.stop();
    // ---
    const random2 = Speed.random(1000000);
    const a = [];
    console.log('Array:');
    Speed.start();
    for (let i = 0; i < random2.length; i++) {
      a.push(random2[i]);
    }
    Speed.stop();
    expect(true).toBeTruthy();
  });

  xit('should check Queue performance', () => {
    const random = Speed.random(1000000);
    const q = new Queue();
    console.log('Queue:');
    Speed.start();
    for (let i = 0; i < random.length; i++) {
      q.enqueue(random[i]);
    }
    for (let i = 0; i < random.length; i++) {
      q.dequeue();
    }
    Speed.stop();
    expect(true).toBeTruthy();
  });

  xit('should check Stack performance to array', () => {
    const random = Speed.random(1000000);
    const s = new Stack();
    console.log('Stack:');
    Speed.start();
    for (let i = 0; i < random.length; i++) {
      s.push(random[i]);
    }
    for (let i = 0; i < random.length; i++) {
      s.pop();
    }
    Speed.stop();
    // ---
    const random1 = Speed.random(1000000);
    const a = [];
    console.log('Array:');
    Speed.start();
    for (let i = 0; i < random1.length; i++) {
      a.push(random1[i]);
    }
    for (let i = 0; i < random1.length; i++) {
      a.pop();
    }
    Speed.stop();
    expect(true).toBeTruthy();
  });
  
  xit('should union find performance', () => {
    const data = mediumUF.split('\n').map(x => {
      const row = x.split(' ');
      if(row.length > 1) {
        return row.map(x => ~~x);
      } else {
        return ~~x;
      }
    })
    compare(UF, data);
    compare(UFQuick, data);
    compare(UFWeighted, data);
    expect(true).toBeTruthy();
  });
});

const compare = (clazz: any, data: Array<any>) => {
  const uf = new clazz(<number>data[0]);
    console.log(clazz.name);
    Speed.start();
    for (let i = 1; i < data.length; i++) {
      const p = data[i][0];
      const q = data[i][1];
      uf.union(p, q);
    }
    Speed.stop();
};

const speedTestBS = (method: string, a: Array<number>) => {
  const random = Speed.random(1000000);
  console.log(method);
  Speed.start();
  for (let i = 0; i < random.length; i++) {
    BinarySearch[method](random[i], a);
  }
  Speed.stop();
}

