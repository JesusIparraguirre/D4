import {Component, OnDestroy, OnInit} from '@angular/core';
import {map, takeUntil} from "rxjs/operators";
import {NbDialogService, NbMediaBreakpointsService, NbThemeService} from "@nebular/theme";
import {Subject, Subscription} from "rxjs";
import {EventEmmitGeneric} from "../viewservices/event.emmiter.service";
import {DialogGenericComponent} from "../dialog-generic/dialog-generic.component";
import {AuthenticationRepository} from "../../../@domain/repository/authentication.repository";
import {UserRepository} from "../../../@domain/repository/user.respository";

@Component({
  selector: 'view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss'],
})
export class ViewUserComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();

  userPictureOnly: boolean;
  isActiveProfile: boolean = false;
  subscription: Subscription;
  messages: any[] = [];

  name: string = "          ";
  picture: string = "https://www.physiorehabgroup.co.nz/wp-content/uploads/generic-profile-square-580x580.jpg";

  constructor(
    private userService: UserRepository,
    private themeService: NbThemeService,
    private breakpointService: NbMediaBreakpointsService,
    private messageService: EventEmmitGeneric,
    private dialogService: NbDialogService,
    private authenticationService: AuthenticationRepository,
    ) {
    this.subscription = this.messageService.getMessage().subscribe(message => {
      if (message) {
        if (message.text !== "666") {
          this.messages.push(message);
          this.isActiveProfile = true;
        } else {
          this.callUserData();
        }
      } else {
        // clear messages when empty message received
        this.messages = [];
        this.isActiveProfile = false;
      }
    });
  }
  ngOnInit() {
    this.callUserData();

    const { md } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < md),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanMd: boolean) => {
        this.userPictureOnly = isLessThanMd;
      });

  }

  private callUserData() {
    this.userService.getPersonalInfo()
      .subscribe(data => {
          this.name = data.personales.nombre + " " + data.personales.apellidoPaterno+" "+data.personales.apellidoMaterno;
          if (this.name.trim().length == 0) {
            this.name = this.authenticationService.getCurrentUserValue.nombre;
          }
          if (data.personales.foto != null && data.personales.foto.length !== 0 )
            this.picture = data.personales.foto;
      }, error => {
        this.dialogService.open(DialogGenericComponent, {
          context: {
            body: error.message,
          },
          closeOnBackdropClick: false,
          autoFocus: false,
        }).onClose.subscribe((value: boolean) => {});
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.subscription.unsubscribe();
  }

}
