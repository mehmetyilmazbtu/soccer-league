import { Component, OnInit } from '@angular/core';
import { of, timer, concatMap } from 'rxjs';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.sass'],
})
export class TimerComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    let n = 1;
    let source = of(n);
    let subscription=timer(100, 50)
      .pipe(concatMap(() => source))
      .subscribe(() => {
        if (n >= 91) {
          console.log("maç bitti")
          subscription.unsubscribe()
        }
        else{
          console.log(n);
        }
        n++;
      });
    
  }  
  
}
