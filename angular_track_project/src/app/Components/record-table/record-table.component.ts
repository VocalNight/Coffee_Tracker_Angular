import { Component, OnInit } from '@angular/core';
import { CoffeeRecords } from '../../../Model/CoffeeRecords';
import { CoffeeTrackerHttpService } from '../../../Services/coffee-tracker-http.service';

@Component({
  selector: 'app-record-table',
  standalone: true,
  imports: [],
  templateUrl: './record-table.component.html',
  styleUrl: './record-table.component.css'
})
export class RecordTableComponent implements OnInit {

  records: CoffeeRecords[] = [];

  constructor(private recordsHttpService: CoffeeTrackerHttpService) { }

  ngOnInit(): void {
    this.getRecords();
  }

  getRecords() {
    this.recordsHttpService.getRecords('tracker').subscribe((result) => {
      this.records = result;
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
