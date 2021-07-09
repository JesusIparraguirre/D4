import {Component, OnDestroy, OnInit} from '@angular/core';
import {EventEmmitGeneric} from "../viewservices/event.emmiter.service";
import {Subject, Subscription} from "rxjs";
import {NbMediaBreakpointsService, NbThemeService} from "@nebular/theme";
import {map, takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-header-auth',
  templateUrl: './header-auth.component.html',
  styleUrls: ['./header-auth.component.scss'],
})
export class HeaderAuthComponent implements OnDestroy, OnInit {


  subscription: Subscription;
  isActiveButtomLogin: boolean = false;
  isLessThanMd: boolean = false;
  private destroy$: Subject<void> = new Subject<void>();
  text: string;

  constructor(
    private messageService: EventEmmitGeneric,
    private themeService: NbThemeService,
    private breakpointService: NbMediaBreakpointsService,
  ) {
    this.subscription = this.messageService.getMessage().subscribe(message => {
      if (message) {
        this.isActiveButtomLogin = true;
      } else {
        this.isActiveButtomLogin = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    const { md } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < md),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanMd: boolean) => {
        this.isLessThanMd = isLessThanMd;
        if (isLessThanMd) {
          this.text = "";
        } else {
          this.text = "Iniciar sesión";
        }
      });
  }

}
