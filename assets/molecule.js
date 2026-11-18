const model = document.querySelector("#molecule");
const toggle = document.querySelector("#spin");
const atoms = Array.from(model.querySelectorAll("circle"), element => ({
  element, point: element.dataset.xyz.split(" ").map(Number)
}));
const bonds = Array.from(model.querySelectorAll("line"), element => ({
  element, pair: element.dataset.bond.split(" ").map(Number)
}));
const motion = matchMedia("(prefers-reduced-motion: reduce)");
let rotating = !motion.matches;
let visible = true;
let angle = 0;
let frame = 0;
let previous = 0;

function draw(time) {
  angle += previous ? Math.min(time - previous, 80) * 0.00019 : 0;
  previous = time;
  const points = atoms.map(({point: [x,y,z]}) => [
    210 + 25 * (x * Math.cos(angle) + z * Math.sin(angle)), 150 - 25*y
  ]);
  atoms.forEach(({element}, i) => {
    element.setAttribute("cx", points[i][0]);
    element.setAttribute("cy", points[i][1]);
  });
  bonds.forEach(({element, pair}) => {
    pair.forEach((atom, j) => {
      element.setAttribute("x" + (j+1), points[atom][0]);
      element.setAttribute("y" + (j+1), points[atom][1]);
    });
  });
  frame = requestAnimationFrame(draw);
}
function refresh() {
  cancelAnimationFrame(frame);
  previous = 0;
  toggle.textContent = rotating ? "Pause rotation" : "Rotate model";
  if (rotating && visible && !document.hidden) frame = requestAnimationFrame(draw);
}
toggle.hidden = false;
toggle.addEventListener("click", () => { rotating = !rotating; refresh(); });
motion.addEventListener("change", () => { rotating = !motion.matches; refresh(); });
new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; refresh(); }).observe(model);
document.addEventListener("visibilitychange", refresh);
refresh();
