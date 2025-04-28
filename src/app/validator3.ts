import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function ibanValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => 
  {
    const countryPatterns: { [key: string]: RegExp } = {
      'DE': /^DE\d{20}$/, // Германия (22 символа)
      'FR': /^FR\d{2}[0-9A-Z]{23}$/, // Франция (27 символов)
      'GB': /^GB\d{2}[0-9]{18}$/, // Великобритания (22 символа)
      'ES': /^ES\d{2}[0-9A-Z]{20}$/, // Испания (24 символа) - исправлено на 20 символов с цифрами или буквами
      'IT': /^IT\d{2}[0-9A-Z]{23}$/, // Италия (27 символов)
      'NL': /^NL\d{2}\d{16}$/, // Нидерланды (18 символов)
      'PL': /^PL\d{2}\d{24}$/, // Польша (28 символов)
      'BE': /^BE\d{2}\d{12}$/, // Бельгия (16 символов)
      'CH': /^CH\d{2}\d{17}$/, // Швейцария (21 символ)
      'AT': /^AT\d{2}\d{16}$/, // Австрия (20 символов)
      'UA': /^UA\d{25}$/, // Украина (27 символов: 2 буквы + 25 цифр)
    };

    if (control.value) {
      const countryCode = control.value.substring(0, 2);

      if (countryPatterns[countryCode] && !countryPatterns[countryCode].test(control.value)) 
      {
        return { 'invalidIban': true };
      }

      const internationalIbanPattern = /^[A-Z]{2}\d{2}[A-Z0-9]{4,30}$/;
      if (!internationalIbanPattern.test(control.value)) 
      {
        return { 'invalidIban': true };
      }
    }
    return null;
  };
}
