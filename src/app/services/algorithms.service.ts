import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AlgorithmsService {
  matchesOfWeek: any;
  constructor() {}
  fiksturAlgoritmasi(teams) {
    let teamArray = [];
    let shiftArray = [];
    let matchesOfWeek = [];
    for (let i = 0; i < teams.length; i++) {
      teamArray.push(teams[i].takim);
    }
    const constTeam = teamArray[teams.length - 1];
    teamArray.pop();

    for (let i = 0; i < teamArray.length; i++) {
      shiftArray.push(i);
    }

    for (let i = 0; i < 2; i++) {
      for (let i = 0; i < teamArray.length; i++) {
        matchesOfWeek.push(constTeam + ' - ' + teamArray[shiftArray[0]]);
        matchesOfWeek.push(
          teamArray[shiftArray[1]] + ' - ' + teamArray[shiftArray[2]]
        );

        let firstElement = shiftArray.shift();
        shiftArray.push(firstElement);
      }
    }
    return matchesOfWeek;
  }
}
