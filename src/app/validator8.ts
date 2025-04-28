import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function fullAddressValidator(): ValidatorFn 
{
  return (control: AbstractControl): ValidationErrors | null => 
  {
    const value = control.value?.trim();

    const addressPattern = /^([А-ЯA-ZІЇЄҐ][а-яa-zіїєґ']+\s){0,2}[А-ЯA-ZІЇЄҐ][а-яa-zіїєґ']+\s\d{1,5},\s?\d+$/;

    if (value && !addressPattern.test(value)) 
    {
      return { 'invalidAddress': true };
    }

    return null;
  };
}
