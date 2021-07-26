import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { Box3, Vector3 } from 'three';
import * as dat from 'dat.gui'

import { createCamera } from './components/camera.js';
import { createCube } from './components/cube.js';
import { createScene } from './components/scene.js';
import { createLights } from './components/lights.js';

import { createRenderer } from './systems/renderer.js';
import { Resizer } from './systems/Resizer.js';
import { frameArea } from "./utils";

let camera;
let renderer;
let scene;
let controls;


class World {
  constructor(container, canvas) {
    camera = createCamera();
    scene = createScene();
    renderer = createRenderer(canvas);

    const cube = createCube();
    const light = createLights();
    scene.add(light);

    controls = new OrbitControls(camera, canvas);
    controls.target.set(0, 5, 0);
    controls.update();

    const resizer = new Resizer(container, camera, renderer)
    container.append(renderer.domElement);
  }
  render() {
    renderer.render(scene, camera);
  }
  load_material() {
    const objLoader = new OBJLoader();
    const mtlLoader = new MTLLoader();
    const gui = new dat.GUI();

    mtlLoader.load('demo.mtl', mtl => {
      mtl.preload();
      objLoader.setMaterials(mtl);
      objLoader.load('demo.obj', root => {
        gui.add(root.position, 'x').min(0).max(9)
        gui.add(root.position, 'y').min(0).max(9)
        gui.add(root.position, 'z').min(0).max(9)
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
}

export { World };