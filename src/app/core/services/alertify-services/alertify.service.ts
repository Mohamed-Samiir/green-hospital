import { Injectable } from '@angular/core';
declare let alertify: any;

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() {
  }



  success(message: string) {
    alertify.set('notifier', 'position', 'bottom-left');
    alertify.success(message);
  }
  error(message: string) {
    alertify.set('notifier', 'position', 'bottom-left');
    alertify.error(message);
  }

  warning(message: string) {
    alertify.warning(message);
  }

  message(message: string) {
    alertify.message(message);
  }
  alert(title: string, message: string) {
    alertify.set('notifier', 'position', 'top-center');
    alertify.alert(title, message);
  }
  notify(title: string, url: any) {

    var msg = alertify.notify(title, 'custom', 20);
    msg.callback = function (isClicked: any) {
      if (isClicked)
        window.location.href = url;
      else
        console.log('notification auto-dismissed');
    };
  }


}
