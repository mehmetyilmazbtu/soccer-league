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
    let subscription=timer(100, 25)
      .pipe(concatMap(() => source))
      .subscribe(() => {
        if (n >= 91) {
          this.print("Maç Sonu")
          subscription.unsubscribe()
        }
        else{
          this.print(n);
        }
        n++;
      });
    
  }  
  print(val) {
    let el = document.createElement("p");
    el.innerText = val;
    document.body.appendChild(el);
  }
  
}
