import {Component, OnDestroy, OnInit} from '@angular/core';
import {NbIconLibraries, NbMediaBreakpointsService, NbThemeService} from '@nebular/theme';
import {map, takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";

@Component({
  selector: 'app-header-home',
  templateUrl: './header-home.component.html',
  styleUrls: ['./header-home.component.scss'],
})
export class HeaderHomeComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean;
  classContainer: string = 'logo-container';
  activeMiniSizeMenu: boolean = false;

  constructor(iconsLibrary: NbIconLibraries,
              private themeService: NbThemeService,
              private breakpointService: NbMediaBreakpointsService,
              ) {
    iconsLibrary.registerFontPack('ion', {iconClassPrefix: 'ion'});
  }

  ngOnInit() {

    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => {
        this.userPictureOnly = isLessThanXl;
        if (isLessThanXl) {
          this.classContainer = 'logo-container2';
        } else {
          this.classContainer = 'logo-container';
        }
      });

  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

