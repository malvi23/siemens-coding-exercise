import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable, Subscription, map } from 'rxjs';
import { MakerData } from 'src/app/core/interfaces/vehicle-interface';
import {filter, includes, debounce } from 'lodash';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  @Input() data$!: Observable<MakerData[]>;
  @Output() filteredItemsEvent = new EventEmitter<any>();
  data: MakerData[] = [];
  filteredItems: any[] = [];
  searchTerm: string = '';
  dataSubscription!:Subscription;
  debouncedFunction = debounce(this.filterItems, 300);

  ngOnInit() {
    // Subscribe to the data on which search filter applied
    this.dataSubscription = this.data$.subscribe((list: any) => {
      this.data = list;
    });
  }

  // Method to emit filtered data based on search value
  filterItems(): void {
    if (this.searchTerm) {
      this.filteredItems = filter(this.data, (item: any) => {
        return (
          includes(
            item.Make_Name.toLowerCase(),
            this.searchTerm.toLowerCase()
          ) || includes(item.Make_ID.toString(), this.searchTerm)
        );
      });
    } else {
      this.filteredItems = this.data;
    }
    this.filteredItemsEvent.emit(this.filteredItems);
  }

  ngOnDestroy(){
    // Unsubscribing the subcription to avoid memory leak
    this.dataSubscription?.unsubscribe()
  }
}
