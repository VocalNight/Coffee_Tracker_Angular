import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { RecordTableComponent } from './Components/record-table/record-table.component';
import { RecordModalComponent } from './Components/record-modal/record-modal.component';
import { CoffeeTrackerHttpService } from '../Services/coffee-tracker-http.service';
import { CoffeeRecords } from '../Model/CoffeeRecords';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RecordTableComponent, RecordModalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Angular Coffee Tracker';
  coffeeRecords: Observable<any> = new Observable;
  showModal: boolean = false;

  constructor(private recordsHttpService: CoffeeTrackerHttpService)  {}

  ngOnInit(): void {
    this.getRecords();
  }

  getRecords() {
    this.coffeeRecords = this.recordsHttpService.getRecords('tracker');
  }

  onDelete(id: number) {
    this.recordsHttpService.deleteRow(id, 'tracker').subscribe({
      next: (r) => this.getRecords(),
      error: (e) => console.error("Api error", e)
    });
  }

  onInclude(clicked: boolean) {
    this.showModal = true;
  }

  onAddedItem(item: any) {
    this.recordsHttpService.postItem(item, 'tracker')
      .subscribe({
        next: (r) => {
          this.getRecords();
          this.showModal = false;
        },
        error: (e) => { 
          console.error("Api error", e);
        }
      })
    
  }
}
