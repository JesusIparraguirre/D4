import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subject} from "rxjs";
import {NbMediaBreakpointsService, NbThemeService} from "@nebular/theme";
import {map, takeUntil} from "rxjs/operators";

@Component({
  selector: 'base-logo',
  templateUrl: './base-logo.component.html',
  styleUrls: ['./base-logo.component.scss'],
})
export class BaseLogoComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();

  @Input() aligh: string;
  showOnlyForm: boolean = false;

  constructor(
    private themeService: NbThemeService,
    private breakpointService: NbMediaBreakpointsService,
    ) { }

  ngOnInit() {
    const { md } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < md),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanMd: boolean) => {
        this.showOnlyForm = isLessThanMd;
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  showLogo() {
    if (this.aligh === 'text-center') {
      return true;
    } else {
      return !this.showOnlyForm;
    }
  }
}
