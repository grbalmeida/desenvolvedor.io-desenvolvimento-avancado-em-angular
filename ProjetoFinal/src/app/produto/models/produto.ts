export interface Produto {
  id: string;
  name: string;
  description: string;
  image: string;
  uploadImage: string;
  price: number;
  creationDate: string;
  active: true;
  supplierId: string;
  supplierName: string;
}

export interface Fornecedor {
  id: string;
  name: string;
}
