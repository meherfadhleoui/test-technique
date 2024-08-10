import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Item } from '../models/item.model';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  items$: BehaviorSubject<Item[]> = new BehaviorSubject([] as Item[]);

  constructor(private httpClient: HttpClient) {}

  get(): Observable<Item[]> {
    return this.httpClient.get<Item[]>('/items').pipe(
      tap((items) => {
        this.items$.next(items);
      })
    );
  }

  add(newItem: { name: string; description: string }): Observable<Item> {
    return this.httpClient.post<Item>('/items', newItem).pipe(
      tap((item) => {
        this.items$.next([...this.items$.value, item]);
      })
    );
  }
}
