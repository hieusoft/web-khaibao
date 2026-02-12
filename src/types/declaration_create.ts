export interface ProductItem {
  id: string;
  name: string;
  batchCode: string;
  expiryDate: string;
  quantity: number;
  unit: string;
  price: number;
  total: number;
}

export interface OrderGeneralInfo {
  supplier: string;
  address: string;
  importType: string;
  currency: string;
  importDate: string;
  warehouse: string;
  purpose: string;
}