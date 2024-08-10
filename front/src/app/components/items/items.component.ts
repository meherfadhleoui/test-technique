import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddItemComponent } from './add-item/add-item.component';
import { ItemListComponent } from './item-list/item-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ItemsService } from 'src/app/shared/services/items.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-items',
  standalone: true,
  imports: [CommonModule, AddItemComponent, ItemListComponent, SharedModule],
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
})
export class ItemsComponent implements OnInit {
  destroyRef = inject(DestroyRef);

  constructor(private itemsService: ItemsService) {}

  ngOnInit(): void {
    this.getItems();
  }

  getItems() {
    this.itemsService
      .get()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }
}
