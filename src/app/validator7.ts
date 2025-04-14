import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// Тип для телефонных паттернов с индексной сигнатурой
const phonePatterns: { [key: string]: RegExp } = {
  'UA': /^\+380\d{9}$/,   // Украина (пример)
  'US': /^\+1\d{10}$/,    // США
  'IT': /^\+39\d{10}$/,   // Италия
  'DE': /^\+49\d{10,11}$/, // Германия
  'FR': /^\+33\d{9}$/,    // Франция
  'ES': /^\+34\d{9}$/,    // Испания
};

// Кастомный валидатор для телефонного номера
export function contactPhoneValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value?.trim();
    
    if (!value) {
      return { 'required': true };
    }

    // Для каждой страны проверяем номер телефона
    for (let country in phonePatterns) {
      // Используем ключи из phonePatterns для доступа к регулярным выражениям
      const pattern = phonePatterns[country];
      if (pattern.test(value)) {
        return null;  // Если номер телефона соответствует хотя бы одному паттерну
      }
    }

    return { 'invalidPhoneNumber': true };  // Если номер телефона не соответствует ни одному паттерну
  };
}
