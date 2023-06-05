
import {generalListener} from './controls.js';
import {scene, camera, renderer, zoom} from './sceneSetup.js';
import {initTileSystem, planeSize} from './tile_init.js';
import {atlas_floor_1, af1_numCols, af1_numRows} from './texture.js';
import {clearActivetile, activateTile, changeTileColor, neighborArray, getTilePosX, getTilePosZ, roomWallTexture, getTileRoomWallTexId,
            changeTileTexture, removeTileColor, roomPlanes, clearRoomPlanes, setPropId} from './tile_actions.js';
import {deletePropArray, createProp} from './props.js';


renderer.domElement.style.position = 'relative';

export let tiles = [];
export const gridSize = 50;

function animate()
{
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

export function loadTiles(newTiles)
{
    clearActivetile();
    clearRoomPlanes();
    deletePropArray();

    tiles = newTiles.map(tile => 
        {
        const planeGeometry = new THREE.PlaneGeometry(planeSize, planeSize);
        const planeMaterial = new THREE.MeshBasicMaterial({
            color: 0xebae34,
        });

        const plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.position.copy(tile.planePosition);
        plane.rotation.x = tile.planeRotation;
        scene.add(plane);

        return {...tile, plane};
    });

    tiles.forEach(tile =>
    {
        if (tile.active == true)
        {
            activateTile(tile.id, true);
        }
    });

    tiles.forEach(tile =>
    {
        if (tile.active == false && tile.extWall == false)
        {
            changeTileColor(tile.id, 0x282e3b);
        }
        else if (tile.active && tile.extWall == false)
        {
            removeTileColor(tile.id);
            changeTileTexture(tile.id, tile.textureID, atlas_floor_1, af1_numRows, af1_numCols);
        }

        if (tile.roomWall == true)
        {
            let tempArray = [];
            const geometry = new THREE.PlaneGeometry(1, 1);
            const material = new THREE.MeshBasicMaterial({
            transparent: true,
            opacity: 1
            });
            let plane = new THREE.Mesh(geometry, material);
            plane.position.x = getTilePosX(tile.id);
            plane.position.z = getTilePosZ(tile.id);
            plane.position.y = 0.01;
            plane.rotation.x = -Math.PI / 2;
            tempArray.roomId = tile.roomId;
            tempArray.id = tile.id;
            tempArray.plane = plane;
            
            roomPlanes.push(tempArray);
            scene.add(roomPlanes[roomPlanes.length - 1].plane);
        }

        if (tile.mainProp == true)
        {
            const propId = createProp(tile.propPos, 0x8403fc, tile.propSize.x, tile.propSize.y, tile.propTextId);
            setPropId(tile.id, propId);
        }
    });

            let i = 0;
            while (i < roomPlanes.length)
            {
                roomWallTexture(roomPlanes[i].id, neighborArray[roomPlanes[i].id], getTileRoomWallTexId(roomPlanes[i].id));
                i++;
            }

}

function roughSizeOfObject(object)
{
    var objectList = [];
    var stack = [object];
    var bytes = 0;

    while (stack.length)
    {
        var value = stack.pop();

        if (typeof value === 'boolean')
        {
            bytes += 4;
        }
        else if (typeof value === 'string')
        {
            bytes += value.length * 2;
        }
        else if (typeof value === 'number')
        {
            bytes += 8;
        }
        else if (typeof value === 'object' && objectList.indexOf(value) === -1)
        {
            objectList.push(value);

            for(var i in value)
            {
                stack.push(value[i]);
            }
        }
    }
    return bytes;
}

animate();

const zoomObj = { zoom: zoom };
generalListener(camera, renderer, zoomObj);

initTileSystem(gridSize, gridSize, scene);
