import { World } from './World/World';
import { onMouseMove } from './World/tooltip';
import './style.css'

const container = document.querySelector('#scene-container');
const canvas = document.querySelector('canvas.webgl');
const world = new World(container, canvas);

window.addEventListener('load', _ => {
  world.load_material();
})

window.addEventListener('mousemove', onMouseMove, false);

function animate() {
  window.requestAnimationFrame(animate);
  world.render();
}

animate();