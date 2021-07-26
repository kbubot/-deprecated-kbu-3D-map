import { World } from './World/World';
import './style.css'

const container = document.querySelector('#scene-container');
const canvas = document.querySelector('canvas.webgl');
const world = new World(container, canvas);

window.addEventListener('load', _ => {
  world.load_material();
})

function main() {
  world.render();
  window.requestAnimationFrame(main);
}

main();