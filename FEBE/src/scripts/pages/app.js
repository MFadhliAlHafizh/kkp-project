import { getActiveRoute } from "../routes/url-parser";
import { routes } from "../routes/routes";
import { transitionHelper } from "../utils";

export default class App {
  #content;
  #drawerButton;
  #drawerNavigation;

  constructor({ content, drawerNavigation, drawerButton }) {
    this.#content = content;
    this.#drawerButton = drawerButton;
    this.#drawerNavigation = drawerNavigation;

    this.#setupDrawer();
  }

  #setupDrawer() {
    this.#drawerButton.addEventListener("click", () => {
      this.#drawerNavigation.classList.toggle("open");
    });

    document.body.addEventListener("click", (event) => {
      const isTargetInsideDrawer = this.#drawerNavigation.contains(
        event.target
      );
      const isTargetInsideButton = this.#drawerButton.contains(event.target);

      if (!(isTargetInsideDrawer || isTargetInsideButton)) {
        this.#drawerNavigation.classList.remove("open");
      }

      this.#drawerNavigation.querySelectorAll("a").forEach((link) => {
        if (link.contains(event.target)) {
          this.#drawerNavigation.classList.remove("open");
        }
      });
    });
  }

  async renderPage() {
    const url = getActiveRoute();
    const route = routes[url];

    // Get page instance
    const page = route();

    const transition = transitionHelper({
      updateDOM: async () => {
        try {
          this.#content.innerHTML = await page.render();
          await page.afterRender();
        } catch (error) {
          console.error("Error while rendering page:", error);
        }
      },
    });
  }
}
