import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// Кастомный валидатор для Назви банку
export function bankNameValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value?.trim();

    // 1. Проверка на минимальную длину (например, от 3 символов)
    if (value && value.length < 3) {
      return { 'minLength': true };
    }

    // 2. Разрешенные символы (буквы, пробелы, дефисы и апострофы)
    const validNamePattern = /^[A-Za-zА-Яа-яЁёіІїЇєЄґҐєҐ\-\s]+$/;
    if (value && !validNamePattern.test(value)) {
      return { 'invalidCharacter': true };
    }

    return null; // Если все проверки пройдены
  };
}
