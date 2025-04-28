import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';

bootstrapApplication(AppComponent, {
  ...appConfig, // Подключаем глобальную конфигурацию
  providers: [
    ...appConfig.providers, // Подключаем провайдеры из appConfig
    provideRouter(routes), // Подключаем маршруты
    provideAnimations(),
  ],
}).catch((err) => console.error(err));
