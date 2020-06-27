import { Endereco } from './endereco';

export class Fornecedor {
  id: string;
  name: string;
  document: string;
  active: boolean;
  supplierType: number;
  address: Endereco;
}

