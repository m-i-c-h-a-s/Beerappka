import { Component, OnInit } from '@angular/core';
import { User } from '../profile/user';
import { Recipe } from '../recipe-creator/recipe';

@Component({
  selector: 'app-my-batches-list',
  templateUrl: './my-batches-list.component.html',
  styleUrls: ['./my-batches-list.component.sass']
})
export class MyBatchesListComponent implements OnInit {
  public currentUser: User | undefined;
  public recipes: Array<Recipe> = [];

  totalLength: any;
  page: number = 1;

  constructor() { }

  ngOnInit(): void {
  }

}
