export interface IAddress {
    line1:          string; // Endereço da pessoa.
    line2:          string; // O número da rua permite que você identifique cada edifício em uma rua
    line3:          string; // Número do apartamento e outras informações
    neighborhood:   string; // Um distrito, especialmente um que forma uma comunidade dentro de uma cidade ou cidade
    city:           string; // Cidade do vendedor individual
    state:          string; // Código ISO 3166-2 para o estado da pessoa
    postal_code:    string; // Código postal da pessoa
    country_code:   string; // ISO 3166-1 alpha-2 - códigos de país de duas letras. Valor padrão: EUA
}
