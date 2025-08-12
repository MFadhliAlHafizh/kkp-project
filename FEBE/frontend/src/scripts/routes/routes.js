import HomePage from "../pages/home/home-page";
import Scanner from "../pages/scanner/scanner-page";
import ArticlePage from "../pages/article/article-page";
import CartPage from "../pages/cart/cart-page";

export const routes = {
  '/': () => new HomePage(),
  '/scanner': () => new Scanner(),
  '/article': () => new ArticlePage(),
  '/cart': () => new CartPage(),
};
