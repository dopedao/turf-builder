import {tiles, gridSize, playTime, playTimeOn} from './main.js';
import {scene} from './sceneSetup.js';
import {planeSize} from './tile_init.js';
import {isLeftMouseDown, isWheelButtonDown} from './controls.js';
import {tileUI, tileAdd, tileRemove, tileSelect, dragSelect, roomUI, createRoom, createDoor, removeRoom, removeDoor,
        FreeTilesMin, FreeTilesPlu, propUI, addProp, modifyProp, deleteProp, paintUI, paintFloor, paintWall, playUI} from './UI.js';
import {getIntersectedTile, squareSelect, createSelectionPlane, updateSelectionPlane, removeSelectionPlane, 
        selectionPlane, getNeighbors, selectPlanesRemove} from './select.js';
import {isRoomCorrect, showFullRoom, removeFullRoom} from './rooms.js';
import {placeProp, removeCheckProp, removeSelectedProp, modifyPropPos, dragging, selectedAddProp, updateCheckProp} from './props.js';
import {propType} from './props_info.js';
import {createTextureFromAtlas, atlas_floor_1, af1_numCols, af1_numRows, atlas_arma_1, aa1_numCols, aa1_numRows,
            selectedTexId, selectedWallTexId, atlas_wall_1, aw1_numCols, aw1_numRows, atlas_room_1,
            ar1_numCols, ar1_numRows} from './texture.js';
import {saveTileGrid} from './save.js';
import {createPlayerPlane, playerPlane, playerMove, playerControls, destroyPlayerPlane} from './player.js';


export let activeTiles = [];
export let roomCounter = 1;
export let inDragSelect = false;
export let dragSelectTile;
export let roomID = 2;
export let currentRoomID = 0;
export let roomToRemove = [];
let modifyTile = null;
export let neighborArray = [];

export let doubleTopExtWallPlanes = [];
export let doubleTopRoomWallPlanes = [];
export let roomPlanes = [];
export let halfPlanes = [];

initNeighborArray();

export function setTileMainProp(tileId)
{
    const tile = tiles.find((t) => t.id === tileId);

	if (tile)
	{
        tile.mainProp = true;
    }
}

export function isTileMainProp(tileId)
{
    const tile = tiles.find((t) => t.id === tileId);

    if (tile && tile.mainProp == true)
    {
        return (true);
    }
    return (false);
}

export function removeTileMainProp(tileId)
{
    const tile = tiles.find((t) => t.id === tileId);

    if (tile)
    {
        return (tile.mainProp);
    }
}

export function setTilePropPos(tileId, posVec)
{
    const tile = tiles.find((t) => t.id === tileId);

    if (tile)
    {
        tile.propPos = posVec;
    }
}

export function readTilePropPos(tileId)
{
    const tile = tiles.find((t) => t.id === tileId);

    if (tile)
    {
        return (tile.propPos);
    }
}

export function removeTilePropPos(tileId)
{
    const tile = tiles.find((t) => t.id === tileId);

    if (tile)
    {
        tile.propPos = new THREE.Vector3;
    }
}

export function setTilePropSize(tileId, sizeVec)
{
    const tile = tiles.find((t) => t.id === tileId);

    if (tile)
    {
        tile.propSize = sizeVec;
    }
}

export function readTilePropSize(tileId)
{
    const tile = tiles.find((t) => t.id === tileId);

    if (tile)
    {
        return (tile.propSize);
    }
}

export function removeTilePropSize(tileId)
{
    const tile = tiles.find((t) => t.id === tileId);

    if (tile)
    {
        tile.propSize = new THREE.Vector2;
    }
}

export function setTilePropTextId(tileId, textId)
{
    const tile = tiles.find((t) => t.id === tileId);

    if (tile)
    {
        tile.propTextId = textId;
    }
}

export function readTilePropTextId(tileId)
{
    const tile = tiles.find((t) => t.id === tileId);

    if (tile)
    {
        return (tile.propTextId);
    }
}

export function removeTilePropTextId(tileId)
{
    const tile = tiles.find((t) => t.id === tileId);

    if (tile)
    {
        tile.propTextId = "";
    }
}

export function changeTileColor(tileId, color)
{
	const tile = tiles.find((t) => t.id === tileId);

	if (tile)
	{
		tile.plane.material.color.set(color === undefined ? Math.random() * 0xffffff : color);
	}
}

export function removeTileColor(tileId)
{
    const tile = tiles.find((t) => t.id === tileId);
  
    if (tile)
    {
        tile.plane.material.color.set(0xffffff);
        tile.plane.material.transparent = true;
        tile.plane.material.opacity = 1;
        tile.plane.material.needsUpdate = true;
    }
}

export function changeTileTexture(tileId, textureID, atlas, numRows, numCols)
{
    const tile = tiles.find((t) => t.id === tileId);
  
    if (tile)
    {
        const texture = createTextureFromAtlas(atlas, textureID, numRows, numCols);
        tile.plane.material.map = texture;
        tile.plane.material.needsUpdate = true;
    }
}

export function getTilePosX(tileId)
{
    const tile = tiles.find((t) => t.id === tileId);
  
    if (tile)
    {
        return (tile.position.x);
    }
}

export function getTilePosY(tileId)
{
    const tile = tiles.find((t) => t.id === tileId);
  
    if (tile)
    {
        return (tile.position.y);
    }
}

export function getTilePosZ(tileId)
{
    const tile = tiles.find((t) => t.id === tileId);
  
    if (tile)
    {
        return (tile.position.z);
    }
}

export function removeTileTexture(tileId)
{
    const tile = tiles.find((t) => t.id === tileId);
  
    if (tile)
    {
        tile.plane.material.map = null;
        tile.plane.material.needsUpdate = true;
    }
}

export function setTilePlaneSize(tileId, size)
{
    const tile = tiles.find((t) => t.id === tileId);
  
    if (tile)
    {
        tile.plane.geometry = new THREE.PlaneGeometry(size, size);
        tile.plane.geometry.needsUpdate = true;
    }
}

export function setTileDoubleExtWall(tileId)
{
    const tile = tiles.find((t) => t.id === tileId);

    if (tile)
    {
        tile.doubleExtWall = true;
    }
}

export function isTileDoubleExtWall(tileId)
{
    const tile = tiles.find((t) => t.id === tileId);

    if (tile && tile.doubleExtWall == true)
    {
        return (true);
    }
    return (false);
}

export function setTileSpecialDoubleExtWall(tileId)
{
    const tile = tiles.find((t) => t.id === tileId);

    if (tile)
    {
        tile.specialDouble = true;
    }
}

export function isTileSpecialDoubleExtWall(tileId)
{
    const tile = tiles.find((t) => t.id === tileId);

    if (tile && tile.specialDouble == true)
    {
        return (true);
    }
    return (false);
}

export function removeTileSpecialDoubleExtWall(tileId)
{
    const tile = tiles.find((t) => t.id === tileId);

    if (tile)
    {
        tile.specialDouble = false;
    }
}

export function setTileFirstExtWall(tileId)
{
    const tile = tiles.find((t) => t.id === tileId);

    if (tile)
    {
        tile.firstExtWall = true;
    }
}

export function isTileFirstExtWall(tileId)
{
    const tile = tiles.find((t) => t.id === tileId);

    if (tile && tile.firstExtWall == true)
    {
        return (true);
    }
    return (false);
}

export function removeTileFirstExtWall(tileId)
{
    const tile = tiles.find((t) => t.id === tileId);

    if (tile)
    {
        tile.firstExtWall = false;
    }
}

export function setTileThirdExtWall(tileId)
{
    const tile = tiles.find((t) => t.id === tileId);

    if (tile)
    {
        tile.thirdExtWall = true;
    }
}

export function isTileThirdExtWall(tileId)
{
    const tile = tiles.find((t) => t.id === tileId);

    if (tile && tile.thirdExtWall == true)
    {
        return (true);
    }
    return (false);
}

export function removeTileThirdExtWall(tileId)
{
    const tile = tiles.find((t) => t.id === tileId);

    if (tile)
    {
        tile.thirdExtWall = false;
    }
}

export function setTileDoubleTopExtWall(tileId)
{
    const tile = tiles.find((t) => t.id === tileId);

    if (tile)
    {
        tile.doubleTopExtWall = true;
    }
}

export function removeTileDoubleTopExtWall(tileId)
{
    const tile = tiles.find((t) => t.id === tileId);

    if (tile)
    {
        tile.doubleTopExtWall = false;
    }
}

export function isDoubleTopExtWall(tileId)
{
    const tile = tiles.find((t) => t.id === tileId);

    if (tile && tile.doubleTopExtWall == true)
    {
        return (true);
    }
    return (false);
}

export function isTileDoubleRoomWall(tileId)
{
    const tile = tiles.find((t) => t.id === tileId);

    if (tile && tile.doubleTopRoomWall == true)
    {
        return (true);
    }
    return (false);
}

export function setTileDoubleTopRoomWall(tileId)
{
    const tile = tiles.find((t) => t.id === tileId);

    if (tile)
    {
        tile.doubleTopRoomWall = true;
    }
}

export function removeTileDoubleTopRoomWall(tileId)
{
    const tile = tiles.find((t) => t.id === tileId);

    if (tile)
    {
        tile.doubleTopRoomWall = false;
    }
}

