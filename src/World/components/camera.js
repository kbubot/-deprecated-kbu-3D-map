import { PerspectiveCamera } from "three";
import { sizes } from "../utils";

function createCamera() {
  const camera = new PerspectiveCamera(
    45, // Field of View
    sizes.width / sizes.height, // aspect ratio
    0.1, // near clipping plane
    100 // far clipping plane
  )
  camera.position.set(0, 10, 20);
  return camera;
}

export { createCamera };