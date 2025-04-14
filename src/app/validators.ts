// validators.ts
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function edrpouOrIpnValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
  
      // Проверяем, если поле пустое, то не валидируем
      if (!value) {
        return null; // Валидатор не срабатывает, если поле пустое
      }
  
      // Проверка для ЄДРПОУ (8 или 10 цифр) и ІПН (10 цифр)
      const isValidEdrpou = /^[0-9]{8,10}$/.test(value); // ЄДРПОУ
      const isValidIpn = /^[0-9]{10}$/.test(value); // ІПН
  
      // Если одно из условий выполнено, считаем поле валидным
      if (isValidEdrpou || isValidIpn) {
        return null; // Валидно
      }
  
      // Ошибка, если не соответствует ни одному из форматов
      return { invalidEdrpouOrIpn: true };
    };
  }
  