export function setTileRoomWallTopOfDoubleExtWall(tileId)
{
    const tile = tiles.find((t) => t.id === tileId);

    if (tile)
    {
        tile.roomWallTopOfDoubleExtWall = true;
    }
}

export function isTileRoomWallTopOfDoubleExtWall(tileId)
{
    const tile = tiles.find((t) => t.id === tileId);

    if (tile && tile.roomWallTopOfDoubleExtWall == true)
    {
        return (true);
    }
    return (false);
}

export function removeTileRoomWallTopOfDoubleExtWall(tileId)
{
    const tile = tiles.find((t) => t.id === tileId);

    if (tile)
    {
        tile.roomWallTopOfDoubleExtWall = false;
    }
}

export function getTileRoomWallTexId(tileId)
{
    const tile = tiles.find((t) => t.id === tileId);

    if (tile)
    {
        return (tile.roomWallTexId);
    }
}

export function setSimpleHeightTilePlane(tileId)
{
    const tile = tiles.find((t) => t.id === tileId);
  
    if (tile)
    {
        tile.plane.geometry = new THREE.PlaneGeometry(1, 1);
        tile.plane.geometry.needsUpdate = true;
        tile.plane.position.z += 0.5;
        tile.plane.position.y -= 0.001;
        tile.doubleExtWall = false;
    }
}

export function activateTile(tileId, action)
{
    const tile = tiles.find((t) => t.id === tileId);

    if (tile)
    {
        if (action == true)
        {
            tile.active = true;

            if (!activeTiles.includes(tileId))
            {
                activeTiles.push(tileId);
				FreeTilesMin();
            }
        }
        else
        {
            tile.active = false;
            tile.door = false;
            tile.roomWall = false;

            const index = activeTiles.indexOf(tileId);
            if (index > -1)
            {
                activeTiles.splice(index, 1);
				FreeTilesPlu();
            }
        }
    }
}

export function clearActivetile()
{
    activeTiles = [];
}

export function isTileExtWall(tileId, topWall = false, first = false, double = false, special = false, topExt = false)
{
    const tile = tiles.find((t) => t.id === tileId);

    if (tile)
    {
        if (topWall == false)
        {
            if (tile && tile.extWall == true)
            {
                return (true);
            }
            return (false);
        }
        else
        {
            if (first == false && double == false || special == true)
            {
                if (tile.extWall == true && tile.doubleExtWall == false && tile.firstExtWall == false )
                {
                    return (true);
                }
                else if (tile.doubleTopExtWall == true)
                {
                    return (true);
                }
                else if (tile.specialDouble == true)
                {
                    return (true);
                }
                return (false);
            }
            else if (first == true || double == true)
            {
                if (tile.extWall == true )
                {
                    if (tile.doubleExtWall == true && tile.specialDouble == false || tile.firstExtWall == true && tile.specialDouble == false)
                    {
                        return (true);
                    }
                }
                
                if (tile.doubleTopExtWall == true)
                {
                    return (true);
                }
                else if (tile.specialDouble == true)
                {
                    return (false);
                }
                return (false);
            }
        }
    }
}

function setTileExtWall(tileId)
{
    const tile = tiles.find((t) => t.id === tileId);

    if (tile)
    {
        tile.extWall = true;
    }
}

export function isTileActive(tileId)
{
    const tile = tiles.find((t) => t.id === tileId);

    if (tile && tile.active == true)
    {
        return (true);
    }
    return (false);
}

export function isTileRoomWall(tileId, topWall = false)
{
    const tile = tiles.find((t) => t.id === tileId);

    if (topWall == false)
    {
        if (tile && tile.roomWall == true)
        {
            return (true);
        }
        return (false);
    }
    else
    {
        if (tile.door)
        {
            return (false);
        }
        else
        {
            if (tile && tile.roomWall == true)
            {
                return (true);
            }
            else if (tile && tile.doubleTopRoomWall == true)
            {
                return(true);
            }
            return (false);
        }
    }
}

export function isTileProp(tileId)
{
    const tile = tiles.find((t) => t.id === tileId);

    if (tile && tile.prop == true)
    {
        return (true);
    }
    return (false);
}

export function getTilePropSharedIds(tileId)
{
    const tile = tiles.find((t) => t.id === tileId);

    if (tile)
    {
        return (tile.propSharedIds);
    }
}

export function pushTilePropSharedIds(tileId, sharedId)
{
    const tile = tiles.find((t) => t.id === tileId);

    if (tile)
    {
        tile.propSharedIds.push(sharedId);
    }
}

export function deleteTilePropSharedIds(tileId)
{
    const tile = tiles.find((t) => t.id === tileId);

    if (tile)
    {
        tile.propSharedIds = [];
    }
}

export function setTileProp(tileId, action)
{
    const tile = tiles.find((t) => t.id === tileId);

    if (tile)
    {
        if (action == true)
        {
            tile.prop = true;
        }
        else
        {
            tile.prop = false;
        }
    }
}

function pushRoomID(tileId, roomID)
{
    const tile = tiles.find((t) => t.id === tileId);

    if (tile)
    {
        tile.roomId.push(roomID);
    }
}

export function readRoomID(tileId)
{
    const tile = tiles.find((t) => t.id === tileId);

    if (tile)
    {
        return (tile.roomId);
    }
}

export function deleteElemRoomID(tileId, index)
{
    const tile = tiles.find((t) => t.id === tileId);

    if (tile)
    {
        tile.roomId.splice(index, 1);
    }
}

export function deleteFullRoomID(tileId)
{
    const tile = tiles.find((t) => t.id === tileId);

    if (tile)
    {
        tile.roomId = [];
    }
}

function defTileRoomWall(tileId)
{
    const tile = tiles.find((t) => t.id === tileId);

    if (tile)
    {
        tile.roomWall = true;
    }
}

export function removeTileRoomWall(tileId)
{
    const tile = tiles.find((t) => t.id === tileId);

    if (tile)
    {
        tile.roomWall = false;
    }
}

function addDoor(tileId)
{
    const tile = tiles.find((t) => t.id === tileId);

    if (tile)
    {
        tile.door = true;
    }
}

export function isTileDoor(tileId)
{
    const tile = tiles.find((t) => t.id === tileId);

    if (tile && tile.door == true)
    {
        return (true);
    }
    return (false);
}

export function removeTileDoor(tileId)
{
    const tile = tiles.find((t) => t.id === tileId);

    if (tile)
    {
        tile.door = false;
    }
}

export function removeExtWall(tileId)
{
    const tile = tiles.find((t) => t.id === tileId);

    if (tile)
    {
        tile.extWall = false;
    }
}

export function setTilePropType(tileId, string)
{
    const tile = tiles.find((t) => t.id === tileId);

    if (tile)
    {
        tile.propType = string;
    }
}

export function deleteTilePropType(tileId)
{
    const tile = tiles.find((t) => t.id === tileId);

    if (tile)
    {
        tile.propType = "";
    }
}

export function setPropId(tileId, propId)
{
    const tile = tiles.find((t) => t.id === tileId);

    if (tile)
    {
        tile.propId = propId;
    }
}

export function readPropId(tileId)
{
    const tile = tiles.find((t) => t.id === tileId);

    if (tile)
    {
        return (tile.propId);
    }
}

export function removePropId(tileId)
{
    const tile = tiles.find((t) => t.id === tileId);

    if (tile)
    {
        tile.propId = 0;
    }
}

export function tileTextureID(tileId)
{
    const tile = tiles.find((t) => t.id === tileId);

    if (tile)
    {
        return (tile.textureID);
    }
}

export function removeElemRoomPlanes(tileId)
{
    roomPlanes = roomPlanes.filter(obj => obj.id !== tileId);
}

export function clearRoomPlanes()
{
    roomPlanes = [];
}

export function clearModifyTile()
{
    modifyTile = null;
}
  
