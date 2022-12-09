import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from './app.module';
import { Fields, Root, Record } from './register/register.component';

@Injectable({
  providedIn: 'root',
})
export class GuestDataService {
  constructor(
    private http: HttpClient,
    @Inject(BASE_URL) private baseUrl: string
  ) {}

  public loadAllGuests(): Observable<Root> {
    return this.http.get<Root>(
      `${this.baseUrl}/Guests`
    );
  }

  public loadAllGuestsFiltered(filterName: string = '', onlyShowPresentGuests: boolean): Observable<Root> {
    let url = `${this.baseUrl}/Guests?filterByFormula=FIND("${filterName}"%2C+Name)`;
    if (onlyShowPresentGuests){
      url = `${this.baseUrl}/Guests?filterByFormula=AND(FIND("${filterName}"%2C+Name),WillAttend)`;
    }

    return this.http.get<Root>(url);
  }

  public createGuest(guest: Fields): Observable<unknown> {
    const body: Root = {
      records: [{ fields: guest }],
    };
    return this.http.post(`${this.baseUrl}/Guests`, body);
  }

  public updateHero(id: string, guest: Fields): Observable<unknown>{
    const body: Record = {
      fields: guest,
    };
    return this.http.patch(`${this.baseUrl}/Guests/${id}`, body);
  }
}
