import {tiles, gridSize} from './main.js';
import {planeSize} from './tile_init.js';
import {isLeftMouseDown} from './controls.js';
import {tileUI, tileAdd, tileRemove, tileSelect, dragSelect, roomUI, createRoom, createDoor, removeRoom, removeDoor,
        FreeTilesMin, FreeTilesPlu, propUI, addProp, modifyProp, deleteProp} from './UI.js';
import {getIntersectedTile, squareSelect, createSelectionPlane, updateSelectionPlane, removeSelectionPlane, 
        selectionPlane, getNeighbors, selectPlanesRemove} from './select.js';
import {isRoomCorrect, showFullRoom, removeFullRoom} from './rooms.js';
import {placeProp, removeCheckProp, removeSelectedProp, modifyPropPos, dragging} from './props.js';
import {createTextureFromAtlas, atlas_floor_1, af1_numCols, af1_numRows, atlas_arma_1, aa1_numCols, aa1_numRows} from './texture.js';


export let activeTiles = [];
export let roomCounter = 1;
export let inDragSelect = false;
export let dragSelectTile;
export let roomID = 2;
export let currentRoomID = 0;
export let roomToRemove = [];
let modifyTile = null;

  
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
  
    if (tile) {
        tile.plane.geometry = new THREE.PlaneGeometry(size, size);
        tile.plane.geometry.needsUpdate = true;
      }
}

function activateTile(tileId, action)
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

export function isTileExtWall(tileId)
{
    const tile = tiles.find((t) => t.id === tileId);

    if (tile && tile.extWall == true)
    {
        return (true);
    }
    return (false);
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

export function isTileRoomWall(tileId)
{
    const tile = tiles.find((t) => t.id === tileId);

    if (tile && tile.roomWall == true)
    {
        return (true);
    }
    return (false);
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

export function clearModifyTile()
{
    modifyTile = null;
}
  
export function buildTiles(event, camera)
{
    if (tileUI)
    {
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
                            isTileDoor(dragSelectedTiles[0].idArray[i].tempID) == false)
                        {
                            defTileRoomWall(dragSelectedTiles[0].idArray[i].tempID);
                            tempRoomArray.push(dragSelectedTiles[0].idArray[i].tempID);
                        }

                        if (isTileExtWall(dragSelectedTiles[0].idArray[i].tempID) == true ||
                                isTileActive(dragSelectedTiles[0].idArray[i].tempID) == true)
                        {
                            pushRoomID(dragSelectedTiles[0].idArray[i].tempID, roomCounter);
                        }
                        i++;
                    }
                    roomCounter = roomCounter + 1;
                    
                    i = 0;
                    while (i < tempRoomArray.length)
                    {
                        const roomNeighbors = getNeighbors(tempRoomArray[i], gridSize, gridSize, 1);
                        roomWallTexture(tempRoomArray[i], roomNeighbors);
                        i++;
                    }
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
                changeTileColor(intersectedTile.id, 0x3242a8);
                addDoor(intersectedTile.id);
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
                changeTileColor(intersectedTile.id, 0xffffff);
            }
        }
    }
    else if (propUI)
    {
        if (addProp)
        {
            const intersectedTile = getIntersectedTile(event, camera);

            if (intersectedTile)
            {
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

                    let i = 0;
                    let sharedIds = getTilePropSharedIds(intersectedTile.id);
                    deleteTilePropSharedIds(intersectedTile.id);
                    while (i < sharedIds.length)
                    {
                        setTileProp(sharedIds[i], false);
                        deleteTilePropType(sharedIds[i]);
                        deleteTilePropSharedIds(sharedIds[i]);
                        removePropId(sharedIds[i]);
                        i++;
                    }
                }
            }
        }
    }
}

