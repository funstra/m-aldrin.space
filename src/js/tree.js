import { vector } from "./lib/vector.js";
import { circle, rect, line, svg_element } from "./lib/svg.js";
import { random } from "./lib/stochastic.js";

export const init = () => {
  const SVG = document.querySelector("svg");

  const lineGroup = svg_element("g");
  SVG.appendChild(lineGroup);
  lineGroup.setAttribute("stroke", "black");
  lineGroup.setAttribute("stroke-width", "2.5");
  lineGroup.setAttribute("opacity", 0.75);
  // lineGroup.setAttribute('opacity', 0.1)

  const circleGroup = svg_element("g");
  SVG.appendChild(circleGroup);

  const rectGroup = svg_element("g");
  SVG.appendChild(rectGroup);

  const tree = (o, step, n) => {
    // const coords = {
    //     [o.x.toString()]: {
    //         [o.y.toString()]: o
    //     }
    // }
    const coords = new Map();
    coords.set(o, o);
    const inner = (vec0, col, depth = 0) => {
      const node0 = random(0, 1) > 0.05 + Math.pow(0.15 + (depth / n) * 0.6, 2);
      const node1 = random(0, 1) > 0.05 + Math.pow(0.15 + (depth / n) * 0.6, 2);
      if (node0) {
        const vec1 = vec0.add(step).rotate(-0.25, vec0);
        // console.log(coords[vec1.x?.toString()]?.[vec1.y?.toString()])
        // console.log(coords.get(`${vec1.x} ${vec1.y}`))
        if (!coords.get(`${vec1.x} ${vec1.y}`) || random(0, 1) > 0.45) {
          // console.log(coords.get(vec1))
          // console.log(col)
          // console.log('left')
          // console.log(vec1)
          // console.log(coords[vec1.x?.toString()]?.[vec1.y?.toString()])
          const l = line(vec0, vec1);
          l.setAttribute("data-depth", depth);
          // l.setAttribute('opacity', 0.5)
          lineGroup.appendChild(l);
          // coords.set(vec1, vec1)
          coords.set(`${vec1.x} ${vec1.y}`, vec1);
          if (depth < n) {
            l.setAttribute("stroke", col ?? "orange");
            inner(vec1, col ?? "orange", depth + 1);
          } else {
            const _vec1 = vector.lerp(vec0, vec1, random(2, 5, true));
            l.setAttribute("stroke", "#9b2");
            l.setAttribute("x2", _vec1.x);
            l.setAttribute("y2", _vec1.y);
            const rectangle = rect(_vec1, vector(8, 8), -0.25);
            rectGroup.appendChild(rectangle);
          }
        } else if (random(0, 1) > 0.45) {
          const l = line(vec0, vec1);
          l.setAttribute("data-depth", depth);
          l.setAttribute("stroke", "black");
          l.setAttribute("stroke-width", 4);
          l.setAttribute("opacity", 0.5);
          l.setAttribute("stroke-dasharray", 2);
          l.setAttribute("stroke-dashoffset", 1);
          lineGroup.appendChild(l);
        } else {
          // console.log('hello?')
          const _vec1 = vector.lerp(vec0, vec1, 0.5);
          const l = line(vec0, _vec1);
          l.setAttribute("stroke", "red");
          lineGroup.appendChild(l);
          const c = circle(vec0, 4);
          c.setAttribute("fill", "var(--bg)");
          circleGroup.appendChild(c);
        }
      }
      if (node1) {
        const vec1 = vec0.add(step).rotate(0.25, vec0);
        // console.log(coords[vec1.x?.toString()]?.[vec1.y?.toString()])
        // console.log(coords.get(`${vec1.x} ${vec1.y}`))
        if (!coords.get(`${vec1.x} ${vec1.y}`)) {
          // console.log(coords.get(vec1))
          // console.log(col)
          // console.log('right')
          // console.log(vec1)
          // console.log(coords[vec1.x?.toString()]?.[vec1.y?.toString()])
          const l = line(vec0, vec1);
          l.setAttribute("data-depth", depth);
          lineGroup.appendChild(l);
          coords.set(`${vec1.x} ${vec1.y}`, vec1);
          if (depth < n) {
            l.setAttribute("stroke", col ?? "#69f");
            inner(vec1, col ?? "#69f", depth + 1);
          } else {
            const _vec1 = vector.lerp(vec0, vec1, random(2, 5, true));
            l.setAttribute("stroke", "#9b2");
            l.setAttribute("x2", _vec1.x);
            l.setAttribute("y2", _vec1.y);
            const rectangle = rect(_vec1, vector(8, 8), -0.25);
            rectGroup.appendChild(rectangle);
          }
        } else if (random(0, 1) > 0.45) {
          const l = line(vec0, vec1);
          l.setAttribute("data-depth", depth);
          l.setAttribute("stroke", "black");
          l.setAttribute("stroke-width", 8);
          l.setAttribute("opacity", 0.55);
          l.setAttribute("stroke-dasharray", 8);
          l.setAttribute("stroke-dashoffset", -4);
          lineGroup.appendChild(l);
        } else {
          // console.log('hello?')
          const _vec1 = vector.lerp(vec0, vec1, 0.5);
          const l = line(vec0, _vec1);
          l.setAttribute("stroke", "red");
          lineGroup.appendChild(l);
          const c = circle(vec0, 4);
          c.setAttribute("fill", "var(--bg)");
          circleGroup.appendChild(c);
        }
      }
    };
    inner(o);
    return coords;
  };

  const origin = vector(0, -448);
  const origin_c = circle(origin, 8);
  circleGroup.appendChild(origin_c);

  const t = tree(origin, vector(0, 64), 15);
  SVG.style.opacity = 1
};
