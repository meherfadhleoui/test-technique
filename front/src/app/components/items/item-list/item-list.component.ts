import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { Item } from 'src/app/shared/models/item.model';
import { ItemsService } from 'src/app/shared/services/items.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss'],
})
export class ItemListComponent implements OnInit {
  items!: Item[];
  destroyRef = inject(DestroyRef);

  constructor(private itemsService: ItemsService) {}

  ngOnInit(): void {
    this.getItems();
  }

  getItems() {
    this.itemsService.items$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((items) => {
        this.items = items;
      });
  }
}
