# Nx 19 & Angular 18 Environment Variable Management

This project demonstrates how to manage environment variables using Nx 19 and Angular 18. Follow the steps below to set up and configure environment variables for different environments (e.g., development and production).

## Table of Contents

- [Creating an Nx Workspace](#creating-an-nx-workspace)
- [Creating Environment Files](#creating-environment-files)
- [Creating an Injection Token](#creating-an-injection-token)
- [Providing the Injection Token in App Config](#providing-the-injection-token-in-app-config)
- [Applying File Replacement for Different Environments](#applying-file-replacement-for-different-environments)
- [Accessing the Environment Variable in the Application](#accessing-the-environment-variable-in-the-application)
- [Running the Application](#running-the-application)

## Creating an Nx Workspace

To create an Nx workspace, run the following command and follow the interactive setup wizard. Choose Angular when prompted to set up an Angular project within the workspace.

```bash
npx create-nx-workspace my-workspace
```

## Creating Environment Files

After setting up your project, create the `src/environments` folder and add the environment files.

**`environment.ts`**

```typescript
import { EnvironmentModel } from './environment.model';

export const environment: EnvironmentModel = {
  apiUrl: 'local',
};
```

**`environment.prod.ts`**

```typescript
import { EnvironmentModel } from './environment.model';

export const environment: EnvironmentModel = {
  apiUrl: 'prod',
};
```

## Creating an Injection Token

Create an Injection Token to access the environment variables throughout the application.

```typescript
import { InjectionToken } from '@angular/core';
import { EnvironmentModel } from './environment.model';

export const APP_CONFIG = new InjectionToken<EnvironmentModel>(
  'Application config'
);
```

## Providing the Injection Token in App Config

Provide the Injection Token in the `app.config.ts` file.

```typescript
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { environment } from 'src/environments/environment';
import { APP_CONFIG } from 'src/environments/app-config.token';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    { provide: APP_CONFIG, useValue: environment },
  ],
};
```

## Applying File Replacement for Different Environments

Configure `fileReplacements` in the `angular.json` or Nx configuration file to replace environment files based on the build configuration.

```json
{
  "name": "my-project",
  "targets": {
    "build": {
      "executor": "@angular-devkit/build-angular:application",
      "options": {
        "outputPath": "dist/my-project"
      },
      "configurations": {
        "production": {
          "fileReplacements": [
            {
              "replace": "src/environments/environment.ts",
              "with": "src/environments/environment.prod.ts"
            }
          ]
        }
      }
    }
  }
}
```

## Accessing the Environment Variable in the Application

Access the environment variable within your application using the Injection Token.

```typescript
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
    console.log(this.appConfig.apiUrl); // Outputs 'local' in development and 'prod' in production
  }
}
```

## Running the Application

Use the following command to run the project in development mode:

```bash
nx serve
```

To run the project in production mode, use:

```bash
nx serve --c=production
```

---

This project demonstrates how to effectively manage environment variables in an Nx workspace with Angular. By following these steps, you can easily configure your application for different environments.

---
