export interface ImportDeclaration {
  id: number;
  name: string;          
  partner_name: string;  
  date_order: string;    
  create_order: string; 
  amount_total: number;  
  currency: string;      
  state: string;         
  type: string;          
  company_name: string;  
}

export interface PaginationState {
  currentPage: number;
  pageSize: number;
  totalItems: number;
}