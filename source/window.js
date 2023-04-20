
export function onWindowResize(camera, renderer, zoomObj)
{
	const width = window.innerWidth;
	const height = window.innerHeight;
	const aspect = width / height;
  
	camera.left = -aspect * zoomObj.zoom;
	camera.right = aspect * zoomObj.zoom;
	camera.top = zoomObj.zoom;
	camera.bottom = -zoomObj.zoom;
	camera.updateProjectionMatrix();
  
	renderer.setSize(width, height);
}
  


  