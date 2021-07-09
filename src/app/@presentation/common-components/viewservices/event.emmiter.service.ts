import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";

@Injectable({ providedIn: 'root' })
export class EventEmmitGeneric {
  private subject = new Subject<any>();

  sendMessage(message: string) {
    this.subject.next({ text: message });
  }

  reloadUser() {
    this.subject.next({ text: "666" });
  }

  clearMessages() {
    this.subject.next();
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }
}
