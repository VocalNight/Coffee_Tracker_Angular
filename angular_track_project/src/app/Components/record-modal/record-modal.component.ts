import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CoffeeTrackerHttpService } from '../../../Services/coffee-tracker-http.service';

@Component({
  selector: 'app-record-modal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './record-modal.component.html',
  styleUrl: './record-modal.component.css'
})
export class RecordModalComponent {
  coffeeQuantity = 0;

  constructor(private recordsHttpService: CoffeeTrackerHttpService) { }

  addItem() {
    this.recordsHttpService.postItem(
      {
        id: 0,
        quantity: this.coffeeQuantity,
        date: Date.now
      }, 
      'tracker');
  }
}