export function buildTiles(event, camera)
{
    if (playUI)
    {
        if (playerPlane == null)
        {
            createPlayerPlane();
            playerControls();
            playTimeOn();
        }
    }
    else if (tileUI)
    {
        destroyPlayerPlane();
        removeCheckProp();
        if (tileSelect)
        {
            if (inDragSelect == false)
            {
                if (tileAdd == true)
                {
                    const intersectedTile = getIntersectedTile(event, camera);
                    if (intersectedTile && isLeftMouseDown && intersectedTile.active != true)
                    {
                        removeTileColor(intersectedTile.id);
                        changeTileTexture(intersectedTile.id, 6, atlas_floor_1, af1_numRows, af1_numCols);
                        setTilePlaneSize(intersectedTile.id, 1);
                        activateTile(intersectedTile.id, true);
                        
                        addExternalWalls();
                    }
                }
                else if (tileRemove == true)
                {
                    const intersectedTile = getIntersectedTile(event, camera);
                    if (intersectedTile && isLeftMouseDown && intersectedTile.active != false)
                    {
                        removeTileTexture(intersectedTile.id);
                        changeTileColor(intersectedTile.id, 0x282e3b);
                        setTilePlaneSize(intersectedTile.id, planeSize);
                        activateTile(intersectedTile.id, false);

                        addExternalWalls();
                    }
                }
            }
        }
        else if (dragSelect)
        {
            if (!inDragSelect && isLeftMouseDown == true)
            {
                dragSelectTile = getIntersectedTile(event, camera);
                inDragSelect = true;
            }
            
            if (inDragSelect)
            {
                const currentTile = getIntersectedTile(event, camera);
                const dragSelectedTiles = squareSelect(dragSelectTile, currentTile, 0);

                if (isLeftMouseDown == false)
                {
                    inDragSelect = false;
                    removeSelectionPlane();

                    if (tileAdd == true)
                    {
                        let i = 0;
                        while (i < dragSelectedTiles.length)
                        {
                            removeTileColor(dragSelectedTiles[i]);
                            changeTileTexture(dragSelectedTiles[i], 6, atlas_floor_1, af1_numRows, af1_numCols);
                            setTilePlaneSize(dragSelectedTiles[i], 1);
                            activateTile(dragSelectedTiles[i], true);
                            i++;
                        }
                        addExternalWalls();
                    }
                    else if (tileRemove == true)
                    {
                        let i = 0;
                        while (i < dragSelectedTiles.length)
                        {
                            removeTileTexture(dragSelectedTiles[i]);
                            changeTileColor(dragSelectedTiles[i], 0x282e3b);
                            setTilePlaneSize(dragSelectedTiles[i], planeSize);
                            activateTile(dragSelectedTiles[i], false);
                            i++;
                        }
                        addExternalWalls();
                    }
                }
            }
        }
    }
    else if (roomUI)
    {
        destroyPlayerPlane();
        removeCheckProp();
        if (createRoom)
        {
            if (!inDragSelect && isLeftMouseDown == true)
            {
                dragSelectTile = getIntersectedTile(event, camera);
                
                if (dragSelectTile.extWall == true || dragSelectTile.roomWall == true)
                {
                    inDragSelect = true;
                }
            }
            
            if (inDragSelect)
            {
                const currentTile = getIntersectedTile(event, camera);
                const dragSelectedTiles = squareSelect(dragSelectTile, currentTile, 1);
                const roomCorrect = isRoomCorrect(dragSelectedTiles[0].idArray, dragSelectedTiles[0].lengthX,
                                        dragSelectedTiles[0].lengthY);

                if (roomCorrect == true)
                {
                    if (!selectionPlane)
                    {
                        createSelectionPlane(0x00ff00);
                    }
                    updateSelectionPlane(dragSelectTile, currentTile,0x00ff00);
                }
                else
                {
                    if (!selectionPlane)
                    {
                        createSelectionPlane(0xc93a42);
                    }
                    updateSelectionPlane(dragSelectTile, currentTile,0xc93a42);
                }

                if (isLeftMouseDown == false && roomCorrect == true)
                {
                    inDragSelect = false;
                    removeSelectionPlane();
                    let tempRoomArray = [];

                    let i = 0;
                    while (i < dragSelectedTiles[0].idArray.length)
                    {
                        if (dragSelectedTiles[0].idArray[i].wall && isTileExtWall(dragSelectedTiles[0].idArray[i].tempID) == false &&
                            isTileActive(dragSelectedTiles[0].idArray[i].tempID) == true && 
                            isTileDoor(dragSelectedTiles[0].idArray[i].tempID) == false && 
                            !isTileRoomWall(dragSelectedTiles[0].idArray[i].tempID))
                        {
                            defTileRoomWall(dragSelectedTiles[0].idArray[i].tempID);
                            tempRoomArray.push(dragSelectedTiles[0].idArray[i].tempID);

                            let tempArray = [];
                            const geometry = new THREE.PlaneGeometry(1, 1);
                            const material = new THREE.MeshBasicMaterial({
                            transparent: true,
                            opacity: 1
                            });
                            let plane = new THREE.Mesh(geometry, material);
                            plane.position.x = getTilePosX(dragSelectedTiles[0].idArray[i].tempID);
                            plane.position.z = getTilePosZ(dragSelectedTiles[0].idArray[i].tempID);
                            plane.position.y = 0.01;
                            plane.rotation.x = -Math.PI / 2;
                            tempArray.roomId = roomCounter;
                            tempArray.id = dragSelectedTiles[0].idArray[i].tempID;
                            tempArray.plane = plane;
                            
                            roomPlanes.push(tempArray);
                            scene.add(roomPlanes[roomPlanes.length - 1].plane);
                        }

                        if (isTileExtWall(dragSelectedTiles[0].idArray[i].tempID) == true ||
                                isTileActive(dragSelectedTiles[0].idArray[i].tempID) == true)
                        {
                            pushRoomID(dragSelectedTiles[0].idArray[i].tempID, roomCounter);
                        }
                        i++;
                    }
                    
                    //ROOM ALPHA TOP WALL SYS PART 1
                    // i = 0;
                    // while (i < tempRoomArray.length)
                    // {
                    //     const roomNeighbors = getNeighbors(tempRoomArray[i], gridSize, gridSize, 1);

                    //     if (isTileActive(roomNeighbors[4]) && !isTileRoomWall(roomNeighbors[4]) && !isTileExtWall(roomNeighbors[4]) &&
                    //             !isTileDoubleRoomWall(roomNeighbors[4]))
                    //     {
                    //         let tempArray = [];
                    //         setTileDoubleTopRoomWall(roomNeighbors[4]);
                    //         pushRoomID(roomNeighbors[4], roomCounter);

                    //         const geometry = new THREE.PlaneGeometry(1, 1);
                    //         const material = new THREE.MeshBasicMaterial({
                    //         transparent: true,
                    //         opacity: 0.3
                    //         });
                    //         let plane = new THREE.Mesh(geometry, material);
                    //         plane.position.x = getTilePosX(roomNeighbors[4]);
                    //         plane.position.z = getTilePosZ(roomNeighbors[4]);
                    //         plane.position.y = 0.1;
                    //         plane.rotation.x = -Math.PI / 2;
                    //         tempArray.roomId = roomCounter;
                    //         tempArray.id = roomNeighbors[4];
                    //         tempArray.plane = plane;
                            
                    //         doubleTopRoomWallPlanes.push(tempArray);
                    //         scene.add(doubleTopRoomWallPlanes[doubleTopRoomWallPlanes.length - 1].plane);
                    //     }
                    //     i++;
                    // }

                    i = 0;
                    while (i < roomPlanes.length)
                    {
                        //const roomNeighbors = getNeighbors(roomPlanes[i].id, gridSize, gridSize, 1);
                        roomWallTexture(roomPlanes[i].id, neighborArray[roomPlanes[i].id], getTileRoomWallTexId(roomPlanes[i].id));

                        // if (isDoubleTopExtWall(tempRoomArray[i]))
                        // {
                        //     removeTileDoubleTopExtWall(tempRoomArray[i]);
                        //     setTileRoomWallTopOfDoubleExtWall(tempRoomArray[i]);

                        //     let planeObj = doubleTopExtWallPlanes.find(obj => obj.id === tempRoomArray[i]);

                        //     if (planeObj)
                        //     {
                        //         scene.remove(planeObj.plane);
                        //         doubleTopExtWallPlanes = doubleTopExtWallPlanes.filter(obj => obj.id !== tempRoomArray[i]);
                        //     }
                        // }

                        i++;
                    }

                    //ROOM ALPHA TOP WALL SYS PART 2
                    // i = 0;
                    // console.log(doubleTopRoomWallPlanes);
                    // while (i < doubleTopRoomWallPlanes.length)
                    // {
                    //     if (doubleTopRoomWallPlanes[i])
                    //     {
                    //         const roomNeighbors = getNeighbors(doubleTopRoomWallPlanes[i].id, gridSize, gridSize, 1);
                    //         roomWallTexture(doubleTopRoomWallPlanes[i].id, roomNeighbors, getTileRoomWallTexId(doubleTopRoomWallPlanes[i].id));
                    //     }
                    //     i++;
                    // }
                    roomCounter = roomCounter + 1;
                    manageHalfPlanes();
                }
                else if (isLeftMouseDown == false && roomCorrect == false)
                {
                    inDragSelect = false;
                    removeSelectionPlane();
                }
            }
        }
        else if (createDoor)
        {
            const intersectedTile = getIntersectedTile(event, camera);
            if (intersectedTile && isLeftMouseDown && intersectedTile.roomWall == true)
            {
                addDoor(intersectedTile.id);

                let i = 0;
                const tempNeigh = neighborArray[intersectedTile.id];
                roomWallTexture(intersectedTile.id, neighborArray[intersectedTile.id], getTileRoomWallTexId(intersectedTile.id));

                while (i < tempNeigh.length)
                {
                    roomWallTexture(tempNeigh[i], neighborArray[tempNeigh[i]], getTileRoomWallTexId(tempNeigh[i]));
                    i++;
                }
            }
        }
        else if (removeRoom)
        {
            const intersectedTile = getIntersectedTile(event, camera);

            if (intersectedTile)
            {
                if (currentRoomID != intersectedTile.roomId)
                {
                    selectPlanesRemove();
                    roomToRemove = [];
                    roomToRemove = showFullRoom(intersectedTile);
                    currentRoomID = intersectedTile.roomId;
                }
        
                if (roomToRemove.length > 1 && isLeftMouseDown == true)
                {
                    removeFullRoom(intersectedTile, roomToRemove);
                    selectPlanesRemove();
                    roomToRemove = [];
                    roomCounter = roomCounter - 1;
                    manageHalfPlanes();
                }
            }
            else
            {
                selectPlanesRemove();
            }
        }
        else if (removeDoor)
        {
            const intersectedTile = getIntersectedTile(event, camera);

            if (intersectedTile && isTileDoor(intersectedTile.id) && isLeftMouseDown == true)
            {
                removeTileDoor(intersectedTile.id);
                
                let i = 0;
                const tempNeigh = neighborArray[intersectedTile.id];
                roomWallTexture(intersectedTile.id, neighborArray[intersectedTile.id], getTileRoomWallTexId(intersectedTile.id));

                while (i < tempNeigh.length)
                {
                    roomWallTexture(tempNeigh[i], neighborArray[tempNeigh[i]], getTileRoomWallTexId(tempNeigh[i]));
                    i++;
                }
            }
        }
    }
    else if (propUI)
    {
        destroyPlayerPlane();
        if (addProp)
        {
            const intersectedTile = getIntersectedTile(event, camera);

            if (intersectedTile)
            {
                if (isWheelButtonDown)
                {
                    //console.log(+selectedAddProp.textID)
                    if (+selectedAddProp.textID < 2)
                    {
                        selectedAddProp.textID++;
                    }
                    else
                    {
                        selectedAddProp.textID = '0';
                    }
                    removeCheckProp();
                    updateCheckProp(intersectedTile.position, 0x32a84e);
                }

                placeProp(intersectedTile);
            }
        }
        else if (modifyProp)
        {
            const intersectedTile = getIntersectedTile(event, camera);

            if (modifyTile == null && !dragging)
            {
                modifyPropPos(intersectedTile, intersectedTile);
                modifyTile = intersectedTile;
            }

            if (dragging)
            {
                modifyPropPos(modifyTile, intersectedTile);
            }
            else
            {
                modifyTile = null;
                removeCheckProp();
            }
        }
        else if (deleteProp)
        {
            removeCheckProp();
            const intersectedTile = getIntersectedTile(event, camera);

            if (intersectedTile)
            {
                if (isLeftMouseDown)
                {
                    removeSelectedProp();
                    setTileProp(intersectedTile.id, false);
                    deleteTilePropType(intersectedTile.id);
                    removePropId(intersectedTile.id);
                    removeTileMainProp(intersectedTile.id);
                    removeTilePropPos(intersectedTile.id);
                    removeTilePropSize(intersectedTile.id);
                    removeTilePropTextId(intersectedTile.id);

                    let i = 0;
                    let sharedIds = getTilePropSharedIds(intersectedTile.id);
                    deleteTilePropSharedIds(intersectedTile.id);
                    while (i < sharedIds.length)
                    {
                        setTileProp(sharedIds[i], false);
                        deleteTilePropType(sharedIds[i]);
                        deleteTilePropSharedIds(sharedIds[i]);
                        removePropId(sharedIds[i]);
                        removeTileMainProp(sharedIds[i]);
                        removeTilePropPos(sharedIds[i]);
                        removeTilePropSize(sharedIds[i]);
                        removeTilePropTextId(sharedIds[i]);
                        i++;
                    }
                }
            }
        }
    }
    else if (paintUI)
    {
        destroyPlayerPlane();
        if (paintFloor == true)
        {
            const intersectedTile = getIntersectedTile(event, camera);
            if (intersectedTile && isLeftMouseDown && intersectedTile.active == true)// && intersectedTile.roomWall == false)
            {
                removeTileTexture(intersectedTile.id);
                changeTileTexture(intersectedTile.id, selectedTexId.id, atlas_floor_1, af1_numRows, af1_numCols);
                intersectedTile.textureID = selectedTexId.id;
                manageHalfPlanes();
            }
        }
        if (paintWall == true)
        {
            const intersectedTile = getIntersectedTile(event, camera);
            if (intersectedTile && isLeftMouseDown)
            {
                if (intersectedTile.extWall == true && intersectedTile.firstExtWall == true && intersectedTile.specialDouble == false
                    || intersectedTile.extWall == true && intersectedTile.doubleExtWall == true && intersectedTile.specialDouble == false)
                    //|| intersectedTile.doubleTopExtWall == true)
                {
                    intersectedTile.extWallTextId = selectedWallTexId.id;
                    addExternalWalls();
                }
                // else if (intersectedTile.roomWall == true || intersectedTile.doubleTopRoomWall == true)
                // {
                //     console.log(selectedWallTexId.id);
                //     intersectedTile.roomWallTexId = selectedWallTexId.id;
                //     const neighbors = getNeighbors(intersectedTile.id, gridSize, gridSize, 1);
                //     roomWallTexture(intersectedTile.id, neighbors, selectedWallTexId.id);
                // }
            }
        }
    }
}

