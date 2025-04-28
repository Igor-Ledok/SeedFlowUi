import { Component, ElementRef, OnInit } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import { TranslocoModule } from '@jsverse/transloco';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, NgFor } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReturnProductListDto } from '../models/shop/return/return-product-list-dto';
import { ShopService } from '../services/shop.service';
import { UserInfo, UserService } from '../services/user.service';
import { LanguageService } from '../services/language.service';
import { ReturnCategoryDto } from '../models/shop/return/return-category-dto';

@Component({
  selector: 'app-root-shop-tovars',
  standalone: true,
  imports: [
    HeaderComponent,
    TranslocoModule,
    RouterModule,
    ReactiveFormsModule,
    NgFor,
    MatFormFieldModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './root-shop-tovars.component.html',
  styleUrl: './root-shop-tovars.component.scss'
})
export class RootShopTovarsComponent implements OnInit {

  previewURLs: string[] = []; // Список загруженных фото
  activeButtonIndex: number = -1;
  activeStartupButtonIndex: number = -1;
  activeSocialButtonIndex: number = -1;
  activeHumanitarianButtonIndex: number = -1;
  activeCategoryIndex: number = -1;

  selectedCategoryIds: string[] = [];
  categories: ReturnCategoryDto[] = [];
  allProducts: ReturnProductListDto[] = [];
  products: ReturnProductListDto[] = [];
  public userInfo: UserInfo;
  activeTab: string = '';

  constructor(
    private route: ActivatedRoute,
    private eRef: ElementRef,
    private languageService: LanguageService,
    private shopService: ShopService,
    private userService: UserService
  ) { }

  ngOnInit(): void {

    this.route.url.subscribe(urlSegments => {
      this.activeTab = urlSegments.length > 1 ? urlSegments[1].path : 'general';
    });

    this.shopService.getAllCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (err) => {
        console.error('Ошибка загрузки категорий', err);
      }
    });

    this.shopService.getAllProducts().subscribe({
      next: (data) => {
        this.allProducts = data;
        this.products = data;
        console.log('Загруженные товары:', this.products);
      },
      error: (err) => {
        console.error('Ошибка загрузки продуктов', err);
      }
    });
  }

  getData(){
    this.shopService.getAllProducts().subscribe({
      next: (data) => {
        this.allProducts = data;
        this.products = data;
        console.log('Загруженные товары:', this.products);
      },
      error: (err) => {
        console.error('Ошибка загрузки продуктов', err);
      }
    });
  }

  deleteProduct(productId: string) {
    this.shopService.deleteProduct(productId).subscribe({
      next: () => {
        this.products = this.products.filter(p => p.id !== productId);
        this.getData();
      },
      error: (err) => {
        console.error(err);
        this.getData();
      }
    });
  }
}
