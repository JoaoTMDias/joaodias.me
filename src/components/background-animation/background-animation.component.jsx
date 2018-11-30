import React from 'react';
import styles from './styles.module.scss';

const BACKGROUND_ANIMATION_CLASS = 'body--backgroundIsAnimated';

class BackgroundAnimation extends React.PureComponent {
  componentDidMount() {
    document.body.classList.add(BACKGROUND_ANIMATION_CLASS);
    (() => {
      let ShapeController;

      const bind = (fn, me) =>
        function () {
          return fn.apply(me, arguments);
        };

      ShapeController = (() => {
        class ShapeController {
          constructor() {
            this.render = bind(this.render, this);
            this.draw = bind(this.draw, this);
          }

          init() {
            this.getElements();
            this.initShapes();
            return this.render();
          }

          getElements() {
            this.el = document.getElementsByTagName('canvas')[0];
            return (this.stage = this.el.getContext('2d'));
          }

          initShapes() {
            let i;
            i = 0;
            while (i < this.data.amount) {
              this.addShape();
              i++;
            }
            return true;
          }

          addShape(type, color, x, y, r, xvel, yvel, rvel) {
            let buffer;
            let colors;
            let dir;
            let types;
            let vel;
            buffer = this.data.scale * 250;
            types = Object.getOwnPropertyNames(this.data.shapes);
            if (type === void 0 || !types.includes(type)) {
              type = types[Math.floor(Math.random() * types.length)];
            }
            colors = this.data.colors;
            if (color === void 0 || !colors.includes(color)) {
              color = colors[Math.floor(Math.random() * colors.length)];
            }
            if (x === void 0) {
              x = -buffer + Math.random() * (window.innerWidth + 2 * buffer);
            }
            if (y === void 0) {
              y = -buffer + Math.random() * (window.innerHeight + 2 * buffer);
            }
            if (r === void 0) {
              r = Math.random() * 360;
            }
            if (xvel === void 0) {
              dir = 0;
              vel = this.data.minVel + Math.random() * (this.data.maxVel - this.data.minVel);
              if (Math.random() > 0.5) {
                dir = -1;
              } else {
                dir = 1;
              }
              xvel = dir * vel;
            }
            if (yvel === void 0) {
              dir = 0;
              vel = this.data.minVel + Math.random() * (this.data.maxVel - this.data.minVel);
              if (Math.random() > 0.5) {
                dir = -1;
              } else {
                dir = 1;
              }
              yvel = dir * vel;
            }
            if (rvel === void 0) {
              dir = 0;
              vel = this.data.minVel + Math.random() * (this.data.maxVel - this.data.minVel);
              if (Math.random() > 0.5) {
                dir = -1;
              } else {
                dir = 1;
              }
              rvel = dir * vel;
            }
            return this.shapes.push({
              type,
              color,
              mult: 0.5 + Math.random() * 2,
              pos: {
                x,
                y,
                r,
              },
              vel: {
                x: xvel,
                y: yvel,
                r: rvel,
              },
            });
          }

          repo(shape, rate) {
            let buffer;
            let color;
            let colors;
            let shuffle;
            let type;
            let types;
            buffer = this.data.scale * 250;
            shape.pos.x += (shape.vel.x + this.vel.scrollX * shape.mult) * (rate / (1000 / 60));
            shape.pos.y += (shape.vel.y + this.vel.scrollY * shape.mult) * (rate / (1000 / 60));
            shape.pos.r += shape.vel.r / 2 * (rate / (1000 / 60));
            shuffle = false;
            if (shape.pos.x > window.innerWidth + buffer) {
              shape.pos.x = -buffer;
              shuffle = true;
            }
            if (shape.pos.x < -buffer) {
              shape.pos.x = window.innerWidth + buffer;
              shuffle = true;
            }
            if (shape.pos.y > window.innerHeight + buffer) {
              shape.pos.y = -buffer;
              shuffle = true;
            }
            if (shape.pos.y < -buffer) {
              shape.pos.y = window.innerHeight + buffer;
              shuffle = true;
            }
            if (shape.pos.r > 360) {
              shape.pos.r -= 360;
            }
            if (shape.pos.r < 0) {
              shape.pos.r += 360;
            }
            if (shuffle === true && this.data.allowShuffle === true) {
              types = Object.getOwnPropertyNames(this.data.shapes);
              colors = this.data.colors;
              type = types[Math.floor(Math.random() * types.length)];
              color = colors[Math.floor(Math.random() * colors.length)];
              shape.type = type;
              return (shape.color = color);
            }
          }

          draw(shape) {
            let c;
            let i;
            let m;
            let p;
            let s;
            let x;
            let y;
            c = this.stage;
            s = shape;
            p = this.data.shapes[s.type];
            m = this.data.scale * 200;
            i = 0;
            c.save();
            c.fillStyle = s.color;
            c.translate(s.pos.x, s.pos.y);
            c.rotate(s.pos.r * (Math.PI / 180));
            c.beginPath();
            if (p.length > 1) {
              while (i < p.length) {
                x = (p[i].x - 0.5) * m;
                y = (p[i].y - 0.5) * m;
                if (i === 0) {
                  c.moveTo(x, y);
                } else {
                  c.lineTo(x, y);
                }
                i++;
              }
            } else {
              c.arc(0, 0, p[0] * m * 0.5, 0, 2 * Math.PI);
            }
            c.fill();
            return c.restore();
          }

          scale() {
            if (this.width !== window.innerWidth || this.height !== window.innerHeight) {
              this.width = window.innerWidth;
              this.height = window.innerHeight;
              this.el.width = document.body.clientWidth;
              this.el.height = document.body.clientHeight;
              return this.el.height;
            }
          }

          friction(rate) {
            if (Math.abs(this.vel.scrollX) > 0.01) {
              this.vel.scrollX = Math.round(this.vel.scrollX * 0.95 * 1000) / 1000;
            } else {
              this.vel.scrollX = 0;
            }
            if (Math.abs(this.vel.scrollY) > 0.01) {
              return (this.vel.scrollY = Math.round(this.vel.scrollY * 0.95 * 1000) / 1000);
            }
            return (this.vel.scrollY = 0);
          }

          render() {
            let elapsed;
            let i;
            i = 0;
            this.scale();
            elapsed = new Date().getTime();
            this.stage.clearRect(0, 0, this.width, this.height);
            this.friction(elapsed - this.frame);
            while (i < this.shapes.length) {
              this.repo(this.shapes[i], elapsed - this.frame);
              this.draw(this.shapes[i]);
              i++;
            }
            this.frame = elapsed;
            return requestAnimationFrame(this.render);
          }
        }

        ShapeController.prototype.shapes = [];
        ShapeController.prototype.frame = new Date().getTime();
        ShapeController.prototype.vel = {
          scrollX: 0,
          scrollY: 0,
        };
        ShapeController.prototype.data = {
          amount: 24,
          scale: 1.25,
          minVel: 0.2,
          maxVel: 1.0,
          allowShuffle: true,
          colors: [
            'rgba(33, 33, 255, 0.04)',
            'rgba(33, 33, 255, 0.03)',
            'rgba(33, 33, 255, 0.02)',
            'rgba(33, 33, 255, 0.01)',
          ],
          shapes: {
            rectangle: [
              {
                x: 0.33,
                y: -0.33,
              },
              {
                x: 0.66,
                y: -0.33,
              },
              {
                x: 0.66,
                y: 1.33,
              },
              {
                x: 0.33,
                y: 1.33,
              },
              {
                x: 0.33,
                y: -0.33,
              },
            ],
            triangle: [
              {
                x: 0.5,
                y: 0.07,
              },
              {
                x: 1.0,
                y: 0.93,
              },
              {
                x: 0.0,
                y: 0.93,
              },
              {
                x: 0.5,
                y: 0.07,
              },
            ],
            circle: [1],
            cross: [
              {
                x: 0.33,
                y: 0.0,
              },
              {
                x: 0.66,
                y: 0.0,
              },
              {
                x: 0.66,
                y: 0.33,
              },
              {
                x: 1.0,
                y: 0.33,
              },
              {
                x: 1.0,
                y: 0.66,
              },
              {
                x: 0.66,
                y: 0.66,
              },
              {
                x: 0.66,
                y: 1.0,
              },
              {
                x: 0.33,
                y: 1.0,
              },
              {
                x: 0.33,
                y: 0.66,
              },
              {
                x: 0.0,
                y: 0.66,
              },
              {
                x: 0.0,
                y: 0.33,
              },
              {
                x: 0.33,
                y: 0.33,
              },
              {
                x: 0.33,
                y: 0.0,
              },
            ],
          },
        };
        return ShapeController;
      })();
      window.App = new ShapeController();
      App.init();
    }).call(this);
  }

  componentWillUnmount() {
    document.body.classList.remove(BACKGROUND_ANIMATION_CLASS);
  }
  render() {
    return <canvas className={styles.BackgroundAnimation} aria-hidden="true" />;
  }
}

export default BackgroundAnimation;