export function initNeighborArray()
{
    let i = 0;
    const tileCount = gridSize * gridSize;

    while (i < tileCount)
    {
        neighborArray.push(getNeighbors(i, gridSize, gridSize, 1));
        i++;
    }
}

export function addExternalWalls()
{
    doubleTopExtWallPlanes.forEach((plane) =>
    {
        scene.remove(plane.plane);
    }); 
    doubleTopExtWallPlanes.length = 0;
    doubleTopExtWallPlanes = [];

    const tilesToChange = tiles.filter(tile => tile.doubleTopExtWall || tile.extWall || tile.firstExtWall || tile.doubleExtWall || tile.thirdExtWall || tile.specialDouble);
    
    tilesToChange.forEach(tile =>
    {
        if (tile.doubleTopExtWall == true)
        {
            removeTileDoubleTopExtWall(tile.id);
        }

        tile.extWall = false;
        tile.firstExtWall = false;
        tile.doubleExtWall = false;
        tile.thirdExtWall = false;
        tile.specialDouble = false;

        if (tile.active)
        {
            removeTileColor(tile.id);
            setTilePlaneSize(tile.id, planeSize);
            changeTileTexture(tile.id, tile.textureID, atlas_floor_1, af1_numRows, af1_numCols);
        } else
        {
            removeTileTexture(tile.id);
            setTilePlaneSize(tile.id, planeSize);
            changeTileColor(tile.id, 0x282e3b);
        }
    });


    activeTiles.forEach((tileId) =>
    {
        const neighbors = neighborArray[tileId];

        neighbors.forEach((neighborId) =>
        {
            const neighborTile = tiles.find((t) => t.id === neighborId);

            if (!neighborTile.active && !neighborTile.extWall)
            {
                removeTileColor(neighborTile.id);
                setTilePlaneSize(neighborTile.id, 1);
                neighborTile.extWall = true;
            }
        });
    });

    activeTiles.forEach((tileId) =>
    {
        const neighbors = neighborArray[tileId];

        const doubleWallId = neighbors[4] + gridSize;
        const thirdWallId = doubleWallId + gridSize;
        
        const leftId = neighbors[4] - 1;
        const rightId = neighbors[4] + 1;

        const leftDoubleWallId = leftId + gridSize;
        const rightDoubleWallId = rightId + gridSize;

        const leftThirdWallId = leftDoubleWallId + gridSize;
        const rightThirdWallId = rightDoubleWallId + gridSize;

        if (isTileExtWall(neighbors[4]))
        {
            if (!isTileActive(doubleWallId)
                    && !isTileRoomWall(doubleWallId) && !isTileDoubleExtWall(doubleWallId))
            {
                removeTileColor(doubleWallId);
                setTileExtWall(doubleWallId);
                setTileDoubleExtWall(doubleWallId);
            }

            if (!isTileExtWall(leftId - 1))
            {
                if (isTileExtWall(leftId) && !isTileExtWall(leftDoubleWallId) && !isTileExtWall(leftDoubleWallId)
                        && !isTileRoomWall(leftDoubleWallId) && !isTileDoubleExtWall(leftDoubleWallId)
                        && !isTileDoubleExtWall(leftId))
                {
                    removeTileColor(leftDoubleWallId);
                    setTileExtWall(leftDoubleWallId);
                    setTileDoubleExtWall(leftDoubleWallId);
                    setTileSpecialDoubleExtWall(leftDoubleWallId);
                }
            }

            if (!isTileExtWall(rightId + 1))
            {
                if (isTileExtWall(rightId) && !isTileActive(rightDoubleWallId) && !isTileExtWall(rightDoubleWallId)
                        && !isTileRoomWall(rightDoubleWallId) && !isTileDoubleExtWall(rightDoubleWallId)
                        && !isTileDoubleExtWall(rightId))
                {
                    removeTileColor(rightDoubleWallId);
                    setTileExtWall(rightDoubleWallId);
                    setTileDoubleExtWall(rightDoubleWallId);
                    setTileSpecialDoubleExtWall(rightDoubleWallId);
                }
            }

            if (isTileDoubleExtWall(doubleWallId))
            {
                setTileFirstExtWall(neighbors[4]);

                if (!isTileActive(thirdWallId)
                    && !isTileRoomWall(thirdWallId) && !isTileDoubleExtWall(thirdWallId) && !isTileThirdExtWall(thirdWallId))
                {
                    removeTileColor(thirdWallId);
                    setTileExtWall(thirdWallId);
                    setTileThirdExtWall(thirdWallId);
                }

                if (!isTileActive(leftThirdWallId) && isTileExtWall(leftDoubleWallId)
                    && !isTileRoomWall(leftThirdWallId) && !isTileThirdExtWall(leftThirdWallId)
                    && !isTileThirdExtWall(leftDoubleWallId))
                {
                    removeTileColor(leftThirdWallId);
                    setTileExtWall(leftThirdWallId);
                    setTileThirdExtWall(leftThirdWallId);
                }

                if (!isTileActive(rightThirdWallId) && isTileExtWall(rightDoubleWallId)
                    && !isTileRoomWall(rightThirdWallId) && !isTileThirdExtWall(rightThirdWallId)
                    && !isTileThirdExtWall(rightDoubleWallId))
                {
                    removeTileColor(rightThirdWallId);
                    setTileExtWall(rightThirdWallId);
                    setTileThirdExtWall(rightThirdWallId);
                }

                const thirdNeighbors = neighborArray[thirdWallId];

                if (!isTileActive(thirdNeighbors[1]) && isTileExtWall(thirdNeighbors[0]))
                {
                    removeTileColor(thirdNeighbors[1]);
                    setTileExtWall(thirdNeighbors[1]);
                    setTileThirdExtWall(thirdNeighbors[1]);
                }
                if (!isTileActive(thirdNeighbors[6]) && isTileExtWall(thirdNeighbors[5]))
                {
                    removeTileColor(thirdNeighbors[6]);
                    setTileExtWall(thirdNeighbors[6]);
                    setTileThirdExtWall(thirdNeighbors[6]);
                }

                if (!isTileThirdExtWall(thirdWallId))
                {
                    setTileSpecialDoubleExtWall(doubleWallId);
                }
            }
        }

    });

    let tempArray = [];

    activeTiles.forEach((tileId) =>
    {
        const neighbors = neighborArray[tileId];

        if (isTileExtWall(neighbors[3]) && !isTileDoubleExtWall(neighbors[3]) &&
                !isTileThirdExtWall(neighbors[3]))
        {
            setTileDoubleTopExtWall(tileId);
            tempArray = [];

            const geometry = new THREE.PlaneGeometry(1, 1);
            const material = new THREE.MeshBasicMaterial({
            transparent: true,
            opacity: 0.3
            });
            let plane = new THREE.Mesh(geometry, material);
            plane.position.x = getTilePosX(tileId);
            plane.position.z = getTilePosZ(tileId);
            plane.position.y = 0.009;
            plane.rotation.x = -Math.PI / 2;
            tempArray.id = tileId;
            tempArray.plane = plane;
            doubleTopExtWallPlanes.push(tempArray);
            scene.add(doubleTopExtWallPlanes[doubleTopExtWallPlanes.length - 1].plane);
        }
    });

    tiles.filter(tile => tile.extWall === true || tile.doubleTopExtWall === true).forEach((tile) =>
    {
        const wallNeighbors = neighborArray[tile.id];

        extWallTexture(tile.id, wallNeighbors, tile.extWallTextId);
    });
}

