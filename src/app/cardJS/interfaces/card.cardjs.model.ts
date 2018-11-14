export interface ICardJS {
  form: string;
  container: string;
  formSelectors?: {
    numberInput?: string;
    expiryInput?: string;
    cvcInput?: string;
    nameInput?: string;
  };
  width?: number;
  formatting?: boolean;
  messages?: {
    validDate?: string;
    monthYear?: string;
  };
  placeholders?: {
    number?: string;
    name?: string;
    expiry?: string;
    cvc?: string;
  };
  masks?: {
    cardNumber?: string;
  };
  debug?: boolean;
}
