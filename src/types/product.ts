export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  imageUrl: string;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number; // เพิ่มฟิลด์นี้เพื่อระบุจำนวนชิ้นที่เลือก
}
