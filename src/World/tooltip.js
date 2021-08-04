import { Vector2, Raycaster } from 'three';
import { tooltipEnabledObjects, renderer, camera } from './World';

var mouse = new Vector2();
var raycaster = new Raycaster();
var latestMouseProjection;
var hoveredObj;
var tooltipDisplayTimeout;

function hideTooltip() {
  var divElement = document.querySelector("#tooltip");
  if (divElement) {
    divElement.style.display = 'none';
  }
}

function showTooltip() {
  var divElement = document.querySelector("#tooltip");

  if (divElement && latestMouseProjection) {
    divElement.style.display = 'block';
    divElement.style.opacity = 0.5;

    var canvasHalfWidth = renderer.domElement.offsetWidth / 2;
    var canvasHalfHeight = renderer.domElement.offsetHeight / 2;

    var tooltipPosition = latestMouseProjection.clone().project(camera);
    tooltipPosition.x = (tooltipPosition.x * canvasHalfWidth) + canvasHalfWidth + renderer.domElement.offsetLeft;
    tooltipPosition.y = -(tooltipPosition.y * canvasHalfHeight) + canvasHalfHeight + renderer.domElement.offsetTop;

    var tootipWidth = divElement.offsetWidth;
    var tootipHeight = divElement.offsetHeight;

    divElement.style.left = `${tooltipPosition.x - tootipWidth / 2}px`;
    divElement.style.top = `${tooltipPosition.y - tootipHeight - 5}px`;
    divElement.innerHTML = hoveredObj.userData.tooltipText;

    setTimeout(function () {
      divElement.style.opacity = 1.0;
    }, 25);
  }
}

function updateMouseCoords(event, coordsObj) {
  coordsObj.x = ((event.clientX - renderer.domElement.offsetLeft + 0.5) / window.innerWidth) * 2 - 1;
  coordsObj.y = -((event.clientY - renderer.domElement.offsetTop + 0.5) / window.innerHeight) * 2 + 1;
}

function handleManipulationUpdate() {
  raycaster.setFromCamera(mouse, camera); {
    var intersects = raycaster.intersectObjects(tooltipEnabledObjects);
    // console.log(intersects);
    if (intersects.length > 0) {
      latestMouseProjection = intersects[0].point;
      hoveredObj = intersects[0].object;
    }
  }

  if (tooltipDisplayTimeout || !latestMouseProjection) {
    clearTimeout(tooltipDisplayTimeout);
    tooltipDisplayTimeout = undefined;
    hideTooltip();
  }

  if (!tooltipDisplayTimeout && latestMouseProjection) {
    tooltipDisplayTimeout = setTimeout(function () {
      tooltipDisplayTimeout = undefined;
      showTooltip();
    }, 330);
  }
}

function onMouseMove(event) {
  updateMouseCoords(event, mouse);
  latestMouseProjection = undefined;
  hoveredObj = undefined;
  handleManipulationUpdate();
}

export { onMouseMove };