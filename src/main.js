import { World } from './World/World';
import { onMouseMove } from './World/tooltip';
import './style.css'


function main() {
  const world = new World();
  const { controls } = world.getSystems();
  let renderRequested = false;

  function render() {
    renderRequested = false;
    if (world.checkResize())
      world.resize();
    controls.update();
    world.render();
  }

  function requestRenderIfNotRequested() {
    if (!renderRequested) {
      renderRequested = true;
      requestAnimationFrame(render);
    }
  }

  controls.addEventListener('change', requestRenderIfNotRequested);

  window.addEventListener('resize', requestRenderIfNotRequested);

  window.addEventListener('load', _ => world.load_map_material())

  window.addEventListener('mousemove', onMouseMove, false);
}
main();