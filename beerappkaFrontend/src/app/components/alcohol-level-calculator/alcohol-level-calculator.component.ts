  import { NumberFormatStyle } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alcohol-level-calculator',
  templateUrl: './alcohol-level-calculator.component.html',
  styleUrls: ['./alcohol-level-calculator.component.sass']
})
export class AlcoholLevelCalculatorComponent implements OnInit {

  public originalGravity: number | null;
  public finalGravity: number | undefined;
  public alcoholByVolume: number | string | undefined;
  public apparentAttenuation: number | string | undefined;
  public abvValue: number | undefined;
  public attenuationValue: number | undefined;

  constructor() {
    this.alcoholByVolume = '---';
    this.apparentAttenuation = '---';

    this.originalGravity = null;
  }

  ngOnInit(): void {
  }

  calculateABV() {
    if ( this.originalGravity != undefined && this.finalGravity != undefined
      && this.originalGravity != null && this.finalGravity != null
      && this.originalGravity != 0 && this.finalGravity != 0 ) {
        this.abvValue = (this.originalGravity - this.finalGravity) / 1.938;
        this.alcoholByVolume = this.abvValue.toFixed(2) + " %";
    } else this.alcoholByVolume = '---';

  }

  calculateAttenuation() {
    if ( this.originalGravity != undefined && this.finalGravity != undefined
      && this.originalGravity != null && this.finalGravity != null
      && this.originalGravity != 0 && this.finalGravity != 0 ) {
        this.attenuationValue = ((this.originalGravity - this.finalGravity) / this.originalGravity) * 100;
        this.apparentAttenuation = this.attenuationValue.toFixed(2) + " %";
    } else this.apparentAttenuation = '---';
  }

  convertSgToBlg(gravityInSg: number) {
    return 260 * (gravityInSg - 1) / gravityInSg;
  }

  convertBlgToSg(gravityInBlg: number) {
    return (-260 / (gravityInBlg - 260));
  }
}