function updateDoubleTopExtWallPlane(tileId, texID, atlas, numRows, numCols)
{
    let planeObj = doubleTopExtWallPlanes.find(obj => obj.id === tileId);

    if (planeObj)
    {
        const texture = createTextureFromAtlas(atlas, texID, numRows, numCols);
        planeObj.plane.material.map = texture;
        planeObj.plane.material.transparent = true;
        planeObj.plane.material.opacity = 0.4;
        planeObj.plane.material.needsUpdate = true;
    }
}

export function extWallTexture(tileId, neighbors, texId)
{
    //[0] = down left
    //[1] = left
    //[2] = up left
    //[3] = down
    //[4] = up
    //[5] = down right
    //[6] = right
    //[7] = up right

    texId = texId;
    const first = isTileFirstExtWall(tileId);
    const double = isTileDoubleExtWall(tileId);
    const special = isTileSpecialDoubleExtWall(tileId);

    if (first)
    {
        changeTileTexture(tileId, texId + aw1_numCols, atlas_wall_1, aw1_numRows, aw1_numCols);
    }
    else if (double && !special)
    {
        changeTileTexture(tileId, texId, atlas_wall_1, aw1_numRows, aw1_numCols);
    }
    else if (!isTileExtWall(neighbors[4], true, first, double, special) &&
            isTileExtWall(neighbors[1], true, first, double, special)
            && isTileExtWall(neighbors[6], true, first, double, special) &&
            !isTileExtWall(neighbors[3], true, first, double, special))
    {
        if (isDoubleTopExtWall(tileId))
        {
            updateDoubleTopExtWallPlane(tileId, 0 + texId, atlas_arma_1, aa1_numRows, aa1_numCols);
        }
        else
        {
            changeTileTexture(tileId, 0 + texId, atlas_arma_1, aa1_numRows, aa1_numCols);
        }
    }
    else if (isTileExtWall(neighbors[4], true, first, double, special) &&
                !isTileExtWall(neighbors[1], true, first, double, special) &&
                !isTileExtWall(neighbors[6], true, first, double, special) &&
                isTileExtWall(neighbors[3], true, first, double, special))
    {
        if (isDoubleTopExtWall(tileId))
        {
            updateDoubleTopExtWallPlane(tileId, 1 + texId, atlas_arma_1, aa1_numRows, aa1_numCols);
        }
        else
        {
            changeTileTexture(tileId, 1 + texId, atlas_arma_1, aa1_numRows, aa1_numCols);
        }
    }
    else if (!isTileExtWall(neighbors[4], true, first, double, special) &&
                !isTileExtWall(neighbors[1], true, first, double, special) &&
                isTileExtWall(neighbors[6], true, first, double, special) &&
                 isTileExtWall(neighbors[3], true, first, double, special) &&
                 !isTileExtWall(neighbors[5], true, first, double, special))
    {
        if (isDoubleTopExtWall(tileId))
        {
            updateDoubleTopExtWallPlane(tileId, 2 + texId, atlas_arma_1, aa1_numRows, aa1_numCols);
        }
        else
        {
            changeTileTexture(tileId, 2 + texId, atlas_arma_1, aa1_numRows, aa1_numCols);
        }
    }
    else if (!isTileExtWall(neighbors[4], true, first, double, special) &&
                isTileExtWall(neighbors[1], true, first, double, special) &&
                !isTileExtWall(neighbors[6], true, first, double, special) &&
                !isTileExtWall(neighbors[0], true, first, double, special) &&
                isTileExtWall(neighbors[3], true, first, double, special))
    {
        if (isDoubleTopExtWall(tileId))
        {
            updateDoubleTopExtWallPlane(tileId, 3 + texId, atlas_arma_1, aa1_numRows, aa1_numCols);
        }
        else
        {
            changeTileTexture(tileId, 3 + texId, atlas_arma_1, aa1_numRows, aa1_numCols);
        }
    }
    else if (!isTileExtWall(neighbors[2], true, first, double, special) &&
                isTileExtWall(neighbors[4], true, first, double, special) &&
                isTileExtWall(neighbors[1], true, first, double, special) &&
                !isTileExtWall(neighbors[6], true, first, double, special) &&
                !isTileExtWall(neighbors[3], true, first, double, special))
    {
        if (isDoubleTopExtWall(tileId))
        {
            updateDoubleTopExtWallPlane(tileId, 4 + texId, atlas_arma_1, aa1_numRows, aa1_numCols);
        }
        else
        {
            changeTileTexture(tileId, 4 + texId, atlas_arma_1, aa1_numRows, aa1_numCols);
        }
    }
    else if (isTileExtWall(neighbors[4], true, first, double, special) &&
                !isTileExtWall(neighbors[7], true, first, double, special) &&
                !isTileExtWall(neighbors[1], true, first, double, special)
                && isTileExtWall(neighbors[6], true, first, double, special) &&
                !isTileExtWall(neighbors[3], true, first, double, special))
    {
        if (isDoubleTopExtWall(tileId))
        {
            updateDoubleTopExtWallPlane(tileId, 5 + texId, atlas_arma_1, aa1_numRows, aa1_numCols);
        }
        else
        {
            changeTileTexture(tileId, 5 + texId, atlas_arma_1, aa1_numRows, aa1_numCols);
        }
    }
    //------
    else if (!isTileExtWall(neighbors[4], true, first, double, special) &&
                !isTileExtWall(neighbors[1], true, first, double, special) &&
                isTileExtWall(neighbors[6], true, first, double, special) &&
            isTileExtWall(neighbors[3], true, first, double, special) &&
            isTileExtWall(neighbors[5], true, first, double, special))
    {
        if (isDoubleTopExtWall(tileId))
        {
            updateDoubleTopExtWallPlane(tileId, 12 + texId, atlas_arma_1, aa1_numRows, aa1_numCols);
        }
        else
        {
            changeTileTexture(tileId, 12 + texId, atlas_arma_1, aa1_numRows, aa1_numCols);
        }
    }
    else if (isTileExtWall(neighbors[4], true, first, double, special) &&
                isTileExtWall(neighbors[7], true, first, double, special) &&
                !isTileExtWall(neighbors[1], true, first, double, special) &&
                isTileExtWall(neighbors[6], true, first, double, special) &&
                !isTileExtWall(neighbors[3], true, first, double, special))
    {
        if (isDoubleTopExtWall(tileId))
        {
            updateDoubleTopExtWallPlane(tileId, 13 + texId, atlas_arma_1, aa1_numRows, aa1_numCols);
        }
        else
        {
            changeTileTexture(tileId, 13 + texId, atlas_arma_1, aa1_numRows, aa1_numCols);
        }
    }
    else if (isTileExtWall(neighbors[2], true, first, double, special) &&
                isTileExtWall(neighbors[4], true, first, double, special) &&
                isTileExtWall(neighbors[1], true, first, double, special) &&
                !isTileExtWall(neighbors[6], true, first, double, special) &&
                !isTileExtWall(neighbors[3], true, first, double, special))
    {
        if (isDoubleTopExtWall(tileId))
        {
            updateDoubleTopExtWallPlane(tileId, 10 + texId, atlas_arma_1, aa1_numRows, aa1_numCols);
        }
        else
        {
            changeTileTexture(tileId, 10 + texId, atlas_arma_1, aa1_numRows, aa1_numCols);
        }
    }
    else if (!isTileExtWall(neighbors[4], true, first, double, special) &&
                isTileExtWall(neighbors[1], true, first, double, special) &&
                !isTileExtWall(neighbors[6], true, first, double, special) &&
                isTileExtWall(neighbors[0], true, first, double, special) &&
                isTileExtWall(neighbors[3], true, first, double, special))
    {
        if (isDoubleTopExtWall(tileId))
        {
            updateDoubleTopExtWallPlane(tileId, 11 + texId, atlas_arma_1, aa1_numRows, aa1_numCols);
        }
        else
        {
            changeTileTexture(tileId, 11 + texId, atlas_arma_1, aa1_numRows, aa1_numCols);
        }
    }
    //------
    else if (isTileExtWall(neighbors[4], true, first, double, special) &&
                !isTileExtWall(neighbors[1], true, first, double, special) &&
                isTileExtWall(neighbors[6], true, first, double, special) &&
                isTileExtWall(neighbors[3], true, first, double, special))
    {
        if (isDoubleTopExtWall(tileId))
        {
            if (isTileDoubleExtWall(tileId) && isTileExtWall(neighbors[5], true))
            {
                updateDoubleTopExtWallPlane(tileId, 12 + texId, atlas_arma_1, aa1_numRows, aa1_numCols);
            }
            else
            {
                updateDoubleTopExtWallPlane(tileId, 8 + texId, atlas_arma_1, aa1_numRows, aa1_numCols);
            }
        }
        else
        {
            // if (isTileDoubleExtWall(tileId) && isTileExtWall(neighbors[5], true))
            // {
            //     changeTileTexture(tileId, 1 + texId, atlas_arma_1, aa1_numRows, aa1_numCols);
            // }
            // else
            // {
            //     if (isTileActive(neighbors[1]))
            //     {
                    changeTileTexture(tileId, 8 + texId, atlas_arma_1, aa1_numRows, aa1_numCols);
                // }
                // else
                // {
                //     changeTileTexture(tileId, 1 + texId, atlas_arma_1, aa1_numRows, aa1_numCols);
                // }
            //}
        }
    }
    else if (!isTileExtWall(neighbors[4], true, first, double, special) &&
                isTileExtWall(neighbors[1], true, first, double, special) &&
                isTileExtWall(neighbors[6], true, first, double, special) &&
                isTileExtWall(neighbors[3], true, first, double, special))
    {
        if (isDoubleTopExtWall(tileId))
        {
            updateDoubleTopExtWallPlane(tileId, 6 + texId, atlas_arma_1, aa1_numRows, aa1_numCols);
        }
        else
        {
            changeTileTexture(tileId, 6 + texId, atlas_arma_1, aa1_numRows, aa1_numCols);
        }
    }
    else if (isTileExtWall(neighbors[4], true, first, double, special) &&
                isTileExtWall(neighbors[1], true, first, double, special) &&
                !isTileExtWall(neighbors[6], true, first, double, special) &&
                isTileExtWall(neighbors[3], true, first, double, special))
    {
        if (isDoubleTopExtWall(tileId))
        {
            if (isTileDoubleExtWall(tileId) && isTileExtWall(neighbors[0], true))
            {
                updateDoubleTopExtWallPlane(tileId, 11 + texId, atlas_arma_1, aa1_numRows, aa1_numCols);
            }
            else
            {
                updateDoubleTopExtWallPlane(tileId, 9 + texId, atlas_arma_1, aa1_numRows, aa1_numCols);
            }
        }
        else
        {
            // if (isTileDoubleExtWall(tileId) && isTileExtWall(neighbors[0], true))
            // {
            //     changeTileTexture(tileId, 1 + texId, atlas_arma_1, aa1_numRows, aa1_numCols);
            // }
            // else
            // {
            //     if (isTileActive(neighbors[6]))
            //     {
                    changeTileTexture(tileId, 9 + texId, atlas_arma_1, aa1_numRows, aa1_numCols);
            //     }
            //     else
            //     {
            //         changeTileTexture(tileId, 1 + texId, atlas_arma_1, aa1_numRows, aa1_numCols);
            //     }
            // }
        }
    }
    else if (isTileExtWall(neighbors[4], true, first, double, special) &&
                isTileExtWall(neighbors[1], true, first, double, special) &&
                isTileExtWall(neighbors[6], true, first, double, special) &&
                !isTileExtWall(neighbors[3], true, first, double, special))
    {
        if (isDoubleTopExtWall(tileId))
        {
            updateDoubleTopExtWallPlane(tileId, 7 + texId, atlas_arma_1, aa1_numRows, aa1_numCols);
        }
        else
        {
            changeTileTexture(tileId, 7 + texId, atlas_arma_1, aa1_numRows, aa1_numCols);
        }
    }
    //-----
    else if (isTileExtWall(neighbors[4], true, first, double, special) &&
                !isTileExtWall(neighbors[1], true, first, double, special) &&
                !isTileExtWall(neighbors[6], true, first, double, special) &&
                !isTileExtWall(neighbors[3], true, first, double, special))
    {
        if (isDoubleTopExtWall(tileId))
        {
            updateDoubleTopExtWallPlane(tileId, 14 + texId, atlas_arma_1, aa1_numRows, aa1_numCols);
        }
        else
        {
            changeTileTexture(tileId, 14 + texId, atlas_arma_1, aa1_numRows, aa1_numCols);
        }
    }
    else if (!isTileExtWall(neighbors[4], true, first, double, special) &&
                !isTileExtWall(neighbors[1], true, first, double, special) &&
                isTileExtWall(neighbors[6], true, first, double, special) &&
                !isTileExtWall(neighbors[3], true, first, double, special))
    {
        if (isDoubleTopExtWall(tileId))
        {
            updateDoubleTopExtWallPlane(tileId, 15 + texId, atlas_arma_1, aa1_numRows, aa1_numCols);
        }
        else
        {
            changeTileTexture(tileId, 15 + texId, atlas_arma_1, aa1_numRows, aa1_numCols);
        }
    }
    else if (!isTileExtWall(neighbors[4], true, first, double, special) &&
                !isTileExtWall(neighbors[1], true, first, double, special) &&
                !isTileExtWall(neighbors[6], true, first, double, special) &&
                isTileExtWall(neighbors[3], true, first, double, special))
    {
        if (isDoubleTopExtWall(tileId))
        {
            updateDoubleTopExtWallPlane(tileId, 16 + texId, atlas_arma_1, aa1_numRows, aa1_numCols);
        }
        else
        {
            changeTileTexture(tileId, 16 + texId, atlas_arma_1, aa1_numRows, aa1_numCols);
        }
    }
    else if (!isTileExtWall(neighbors[4], true, first, double, special) &&
                isTileExtWall(neighbors[1], true, first, double, special) &&
                !isTileExtWall(neighbors[6], true, first, double, special) &&
                !isTileExtWall(neighbors[3], true, first, double, special))
    {
        if (isDoubleTopExtWall(tileId))
        {
            updateDoubleTopExtWallPlane(tileId, 17 + texId, atlas_arma_1, aa1_numRows, aa1_numCols);
        }
        else
        {
            changeTileTexture(tileId, 17 + texId, atlas_arma_1, aa1_numRows, aa1_numCols);
        }
    }
    //-----
    else if (isTileExtWall(neighbors[4], true, first, double, special) &&
                isTileExtWall(neighbors[1], true, first, double, special) &&
                isTileExtWall(neighbors[6], true, first, double, special) &&
                isTileExtWall(neighbors[3], true, first, double, special))
    {
        if (isDoubleTopExtWall(tileId))
        {
            if (isTileDoubleExtWall(tileId) && !isTileDoubleExtWall(neighbors[3], true))
            {
                updateDoubleTopExtWallPlane(tileId, 6 + texId, atlas_arma_1, aa1_numRows, aa1_numCols);
            }
            else
            {
                updateDoubleTopExtWallPlane(tileId, 23 + texId, atlas_arma_1, aa1_numRows, aa1_numCols);
            }
        }
        else
        {
            // if (isTileDoubleExtWall(tileId) && !isTileDoubleExtWall(neighbors[3], true))
            // {
            //     changeTileTexture(tileId, 6 + texId, atlas_arma_1, aa1_numRows, aa1_numCols);
            // }
            // else
            // {
                changeTileTexture(tileId, 23 + texId, atlas_arma_1, aa1_numRows, aa1_numCols);
            //}
        }
    }
    //-----
    else if (!isTileExtWall(neighbors[4], true, first, double, special) &&
                !isTileExtWall(neighbors[1], true, first, double, special) &&
                !isTileExtWall(neighbors[6], true, first, double, special) &&
                !isTileExtWall(neighbors[3], true, first, double, special))
    {
        if (isDoubleTopExtWall(tileId))
        {
            updateDoubleTopExtWallPlane(tileId, 18 + texId, atlas_arma_1, aa1_numRows, aa1_numCols);
        }
        else
        {
            changeTileTexture(tileId, 18 + texId, atlas_arma_1, aa1_numRows, aa1_numCols);
        }
    }
}


