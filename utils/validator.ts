export class Validator {
  public static isNotEmpty(value: string): boolean {
    return value.length > 0;
  }

  public static email(email: string): boolean {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/u;
    return regex.test(email);
  }

  public static phone(phone: string): boolean {
    const regex = /^(?:\+?[0-9]{1,3})?[- ]?[0-9]{3,14}$/;
    return regex.test(phone);
  }

  public static number(number: string): boolean {
    const regex = /^[0-9]+$/;
    return regex.test(number);
  }

  public static parseDate(date: string): string {
    const timePart = date.split(' ')[1];

    return timePart;
    // return date.split(' ')[1].split(':').join(':');
  }

  public static reveseDate(date: string): string {
    const reversedDate = date.split('-').reverse().join(':');
    return reversedDate;
  }
}
