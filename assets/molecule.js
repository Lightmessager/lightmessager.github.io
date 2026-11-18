import * as THREE from "./vendor/three.module.js";

const canvas = document.querySelector("#molecule");
const button = document.querySelector("#spin");
const { atoms, bonds } = JSON.parse(document.querySelector("#coordinates").textContent);

function mount() {
  const renderer = new THREE.WebGLRenderer({canvas, alpha:true, antialias:true});
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-8,8,7,-7,0.1,100);
  camera.position.z = 25;
  const group = new THREE.Group();
  scene.add(group);
  const palette = { C:0x948cba, H:0xe5e4f3, O:0xeb746f, P:0xe9ab67, Ni:0x5ac9b3 };
  const radius = { C:0.44, H:0.26, O:0.49, P:0.65, Ni:0.79 };
  const materials = Object.fromEntries(Object.entries(palette).map(([symbol,color]) =>
    [symbol,new THREE.MeshPhongMaterial({color,shininess:78,specular:0xaaaaaa})]));
  const sphere = new THREE.SphereGeometry(1,26,20);
  const rod = new THREE.CylinderGeometry(0.115,0.115,1,14);
  const up = new THREE.Vector3(0,1,0);
  const label = document.querySelector(".atom-label");
  const labelButton = document.querySelector("#label-ni");
  const nickel = atoms.findIndex(([symbol]) => symbol === "Ni");
  const projected = new THREE.Vector3();
  const positions = atoms.map(([symbol,x,y,z]) => {
    const ball = new THREE.Mesh(sphere,materials[symbol]);
    ball.scale.setScalar(radius[symbol]);
    ball.position.set(x,y,z);
    group.add(ball);
    return ball.position;
  });
  for (const [i,j] of bonds) {
    const half = positions[i].clone().lerp(positions[j],0.5);
    for (const index of [i,j]) {
      const vector = half.clone().sub(positions[index]);
      const stick = new THREE.Mesh(rod, materials[atoms[index][0]]);
      stick.position.copy(positions[index]).lerp(half,0.5);
      stick.scale.y = vector.length();
      stick.quaternion.setFromUnitVectors(up,vector.normalize());
      group.add(stick);
    }
  }
  scene.add(new THREE.HemisphereLight(0xffffff,0x56406e,1.8));
  for (const [x,y,z,color,power] of [[-4,7,8,0xfff6e9,2.3],[4,2,-5,0xa2e6ff,2.6]]) {
    const lamp = new THREE.DirectionalLight(color,power);
    lamp.position.set(x,y,z);
    scene.add(lamp);
  }
  group.rotation.set(-0.32,-0.8,-0.30);
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  let rotating = !reduced.matches, onscreen = true, frame = 0, last = 0;
  function render(time) {
    if (last) group.rotation.y += Math.min(time-last,70)*0.00016;
    renderer.render(scene,camera);
    if (!label.hidden) {
      projected.copy(positions[nickel]).applyMatrix4(group.matrixWorld).project(camera);
      label.style.left = ((1 + projected.x) * 50) + "%";
      label.style.top = ((1 - projected.y) * 50) + "%";
    }
    last=time;
    if (rotating && onscreen && !document.hidden) frame=requestAnimationFrame(render);
  }
  function refresh() {
    cancelAnimationFrame(frame);
    last=0;
    button.textContent=rotating ? "Pause" : "Rotate";
    render(performance.now());
  }
  function resize() {
    const {width,height} = canvas.getBoundingClientRect();
    if (!width || !height) return;
    const ratio=width/height;
    camera.top=Math.max(6.8,7.6/ratio); camera.bottom=-camera.top;
    camera.right=camera.top*ratio; camera.left=-camera.right;
    camera.updateProjectionMatrix();
    renderer.setPixelRatio(Math.min(devicePixelRatio,2));
    renderer.setSize(width,height,false);
    refresh();
  }
  new ResizeObserver(resize).observe(canvas);
  new IntersectionObserver(([e])=>{onscreen=e.isIntersecting; refresh();}).observe(canvas);
  document.addEventListener("visibilitychange",refresh);
  reduced.addEventListener("change",()=>{rotating=!reduced.matches; refresh();});
  button.addEventListener("click",()=>{rotating=!rotating;refresh();});
  resize();
  button.hidden=false;
  labelButton.hidden=false;
  labelButton.addEventListener("click",()=>{
    label.hidden=!label.hidden;
    labelButton.setAttribute("aria-pressed",String(!label.hidden));
    refresh();
  });
  let drag=null;
  canvas.addEventListener("pointerdown",event=>{
    if (event.button !== 0 || drag) return;
    drag={id:event.pointerId,x:event.clientX,y:event.clientY};
    canvas.setPointerCapture(event.pointerId);
  });
  canvas.addEventListener("pointermove",event=>{
    if (drag?.id !== event.pointerId) return;
    rotating=false;
    group.rotation.y+=(event.clientX-drag.x)*0.012;
    group.rotation.x+=(event.clientY-drag.y)*0.012;
    drag.x=event.clientX;
    drag.y=event.clientY;
    refresh();
  });
  canvas.addEventListener("lostpointercapture",()=>{drag=null;});
  canvas.parentElement.classList.add("ready");
  canvas.addEventListener("webglcontextlost",()=>{cancelAnimationFrame(frame);canvas.parentElement.classList.remove("ready");button.hidden=true;labelButton.hidden=true;label.hidden=true;});
}
try { mount(); } catch { /* The pre-rendered molecular figure remains visible. */ }
