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

  // funkcja przeliczająca gęstość ze skali BLG (Skala Ballinga - zwana także skalą Plato) na skalę SG (Specific Gravity)
  // została zaimplementowana na podstawie wzoru ze strony http://betatestbrewing.com/pages/plato_to_sg.html
  convertBlgToSg() {
    if (this.gravityInBlg != null && this.gravityInBlg > 0)
      this.gravityCalculatedToSg = 1 + (this.gravityInBlg / (258.6 - 227.1 * (this.gravityInBlg / 258.2)));
      //this.gravityCalculatedToSg = (-260 / (this.gravityInBlg - 260));
    else this.gravityCalculatedToSg = null;
  }

  convertSgToBlg2() {
    if (this.gravityInSg != null && this.gravityInSg > 1)
      this.gravityCalculatedToBlg = -463.37 + (668.72 * this.gravityInSg) - (205.35 * this.gravityInSg * this.gravityInSg);
    else this.gravityCalculatedToBlg = null;
  }
}