function addExternalWalls()
{
    tiles.forEach((tile) =>
    {
        if (tile.extWall)
        {
            tile.extWall = false;

            if (tile.active)
            {
                removeTileColor(tile.id);
                setTilePlaneSize(tile.id, 1);
                changeTileTexture(tile.id, 6, atlas_floor_1, af1_numRows, af1_numCols);
            }
            else
            {
                removeTileTexture(tile.id);
                setTilePlaneSize(tile.id, planeSize);
                changeTileColor(tile.id, 0x282e3b);
            }
        }
    });
  
    activeTiles.forEach((tileId) =>
    {
        const neighbors = getNeighbors(tileId, gridSize, gridSize, 1);

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

    tiles.filter(tile => tile.extWall === true).forEach((tile) =>
    {
        const wallNeighbors = getNeighbors(tile.id, gridSize, gridSize, 1);
        extWallTexture(tile.id, wallNeighbors);
    });
}

function extWallTexture(tileId, neighbors)
{
    //[0] = down left
    //[1] = left
    //[2] = up left
    //[3] = down
    //[4] = up
    //[5] = down right
    //[6] = right
    //[7] = up right

    if (!isTileExtWall(neighbors[4]) &&
            isTileExtWall(neighbors[1]) && isTileExtWall(neighbors[6]) &&
            !isTileExtWall(neighbors[3]))
    {
        changeTileTexture(tileId, 0, atlas_arma_1, aa1_numRows, aa1_numCols);
    }
    else if (isTileExtWall(neighbors[4]) &&
                !isTileExtWall(neighbors[1]) && !isTileExtWall(neighbors[6]) &&
                isTileExtWall(neighbors[3]))
    {
        changeTileTexture(tileId, 1, atlas_arma_1, aa1_numRows, aa1_numCols);
    }
    else if (!isTileExtWall(neighbors[4]) &&
                !isTileExtWall(neighbors[1]) && isTileExtWall(neighbors[6]) &&
                 isTileExtWall(neighbors[3]) && !isTileExtWall(neighbors[5]))
    {
        changeTileTexture(tileId, 2, atlas_arma_1, aa1_numRows, aa1_numCols);
    }
    else if (!isTileExtWall(neighbors[4]) &&
                isTileExtWall(neighbors[1]) && !isTileExtWall(neighbors[6]) &&
                !isTileExtWall(neighbors[0]) && isTileExtWall(neighbors[3]))
    {
        
        changeTileTexture(tileId, 3, atlas_arma_1, aa1_numRows, aa1_numCols);
    }
    else if (!isTileExtWall(neighbors[2]) && isTileExtWall(neighbors[4]) &&
                isTileExtWall(neighbors[1]) && !isTileExtWall(neighbors[6]) &&
                !isTileExtWall(neighbors[3]))
    {
        
        changeTileTexture(tileId, 4, atlas_arma_1, aa1_numRows, aa1_numCols);
    }
    else if (isTileExtWall(neighbors[4]) && !isTileExtWall(neighbors[7]) &&
                !isTileExtWall(neighbors[1]) && isTileExtWall(neighbors[6]) &&
                !isTileExtWall(neighbors[3]))
    {
            changeTileTexture(tileId, 5, atlas_arma_1, aa1_numRows, aa1_numCols);
    }
    //------
    else if (!isTileExtWall(neighbors[4]) &&
                !isTileExtWall(neighbors[1]) && isTileExtWall(neighbors[6]) &&
            isTileExtWall(neighbors[3]) && isTileExtWall(neighbors[5]))
    {
        changeTileTexture(tileId, 12, atlas_arma_1, aa1_numRows, aa1_numCols);
    }
    else if (isTileExtWall(neighbors[4]) && isTileExtWall(neighbors[7]) &&
                !isTileExtWall(neighbors[1]) && isTileExtWall(neighbors[6]) &&
            !isTileExtWall(neighbors[3]))
    {
        changeTileTexture(tileId, 13, atlas_arma_1, aa1_numRows, aa1_numCols);
    }
    else if (isTileExtWall(neighbors[2]) && isTileExtWall(neighbors[4]) &&
                isTileExtWall(neighbors[1]) && !isTileExtWall(neighbors[6]) &&
            !isTileExtWall(neighbors[3]))
    {
        changeTileTexture(tileId, 10, atlas_arma_1, aa1_numRows, aa1_numCols);
    }
    else if (!isTileExtWall(neighbors[4]) &&
                isTileExtWall(neighbors[1]) && !isTileExtWall(neighbors[6]) &&
            isTileExtWall(neighbors[0]) && isTileExtWall(neighbors[3]))
    {
        changeTileTexture(tileId, 11, atlas_arma_1, aa1_numRows, aa1_numCols);
    }
    //------
    else if (isTileExtWall(neighbors[4]) &&
                !isTileExtWall(neighbors[1]) && isTileExtWall(neighbors[6]) &&
            isTileExtWall(neighbors[3]))
    {
        changeTileTexture(tileId, 8, atlas_arma_1, aa1_numRows, aa1_numCols);
    }
    else if (!isTileExtWall(neighbors[4]) &&
                isTileExtWall(neighbors[1]) && isTileExtWall(neighbors[6]) &&
            isTileExtWall(neighbors[3]))
    {
        changeTileTexture(tileId, 6, atlas_arma_1, aa1_numRows, aa1_numCols);
    }
    else if (isTileExtWall(neighbors[4]) &&
                isTileExtWall(neighbors[1]) && !isTileExtWall(neighbors[6]) &&
            isTileExtWall(neighbors[3]))
    {
        changeTileTexture(tileId, 9, atlas_arma_1, aa1_numRows, aa1_numCols);
    }
    else if (isTileExtWall(neighbors[4]) &&
                isTileExtWall(neighbors[1]) && isTileExtWall(neighbors[6]) &&
            !isTileExtWall(neighbors[3]))
    {
        changeTileTexture(tileId, 7, atlas_arma_1, aa1_numRows, aa1_numCols);
    }
    //-----
    else if (isTileExtWall(neighbors[4]) &&
                !isTileExtWall(neighbors[1]) && !isTileExtWall(neighbors[6]) &&
                !isTileExtWall(neighbors[3]))
    {
        changeTileTexture(tileId, 14, atlas_arma_1, aa1_numRows, aa1_numCols);
    }
    else if (!isTileExtWall(neighbors[4]) &&
                !isTileExtWall(neighbors[1]) && isTileExtWall(neighbors[6]) &&
                !isTileExtWall(neighbors[3]))
    {
        changeTileTexture(tileId, 15, atlas_arma_1, aa1_numRows, aa1_numCols);
    }
    else if (!isTileExtWall(neighbors[4]) &&
                !isTileExtWall(neighbors[1]) && !isTileExtWall(neighbors[6]) &&
                isTileExtWall(neighbors[3]))
    {
        changeTileTexture(tileId, 16, atlas_arma_1, aa1_numRows, aa1_numCols);
    }
    else if (!isTileExtWall(neighbors[4]) &&
                isTileExtWall(neighbors[1]) && !isTileExtWall(neighbors[6]) &&
                !isTileExtWall(neighbors[3]))
    {
        changeTileTexture(tileId, 17, atlas_arma_1, aa1_numRows, aa1_numCols);
    }
    //-----
    else if (isTileExtWall(neighbors[4]) &&
                isTileExtWall(neighbors[1]) && isTileExtWall(neighbors[6]) &&
                isTileExtWall(neighbors[3]))
    {
        changeTileTexture(tileId, 23, atlas_arma_1, aa1_numRows, aa1_numCols);
    }
    //-----
    else if (!isTileExtWall(neighbors[4]) &&
                !isTileExtWall(neighbors[1]) && !isTileExtWall(neighbors[6]) &&
                !isTileExtWall(neighbors[3]))
    {
        changeTileTexture(tileId, 18, atlas_arma_1, aa1_numRows, aa1_numCols);
    }
}

function roomWallTexture(tileId, neighbors)
{
    //[0] = down left
    //[1] = left
    //[2] = up left
    //[3] = down
    //[4] = up
    //[5] = down right
    //[6] = right
    //[7] = up right

    if (!isTileRoomWall(neighbors[4]) &&
            isTileRoomWall(neighbors[1]) && isTileRoomWall(neighbors[6]) &&
            !isTileRoomWall(neighbors[3]))
    {
        changeTileTexture(tileId, 0, atlas_arma_1, aa1_numRows, aa1_numCols);
    }
    else if (isTileRoomWall(neighbors[4]) &&
                !isTileRoomWall(neighbors[1]) && !isTileRoomWall(neighbors[6]) &&
                isTileRoomWall(neighbors[3]))
    {
        changeTileTexture(tileId, 1, atlas_arma_1, aa1_numRows, aa1_numCols);
    }
    else if (!isTileRoomWall(neighbors[4]) &&
                !isTileRoomWall(neighbors[1]) && isTileRoomWall(neighbors[6]) &&
                 isTileRoomWall(neighbors[3]) && !isTileRoomWall(neighbors[5]))
    {
        changeTileTexture(tileId, 2, atlas_arma_1, aa1_numRows, aa1_numCols);
    }
    else if (!isTileRoomWall(neighbors[4]) &&
                isTileRoomWall(neighbors[1]) && !isTileRoomWall(neighbors[6]) &&
                !isTileRoomWall(neighbors[0]) && isTileRoomWall(neighbors[3]))
    {
        
        changeTileTexture(tileId, 3, atlas_arma_1, aa1_numRows, aa1_numCols);
    }
    else if (!isTileRoomWall(neighbors[2]) && isTileRoomWall(neighbors[4]) &&
                isTileRoomWall(neighbors[1]) && !isTileRoomWall(neighbors[6]) &&
                !isTileRoomWall(neighbors[3]))
    {
        
        changeTileTexture(tileId, 4, atlas_arma_1, aa1_numRows, aa1_numCols);
    }
    else if (isTileRoomWall(neighbors[4]) && !isTileRoomWall(neighbors[7]) &&
                !isTileRoomWall(neighbors[1]) && isTileRoomWall(neighbors[6]) &&
                !isTileRoomWall(neighbors[3]))
    {
            changeTileTexture(tileId, 5, atlas_arma_1, aa1_numRows, aa1_numCols);
    }
    //------
    else if (!isTileRoomWall(neighbors[4]) &&
                !isTileRoomWall(neighbors[1]) && isTileRoomWall(neighbors[6]) &&
            isTileRoomWall(neighbors[3]) && isTileRoomWall(neighbors[5]))
    {
        changeTileTexture(tileId, 12, atlas_arma_1, aa1_numRows, aa1_numCols);
    }
    else if (isTileRoomWall(neighbors[4]) && isTileRoomWall(neighbors[7]) &&
                !isTileRoomWall(neighbors[1]) && isTileRoomWall(neighbors[6]) &&
            !isTileRoomWall(neighbors[3]))
    {
        changeTileTexture(tileId, 13, atlas_arma_1, aa1_numRows, aa1_numCols);
    }
    else if (isTileRoomWall(neighbors[2]) && isTileRoomWall(neighbors[4]) &&
                isTileRoomWall(neighbors[1]) && !isTileRoomWall(neighbors[6]) &&
            !isTileRoomWall(neighbors[3]))
    {
        changeTileTexture(tileId, 10, atlas_arma_1, aa1_numRows, aa1_numCols);
    }
    else if (!isTileRoomWall(neighbors[4]) &&
                isTileRoomWall(neighbors[1]) && !isTileRoomWall(neighbors[6]) &&
            isTileRoomWall(neighbors[0]) && isTileRoomWall(neighbors[3]))
    {
        changeTileTexture(tileId, 11, atlas_arma_1, aa1_numRows, aa1_numCols);
    }
    //------
    else if (isTileRoomWall(neighbors[4]) &&
                !isTileRoomWall(neighbors[1]) && isTileRoomWall(neighbors[6]) &&
            isTileRoomWall(neighbors[3]))
    {
        changeTileTexture(tileId, 8, atlas_arma_1, aa1_numRows, aa1_numCols);
    }
    else if (!isTileRoomWall(neighbors[4]) &&
                isTileRoomWall(neighbors[1]) && isTileRoomWall(neighbors[6]) &&
            isTileRoomWall(neighbors[3]))
    {
        changeTileTexture(tileId, 6, atlas_arma_1, aa1_numRows, aa1_numCols);
    }
    else if (isTileRoomWall(neighbors[4]) &&
                isTileRoomWall(neighbors[1]) && !isTileRoomWall(neighbors[6]) &&
            isTileRoomWall(neighbors[3]))
    {
        changeTileTexture(tileId, 9, atlas_arma_1, aa1_numRows, aa1_numCols);
    }
    else if (isTileRoomWall(neighbors[4]) &&
                isTileRoomWall(neighbors[1]) && isTileRoomWall(neighbors[6]) &&
            !isTileRoomWall(neighbors[3]))
    {
        changeTileTexture(tileId, 7, atlas_arma_1, aa1_numRows, aa1_numCols);
    }
    //-----
    else if (isTileRoomWall(neighbors[4]) &&
                !isTileRoomWall(neighbors[1]) && !isTileRoomWall(neighbors[6]) &&
                !isTileRoomWall(neighbors[3]))
    {
        changeTileTexture(tileId, 14, atlas_arma_1, aa1_numRows, aa1_numCols);
    }
    else if (!isTileRoomWall(neighbors[4]) &&
                !isTileRoomWall(neighbors[1]) && isTileRoomWall(neighbors[6]) &&
                !isTileRoomWall(neighbors[3]))
    {
        changeTileTexture(tileId, 15, atlas_arma_1, aa1_numRows, aa1_numCols);
    }
    else if (!isTileRoomWall(neighbors[4]) &&
                !isTileRoomWall(neighbors[1]) && !isTileRoomWall(neighbors[6]) &&
                isTileRoomWall(neighbors[3]))
    {
        changeTileTexture(tileId, 16, atlas_arma_1, aa1_numRows, aa1_numCols);
    }
    else if (!isTileRoomWall(neighbors[4]) &&
                isTileRoomWall(neighbors[1]) && !isTileRoomWall(neighbors[6]) &&
                !isTileRoomWall(neighbors[3]))
    {
        changeTileTexture(tileId, 17, atlas_arma_1, aa1_numRows, aa1_numCols);
    }
    //-----
    else if (isTileRoomWall(neighbors[4]) &&
                isTileRoomWall(neighbors[1]) && isTileRoomWall(neighbors[6]) &&
                isTileRoomWall(neighbors[3]))
    {
        changeTileTexture(tileId, 23, atlas_arma_1, aa1_numRows, aa1_numCols);
    }
    //-----
    else if (!isTileRoomWall(neighbors[4]) &&
                !isTileRoomWall(neighbors[1]) && !isTileRoomWall(neighbors[6]) &&
                !isTileRoomWall(neighbors[3]))
    {
        changeTileTexture(tileId, 18, atlas_arma_1, aa1_numRows, aa1_numCols);
    }
}