import { Sprite } from 'pixi.js';
import Scene from './Scene';
import gsap from 'gsap';
import Footer from '../components/Footer';
import MagicHat from '../components/MagicHat';
import { center } from "../core/utils";

export default class Play extends Scene {
  async onCreated() {

    const footer = new Footer();
    footer.x = - window.innerWidth / 2;
    footer.y = window.innerHeight / 2 - footer.height;
    this.addChild(footer);

    // Create a MagicHat object and position it
    const hat = new MagicHat();
    hat.x = 0;
    hat.y = 400;
    hat.interactive = true;
    hat.buttonMode = true;
    hat.addListener('click', () => hat.clicked());
    this.addChild(hat);

  }

  /**
   * Hook called by the application when the browser window is resized.
   * Use this to re-arrange the game elements according to the window size
   *
   * @param  {Number} width  Window width
   * @param  {Number} height Window height
   */
  onResize(width, height) { // eslint-disable-line no-unused-vars

  }
}
