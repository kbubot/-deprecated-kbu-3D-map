import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';

function createBuilding(scene, tooltipEnabledObjects) {
  const objLoader = new OBJLoader();
  const mtlLoader = new MTLLoader();

  mtlLoader.load('galmel.mtl', mtl => {
    mtl.preload();
    objLoader.setMaterials(mtl);
    objLoader.load('galmel.obj', root => {
      root.userData.tooltipText = '갈멜관';
      scene.add(root);
      tooltipEnabledObjects.push(root);
      console.log(tooltipEnabledObjects);
    })
  })
}

export { createBuilding };