import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { Box3, Vector3 } from 'three';

import { createCamera } from './components/camera.js';
import { createBuilding } from './components/building.js'
import { createScene } from './components/scene.js';
import { createLights } from './components/lights.js';
import { createRenderer } from './systems/renderer.js';
import { createControls } from './systems/controls.js';
import { Resizer } from './systems/Resizer.js';
import { frameArea } from "./utils";

const canvas = document.querySelector('canvas.webgl');

let camera;
let renderer;
let scene;
let controls;
let resizer;

const tooltipEnabledObjects = [];

class World {
  constructor() {
    camera = createCamera();
    scene = createScene();
    const light = createLights();
    /**
     * TODO: 각 빌딩을 promise객체화해서 병행적으로 로드하기
     */
    createBuilding(scene, tooltipEnabledObjects);

    renderer = createRenderer(canvas);
    controls = createControls(camera, renderer.domElement);
    resizer = new Resizer(renderer);
    scene.add(light);
  }
  render() {
    renderer.render(scene, camera);
  }
  checkResize() {
    return resizer.resizeRendererToDisplaySize(renderer);
  }
  resize() {
    resizer.resize(camera, renderer);
  }
  load_map_material() {
    const objLoader = new OBJLoader();
    const mtlLoader = new MTLLoader();

    mtlLoader.load('demo_notFog.mtl', mtl => {
      mtl.preload();
      objLoader.setMaterials(mtl);
      objLoader.load('demo_notFog.obj', root => {
        scene.add(root);
        const box = new Box3().setFromObject(root);
        const boxSize = box.getSize(new Vector3()).length();
        const boxCenter = box.getCenter(new Vector3());

        frameArea(boxSize * 1.2, boxSize, boxCenter, camera);

        controls.maxDistance = boxSize * 10;
        controls.target.copy(boxCenter);
        controls.update();
      });
    })
  }
  getSystems() {
    return { controls };
  }
}

export { World, tooltipEnabledObjects, renderer, camera };