import { Component, EventEmitter, Output } from '@angular/core';
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

  @Output() addedItem = new EventEmitter<any>();

  constructor(private recordsHttpService: CoffeeTrackerHttpService) { }

  addItem() {
    this.addedItem.emit({
      quantity: this.coffeeQuantity,
      date: new Date()
    });
  }
}
