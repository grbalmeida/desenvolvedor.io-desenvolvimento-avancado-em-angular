export class Endereco {
  id: string;
  street: string;
  number: string;
  complement: string;
  district: string;
  postalCode: string;
  city: string;
  state: string;
  supplierId: string;
}

export class CepConsulta {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
}
