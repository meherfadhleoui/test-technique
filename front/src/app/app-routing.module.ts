import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemListComponent } from './components/items/item-list/item-list.component';
import { AddItemComponent } from './components/items/add-item/add-item.component';

const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/items/items.component').then(
        (mod) => mod.ItemsComponent
      ),
    children: [
      { path: '', component: ItemListComponent },
      { path: 'add-item', component: AddItemComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
