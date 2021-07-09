import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from "rxjs";
import {NbMediaBreakpointsService, NbThemeService} from "@nebular/theme";
import {map, takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-footer-auth',
  templateUrl: './footer-auth.component.html',
  styleUrls: ['./footer-auth.component.scss'],
})
export class FooterAuthComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  smallText: boolean = false;

  constructor(
    private themeService: NbThemeService,
    private breakpointService: NbMediaBreakpointsService,
  ) { }

  ngOnInit() {
    this.callListenerSize();
  }
  private callListenerSize() {
    const { md } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < md),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => {
        this.smallText = isLessThanXl;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
