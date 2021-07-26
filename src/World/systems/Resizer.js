import { sizes } from "../utils";

class Resizer {
  constructor(container, camera, renderer) {
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    renderer.setSize(sizes.width, sizes.height)
    renderer.shadowMap.enabled = true;
    renderer.setPixelRatio(window.devicePixelRatio)
  }
}

export { Resizer };