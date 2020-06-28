export class StringUtils {
  public static isNullOrEmpty(val: string): boolean {
    return val === undefined || val === null || val.trim() === '';
  }

  public static somenteNumeros(numero: string): string {
    return numero.replace(/[^0-9]/g, '');
  }
}
