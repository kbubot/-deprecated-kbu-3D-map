import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';

function createBuilding(scene, tooltipEnabledObjects) {
  const objLoader = new OBJLoader();
  const mtlLoader = new MTLLoader();
  const buildingNames = ["갈멜관", "복음관", "모리아관"]


  buildingNames.map(buildingName => {
    mtlLoader.load(`${buildingName}.mtl`, mtl => {
      mtl.preload();
      objLoader.setMaterials(mtl);
      objLoader.load(`${buildingName}.obj`, root => {
        root.children.map(children => children.userData.tooltipText = buildingName);
        scene.add(root);
        tooltipEnabledObjects.push(...(root.children));
      })
    });
  })
}

export { createBuilding };