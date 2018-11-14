import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class CartaoCreditoService {
  constructor() {}

  static GetCardType(number) {
    // visa
    let re = new RegExp("^4");
    if (number.match(re) != null) {
      return "Visa";
    }

    // Mastercard
    // Updated for Mastercard 2017 BINs expansion
    if (/^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/.test(number)) {
      return "Mastercard";
    }

    // AMEX
    re = new RegExp("^3[47]");
    if (number.match(re) != null) {
      return "AMEX";
    }

    // Discover
    re = new RegExp("^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)");
    if (number.match(re) != null) {
      return "Discover";
    }

    // Diners
    re = new RegExp("^36");
    if (number.match(re) != null) {
      return "Diners";
    }

    // Diners - Carte Blanche
    re = new RegExp("^30[0-5]");
    if (number.match(re) != null) {
      return "Diners - Carte Blanche";
    }

    // JCB
    re = new RegExp("^35(2[89]|[3-8][0-9])");
    if (number.match(re) != null) {
      return "JCB";
    }

    re = new RegExp("^(4011|431274|438935|451416|457393|4576|457631|457632|504175|627780|636297|636368|636369|(6503[1-3])|(6500(3[5-9]|4[0-9]|5[0-1]))|(6504(0[5-9]|1[0-9]|2[0-9]|3[0-9]))|(650(48[5-9]|49[0-9]|50[0-9]|51[1-9]|52[0-9]|53[0-7]))|(6505(4[0-9]|5[0-9]|6[0-9]|7[0-9]|8[0-9]|9[0-8]))|(6507(0[0-9]|1[0-8]))|(6507(2[0-7]))|(650(90[1-9]|91[0-9]|920))|(6516(5[2-9]|6[0-9]|7[0-9]))|(6550(0[0-9]|1[1-9]))|(6550(2[1-9]|3[0-9]|4[0-9]|5[0-8]))|(506(699|77[0-8]|7[1-6][0-9))|(509([0-9][0-9][0-9])))");
    if (number.match(re) != null) {
      return "Elo";
    }

    // Visa Electron
    re = new RegExp("^(4026|417500|4508|4844|491(3|7))");
    if (number.match(re) != null) {
      return "Visa Electron";
    }

    return "";
  }
}
