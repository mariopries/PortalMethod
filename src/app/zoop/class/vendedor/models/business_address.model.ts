export interface IBusinessAddress {

    line1:          string;
    line2:          string;
    line3:          string;
    neighborhood:   string;
    city:           string;
    state:          string; // Código ISO 3166-2 para o estado
    postal_code:    string;
    country_code:   string; // ISO 3166-1 alpha-2 - códigos de país de duas letras.

}
