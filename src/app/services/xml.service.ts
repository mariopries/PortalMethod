import { Injectable } from "@angular/core";
import * as XML from "xml-js";

@Injectable({
  providedIn: "root"
})
export class XmlService {
  static parse(input: string) {
    const result = XML.xml2js(input, {
      compact: true
    });
    return result;
  }
}
