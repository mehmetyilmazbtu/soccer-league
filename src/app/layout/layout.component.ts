import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.sass']
})
export class LayoutComponent implements OnInit {

  constructor() { }

  teamArray= ['Galatasaray','Fenerbahçe','Beşiktaş','Sivasspor']
  ngOnInit(): void {
  }

}