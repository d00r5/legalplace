import { clamp } from './utils';

export class Drug {
  constructor(name, expiresIn, benefit) {
    if (new.target === Drug) {
      switch (name) {
        case 'Magic Pill':
          return new MagicPill(name, expiresIn, benefit);
        case 'Herbal Tea':
          return new HerbalTea(name, expiresIn, benefit);
        case 'Fervex':
          return new Fervex(name, expiresIn, benefit);
        case 'Dafalgan':
          return new Dafalgan(name, expiresIn, benefit);
        default:
          break;
      }
    }
    this.name = name;
    this.expiresIn = expiresIn;
    this.benefit = clamp(benefit, 0, 50);
  }

  update() {
    this.expiresIn--;
    this.benefit--;
    if (this.expiresIn < 0) this.benefit--;
    this.benefit = clamp(this.benefit, 0, 50);
  }
}

export class MagicPill extends Drug {
  update() {}
}

export class HerbalTea extends Drug {
  update() {
    this.expiresIn--;
    this.benefit++;
    if (this.expiresIn < 0) this.benefit++;
    this.benefit = clamp(this.benefit, 0, 50);
  }
}

export class Fervex extends Drug {
  update() {
    this.expiresIn--;
    this.benefit++;
    if (this.expiresIn < 10) this.benefit++;
    if (this.expiresIn < 5) this.benefit++;
    if (this.expiresIn < 0) this.benefit = 0;
    this.benefit = clamp(this.benefit, 0, 50);
  }
}

export class Dafalgan extends Drug {
  update() {
    this.expiresIn--;
    this.benefit -= 2;
    if (this.expiresIn < 0) this.benefit -= 4;
    this.benefit = clamp(this.benefit, 0, 50);
  }
}

export class Pharmacy {
  constructor(drugs = []) {
    this.drugs = drugs;
  }

  updateBenefitValue() {
    for (const drug of this.drugs) {
      drug.update();
    }
    return this.drugs;
  }
}