function updateDoubleTopRoomWallPlane(tileId, texID, atlas, numRows, numCols)
{
    let planeObj = doubleTopRoomWallPlanes.find(obj => obj.id === tileId);

    if (planeObj)
    {
        const texture = createTextureFromAtlas(atlas, texID, numRows, numCols);
        planeObj.plane.material.map = texture;
        planeObj.plane.material.transparent = true;
        planeObj.plane.material.opacity = 0.4;
        planeObj.plane.material.needsUpdate = true;
    }
}

function updateRoomWallPlane(tileId, texID, atlas, numRows, numCols)
{
    let planeObj = roomPlanes.find(obj => obj.id === tileId);

    if (planeObj)
    {
        const texture = createTextureFromAtlas(atlas, texID, numRows, numCols);
        planeObj.plane.material.map = texture;
        planeObj.plane.material.transparent = true;
        planeObj.plane.material.opacity = 1.0;
        planeObj.plane.material.needsUpdate = true;
    }
}


export function roomWallTexture(tileId, neighbors, texId)
{
    //[0] = down left
    //[1] = left
    //[2] = up left
    //[3] = down
    //[4] = up
    //[5] = down right
    //[6] = right
    //[7] = up right

    texId = texId * 24;



    if (!isTileRoomWall(neighbors[4], true) &&
            isTileRoomWall(neighbors[1], true) && isTileRoomWall(neighbors[6], true) &&
            !isTileRoomWall(neighbors[3], true))
    {
        if (isTileDoubleRoomWall(tileId))
        {
            updateDoubleTopRoomWallPlane(tileId, 0 + texId, atlas_arma_1, aa1_numRows, aa1_numCols);
        }
        else
        {
            updateRoomWallPlane(tileId, 0 + texId, atlas_room_1, ar1_numRows, ar1_numCols);
        }
    }
    else if (isTileRoomWall(neighbors[4], true) &&
                !isTileRoomWall(neighbors[1], true) && !isTileRoomWall(neighbors[6], true) &&
                isTileRoomWall(neighbors[3], true))
    {
        if (isTileDoubleRoomWall(tileId))
        {
            updateDoubleTopRoomWallPlane(tileId, 1 + texId, atlas_arma_1, aa1_numRows, aa1_numCols);
        }
        else
        {
            updateRoomWallPlane(tileId, 1 + texId, atlas_room_1, ar1_numRows, ar1_numCols);
        }
    }
    else if (!isTileRoomWall(neighbors[4], true) &&
                !isTileRoomWall(neighbors[1], true) && isTileRoomWall(neighbors[6], true) &&
                 isTileRoomWall(neighbors[3], true) && !isTileRoomWall(neighbors[5], true))
    {
        if (isTileDoubleRoomWall(tileId))
        {
            updateDoubleTopRoomWallPlane(tileId, 2 + texId, atlas_arma_1, aa1_numRows, aa1_numCols);
        }
        else
        {
            updateRoomWallPlane(tileId, 2 + texId, atlas_room_1, ar1_numRows, ar1_numCols);
        }
    }
    else if (!isTileRoomWall(neighbors[4], true) &&
                isTileRoomWall(neighbors[1], true) && !isTileRoomWall(neighbors[6], true) &&
                !isTileRoomWall(neighbors[0], true) && isTileRoomWall(neighbors[3], true))
    {
        if (isTileDoubleRoomWall(tileId))
        {
            updateDoubleTopRoomWallPlane(tileId, 3 + texId, atlas_arma_1, aa1_numRows, aa1_numCols);
        }
        else
        {
            updateRoomWallPlane(tileId, 3 + texId, atlas_room_1, ar1_numRows, ar1_numCols);
        }
    }
    else if (!isTileRoomWall(neighbors[2], true) && isTileRoomWall(neighbors[4], true) &&
                isTileRoomWall(neighbors[1], true) && !isTileRoomWall(neighbors[6], true) &&
                !isTileRoomWall(neighbors[3], true))
    {
        if (isTileDoubleRoomWall(tileId))
        {
            updateDoubleTopRoomWallPlane(tileId, 4 + texId, atlas_arma_1, aa1_numRows, aa1_numCols);
        }
        else
        {
            updateRoomWallPlane(tileId, 4 + texId, atlas_room_1, ar1_numRows, ar1_numCols);
        }
    }
    else if (isTileRoomWall(neighbors[4], true) && !isTileRoomWall(neighbors[7], true) &&
                !isTileRoomWall(neighbors[1], true) && isTileRoomWall(neighbors[6], true) &&
                !isTileRoomWall(neighbors[3], true))
    {
        if (isTileDoubleRoomWall(tileId))
        {
            updateDoubleTopRoomWallPlane(tileId, 5 + texId, atlas_arma_1, aa1_numRows, aa1_numCols);
        }
        else
        {
            updateRoomWallPlane(tileId, 5 + texId, atlas_room_1, ar1_numRows, ar1_numCols);
        }
    }
    //------
    else if (!isTileRoomWall(neighbors[4], true) &&
                !isTileRoomWall(neighbors[1], true) && isTileRoomWall(neighbors[6], true) &&
            isTileRoomWall(neighbors[3], true) && isTileRoomWall(neighbors[5], true))
    {
        if (isTileDoubleRoomWall(tileId))
        {
            updateDoubleTopRoomWallPlane(tileId, 12 + texId, atlas_arma_1, aa1_numRows, aa1_numCols);
        }
        else
        {
            updateRoomWallPlane(tileId, 12 + texId, atlas_room_1, ar1_numRows, ar1_numCols);
        }
    }
    else if (isTileRoomWall(neighbors[4], true) && isTileRoomWall(neighbors[7], true) &&
                !isTileRoomWall(neighbors[1], true) && isTileRoomWall(neighbors[6], true) &&
            !isTileRoomWall(neighbors[3], true))
    {
        if (isTileDoubleRoomWall(tileId))
        {
            updateDoubleTopRoomWallPlane(tileId, 13 + texId, atlas_arma_1, aa1_numRows, aa1_numCols);
        }
        else
        {
            updateRoomWallPlane(tileId, 13 + texId, atlas_room_1, ar1_numRows, ar1_numCols);
        }
    }
    else if (isTileRoomWall(neighbors[2], true) && isTileRoomWall(neighbors[4], true) &&
                isTileRoomWall(neighbors[1], true) && !isTileRoomWall(neighbors[6], true) &&
            !isTileRoomWall(neighbors[3], true))
    {
        if (isTileDoubleRoomWall(tileId))
        {
            updateDoubleTopRoomWallPlane(tileId, 10 + texId, atlas_arma_1, aa1_numRows, aa1_numCols);
        }
        else
        {
            updateRoomWallPlane(tileId, 10 + texId, atlas_room_1, ar1_numRows, ar1_numCols);
        }
    }
    else if (!isTileRoomWall(neighbors[4], true) &&
                isTileRoomWall(neighbors[1], true) && !isTileRoomWall(neighbors[6], true) &&
            isTileRoomWall(neighbors[0], true) && isTileRoomWall(neighbors[3], true))
    {
        if (isTileDoubleRoomWall(tileId))
        {
            updateDoubleTopRoomWallPlane(tileId, 11 + texId, atlas_arma_1, aa1_numRows, aa1_numCols);
        }
        else
        {
            updateRoomWallPlane(tileId, 11 + texId, atlas_room_1, ar1_numRows, ar1_numCols);
        }
    }
    //------
    else if (isTileRoomWall(neighbors[4], true) &&
                !isTileRoomWall(neighbors[1], true) && isTileRoomWall(neighbors[6], true) &&
            isTileRoomWall(neighbors[3], true))
    {
        if (isTileDoubleRoomWall(tileId))
        {
            if (isTileDoubleExtWall(tileId) && isTileRoomWall(neighbors[5], true))
            {
                updateDoubleTopRoomWallPlane(tileId, 12 + texId, atlas_arma_1, aa1_numRows, aa1_numCols);
            }
            else
            {
                updateDoubleTopRoomWallPlane(tileId, 8 + texId, atlas_arma_1, aa1_numRows, aa1_numCols);
            }
        }
        else
        {
            if (isTileDoubleExtWall(tileId) && isTileRoomWall(neighbors[5], true))
            {
                updateRoomWallPlane(tileId, 12 + texId, atlas_room_1, ar1_numRows, ar1_numCols);
            }
            else
            {
                updateRoomWallPlane(tileId, 8 + texId, atlas_room_1, ar1_numRows, ar1_numCols);
            }
        }
    }
    else if (!isTileRoomWall(neighbors[4], true) &&
                isTileRoomWall(neighbors[1], true) && isTileRoomWall(neighbors[6], true) &&
            isTileRoomWall(neighbors[3], true))
    {
        if (isTileDoubleRoomWall(tileId))
        {
            updateDoubleTopRoomWallPlane(tileId, 6 + texId, atlas_arma_1, aa1_numRows, aa1_numCols);
        }
        else
        {
            updateRoomWallPlane(tileId, 6 + texId, atlas_room_1, ar1_numRows, ar1_numCols);
        }
    }
    else if (isTileRoomWall(neighbors[4], true) &&
                isTileRoomWall(neighbors[1], true) && !isTileRoomWall(neighbors[6], true) &&
            isTileRoomWall(neighbors[3], true))
    {
        if (isTileDoubleRoomWall(tileId))
        {
            if (isTileDoubleExtWall(tileId) && isTileRoomWall(neighbors[0], true))
            {
                updateDoubleTopRoomWallPlane(tileId, 11 + texId, atlas_arma_1, aa1_numRows, aa1_numCols);
            }
            else
            {
                updateDoubleTopRoomWallPlane(tileId, 9 + texId, atlas_arma_1, aa1_numRows, aa1_numCols);
            }
        }
        else
        {
            if (isTileDoubleExtWall(tileId) && isTileRoomWall(neighbors[0], true))
            {
                updateRoomWallPlane(tileId, 11 + texId, atlas_room_1, ar1_numRows, ar1_numCols);
            }
            else
            {
                updateRoomWallPlane(tileId, 9 + texId, atlas_room_1, ar1_numRows, ar1_numCols);
            }
        }
    }
    else if (isTileRoomWall(neighbors[4], true) &&
                isTileRoomWall(neighbors[1], true) && isTileRoomWall(neighbors[6], true) &&
            !isTileRoomWall(neighbors[3], true))
    {
        if (isTileDoubleRoomWall(tileId))
        {
            updateDoubleTopRoomWallPlane(tileId, 7 + texId, atlas_arma_1, aa1_numRows, aa1_numCols);
        }
        else
        {
            updateRoomWallPlane(tileId, 7 + texId, atlas_room_1, ar1_numRows, ar1_numCols);
        }
    }
    //-----
    else if (isTileRoomWall(neighbors[4], true) &&
                !isTileRoomWall(neighbors[1], true) && !isTileRoomWall(neighbors[6], true) &&
                !isTileRoomWall(neighbors[3], true))
    {
        if (isTileDoubleRoomWall(tileId))
        {
            updateDoubleTopRoomWallPlane(tileId, 14 + texId, atlas_arma_1, aa1_numRows, aa1_numCols);
        }
        else
        {
            updateRoomWallPlane(tileId, 14 + texId, atlas_room_1, ar1_numRows, ar1_numCols);
        }
    }
    else if (!isTileRoomWall(neighbors[4], true) &&
                !isTileRoomWall(neighbors[1], true) && isTileRoomWall(neighbors[6], true) &&
                !isTileRoomWall(neighbors[3], true))
    {
        if (isTileDoubleRoomWall(tileId))
        {
            updateDoubleTopRoomWallPlane(tileId, 15 + texId, atlas_arma_1, aa1_numRows, aa1_numCols);
        }
        else
        {
            updateRoomWallPlane(tileId, 15 + texId, atlas_room_1, ar1_numRows, ar1_numCols);
        }
    }
    else if (!isTileRoomWall(neighbors[4], true) &&
                !isTileRoomWall(neighbors[1], true) && !isTileRoomWall(neighbors[6], true) &&
                isTileRoomWall(neighbors[3], true))
    {
        if (isTileDoubleRoomWall(tileId))
        {
            updateDoubleTopRoomWallPlane(tileId, 16 + texId, atlas_arma_1, aa1_numRows, aa1_numCols);
        }
        else
        {
            updateRoomWallPlane(tileId, 16 + texId, atlas_room_1, ar1_numRows, ar1_numCols);
        }
    }
    else if (!isTileRoomWall(neighbors[4], true) &&
                isTileRoomWall(neighbors[1], true) && !isTileRoomWall(neighbors[6], true) &&
                !isTileRoomWall(neighbors[3], true))
    {
        if (isTileDoubleRoomWall(tileId))
        {
            updateDoubleTopRoomWallPlane(tileId, 17 + texId, atlas_arma_1, aa1_numRows, aa1_numCols);
        }
        else
        {
            updateRoomWallPlane(tileId, 17 + texId, atlas_room_1, ar1_numRows, ar1_numCols);
        }
    }
    //-----
    else if (isTileRoomWall(neighbors[4], true) &&
                isTileRoomWall(neighbors[1], true) && isTileRoomWall(neighbors[6], true) &&
                isTileRoomWall(neighbors[3], true))
    {
        if (isTileDoubleRoomWall(tileId))
        {
            if (isTileDoubleExtWall(tileId) && !isTileDoubleExtWall(neighbors[3], true))
            {
                updateDoubleTopRoomWallPlane(tileId, 6 + texId, atlas_arma_1, aa1_numRows, aa1_numCols);
            }
            else
            {
                updateDoubleTopRoomWallPlane(tileId, 23 + texId, atlas_arma_1, aa1_numRows, aa1_numCols);
            }
        }
        else
        {
            if (isTileDoubleExtWall(tileId) && !isTileDoubleExtWall(neighbors[3], true))
            {
                updateRoomWallPlane(tileId, 6 + texId, atlas_room_1, ar1_numRows, ar1_numCols);
            }
            else
            {
                updateRoomWallPlane(tileId, 23 + texId, atlas_room_1, ar1_numRows, ar1_numCols);
            }
        }
    }
    //-----
    else if (!isTileRoomWall(neighbors[4], true) &&
                !isTileRoomWall(neighbors[1], true) && !isTileRoomWall(neighbors[6], true) &&
                !isTileRoomWall(neighbors[3], true))
    {
        if (isTileDoubleRoomWall(tileId))
        {
            updateDoubleTopRoomWallPlane(tileId, 18 + texId, atlas_arma_1, aa1_numRows, aa1_numCols);
        }
        else
        {
            updateRoomWallPlane(tileId, 18 + texId, atlas_room_1, ar1_numRows, ar1_numCols);
        }
    }
}


