import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ListOfVagons} from '../Shared/listOfVagons';

@Component({
  selector: 'app-v-table',
  templateUrl: './v-table.component.html',
  styleUrls: ['./v-table.component.css']
})
export class VTableComponent {
  @Output() curElemId = new EventEmitter<string>();
  dataSource = ListOfVagons.listOfVagons;
  constructor() { }
  delete(railwayNumber): void{
    ListOfVagons.listOfVagons = ListOfVagons.listOfVagons.filter(
      (item) => {
        return item.id !== railwayNumber;
      }
    );
    this.dataSource = ListOfVagons.listOfVagons;
  }
  edit(railwayNumber): void{
      this.curElemId.emit(railwayNumber);
      // ListOfVagons.listOfVagons = ListOfVagons.listOfVagons.filter(
      //   (item) => {
      //     return item.id !== railwayNumber;
      //   }
      // );
      // this.dataSource = ListOfVagons.listOfVagons;
  }
}
