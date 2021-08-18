import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';

function createBuilding(scene, tooltipEnabledObjects) {
  const buildingNames = ["갈멜관", "복음관", "모리아관"];

  function loadOBJLoader(materials, fileName) {
    const objLoader = new OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.load(`${fileName}.obj`, object => {
      object.children.map(children => children.userData.tooltipText = fileName);
      tooltipEnabledObjects.push(...object.children);
      scene.add(object);
    }, function (xhr) {
      console.log('OBJLoader: ', xhr.loaded / xhr.total * 100, '% loaded');
    }, function (error) {
      console.error('모델을 로드 중 오류가 발생하였습니다.', error);
    });
  }

  function loadMTLLoader(fileName) {
    const mtlLoader = new MTLLoader();
    mtlLoader.load(`${fileName}.mtl`, materials => {
      materials.preload();
      loadOBJLoader(materials, fileName);
    }, function (xhr) {
      console.log('MTLLoader: ', xhr.loaded / xhr.total * 100, '% loaded');
    }, function (error) {
      console.error('MTLLoader 로드 중 오류가 발생하였습니다.', error);
    });
  }

  buildingNames.map(buildingName => loadMTLLoader(buildingName));
}

export { createBuilding };