// CREATE A FUNCTION TO SPAWN 2 HALF PLANES AROUND THE ROOM WALLS THAT TAKE THE TEXTURE OF THE CLOSEST TILE
// CALL IT EACH TIME WE PAINT THE FLOOR OR CREATE/DELETE ROOMS
    //[0] = down left
    //[1] = left
    //[2] = up left
    //[3] = down
    //[4] = up
    //[5] = down right
    //[6] = right
    //[7] = up right


export function manageHalfPlanes()
{
    let roomWallTiles = tiles.filter(tile => tile.roomWall === true);
    let i = 0;

    halfPlanes.forEach((plane) =>
    {
        scene.remove(plane.plane);
    }); 
    halfPlanes.length = 0;
    halfPlanes = [];

    while (i < roomWallTiles.length)
    {
        const roomWallNeighbors = getNeighbors(roomWallTiles[i].id, gridSize, gridSize, 1);
        
        if (!isTileRoomWall(roomWallNeighbors[1]) && !isTileExtWall(roomWallNeighbors[1]) &&
                !isTileFirstExtWall(roomWallNeighbors[1]) && !isTileDoubleExtWall(roomWallNeighbors[1]))
        {
            createHalfPlane(roomWallTiles[i], roomWallNeighbors, 1);
        }

        if (!isTileRoomWall(roomWallNeighbors[6]) && !isTileExtWall(roomWallNeighbors[6]) &&
                !isTileFirstExtWall(roomWallNeighbors[6]) && !isTileDoubleExtWall(roomWallNeighbors[6]))
        {
            createHalfPlane(roomWallTiles[i], roomWallNeighbors, 2);
        }
        i++;
    }
}

