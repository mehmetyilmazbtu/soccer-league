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
  playMatches(week,teams,matchesOfWeek) {
    for (let i = 0; i < 2; i++) {
      const res = matchesOfWeek[week+i].split(' - ');
      let homeTeam = teams.find((element) => element.takim === res[0]);
      let awayTeam = teams.find((element) => element.takim === res[1]);
      const goalHome = Math.floor(Math.random() * (4 - 0 + 1) + 0);
      const goalAway = Math.floor(Math.random() * (4 - 0 + 1) + 0);

      homeTeam.oynananMac += 1;
      homeTeam.atilanGol += goalHome;
      homeTeam.yenilenGol += goalAway;
      homeTeam.avaraj = homeTeam.atilanGol - homeTeam.yenilenGol;

      awayTeam.oynananMac += 1;
      awayTeam.atilanGol += goalAway;
      awayTeam.yenilenGol += goalHome;
      awayTeam.avaraj = awayTeam.atilanGol - awayTeam.yenilenGol;

      if (goalHome > goalAway) {
        homeTeam.puan += 3;
        awayTeam.maglubiyet += 1;
      } else if (goalHome === goalAway) {
        homeTeam.puan += 1;
        awayTeam.puan += 1;
        homeTeam.beraberlik += 1;
        awayTeam.beraberlik += 1;
      } else {
        awayTeam.puan += 3;
        homeTeam.maglubiyet += 1;
      }
    }
    teams=[...teams]
    return teams
  }
}
