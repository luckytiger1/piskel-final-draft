/* eslint-disable no-underscore-dangle */
/*
 * Класс заливалки канвы для разных браузеров (заливка вручную)
 */
export default class CanvasFloodFiller {
  constructor() {
    // Ширина и высота канвы
    this._cWidth = -1;
    this._cHeight = -1;
    // Заменяемый цвет
    this._rR = 0;
    this._rG = 0;
    this._rB = 0;
    this._rA = 0;
    // Цвет закраски
    this._nR = 0;
    this._nG = 0;
    this._nB = 0;
    this._nA = 0;
    this._data = null;
  }

  /*
   * Получить точку из данных
   * */
  getDot(x, y) {
    // Точка: y * ширину_канвы * 4 + (x * 4)
    const dstart = y * this._cWidth * 4 + x * 4;
    const dr = this._data[dstart];
    const dg = this._data[dstart + 1];
    const db = this._data[dstart + 2];
    const da = this._data[dstart + 3];
    return { r: dr, g: dg, b: db, a: da };
  }

  /*
   * Пиксель по координатам x,y - готовый к заливке?
   * */
  isNeededPixel(x, y) {
    const dstart = y * this._cWidth * 4 + x * 4;
    const dr = this._data[dstart];
    const dg = this._data[dstart + 1];
    const db = this._data[dstart + 2];
    const da = this._data[dstart + 3];
    return (
      dr === this._rR && dg === this._rG && db === this._rB && da === this._rA
    );
  }

  /*
   * Найти левый пиксель, по пути закрашивая все попавшиеся
   * */

  findLeftPixel(x, y) {
    // Крутим пикселы влево, заодно красим. Возвращаем левую границу.
    // Во избежание дубляжа и ошибок, findLeftPixel НЕ красит текущий
    // пиксел! Это сделает обязательный поиск вправо.
    let lx = x - 1;
    let dCoord = y * this._cWidth * 4 + lx * 4;
    while (
      lx >= 0 &&
      this._data[dCoord] === this._rR &&
      this._data[dCoord + 1] === this._rG &&
      this._data[dCoord + 2] === this._rB &&
      this._data[dCoord + 3] === this._rA
    ) {
      this._data[dCoord] = this._nR;
      this._data[dCoord + 1] = this._nG;
      this._data[dCoord + 2] = this._nB;
      this._data[dCoord + 3] = this._nA;
      lx -= 1;
      dCoord -= 4;
    }
    return lx + 1;
  }

  /*
   * Найти правый пиксель, по пути закрашивая все попавшиеся
   * */

  findRightPixel(x, y) {
    let rx = x;
    let dCoord = y * this._cWidth * 4 + x * 4;
    while (
      rx < this._cWidth &&
      this._data[dCoord] === this._rR &&
      this._data[dCoord + 1] === this._rG &&
      this._data[dCoord + 2] === this._rB &&
      this._data[dCoord + 3] === this._rA
    ) {
      this._data[dCoord] = this._nR;
      this._data[dCoord + 1] = this._nG;
      this._data[dCoord + 2] = this._nB;
      this._data[dCoord + 3] = this._nA;
      rx += 1;
      dCoord += 4;
    }
    return rx - 1;
  }

  /*
   * Эффективная (строчная) заливка
   * */
  effectiveFill(cx, cy) {
    const lineQueue = [];
    const fx1 = this.findLeftPixel(cx, cy);
    const fx2 = this.findRightPixel(cx, cy);
    lineQueue.push({ x1: fx1, x2: fx2, y: cy });
    while (lineQueue.length > 0) {
      const cLine = lineQueue.shift();
      let nx1 = cLine.x1;
      let nx2 = cLine.x1;
      let currx = nx2;
      // Сперва для первого пиксела, если верхний над ним цвет подходит,
      // пускаем поиск левой границы.
      // Можно искать вверх?
      if (cLine.y > 0) {
        // Сверху строка может идти левее текущей?
        if (this.isNeededPixel(cLine.x1, cLine.y - 1)) {
          // Ищем в том числе влево
          nx1 = this.findLeftPixel(cLine.x1, cLine.y - 1);
          nx2 = this.findRightPixel(cLine.x1, cLine.y - 1);
          lineQueue.push({ x1: nx1, x2: nx2, y: cLine.y - 1 });
        }
        currx = nx2;
        // Добираем недостающее, ищем только вправо, но пока не
        // доползли так или иначе далее края текущей строки
        while (
          cLine.x2 >= nx2 &&
          currx <= cLine.x2 &&
          currx < this._cWidth - 1
        ) {
          currx += 1;
          if (this.isNeededPixel(currx, cLine.y - 1)) {
            // Сохраняем найденный отрезок
            nx1 = currx;
            nx2 = this.findRightPixel(currx, cLine.y - 1);
            lineQueue.push({ x1: nx1, x2: nx2, y: cLine.y - 1 });
            // Прыгаем далее найденного
            currx = nx2;
          }
        }
      }
      nx1 = cLine.x1;
      nx2 = cLine.x1;
      // Те же яйца, но можно ли искать вниз?
      if (cLine.y < this._cHeight - 1) {
        // Снизу строка может идти левее текущей?
        if (this.isNeededPixel(cLine.x1, cLine.y + 1)) {
          // Ищем в том числе влево
          nx1 = this.findLeftPixel(cLine.x1, cLine.y + 1);
          nx2 = this.findRightPixel(cLine.x1, cLine.y + 1);
          lineQueue.push({ x1: nx1, x2: nx2, y: cLine.y + 1 });
        }
        currx = nx2;
        // Добираем недостающее, ищем только вправо, но пока не
        // доползли так или иначе далее края текущей строки
        while (
          cLine.x2 >= nx2 &&
          currx <= cLine.x2 &&
          currx < this._cWidth - 1
        ) {
          currx += 1;
          if (this.isNeededPixel(currx, cLine.y + 1)) {
            // Сохраняем найденный отрезок
            nx1 = currx;
            nx2 = this.findRightPixel(currx, cLine.y + 1);
            lineQueue.push({ x1: nx1, x2: nx2, y: cLine.y + 1 });
            // Прыгаем далее найденного
            currx = nx2;
          }
        }
      }
    } // while (main loop)
  }
  /*
   * void floodFill(CanvasContext2D canvasContext, int x, int y)
   * Выполняет заливку на канве
   * canvasContext - контекст
   * int x, y - координаты точки заливки
   * color - цвет заливки
   */

  floodFill(canvasContext, x, y, color) {
    const canvas = document.querySelector('#canvas');

    this._cWidth = canvas.width;
    this._cHeight = canvas.height;
    this._nR = color.r;
    this._nG = color.g;
    this._nB = color.b;
    this._nA = color.a;
    const idata = canvasContext.getImageData(0, 0, this._cWidth, this._cHeight);
    const pixels = idata.data;
    this._data = pixels;
    const toReplace = this.getDot(x, y);
    this._rR = toReplace.r;
    this._rG = toReplace.g;
    this._rB = toReplace.b;
    this._rA = toReplace.a;
    // Всё зависнет к известной матери если цвета совпадают
    if (
      this._rR === this._nR &&
      this._rG === this._nG &&
      this._rB === this._nB &&
      this._rA === this._nA
    )
      return;
    this.effectiveFill(x, y);
    canvasContext.putImageData(idata, 0, 0);
  }
}
