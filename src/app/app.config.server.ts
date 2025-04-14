import {
  mergeApplicationConfig,
  ApplicationConfig,
  isDevMode,
} from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { provideServerRouting } from '@angular/ssr';
import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';
import { provideHttpClient } from '@angular/common/http';
import {
  FunctionalTranspiler,
  provideTransloco,
  provideTranslocoTranspiler,
} from '@jsverse/transloco';
import { TranslocoHttpLoader } from './transloco-loader';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    provideServerRouting(serverRoutes),
    provideHttpClient(),
    provideTransloco({
      config: {
        availableLangs: [
          { id: 'en', label: 'English' },
          { id: 'uk', label: 'Ukraine' },
        ],
        defaultLang: 'en',
        // Remove this option if your application doesn't support changing language in runtime.
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
      },
      loader: TranslocoHttpLoader,
    }),
  ],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
