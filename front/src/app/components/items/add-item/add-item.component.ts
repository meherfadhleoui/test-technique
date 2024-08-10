import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ItemsService } from 'src/app/shared/services/items.service';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-add-item',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss'],
})
export class AddItemComponent implements OnInit {
  addItemForm!: FormGroup;
  destroyRef = inject(DestroyRef);
  isLoading = false;

  constructor(
    private ItemsService: ItemsService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.addItemForm = this.fb.group({
      name: this.fb.control('', Validators.required),
      description: this.fb.control('', Validators.required),
    });
  }

  addItem() {
    if (this.addItemForm.invalid) {
      this.addItemForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.ItemsService.add(this.addItemForm.value)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: () => {
          alert(
            "Une erreur s'est produite lors de l'ajout de l'item. Veuillez réessayer."
          );
          this.isLoading = false;
        },
      });
  }
}
