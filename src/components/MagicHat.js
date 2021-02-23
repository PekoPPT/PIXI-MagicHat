import { Container, Sprite, Text } from 'pixi.js';
import { gsap, Elastic } from 'gsap';
import PixiPlugin from 'gsap/PixiPlugin';
gsap.registerPlugin(PixiPlugin);

import Assets from '../core/AssetManager';

export default class MagicHat extends Container {
  constructor() {
    super();
    this.name = 'magic-hat';
    this.init();
  }

  /**
   * Initizialize the elements in the MagicHat object
   *
   * @memberof MagicHat
   */
  async init() {
    // Initializaton of the hat and mask assets
    const images = {
      hat: Assets.images.hat,
      mask: Assets.images['hat-mask']
    };

    await Assets.load({ images });
    await Assets.prepareImages(images).then(() => {
      // Initialization of the Hat sprite
      this._body = Sprite.from('hat');
      this._body.anchor.set(0.5, 1);
      this.addChild(this._body);

      // Initialization of the Mask sprite
      const mask = Sprite.from('mask');
      mask.anchor.set(0.5);
      mask.y = -495;
      this.addChild(mask);

      // Initialization of the Text field that will show the emojies
      this._item = new Text('aaa', { fontFamily: 'Arial', fontSize: 180, fill: 0xff1010, align: 'center' });
      this._item.x = -125;
      this._item.y = -300;
      this._item.mask = mask;
      this.addChild(this._item);
    });
  }

  /**
   * Handles the click on the Hat Sprite 
   *
   * @memberof MagicHat
   */
  clicked() {
    // Resets the position of the Text item
    gsap.to(this._item, {
      y: 0, duration: 0.001
    });

    // Resets the scales the hat on X
    gsap.to(this._body, { pixi: { scaleY: 0.8, transformOrigin: 'top center' }, duration: 0.1, repeat: 1, yoyo: true });

    // Conversts decimal number to Emoji
    this._item.text = String.fromCodePoint(this.getRandomInt(127789, 128567));

    // Animates the pop of the emoji from the hat
    gsap.to(this._item, {
      y: -600, ease: Elastic.easeOut.config(0.5, 0.3), duration: 1.5
    });
  }

  /**
   * Generates random number in a range of passed numbers
   *
   * @param {Number} min 
   * @param {Number} max
   * @return {Number} 
   * @memberof MagicHat
   */
  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }
}