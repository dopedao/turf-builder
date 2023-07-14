
const loader = new THREE.TextureLoader();

export let selectedTexId = 0;
export let selectedWallTexId = 0;

export const atlas_floor_1 = loader.load("assets/textures/floor/DW_Turf_Floor_0.png");
export const af1_numRows = 13;
export const af1_numCols = 1;

export const atlas_floor_1_ID = 
{
    1: { id: 1},
    2: { id: 2},
    3: { id: 3},
    4: { id: 4},
    5: { id: 5},
    6: { id: 6},
    7: { id: 7},
    8: { id: 8},
    9: { id: 9}
};

export function setSelectedFloorTexture(texId)
{
    selectedTexId = texId;
}

export const atlas_room_1 = loader.load("assets/textures/room/room_walls.png");
export const ar1_numRows = 1;
export const ar1_numCols = 24;

export const atlas_arma_1 = loader.load("assets/textures/armature/DW_Turf_Armature_horizontal.png");
export const aa1_numRows = 2;
export const aa1_numCols = 24;

export const atlas_arma_1_ID = 
{
    1: { id: 0, name: 1},
    2: { id: 1, name: 2}
};

export const animPlayer = loader.load("assets/textures/player/animation.png");
export const player_numRows = 8;
export const player_numCols = 16;

export function setSelectedWallTexture(texId)
{
    selectedWallTexId = texId;
}

export const atlas_wall_1 = loader.load("assets/textures/walls/wall.png");
export const aw1_numRows = 2;
export const aw1_numCols = 4;

export const atlas_wall_1_ID = 
{
    1: { id: 0, name: 1},
    2: { id: 1, name: 2},
    3: { id: 2, name: 3},
    4: { id: 3, name: 4}
};

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