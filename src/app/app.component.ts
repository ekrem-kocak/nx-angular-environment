import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { APP_CONFIG } from 'src/environments/app-config.token';

@Component({
  standalone: true,
  imports: [RouterModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  private readonly appConfig = inject(APP_CONFIG);

  /** consturctor injection */
  // constructor(@Inject(APP_CONFIG) appConfig: EnvironmentModel) {}
  constructor() {
    console.log(this.appConfig.apiUrl);
  }
}
