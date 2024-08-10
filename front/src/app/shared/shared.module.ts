import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ErrorComponent } from './components/error/error.component';
import { ItemComponent } from './components/item/item.component';

@NgModule({
  declarations: [ItemComponent, ErrorComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  exports: [
    ItemComponent,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ErrorComponent,
  ],
})
export class SharedModule {}
