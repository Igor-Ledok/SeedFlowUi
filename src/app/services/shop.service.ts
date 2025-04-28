import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment';
import { Observable } from 'rxjs/internal/Observable';
import { UpdateUserDto } from '../models/user/update-user-dto';
import { jwtDecode } from 'jwt-decode';
import { ReturnProductListDto } from '../models/shop/return/return-product-list-dto';
import { ReturnProductDto } from '../models/shop/return/return-product-dto';
import { ReturnCategoryDto } from '../models/shop/return/return-category-dto';
import { CreateProductDto } from '../models/shop/create/create-product-dto';
import { CreatePurchasedOrderDto } from '../models/shop/create/create-purchased-order-dto';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShopService 
{
  constructor(private http: HttpClient) { }

  baseUrl = environment.baseApiUrl + "api/shop";

  private useBonusKey = 'useBonus'; // Ключ для сохранения useBonus в localStorage
  private totalPriceKey = 'totalPrice'; // Ключ для сохранения useBonus в localStorage

  // Сохранить значение useBonus
  setUseBonus(useBonus: boolean): void {
    localStorage.setItem(this.useBonusKey, JSON.stringify(useBonus));
  }
  
  // Получить значение useBonus
  getUseBonus(): boolean {
    const useBonus = localStorage.getItem(this.useBonusKey);
    return useBonus ? JSON.parse(useBonus) : false; // По умолчанию false
  }
  
  // Удалить useBonus из localStorage (если понадобится)
  clearUseBonus(): void {
    localStorage.removeItem(this.useBonusKey);
  }



  setTotalPrice(totalPrice: number): void {
    localStorage.setItem(this.totalPriceKey, JSON.stringify(totalPrice));
  }
  
  getTotalPrice(): number {
    const totalPrice = localStorage.getItem(this.totalPriceKey);
    return totalPrice ? JSON.parse(totalPrice) : 0; // По умолчанию false
  }
  
  clearTotalPrice(): void {
    localStorage.removeItem(this.totalPriceKey);
  }


  getAllProducts(): Observable<ReturnProductListDto[]> {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token not found in localStorage.');
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
      });
      return this.http.get<ReturnProductListDto[]>(this.baseUrl + "/products", { headers:headers });
    }
    else {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      });
      return this.http.get<ReturnProductListDto[]>(this.baseUrl + "/products-with-auth", { headers:headers });
    }
  }

  getProductById(id: string): Observable<ReturnProductDto> {

    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token not found in localStorage.');
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
      });
      return this.http.get<ReturnProductDto>(this.baseUrl + `/product/${id}`, { headers:headers });
    }
    else {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      });
      return this.http.get<ReturnProductDto>(this.baseUrl + `/product-with-auth/${id}`, { headers:headers });
    }
  }

  getAllCategories(): Observable<ReturnCategoryDto[]> {
    return this.http.get<ReturnCategoryDto[]>(`${this.baseUrl}/categories`);
  }

  createProduct(dto: CreateProductDto): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/product`, dto);
  }

  deleteProduct(id: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
    return this.http.delete(`${this.baseUrl}/product/${id}`, { headers });
  }

  createPurchase(dto: CreatePurchasedOrderDto): Observable<string> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
    return this.http.post(`${this.baseUrl}/order`, dto, {
      headers,
      responseType: 'text',
    }) as Observable<string>;
  }
  

  private cartKey = 'cart'; // Ключ для сохранения корзины в localStorage

  getCart(): CartItem[] {
    const cart = localStorage.getItem(this.cartKey);
    return cart ? JSON.parse(cart) : [];
  }

  // Добавить товар в корзину
  addToCart(productId: string, quantity: number): void { 
    const cart = this.getCart();
    const existingIndex = cart.findIndex(item => item.productId === productId);
  
    if (existingIndex !== -1) {
      // Если товар уже есть — заменяем количество
      cart[existingIndex].quantity = quantity;
    } else {
      // Если товара нет — добавляем
      cart.push({ productId, quantity });
    }
  
    localStorage.setItem(this.cartKey, JSON.stringify(cart));
  }

  
  // Удалить товар из корзины
  removeFromCart(productId: string): void {
    let cart = this.getCart();
    cart = cart.filter(item => item.productId !== productId);
    localStorage.setItem(this.cartKey, JSON.stringify(cart));
  }

  // Очистить корзину
  clearCart(): void {
    localStorage.removeItem(this.cartKey);
  }

  toggleLike(productId: string): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token not found in localStorage.');
      throw new Error('User not authenticated');
    }
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    });
  
    return this.http.post(this.baseUrl + `/favourite/${productId}`, {}, { headers: headers });
  }

  getLikedProducts(): Observable<ReturnProductListDto[]> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    });
    return this.http.get<ReturnProductListDto[]>(this.baseUrl + "/liked-products", { headers: headers });
  
  }


  createPurchaseFromLocalStorage(dto: CreatePurchasedOrderDto): Observable<string> {
    const useBonus = this.getUseBonus();
    const totalPrice = this.getTotalPrice();
    const cartItems = this.getCart();
  
    const purchasedProducts = cartItems.map(item => ({
      productId: item.productId,
      quantity: item.quantity,
      totalPrice: 0,
    }));

    if (totalPrice <= 0) {
      return throwError(() => new Error('общая стоимость равна нулю.'));
    }
    if (purchasedProducts.length === 0) {
      return throwError(() => new Error('Корзина пуста'));
    }

    const finalDto: CreatePurchasedOrderDto = {
      ...dto,
      useBonus: useBonus,
      purchasedProducts: purchasedProducts,
      totalPrice: totalPrice,
    };

    this.clearTotalPrice();
    this.clearUseBonus();
    this.clearCart();
  
    return this.createPurchase(finalDto);
  }
  
}

interface CartItem {
  productId: string;
  quantity: number;
}