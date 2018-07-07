import {Component} from '@angular/core';
import {PopupService} from '../../popup/popup.service';
import {DialogComponent} from '../dialog/dialog.component';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent {

  constructor(private popupService: PopupService) {}

  pop() {
    this.popupService.load(DialogComponent, {
      title: '我是弹框， 点击关闭',
      close: () => {
        console.log('弹窗已关闭');
      }
    });
  }
}
