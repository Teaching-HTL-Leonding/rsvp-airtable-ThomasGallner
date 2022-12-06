import { Component } from '@angular/core';
import { GuestDataService } from '../guest-data.service';

export interface Root {
  records: Record[];
}

export interface Record {
  id?: string;
  fields: Fields;
}

export interface Fields {
  Name: string;
  IsPresent: boolean;
  Comment: string;
  AddGuest: boolean;
  AddGuestName: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  public newGuest!: Fields;

  constructor(private guestData: GuestDataService) {
    this.resetNewGuest();
  }

  public resetNewGuest() {
    this.newGuest = {
      Name: '',
      IsPresent: false,
      Comment: '',
      AddGuest: false,
      AddGuestName: '',
    };
  }

  public saveGuest(){
    this.guestData.createGuest(this.newGuest).subscribe();
    this.resetNewGuest();
  }
}
