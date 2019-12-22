import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  tabIndex = 0;
  constructor() { }

  ngOnInit() {  }

  onTabClick(index){
      this.tabIndex = index;
  }
}
