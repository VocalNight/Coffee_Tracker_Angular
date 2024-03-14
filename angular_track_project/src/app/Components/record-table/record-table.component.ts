import { Component, OnInit } from '@angular/core';
import { CoffeeRecords } from '../../../Model/CoffeeRecords';
import { CoffeeTrackerHttpService } from '../../../Services/coffee-tracker-http.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-record-table',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './record-table.component.html',
  styleUrl: './record-table.component.css'
})
export class RecordTableComponent implements OnInit {

  records: CoffeeRecords[] = [];
  filteredRecord: CoffeeRecords[] = [];
  dateField: Date = new Date();

  constructor(private recordsHttpService: CoffeeTrackerHttpService) { }

  ngOnInit(): void {
    this.getRecords();
  }

  filterDate(event: any) {
    console.log(this.dateField);
    console.log(this.records);
    this.filteredRecord = this.records.filter(record => record.date == this.dateField);
  }

  getRecords() {
    this.recordsHttpService.getRecords('tracker').subscribe((result) => {
      this.records = result;
      this.filteredRecord = this.records;
    })
  }

  deleteItem(id: number) {
    this.recordsHttpService.deleteRow(id, 'tracker').subscribe({
      next: (r) => {
        console.log("Api sucess", r);
        this.getRecords();
      },
      error: (e) => console.error("Api error", e)
    });
  }
}
