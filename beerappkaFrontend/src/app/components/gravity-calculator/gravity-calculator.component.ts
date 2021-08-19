import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gravity-calculator',
  templateUrl: './gravity-calculator.component.html',
  styleUrls: ['./gravity-calculator.component.sass']
})
export class GravityCalculatorComponent implements OnInit {

  public gravityInSg: number | null;
  public gravityInBlg: number | null;

  public gravityCalculatedToBlg: number | null;
  public gravityCalculatedToSg: number | null;

  constructor() {
    this.gravityInSg = null;
    this.gravityInBlg = null;

    this.gravityCalculatedToBlg = null;
    this.gravityCalculatedToSg = null;
  }

  ngOnInit(): void {
  }

  convertSgToBlg() {
    if (this.gravityInSg != null && this.gravityInSg > 0)
      this.gravityCalculatedToBlg = 260 * (this.gravityInSg - 1) / this.gravityInSg;
    else this.gravityCalculatedToBlg = null;
  }

  convertBlgToSg() {
    if (this.gravityInBlg != null && this.gravityInBlg > 0)
      this.gravityCalculatedToSg = (-260 / (this.gravityInBlg - 260));
    else this.gravityCalculatedToSg = null;
  }
}
