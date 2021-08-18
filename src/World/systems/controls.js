import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

function createControls(camera, canvas) {
  const controls = new OrbitControls(camera, canvas);
  // controls.enableDamping = true;
  controls.target.set(0, 5, 0);
  controls.update();
  return controls;
}

export { createControls };