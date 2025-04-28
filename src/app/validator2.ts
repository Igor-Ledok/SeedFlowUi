import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// Кастомный валидатор для "Місто"
export function cityNameValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const regex = /^[A-Za-zА-Яа-яІіЇїЄєҐґ\s]+$/;
    if (control.value && !regex.test(control.value)) {
      return { 'invalidCityName': true }; // Если не соответствует паттерну
    }
    return null;
  };
}
