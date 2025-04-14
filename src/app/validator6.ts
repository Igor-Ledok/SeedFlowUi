import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// Кастомный валидатор для Підписант
export function signatoryValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value?.trim();

    // 1. Проверка на обязательность поля
    if (!value) {
      return { 'required': true };
    }

    // 2. Регулярное выражение для проверки формата
    // Строгий формат: поддержка всех букв, включая украинские с диакритическими знаками
    const formatPattern = /^[А-ЯA-Zа-яa-zіІїЇєЄґҐ'’ʼ`\s-]+,\s?[А-ЯA-Zа-яa-zіІїЇєЄґҐ'’ʼ`\s-]+\s[А-ЯA-Zа-яa-zіІїЇєЄґҐ'’ʼ`\s-]+\s[А-ЯA-Zа-яa-zіІїЇєЄґҐ'’ʼ`\s-]+$/u;

    // Проверка на формат
    if (!formatPattern.test(value)) {
      return { 'invalidFormat': true }; // Если не соответствует формату
    }

    return null; // Если все проверки пройдены
  };
}