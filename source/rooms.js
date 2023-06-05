
import {tiles, gridSize} from './main.js';
import {scene} from './sceneSetup.js';
import {isTileExtWall, isTileRoomWall, readRoomID, deleteElemRoomID, deleteFullRoomID,
        removeTileDoor, removeTileRoomWall, changeTileColor, changeTileTexture, removeTileDoubleTopRoomWall,
        doubleTopRoomWallPlanes, doubleTopExtWallPlanes, setTileDoubleTopExtWall, getTilePosX, getTilePosZ,
        extWallTexture, removeTileRoomWallTopOfDoubleExtWall, addExternalWalls, roomPlanes, removeElemRoomPlanes,
        roomWallTexture, getTileRoomWallTexId} from './tile_actions.js';
import {selectPlanesAdd, getNeighbors} from './select.js';
import {atlas_floor_1, af1_numCols, af1_numRows} from './texture.js';

export function isRoomCorrect(borderTiles, lengthX, lengthY)
{
    let safeCross = false;
    let cross = false;
    let roomIds = [];

    for (const tile of borderTiles)
    {
        if (isTileRoomWall(tile.tempID) == true)
        {
            cross = true;
            roomIds.push(readRoomID(tile.tempID));

            if (tile.corner == true)
            {
                safeCross = true;
            }
        }
    }

    if (lengthX < 4 || lengthY < 3)
    {
        return (false);
    }

    // Avoid room on room behavior for some cases 
    if (cross && !safeCross)
    {
        return (false);
    }

    if (roomIds.length > 1)
    {
        if (hasCommonElement(roomIds) == false)
        {
            return (false);
        }
    }
  
    return (true);
  }

function hasCommonElement(roomIds)
{
    if (roomIds.length <= 1)
    {
        return false;
    }
  
    for (let i = 1; i < roomIds.length; i++)
    {
        for (let j = 0; j < roomIds[i].length; j++)
        {
            let sim = false;
            let k = 0;
            while (k < roomIds[0].length)
            {
                if (roomIds[i][j] == roomIds[0][k])
                {
                    sim = true;
                }
                k++;
            }
            
            if (sim == false)
            {
                return (false);
            }
        }
    }
    return true;
}

function arrayShareElem(arr1, arr2)
{
    let i = 0;
    let j = 0;
    let k = 0;

    let roomArray = [];

    if (!arr1 || !arr2)
    {
        return roomArray;
    }

    while (i < arr2.length)
    {
        while (j < arr2[i].roomId.length)
        {
            while (k < arr1.length)
            {
                if (arr2[i].roomId[j] == arr1[k])
                {
                    roomArray.push(arr2[i]);
                    break;
                }
                k++;
            }
            k = 0;
            j++;
        }
        j = 0;
        i++;
    }
    return (roomArray);
}
  

function getRoomTiles(tile)
{
    if (!tile || !tile.roomId)
    {
        return [];
    }

    const roomTiles = arrayShareElem(tile.roomId, tiles);
    return (roomTiles);
}
  

export function showFullRoom(tile)
{
    const roomTiles = getRoomTiles(tile);
    
    roomTiles.forEach((roomTile) =>
    {
        selectPlanesAdd(roomTile, 0xff0000);
    });

    return (roomTiles);
}

export function removeFullRoom(tile, tileArray)
{
    let i = 0;
    let j = 0;
    let k = 0;

    while (i < tileArray.length)
    {
        while (j < tileArray[i].roomId.length)
        {
            while (k < tile.roomId.length)
            {
                if (tileArray[i] != tile)
                {
                    if (tileArray[i].roomId[j] == tile.roomId[k])
                    { 
                        deleteElemRoomID(tileArray[i].id, j);
                        j = j - 1;
                        break;
                    }
                }
                k++;
            }
            k = 0;
            j++;
        }

        if (tileArray[i].roomId.length == 0)
        {
            removeTileRoomWall(tileArray[i].id);
            removeTileDoor(tileArray[i].id);

            if (isTileExtWall(tileArray[i].id) == false)
            {
                let planeObj = roomPlanes.find(obj => obj.id === tileArray[i].id);
                
                if (planeObj)
                {
                    scene.remove(planeObj.plane);
                    removeElemRoomPlanes(tileArray[i].id);
                }
            }
        }

        // if (tileArray[i].doubleTopRoomWall == true)
        // {
        //     removeTileDoubleTopRoomWall(tileArray[i].id);
        //     let planeObjIndex = doubleTopRoomWallPlanes.findIndex(obj => obj.id === tileArray[i].id);
        //     if (planeObjIndex > -1)
        //     {
        //         let planeObj = doubleTopRoomWallPlanes[planeObjIndex];
        //         scene.remove(planeObj.plane);
        //         doubleTopRoomWallPlanes.splice(planeObjIndex, 1);
        //     }
        // }

        // if (tileArray[i].roomWallTopOfDoubleExtWall == true)
        // {
        //     setTileDoubleTopExtWall(tileArray[i].id);
        //     let tempArray = [];

        //     const geometry = new THREE.PlaneGeometry(1, 1);
        //     const material = new THREE.MeshBasicMaterial({
        //     transparent: true,
        //     opacity: 0.3
        //     });
        //     let plane = new THREE.Mesh(geometry, material);
        //     plane.position.x = getTilePosX(tileArray[i].id);
        //     plane.position.z = getTilePosZ(tileArray[i].id);
        //     plane.position.y = 0.1;
        //     plane.rotation.x = -Math.PI / 2;
        //     tempArray.id = tileArray[i].id;
        //     tempArray.plane = plane;
        //     doubleTopExtWallPlanes.push(tempArray);
        //     scene.add(doubleTopExtWallPlanes[doubleTopExtWallPlanes.length - 1].plane);

        //     removeTileRoomWallTopOfDoubleExtWall(tileArray[i].id);

        //     //const wallNeighbors = getNeighbors(tileArray[i].id, gridSize, gridSize, 1);
        //     //extWallTexture(tileArray[i].id, wallNeighbors, tileArray[i].extWallTextId);
        //     addExternalWalls();
        // }

        j = 0;
        i++;
    }

    removeTileRoomWall(tile.id);
    removeTileDoor(tile.id);
    deleteFullRoomID(tile.id);

    if (isTileExtWall(tile.id) == false)
    {
        let planeObj = roomPlanes.find(obj => obj.id === tile.id);
                
        if (planeObj)
        {
            scene.remove(planeObj.plane);
            removeElemRoomPlanes(tile.id);
        }
    }

    let roomWallTiles = tiles.filter(tile => tile.roomWall === true);
    roomWallTiles.forEach(tile =>
    {
        const roomNeighbors = getNeighbors(tile.id, gridSize, gridSize, 1);
        roomWallTexture(tile.id, roomNeighbors, getTileRoomWallTexId(tile.id));
    });
}