import {Component, Input} from '@angular/core';
import {PopupService} from '../../popup/popup.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
  @Input()
  title: string;
  @Input()
  close: Function;

  constructor(private popupService: PopupService) {}
  exit() {
    if (this.close) {
      this.close();
    }
    // 销毁自己
    this.popupService.eject(this);
  }
}
