import HomePage from "../pages/home/home-page";
import ShopPage from "../pages/shop/shop-page";
import Scanner from "../pages/scanner/scanner-page";

export const routes = {
  '/': () => new HomePage(),
  '/shop': () => new ShopPage(),
  '/scanner': () => new Scanner(),
};
