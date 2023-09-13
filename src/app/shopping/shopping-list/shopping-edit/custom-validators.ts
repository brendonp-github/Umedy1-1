import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

export class CustomValidators {
  static isValidAmount(control: FormControl): { [s: string]: boolean } | null {
    const parsed = parseInt(control.value);
    if (isNaN(parsed) || parsed <= 0)
    {
      return { 'invalidAmount': true };
    }
    return null;
  }
}
