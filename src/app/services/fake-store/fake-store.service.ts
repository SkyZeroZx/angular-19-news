import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { FakeStore, Slider } from '../../core/interfaces';

@Injectable({
  providedIn: 'root',
})
export class FakeStoreService {
  constructor(private readonly http: HttpClient) {}

  getProductStore(): Observable<Slider[]> {
    return this.http.get<FakeStore[]>('https://picsum.photos/v2/list').pipe(
      map((res) => {
        return res.map((item) => ({
          id: item.id,
          image: item.download_url,
        }));
      }),
    );
  }
}
