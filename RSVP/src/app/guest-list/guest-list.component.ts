import { Component, OnInit } from '@angular/core';
import { GuestDataService } from '../guest-data.service';
import { Fields, Root } from '../register/register.component';

@Component({
  selector: 'app-guest-list',
  templateUrl: './guest-list.component.html',
  styleUrls: ['./guest-list.component.css'],
})
export class GuestListComponent implements OnInit {
  public dataFromServer?: Root;
  public filterName: string;
  public onlyShowPresentGuests: boolean;

  constructor(private guestData: GuestDataService) {
    this.filterName = '';
    this.onlyShowPresentGuests = false;
  }

  ngOnInit(): void {
    this.loadGuests();
  }

  public getAmountOfGuests(): number {
    let count: number = 0;

    if (this.dataFromServer != undefined){
      for (let entry of this.dataFromServer.records) {
        if (entry.fields.IsPresent){
          count++;
          if (entry.fields.AddGuest) {
            count++;
          }
        }
      }
    }

    return count;
  }

  public loadGuests() {
    this.guestData
      .loadAllGuestsFiltered(this.filterName, this.onlyShowPresentGuests)
      .subscribe((data) => (this.dataFromServer = data));
  }

  public setGuestAsPresent(id: string, guest: Fields){
    guest.IsPresent = true
    this.update(id, guest)
  }

  public update(id: string, guest: Fields): void{
    this.guestData.updateHero(id, guest)
      .subscribe(() => this.ngOnInit());
  }
}
