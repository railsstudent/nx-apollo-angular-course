import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private errMsgSub$ = new Subject<string>()
  private successMsgSub$ = new Subject<string>()
  errMsg$ = this.errMsgSub$.asObservable()
  successMsg$ = this.successMsgSub$.asObservable()

  clearMsgs(): void {
    this.errMsgSub$.next('')
    this.successMsgSub$.next('')
  }

  setError(message: string): void {
    this.errMsgSub$.next(message)
  }

  setSuccess(message: string): void {
    this.successMsgSub$.next(message)
  }
}
