import { ITheme } from "@/typings/theme.type";

export class ThemeService {
  static setLocalTheme(themeValue: ITheme["theme"]): ITheme["theme"] {
    localStorage.setItem("localTheme", themeValue);
    return themeValue;
  }
  static getLocalTheme(): ITheme["theme"] | null {
    return localStorage.getItem("localTheme") as ITheme["theme"];
  }
}
