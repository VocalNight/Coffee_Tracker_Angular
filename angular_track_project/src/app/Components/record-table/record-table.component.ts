import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CoffeeRecords } from '../../../Model/CoffeeRecords';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-record-table',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './record-table.component.html',
  styleUrl: './record-table.component.css'
})
export class RecordTableComponent implements OnInit {

  @Input() coffeeRecords: Observable<any> = new Observable;
  filteredRecord: CoffeeRecords[] = [];
  dateField: Date = new Date();

  @Output() showModal = new EventEmitter<boolean>();
  @Output() deleteClicked = new EventEmitter<number>();

  ngOnInit(): void {
    this.coffeeRecords.subscribe({
      next: records => this.filteredRecord = records,
      error: e => console.error("Api error", e)
  });
  }
  
  onFilter() {
    this.coffeeRecords.subscribe({
     next: records => {
      this.filteredRecord = records.filter((record: { date: Date; }) => record.date == this.dateField)},
     error: e => console.error("Api error", e)
    });
  }

  addRecord() {
    this.showModal.emit(true);
  }

  deleteItem(id: number) {
    this.deleteClicked.emit(id);
  }
}
