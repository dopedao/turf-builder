
import {generalListener} from './controls.js';
import {scene, camera, renderer, zoom} from './sceneSetup.js';
import {initTileSystem} from './tile_init.js';

renderer.domElement.style.position = 'relative';

export let tiles = [];
export const gridSize = 50;

function animate()
{
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();

const zoomObj = { zoom: zoom };
generalListener(camera, renderer, zoomObj);

initTileSystem(gridSize, gridSize, scene);