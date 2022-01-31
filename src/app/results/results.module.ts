import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultsComponent } from './results.component';
import { ListComponent } from './components/list/list.component';
import { ItemComponent } from './components/item/item.component';



@NgModule({
  declarations: [
    ResultsComponent,
    ListComponent,
    ItemComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ResultsModule { }
