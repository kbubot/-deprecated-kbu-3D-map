import { Vector3, MathUtils } from 'three';

let sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

function frameArea(sizeToFitOnScreen, boxSize, boxCenter, camera) {
  const halfSizeToFitOnScreen = sizeToFitOnScreen * 0.5;
  const halfFovY = MathUtils.degToRad(camera.fov * .5);
  const distance = halfSizeToFitOnScreen / Math.tan(halfFovY);
  const direction = (new Vector3()).subVectors(camera.position, boxCenter).normalize();

  camera.position.copy(direction.multiplyScalar(distance).add(boxCenter));
  camera.near = boxSize / 100;
  camera.far = boxSize * 100;
  camera.updateProjectionMatrix();
  camera.lookAt(boxCenter.x, boxCenter.y, boxCenter.z);
}

export { sizes, frameArea };