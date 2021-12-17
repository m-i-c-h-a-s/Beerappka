import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alcohol-level-calculator',
  templateUrl: './alcohol-level-calculator.component.html',
  styleUrls: ['./alcohol-level-calculator.component.sass']
})

export class AlcoholLevelCalculatorComponent implements OnInit {
  public gravityUnit: string;
  public originalGravity: number | null;
  public finalGravity: number | undefined;
  public alcoholByVolume: number | string | undefined;
  public apparentAttenuation: number | string | undefined;
  public abvValue: number | undefined;
  public attenuationValue: number | undefined;

  constructor() {
    this.gravityUnit = 'sg';

    this.alcoholByVolume = '---';
    this.apparentAttenuation = '---';

    this.originalGravity = null;
  }

  ngOnInit(): void {}


  selectChangeHandler (event: any) {
    this.clearValues();
  }

  calculateParameters() {
    switch (this.gravityUnit) {
      case 'sg':
        this.calculateABVforSG();
        this.calculateAttenuationForSG();
        break;

      case 'blg':
        this.calculateABVforBLG();
        this.calculateAttenuationForBLG();
        break;

      default:
        break;
    }
  }

  // metoda obliczająca poziom alkoholu w gotowym piwie dla jednostek BLG
  // została zaimplementowana na podstawie wzoru ze strony https://wiki.piwo.org/Obliczanie_zawarto%C5%9Bci_alkoholu_w_gotowym_piwie
  calculateABVforBLG() {
    if ( this.originalGravity != undefined && this.finalGravity != undefined
      && this.originalGravity != null && this.finalGravity != null
      && this.originalGravity != 0 && this.finalGravity != 0 )
    {
        this.abvValue = (this.originalGravity - this.finalGravity) / 1.938;
        this.alcoholByVolume = this.abvValue.toFixed(2) + " %";
    } else this.alcoholByVolume = '---';
  }

  // metoda obliczająca poziom alkoholu w gotowym piwie dla jednostek Specific Gravity
  // została zaimplementowana na podstawie wzoru ze strony http://www.brewunited.com/abv_calculator.php
  calculateABVforSG() {
    if ( this.originalGravity != undefined && this.finalGravity != undefined
      && this.originalGravity != null && this.finalGravity != null
      && this.originalGravity != 0 && this.finalGravity != 0 ) {
        this.abvValue = (this.originalGravity - this.finalGravity) * 131.25;
        this.alcoholByVolume = this.abvValue.toFixed(2) + " %";
    } else this.alcoholByVolume = '---';
  }

  // obliczenie stopnia odfermentowania dla parametrów w jednostkach BLG
  calculateAttenuationForBLG() {
    if ( this.originalGravity != undefined && this.finalGravity != undefined
      && this.originalGravity != null && this.finalGravity != null
      && this.originalGravity != 0 && this.finalGravity != 0 ) {
        this.attenuationValue = ((this.originalGravity - this.finalGravity) / this.originalGravity) * 100;
        this.apparentAttenuation = this.attenuationValue.toFixed(2) + " %";
    } else this.apparentAttenuation = '---';
  }

  // obliczenie stopnia odfermentowania dla parametrów w jednostkach Specific Gravity
  calculateAttenuationForSG() {
    if ( this.originalGravity != undefined && this.finalGravity != undefined
      && this.originalGravity != null && this.finalGravity != null
      && this.originalGravity != 0 && this.finalGravity != 0 ) {
        this.attenuationValue = (((this.originalGravity - 1) - (this.finalGravity - 1)) / (this.originalGravity - 1)) * 100;
        this.apparentAttenuation = this.attenuationValue.toFixed(2) + " %";
    } else this.apparentAttenuation = '---';
  }

  // przeliczenie poziomu gęstości ze skali Specific Gravity na BLG
  convertSgToBlg(gravityInSg: number) {
    return 260 * (gravityInSg - 1) / gravityInSg;
  }

  // przeliczenie poziomu gęstości ze skali BLG na Specific Gravity
  // została zaimplementowana na podstawie wzoru ze strony http://betatestbrewing.com/pages/plato_to_sg.html
  convertBlgToSg(gravityInBlg: number) {
    return (-260 / (gravityInBlg - 260));
  }

  clearValues() {
    this.abvValue = undefined;
    this.attenuationValue = undefined;
    this.alcoholByVolume = '---';
    this.apparentAttenuation = '---';
    this.originalGravity = null;
    this.finalGravity = undefined;
  }
}
