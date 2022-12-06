import { Component, OnInit } from '@angular/core';
import { GuestDataService } from '../guest-data.service';
import { Root } from '../register/register.component';

@Component({
  selector: 'app-guest-list',
  templateUrl: './guest-list.component.html',
  styleUrls: ['./guest-list.component.css'],
})
export class GuestListComponent implements OnInit {
  public dataFromServer!: Root;

  constructor(private guestData: GuestDataService) {}

  ngOnInit(): void {
    this.guestData
      .loadAllGuests()
      .subscribe((data) => (this.dataFromServer = data));
  }

  public getAmountOfGuests(): number {
    let count: number = this.dataFromServer?.records.length;

    for (let entry of this.dataFromServer?.records) {
      if (entry.fields.AddGuest) {
        count++;
      }
    }

    return count;
  }
}
