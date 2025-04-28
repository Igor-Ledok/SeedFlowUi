import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// Кастомный валидатор для МФО
export function mfoValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value?.trim();

    // 1. Проверка, что значение состоит ровно из 5 цифр
    const validMfoPattern = /^\d{5}$/;
    if (value && !validMfoPattern.test(value)) {
      return { 'invalidMfo': true };
    }

    return null; // Если все проверки пройдены
  };
}
