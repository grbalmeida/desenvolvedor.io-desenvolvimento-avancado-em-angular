import { Endereco } from './endereco';
import { Produto } from 'src/app/produto/models/produto';

export class Fornecedor {
  id: string;
  name: string;
  document: string;
  active: boolean;
  supplierType: number;
  address: Endereco;
  products: Produto[];
}

