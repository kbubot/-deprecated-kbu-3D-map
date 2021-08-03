import { WebGLRenderer } from "three";
import { sizes } from "../utils";

function createRenderer(canvas) {
  const renderer = new WebGLRenderer({
    canvas: canvas,
    antialias: true
  });
  renderer.physicallyCorrectLights = true;
  renderer.setSize(sizes.width, sizes.height)
  renderer.shadowMap.enabled = true;
  renderer.setPixelRatio(window.devicePixelRatio)
  return renderer;
}

export { createRenderer };