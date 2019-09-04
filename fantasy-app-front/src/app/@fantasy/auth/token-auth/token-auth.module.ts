import { CommonModule } from '@angular/common';
import {ModuleWithProviders, NgModule} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { routedComponents, TokenAuthRoutingModule } from './token-auth-routing.module';
import { NbAuthModule } from '@nebular/auth';
import {
  NbAlertModule,
  NbButtonModule,
  NbCheckboxModule,
  NbInputModule, NbThemeModule,
} from '@nebular/theme';
import {DEFAULT_THEME} from '../../../@theme/styles/theme.default';
import {COSMIC_THEME} from '../../../@theme/styles/theme.cosmic';
import {CORPORATE_THEME} from '../../../@theme/styles/theme.corporate';
import {DARK_THEME} from '../../../@theme/styles/theme.dark';


@NgModule({
  imports: [
    CommonModule,
    // FormsModule,
    // RouterModule,
    // NbAlertModule,
    // NbInputModule,
    // NbButtonModule,
    // NbCheckboxModule,
    TokenAuthRoutingModule,

    // NbAuthModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  exports: [
    ...routedComponents,
  ],
})
export class TokenAuthModule {
}
