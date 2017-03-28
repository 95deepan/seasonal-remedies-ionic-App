import { Injectable } from "@angular/core";
import { LanguageModel } from "../models/language.model";

@Injectable()
export class LanguageService {
  languages: Array<LanguageModel> = new Array<LanguageModel>();

  constructor() {
    this.languages.push(
      { name: "English", code: "en" },
      { name: "తెలుగు", code: "tel" },
      { name: "தமிழ்", code: "tam" },
      { name: "हिंदी", code: "hi" }
    );
  }

  getLanguages() {
    return this.languages;
  }
}
