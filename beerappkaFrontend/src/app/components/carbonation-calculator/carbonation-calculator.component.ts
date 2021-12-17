import { Component, OnInit } from '@angular/core';
import { BeerStylesService } from 'src/app/services/beer-styles.service';
import { BeerStyle } from '../recipe-creator/beerStyle';
import { beerStyleCarbonationInfo } from './beerStyleCarbonationInfo';

@Component({
  selector: 'app-carbonation-calculator',
  templateUrl: './carbonation-calculator.component.html',
  styleUrls: ['./carbonation-calculator.component.sass']
})
export class CarbonationCalculatorComponent implements OnInit {
  //public beerStyles: Array<BeerStyle> | undefined;

  public amountOfBeerInLiters: number | null;
  public targetCarbonationLevel: number | null;
  public beerTemperature: number | null;
  public sugarType: string | null;
  public amountOfSugarToRefermentation: number | null;

  public residualCarbonationLevel: number | null;
  public primingCarbonationLevel: number | null;


  constructor(//public beerStyleService: BeerStylesService
  ) {
    this.amountOfBeerInLiters = null;
    this.targetCarbonationLevel = null;
    this.beerTemperature = null;
    this.sugarType = '';
    this.amountOfSugarToRefermentation = null;

    this.residualCarbonationLevel = null;
    this.primingCarbonationLevel = null;
  }

  ngOnInit(): void {
    /*this.beerStyleService.getAllBeerStyles().subscribe(data => {
      this.beerStyles = (data as any).results;
    }, err => {
      console.log(err);
    });*/
  }

  // metoda obliczająca poziom CO2 rozpuszczonego w piwie po zakończeniu fermentacji
  // zaimplementowana na podstawie wzoru ze strony https://www.brewersfriend.com/beer-priming-calculator/
  calculateResidualCarbonationLevel() {
    // Poziom CO2 rozpuszczonego w piwie po fementacji = 3.0378 - (0.050062 * temp) + (0.00026555 * temp^2)
    // konwersja ze stopni Celsjusza na Farenheita: F = 1.8 * C + 32
    if (this.beerTemperature != null)
      this.residualCarbonationLevel = 3.0378 - (0.050062 * (this.beerTemperature * 1.8 + 32)) + (0.00026555 * Math.pow((this.beerTemperature * 1.8 + 32), 2));
  }

  // metoda obliczająca o jaką wartość należy zwiększyć poziom CO2, aby uzyskać poziom podany przez użytkownika
  calculatePrimingCarbonationLevel() {
    if (this.targetCarbonationLevel != null && this.residualCarbonationLevel != null)
      this.primingCarbonationLevel = this.targetCarbonationLevel - this.residualCarbonationLevel;
  }

  // metoda obliczająca ilość cukru dla poszczególnych rodzajów cukru
  calculateAmoutOfSugarToRefermenation() {
    this.calculateResidualCarbonationLevel();
    this.calculatePrimingCarbonationLevel();

    if (this.primingCarbonationLevel != null && this.amountOfBeerInLiters != null && this.targetCarbonationLevel != null &&
        this.beerTemperature != null && this.sugarType != null) {
      switch(this.sugarType) {
        case "whiteSugar":
          this.amountOfSugarToRefermentation = (this.primingCarbonationLevel * this.amountOfBeerInLiters) * 3.82;
          break;

        case "dryExtract":
          this.amountOfSugarToRefermentation = (this.primingCarbonationLevel * this.amountOfBeerInLiters) * 6.8;
          break;

        case "glucose":
          this.amountOfSugarToRefermentation = (this.primingCarbonationLevel * this.amountOfBeerInLiters) * 4.02;
          break;

        default:
          break;
      }
    } else this.amountOfSugarToRefermentation = 0;

  }

  public beerStylesCarbonationInfo: beerStyleCarbonationInfo[] = [
    {
      name: 'American Pale Ale',
      minCarbonation: 2.3,
      maxCarbonation: 2.8,
    },
    {
      name: 'Belgian Tripel',
      minCarbonation: 2.4,
      maxCarbonation: 3.0,
    },
    {
      name: 'Dry Stout',
      minCarbonation: 1.8,
      maxCarbonation: 2.5,
    },
    {
      name: 'Saison',
      minCarbonation: 2.3,
      maxCarbonation: 2.9,
    },
    {
      name: 'Weizen',
      minCarbonation: 2.5,
      maxCarbonation: 2.9,
    },
    {
      name: 'Fruit Lambic',
      minCarbonation: 2.4,
      maxCarbonation: 3.1,
    },
  ];
}
