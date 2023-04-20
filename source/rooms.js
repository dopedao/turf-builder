
import {tiles} from './main.js';
import {isTileExtWall, isTileRoomWall, readRoomID, deleteElemRoomID, deleteFullRoomID,
        removeTileDoor, removeTileRoomWall, changeTileColor, changeTileTexture} from './tile_actions.js';
import {selectPlanesAdd} from './select.js';
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
    // if (cross && !safeCross)
    // {
    //     return (false);
    // }

    // if (roomIds.length > 1)
    // {
    //     if (hasCommonElement(roomIds) == false)
    //     {
    //         return (false);
    //     }
    // }
  
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

    let tempDelete = [];

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
                changeTileTexture(tileArray[i].id, 6, atlas_floor_1, af1_numRows, af1_numCols);
                changeTileColor(tileArray[i].id, 0xffffff);
            }
        }

        j = 0;
        i++;
    }

    removeTileRoomWall(tile.id);
    removeTileDoor(tile.id);
    deleteFullRoomID(tile.id);

    if (isTileExtWall(tile.id) == false)
    {
        changeTileTexture(tile.id, 6, atlas_floor_1, af1_numRows, af1_numCols);
        changeTileColor(tile.id, 0xffffff);
    }
}