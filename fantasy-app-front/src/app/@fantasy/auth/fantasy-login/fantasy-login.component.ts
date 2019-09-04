import {ChangeDetectorRef, Component, Inject} from '@angular/core';
import {NB_AUTH_OPTIONS, NbAuthResult, NbAuthService, NbLoginComponent} from '@nebular/auth';
import {Router} from '@angular/router';

@Component({
  selector: 'ngx-fantasy-login',
  templateUrl: './fantasy-login.component.html',
  styleUrls: ['./fantasy-login.component.scss'],
})
export class FantasyLoginComponent extends NbLoginComponent {

  constructor(service: NbAuthService, @Inject(NB_AUTH_OPTIONS) protected options = {}, cd: ChangeDetectorRef, router: Router) {
    super(service, options, cd, router);
  }

  login(): void {
    this.errors = [];
    this.messages = [];
    this.submitted = true;

    this.service.authenticate(this.strategy, this.user).subscribe((result: NbAuthResult) => {
      this.submitted = false;

      if (result.isSuccess()) {
        this.messages = result.getMessages();
      } else {
        this.errors = result.getErrors();
      }

      const redirect = result.getRedirect();
      if (redirect) {
        setTimeout(() => {
          return this.router.navigateByUrl(redirect);
        }, this.redirectDelay);
      }
      this.cd.detectChanges();
    });
  }

}
