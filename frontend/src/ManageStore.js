import { makeAutoObservable, runInAction } from "mobx";
import axios from "axios";
import { toJS } from "mobx";

class ManageStore {
  products = [];
  purchases = [];
  customers = [];

  curProduct = {};
  curEditProduct = {};

  curCustomer = {};
  curEditCustomer = {};

  customersByProd = [];
  productsByCustomer = [];

  access_token = "";
  roleUser = "";

  constructor() {
    makeAutoObservable(this);
  }

  loadProducts(data) {
    this.products = data;
  }

  loadPurchases(data) {
    this.purchases = data;
  }

  loadCustomers(data) {
    this.customers = data;
  }

  loadCustomersByProd(data) {
    this.customersByProd = data;
  }

  loadProductsByCustomer(data) {
    this.productsByCustomer = data;
  }

  loadCurProduct(product) {
    this.curProduct = product;
  }

  loadcurCustomer(customer) {
    this.curCustomer = customer;
  }

  loadCurEditProduct(product) {
    this.curEditProduct = product;
  }

  loadCurEditCustomer(customer) {
    this.curEditCustomer = customer;
  }

  setRoleOfeUser(role) {
    this.roleUser = role;
  }

  get productsLen() {
    return this.products.length;
  }

  get purchasesLen() {
    return this.purchases.length;
  }

  async addPurchase(customerId, productId) {
    try {
      const response = await axios.post(`http://localhost:3000/purchases`, {
        customer_id: customerId,
        product_id: productId,
      });

      this.purchases.push(response.data);

      const product = this.products.find((prod) => prod.id === productId);
      product.quantity -= 1;
      this.updateProduct(product);

      // const purchase = response.data;
      // const purchases = [...this.purchases, purchase];
      // runInAction(() => {
      //   this.purchases = purchases;
      //   const product = this.products.find((prod) => prod.id === productId);
      //   product.quantity -= 1;
      //   this.updateProduct(product);
      // });
    } catch (error) {
      console.log(error);
    }
  }

  async updateProduct(product) {
    const res = await axios.put(
      `http://localhost:3000/products/${product.id}`,
      product
    );
    const index = this.products.findIndex((prod) => prod.id === product.id);
    if (index > -1) {
      this.products[index] = product;
    }
  }

  async updateCustomer(customer) {
    const res = await axios.put(
      `http://localhost:3000/customers/${customer.id}`,
      customer
    );
    const index = this.customers.findIndex((cust) => cust.id === customer.id);
    if (index > -1) {
      this.customers[index] = customer;
    }
  }

  async deleteProduct(product) {
    const resProd = await axios.delete(
      `http://localhost:3000/products/${product.id}`
    ); //delete product from Products Table
    const resPurchases = await axios.delete(
      `http://localhost:3000/purchases/productid/${product.id}`
    ); //delete all purchases of the same product

    //delete product from 'products' in store
    const index = this.products.findIndex((prod) => prod.id === product.id);
    if (index > -1) {
      this.products.splice(index, 1);
    }
    //delete all purchases of the same product from 'purchases' in store
    const purchases = this.purchases.filter(
      (pur) => pur.product_id !== product.id
    );
    this.loadPurchases(purchases);
  }

  async deleteCustomer(customer) {
    const res = await axios.delete(
      `http://localhost:3000/customers/${customer.id}`
    ); //delete customer from Customers Table
    const resPurchases = await axios.delete(
      `http://localhost:3000/purchases/customerid/${customer.id}`
    ); //delete all purchases of the same customer

    //delete customer from 'cstomers' in store
    const index = this.customers.findIndex((cust) => cust.id === customer.id);
    if (index > -1) {
      this.customers.splice(index, 1);
    }

    //delete all purchases of the same customer from 'purchases' in store
    const purchases = this.purchases.filter(
      (pur) => pur.customer_id !== customer.id
    );
    this.loadPurchases(purchases);
  }

  async setAccessToken(accessToken) {
    this.access_token = toJS(accessToken);
    axios.defaults.headers.common["x-access-token"] = toJS(
      this.access_token.accessToken
    );

    const res = await axios.get(`http://localhost:3000/products`);
    this.loadProducts(await res.data);

    const resPurchases = await axios.get(`http://localhost:3000/purchases`);
    this.loadPurchases(await resPurchases.data);

    const resCustomers = await axios.get(`http://localhost:3000/customers`);
    this.loadCustomers(await resCustomers.data);
  }
}

export default ManageStore;
