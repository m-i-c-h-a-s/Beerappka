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

  // metoda przeliczająca gęstość z miary SG (Specific Gravity) na Skalę Ballinga (BLG)
  // została zaimplementowana na podstawie wzoru ze strony http://betatestbrewing.com/pages/plato_to_sg.html
  convertSgToBlg() {
    if (this.gravityInSg != null && this.gravityInSg > 0)
      this.gravityCalculatedToBlg = 135.997 * Math.pow(this.gravityInSg, 3) - 630.272 * Math.pow(this.gravityInSg, 2) + 1111.14 * this.gravityInSg - 616.868;
    else this.gravityCalculatedToBlg = null;
  }

  // metoda przeliczająca gęstość ze skali Skali Ballinga (BLG) na miarę SG (Specific Gravity)
  // została zaimplementowana na podstawie wzoru ze strony http://betatestbrewing.com/pages/plato_to_sg.html
  convertBlgToSg() {
    if (this.gravityInBlg != null && this.gravityInBlg > 0)
      this.gravityCalculatedToSg = 1 + (this.gravityInBlg / (258.6 - 227.1 * (this.gravityInBlg / 258.2)));
    else this.gravityCalculatedToSg = null;
  }
}
