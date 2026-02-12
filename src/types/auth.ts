export interface User {
  id: number;
  username: string;
  email?: string;
  name: string;
  role: string;
  company_id?: number;
  company_name?: string;
  tax_code?: string;
}

export interface LegalHuman {
  id: number;
  name: string;
  tax_code: string;
  business_type: string;
  cccd_number: string;
  phone: string;
}

export interface Warehouse {
  id: number;
  name: string;
  code: string;
  company_owner: string;
  country: string;
  state: string;
  address: string;
}

export interface Factory {
  id: number;
  name: string;
  state: string;
  district: string;
  ward: string;
  address: string;
  country: string;
  phone: string;
}

export interface CompanyChild {
  id: number;
  name: string;
  tax_code: string;
  business_type: string;
  status: string;
}

export interface ProfileData {
  id: number;
  name: string;
  email: string;
  phone: string;
  tax_code: string;
  business_type: string;
  established_date: string;
  company_parent: string;
  status: string;
  country: string;
  state: string;
  city: string;
  district: string;
  ward: string;
  address: string;
  company_child: CompanyChild[];
  legal_humans: LegalHuman[];
  warehouses: Warehouse[];
  factories: Factory[];
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    company_id: number;
    company_name: string;
    tax_code: string;
    access_token: string;
    refresh_token: string;
  };
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  name: string;
  email: string;
}

export interface TokenPayload {
  uid: number;
  login: string;
  partner_id: number;
  iat: number;
  exp: number;
  iss: string;
  type: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
}
