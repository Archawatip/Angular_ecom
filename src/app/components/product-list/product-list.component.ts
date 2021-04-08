import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/common/product';
import {ProductService} from '../../services/product.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component .html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[];
  currentCategoryId: number;
  searchMode: boolean;

  constructor(private productService: ProductService,
              private route: ActivatedRoute) {}

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.route.paramMap.subscribe(() => {
    this.listProducts();
  });
}

  // tslint:disable-next-line:typedef
  listProducts() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    if (this.searchMode){
      this.handleSearchProducts();
    }
    else {
      this.handleListProduct();
    }

  }
  // tslint:disable-next-line:typedef
  handleSearchProducts(){
    const theKeyword: string = this.route.snapshot.paramMap.get('keyword');
    this.productService.searchProducts(theKeyword).subscribe(
      data =>{
        this.products = data;
      }
    )
  }

  // tslint:disable-next-line:typedef
  handleListProduct(){
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');
    if (hasCategoryId){
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id');
    }
    else {
      this.currentCategoryId = 1;
    }
    this.productService.getProductList(this.currentCategoryId).subscribe(
      data => {
        this.products = data;
      }
    );

  }
}

