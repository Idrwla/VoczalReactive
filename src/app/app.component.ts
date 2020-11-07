import { Component , ViewChild} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('childComp') crChild;
  bridge = (railwayId) => {
    this.crChild.edit(railwayId);
  }
}
