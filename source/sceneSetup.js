
export let scene = new THREE.Scene();

const width = window.innerWidth;
const height = window.innerHeight;
const aspect = width / height;
export const zoom = 10;
export const camera = new THREE.OrthographicCamera(
  -aspect * zoom,
  aspect * zoom,
  zoom,
  -zoom,
  1,
  1000
);
camera.position.set(0, 10, 0);
camera.lookAt(new THREE.Vector3(0, 0, 0));

export const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

renderer.setClearColor(0x282e3b);

//export {scene, camera, renderer, zoom};

export function createNewScene()
{
  scene = new THREE.Scene();

  const width = window.innerWidth;
  const height = window.innerHeight;
  const aspect = width / height;
  const zoom = 10;
  const camera = new THREE.OrthographicCamera(
    -aspect * zoom,
    aspect * zoom,
    zoom,
    -zoom,
    1,
    1000
  );
  camera.position.set(0, 10, 0);
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  renderer.setClearColor(0x282e3b);
}
