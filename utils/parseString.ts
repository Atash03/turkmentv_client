export class ParseString {
  public static parseTime(time: string): string {
    return time.split('.').join(':').substring(0, time.lastIndexOf(':'));
  }
}