export function createHalfPlane(tile, tileNeighbors, dir)
{
    if (dir == 1)
    {
        let tempArray = [];

        const geometry = new THREE.PlaneGeometry(0.5, 1);
        const material = new THREE.MeshBasicMaterial({
        transparent: false,
        opacity: 1
        });

        let plane = new THREE.Mesh(geometry, material);
        plane.position.x = (getTilePosX(tile.id)) - 0.25;
        plane.position.z = getTilePosZ(tile.id);
        plane.position.y = 0.004;
        plane.rotation.x = -Math.PI / 2;

        const texture = createTextureFromAtlas(atlas_floor_1, (tileTextureID(tileNeighbors[1])) * 2, af1_numRows, af1_numCols * 2);
        plane.material.map = texture;
        plane.material.needsUpdate = true;

        tempArray.id = tile.id;
        tempArray.plane = plane;
        halfPlanes.push(tempArray);
        scene.add(halfPlanes[halfPlanes.length - 1].plane);
    }
    else if (dir == 2)
    {
        let tempArray = [];

        const geometry = new THREE.PlaneGeometry(0.5, 1);
        const material = new THREE.MeshBasicMaterial({
        transparent: false,
        opacity: 1
        });

        let plane = new THREE.Mesh(geometry, material);
        plane.position.x = (getTilePosX(tile.id)) + 0.25;
        plane.position.z = getTilePosZ(tile.id);
        plane.position.y = 0.004;
        plane.rotation.x = -Math.PI / 2;

        const texture = createTextureFromAtlas(atlas_floor_1, (tileTextureID(tileNeighbors[6])) * 2 + 1, af1_numRows, af1_numCols * 2);
        plane.material.map = texture;
        plane.material.needsUpdate = true;


        tempArray.id = tile.id;
        tempArray.plane = plane;
        halfPlanes.push(tempArray);
        scene.add(halfPlanes[halfPlanes.length - 1].plane);
    }
}