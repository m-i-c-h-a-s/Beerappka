  import { NumberFormatStyle } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alcohol-level-calculator',
  templateUrl: './alcohol-level-calculator.component.html',
  styleUrls: ['./alcohol-level-calculator.component.sass']
})
export class AlcoholLevelCalculatorComponent implements OnInit {

  public originalGravity: number | undefined;
  public finalGravity: number | undefined;
  public alcoholByVolume: number | string | undefined;
  public apparentAttenuation: number | string | undefined;
  public abvValue: number | undefined;
  public attenuationValue: number | undefined;

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

  constructor() {
    this.alcoholByVolume = '---';
    this.apparentAttenuation = '---';
  }

  ngOnInit(): void {
  }

}