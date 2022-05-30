const fs = require("fs");

class Style {
  constructor() {
    this.attributes = {};
  }
  addAttribute(attribute, value) {
    this.attributes[attribute] = value;
  }
  toHtml() {
    return Object.entries(this.attributes).map(([key, val]) => {
      return `${key}:${val}`;
    }).join(';');
  }
};

class Line {
  constructor(length) {
    this.length = length;
    this.deg = 0;
  }

  toHtml() {
    const style = new Style();
    style.addAttribute('width', '5px');
    style.addAttribute('height', `${this.length}px`);
    style.addAttribute('background-color', 'white');
    style.addAttribute('border', '1px solid white');
    style.addAttribute('transform', `rotate(${this.deg}deg)`);
    style.addAttribute('transform-origin', 'bottom');
    style.addAttribute('margin', '0 auto');
    style.addAttribute('position', 'absolute');
    style.addAttribute('left', '200');
    style.addAttribute('top', '50');
    this.deg += 5;
    return `<div style="${style.toHtml()}"/>`
  }
};

class Clock {
  constructor(radius) {
    this.radius = radius;
  }

  toHtml(element) {
    const style = new Style();
    const diameter = 2 * this.radius;

    style.addAttribute('width', `${diameter}px`);
    style.addAttribute('height', `${diameter}px`);
    style.addAttribute('border', '2px solid black');
    style.addAttribute('border-radius', '50%');
    style.addAttribute('margin', '0 auto');
    style.addAttribute('position', 'relative');
    style.addAttribute('background-color', 'black');

    const refresh = '<meta http-equiv="refresh" content="1">';
    return `${refresh}<div style="${style.toHtml()}">${element}</div>`;
  }
};


const clock = new Clock(200);
const line = new Line(150);

setInterval(() => {
  const tick = line.toHtml();
  fs.writeFileSync('clock.html', clock.toHtml(tick), 'utf8');
}, 1000);
