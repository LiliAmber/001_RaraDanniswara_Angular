import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.intceptor';

export const httpInterceptorProviders = [
    // Kita gunakan ini pada Session26Module (session26.module.ts)
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true 
    },
  
    // Interceptor ini berguna sekali ketika kita ingin melakukan authentication
    // untuk satu service, pada module yang sama.
  
    // Misal, pada Session26Module, terdapat interceptor httpInterceptorProviders,
    // di mana provider ini akan "menangkap" semua request yang akan dijalankan
    // oleh component di dalam module tersebut.
];