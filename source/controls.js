
import {buildTiles} from './tile_actions.js';
import {selectedTileColor} from './select.js';
import {onWindowResize} from './window.js';


let isRightMouseDown = false;
export let isLeftMouseDown = false;
export let isWheelButtonDown = false;
let prevMouse = { x: 0, y: 0 };


export function generalListener(camera, renderer, zoomObj)
{
    window.addEventListener('resize', () => onWindowResize(camera, renderer, zoomObj));
    renderer.domElement.addEventListener('mousedown', (event) => onMouseDown(event, camera));
    renderer.domElement.addEventListener('mousemove', (event) => onMouseMove(event, camera));
    renderer.domElement.addEventListener('mouseup', onMouseUp);
    renderer.domElement.addEventListener('wheel', (event) => onWheel(event, camera, zoomObj), { passive: false });
    renderer.domElement.addEventListener('contextmenu', (event) => event.preventDefault());
}

export function onMouseDown(event, camera)
{
	if (event.button === 0)
	{
        isLeftMouseDown = true;
        buildTiles(event, camera);
	}

	if (event.button === 2)
	{
        isRightMouseDown = true;
        prevMouse = { x: event.clientX, y: event.clientY };
	}

	if (event.button === 1) 
    {
		//console.log('Middle mouse button down');
		isWheelButtonDown = true;
		buildTiles(event, camera);
    }
}

export function onMouseMove(event, camera)
{
    if (!isRightMouseDown)
    {
		buildTiles(event, camera);
		selectedTileColor(event, camera);
        return;
    }

    if (event.buttons === 2)
	{
        const deltaX = -(event.clientX - prevMouse.x);
        const deltaY = -(event.clientY - prevMouse.y);
        prevMouse = { x: event.clientX, y: event.clientY };

        const speedX = 0.02;
        const speedZ = 0.02;

        camera.position.x += deltaX * speedX;
        camera.position.z += deltaY * speedZ;
    }
}

export function onMouseUp(event)
{
	if (event.button === 0)
	{
	    isLeftMouseDown = false;
	}

	if (event.button === 2)
	{
	    isRightMouseDown = false;
	}

	if (event.button === 1)
	{
	    isWheelButtonDown = false;
	}
}

export function onWheel(event, camera, zoomObj)
{
	event.preventDefault();
  
	const zoomSpeed = 0.4;
  
	const delta = Math.sign(event.deltaY) * zoomSpeed;
	const minZoom = 3;
	const maxZoom = 15;
	
	zoomObj.zoom = Math.max(minZoom, Math.min(maxZoom, zoomObj.zoom - delta));
  
	const aspect = window.innerWidth / window.innerHeight;
  
	camera.left = -aspect * zoomObj.zoom;
	camera.right = aspect * zoomObj.zoom;
	camera.top = zoomObj.zoom;
	camera.bottom = -zoomObj.zoom;
  
	camera.updateProjectionMatrix();
}