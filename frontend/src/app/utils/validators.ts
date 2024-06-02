import {AbstractControl, ValidationErrors} from '@angular/forms';

export function validarCPF(control: AbstractControl): ValidationErrors | null {
  const cpf = control.value;
  if (!cpf) {
    return null;
  }

  const cpfClean = cpf.replace(/\D/g, '');
  if (cpfClean.length !== 11 || /^(\d)\1{10}$/.test(cpfClean)) {
    return {cpfInvalid: true};
  }

  let soma;
  let resto;
  soma = 0;

  for (let i = 1; i <= 9; i++) {
    soma = soma + parseInt(cpfClean.substring(i - 1, i)) * (11 - i);
  }

  resto = (soma * 10) % 11;

  if (resto === 10 || resto === 11) {
    resto = 0;
  }

  if (resto !== parseInt(cpfClean.substring(9, 10))) {
    return {cpfInvalid: true};
  }

  soma = 0;
  for (let i = 1; i <= 10; i++) {
    soma = soma + parseInt(cpfClean.substring(i - 1, i)) * (12 - i);
  }
  resto = (soma * 10) % 11;

  if (resto === 10 || resto === 11) {
    resto = 0;
  }

  if (resto !== parseInt(cpfClean.substring(10, 11))) {
    return {cpfInvalid: true};
  }

  return null;
}
