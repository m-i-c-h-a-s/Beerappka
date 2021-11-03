import { Component, OnInit } from '@angular/core';
import { BatchForCreateUpdate } from './batch-for-create-update';

@Component({
  selector: 'app-batch-creator',
  templateUrl: './batch-creator.component.html',
  styleUrls: ['./batch-creator.component.sass']
})
export class BatchCreatorComponent implements OnInit {
  public batch: BatchForCreateUpdate | undefined;
  
  constructor() { }

  ngOnInit(): void {
  }

}
