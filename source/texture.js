

const loader = new THREE.TextureLoader();

export const atlas_floor_1 = loader.load("assets/textures/floor/DW_Turf_Floor_0.png");
export const af1_numRows = 13;
export const af1_numCols = 1;

export const atlas_arma_1 = loader.load("assets/textures/armature/DW_Turf_Armature.png");
export const aa1_numRows = 24;
export const aa1_numCols = 1;

export function createTextureFromAtlas(atlas, id, numRows, numCols)
{
    const xTiles = 1 / numCols;
    const yTiles = 1 / numRows;
    const xOffset = (id % numCols) * xTiles;
    const yOffset = (1 - yTiles) - (Math.floor(id / numCols) * yTiles);

    const texture = atlas.clone();
    texture.needsUpdate = true;
    texture.repeat.set(xTiles, yTiles);
    texture.offset.set(xOffset, yOffset);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.minFilter = THREE.NearestFilter;
    texture.magFilter = THREE.NearestFilter;

    return texture;
}