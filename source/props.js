
import {isLeftMouseDown} from './controls.js';
import {gridSize} from './main.js';
import {propType} from './props_info.js';
import {scene} from './sceneSetup.js';
import {selectedProp, emptySelectedProp} from './select.js';
import {isTileActive, isTileRoomWall, isTileExtWall, isTileProp, setTileProp, pushTilePropSharedIds,
        setTilePropType, getTilePropSharedIds, deleteTilePropSharedIds, deleteTilePropType,
        setPropId, removePropId, readPropId} from './tile_actions.js';

let checkProp = null;
let selectedAddProp = propType.testSQ1;
let lastselectedSizeName = null;
let modifySelected = null;
export let dragging = false;
export let propArray = [];

export function setSelectedAddProp(propUI)
{
    selectedAddProp = propUI;
}

export function modifyPropPos(modifyT, currentTile)
{
    if (selectedProp && selectedProp[0] && dragging == false)
    {
        modifySelected = selectedProp[0];
        if (isLeftMouseDown && modifyT && modifyT.propType)
        {
            placeModifyProp(modifyT, currentTile);
        }
    }

    if (dragging && modifyT && modifyT.propType)
    {
        placeModifyProp(modifyT, currentTile);
    }
}

function findPropTypeBySizeName(sizeName)
{
    for (const propKey in propType)
    {
        if (propType[propKey].sizeName == sizeName)
        {
            return (propType[propKey]);
        }
    }
    return (null);
}

function findPropTypeByName(name)
{
    for (const propKey in propType)
    {
        if (propType[propKey].name == name)
        {
            return propType[propKey];
        }
    }
    return null;
}

export function placeModifyProp(modifyT, currentTile)
{
    if (isLeftMouseDown)
    {
        dragging = true;
    }

    if (dragging)
    {
        const newProp = findPropTypeByName(modifyT.propType);
        
        selectedAddProp = newProp;
        removeCheckProp();

        const sizeX = newProp.sizeType.sizeX;
        const sizeY = newProp.sizeType.sizeY;
        let propTileArray = [];

        propTileArray.push(currentTile.id);
        if (sizeX == 3)
        {
            propTileArray.push(currentTile.id + 1);
            propTileArray.push(currentTile.id - 1);
        }
        else if (sizeX == 2)
        {
            propTileArray.push(currentTile.id + 1);
        }

        if (sizeY == 3)
        {
            let i = 0;
            const arrayLength = propTileArray.length;
            while (i < arrayLength)
            {
                const tempPlus = propTileArray[i] + gridSize;
                const tempMin = propTileArray[i] - gridSize;
                propTileArray.push(tempPlus);
                propTileArray.push(tempMin);
                i++;
            }
        }
        else if (sizeY == 2)
        {
            let i = 0;
            const arrayLength = propTileArray.length;
            while (i < arrayLength)
            {
                const temp = propTileArray[i] + gridSize;
                propTileArray.push(temp);
                i++;
            }

        }

        let canPlace = true;
        let i = 0;
        while (i < propTileArray.length)
        {
            if (!isTileActive(propTileArray[i]) || isTileExtWall(propTileArray[i]) || isTileRoomWall(propTileArray[i]))
            {
                canPlace = false;
            }
            
            if (isTileProp(propTileArray[i]))
            {
                if (readPropId(propTileArray[i]) != readPropId(modifyT.id))
                {
                    canPlace = false;
                }
            }
            i++;
        }

        if (canPlace == true)
        {
            const tempProp = updateCheckProp(currentTile.position, 0x32a84e);
            if (isLeftMouseDown == false)
            {
                let h = 0;
                let sharedIds = getTilePropSharedIds(modifyT.id);
                setTileProp(modifyT.id, false);
                deleteTilePropSharedIds(modifyT.id);
                deleteTilePropType(modifyT.id);
                removePropId(modifyT.id);
                while (h < sharedIds.length)
                {
                    setTileProp(sharedIds[h], false);
                    deleteTilePropType(sharedIds[h]);
                    deleteTilePropSharedIds(sharedIds[h]);
                    removePropId(sharedIds[h]);
                    h++;
                }
                removeModifySelectedProp();
                dragging = false;
                modifySelected = null;


                const propId = createProp(tempProp.position, 0x8403fc, sizeX, sizeY, newProp.texturePath);
                let i = 0;
                while (i < propTileArray.length)
                {
                    setTileProp(propTileArray[i], true);
                    setTilePropType(propTileArray[i], newProp.name);
                    setPropId(propTileArray[i], propId);
                    let j = 0;
                    while (j < propTileArray.length)
                    {
                        if (propTileArray[i] != propTileArray[j])
                        {
                            pushTilePropSharedIds(propTileArray[i], propTileArray[j]);
                        }
                        j++;
                    }
                    i++;
                }
            }
        }
        else
        {
            updateCheckProp(currentTile.position, 0xa83632);
            if (isLeftMouseDown == false)
            {
                dragging = false;
                modifySelected = null;
            }
        }
    }
}

export function placeProp(tile)
{
    const sizeX = selectedAddProp.sizeType.sizeX;
    const sizeY = selectedAddProp.sizeType.sizeY;
    let propTileArray = [];

    propTileArray.push(tile.id);
    if (sizeX == 3)
    {
        propTileArray.push(tile.id + 1);
        propTileArray.push(tile.id - 1);
    }
    else if (sizeX == 2)
    {
        propTileArray.push(tile.id + 1);
    }

    if (sizeY == 3)
    {
        let i = 0;
        const arrayLength = propTileArray.length;
        while (i < arrayLength)
        {
            const tempPlus = propTileArray[i] + gridSize;
            const tempMin = propTileArray[i] - gridSize;
            propTileArray.push(tempPlus);
            propTileArray.push(tempMin);
            i++;
        }
    }
    else if (sizeY == 2)
    {
        let i = 0;
        const arrayLength = propTileArray.length;
        while (i < arrayLength)
        {
            const temp = propTileArray[i] + gridSize;
            propTileArray.push(temp);
            i++;
        }

    }

    let canPlace = true;
    let i = 0;
    while (i < propTileArray.length)
    {
        if (!isTileActive(propTileArray[i]) || isTileRoomWall(propTileArray[i]) || isTileProp(propTileArray[i]))
        {
            canPlace = false;
        }
        i++;
    }

    if (canPlace == true)
    {
        const tempProp = updateCheckProp(tile.position, 0x32a84e);
        if (isLeftMouseDown)
        {
            const propId = createProp(tempProp.position, 0x8403fc, sizeX, sizeY, selectedAddProp.texturePath);
            
            let i = 0;
            while (i < propTileArray.length)
            {
                setTileProp(propTileArray[i], true);
                setTilePropType(propTileArray[i], selectedAddProp.name);
                setPropId(propTileArray[i], propId);
                let j = 0;
                while (j < propTileArray.length)
                {
                    if (propTileArray[i] != propTileArray[j])
                    {
                        pushTilePropSharedIds(propTileArray[i], propTileArray[j]);
                    }
                    j++;
                }
                i++;
            }
        }
    }
    else
    {
        updateCheckProp(tile.position, 0xa83632);
    }
}

export function createProp(position, colorProp, sizeX, sizeY, texPath)
{
	const geometry = new THREE.PlaneGeometry(sizeX, sizeY);
    let material = new THREE.MeshBasicMaterial;

    if (texPath == "")
    {
        material = new THREE.MeshBasicMaterial(
        {
        color: colorProp,
        transparent: false,
        opacity: 1
        });
    }
    else
    {
        const loader = new THREE.TextureLoader();
        const propTex = loader.load(selectedAddProp.texturePath);
        propTex.wrapS = THREE.RepeatWrapping;
        propTex.wrapT = THREE.RepeatWrapping;
        propTex.minFilter = THREE.NearestFilter;
        propTex.magFilter = THREE.NearestFilter;
        propTex.needsUpdate = true;

        material = new THREE.MeshBasicMaterial(
        {
        map: propTex,
        transparent: true,
        });
    }

	const prop = new THREE.Mesh(geometry, material);
    prop.position.set(position.x, 0.005, position.z);
	prop.rotation.x = -Math.PI / 2;

    propArray.push(prop);
	scene.add(propArray[propArray.length - 1]);

    return (prop.uuid);
}

export function createCheckProp(position, colorProp, sizeX, sizeY)
{
	const geometry = new THREE.PlaneGeometry(sizeX, sizeY);
	const material = new THREE.MeshBasicMaterial(
    {
	  color: colorProp,
	  transparent: true,
	  opacity: 0.5
	});

	checkProp = new THREE.Mesh(geometry, material);
	checkProp.rotation.x = -Math.PI / 2;
	scene.add(checkProp);
}

export function updateCheckProp(position, colorProp)
{
    if (checkProp == null || selectedAddProp.sizeName != lastselectedSizeName)
    {
        removeCheckProp();
        createCheckProp(position, colorProp, selectedAddProp.sizeType.sizeX, selectedAddProp.sizeType.sizeY);
    }
    checkProp.material.color.set(colorProp);
    
    if (selectedAddProp.sizeName == "SQ1")
    {
        checkProp.position.set(position.x, 0.01, position.z);
    }
    else if (selectedAddProp.sizeName == "SQ2")
    {
        checkProp.position.set(position.x + 0.5, 0.01, position.z - 0.5);
    }
    else if (selectedAddProp.sizeName == "SQ3")
    {
        checkProp.position.set(position.x, 0.01, position.z);
    }
    else if (selectedAddProp.sizeName == "REC12")
    {
        checkProp.position.set(position.x, 0.01, position.z - 0.5);
    }
    else if (selectedAddProp.sizeName == "REC13")
    {
        checkProp.position.set(position.x, 0.01, position.z);
    }
    else if (selectedAddProp.sizeName == "REC21")
    {
        checkProp.position.set(position.x + 0.5, 0.01, position.z);
    }
    else if (selectedAddProp.sizeName == "REC23")
    {
        checkProp.position.set(position.x + 0.5, 0.01, position.z);
    }
    else if (selectedAddProp.sizeName == "REC31")
    {
        checkProp.position.set(position.x, 0.01, position.z);
    }
    else if (selectedAddProp.sizeName == "REC32")
    {
        checkProp.position.set(position.x, 0.01, position.z - 0.5);
    }

    lastselectedSizeName = selectedAddProp.sizeName;
    return(checkProp);
}

export function removeCheckProp()
{
    scene.remove(checkProp);
    checkProp = null;
}

export function removeSelectedProp()
{
    deletePropFromArray(selectedProp[0]);
    scene.remove(selectedProp[0]);
    emptySelectedProp();
}

export function removeModifySelectedProp()
{
    deletePropFromArray(modifySelected);
    scene.remove(modifySelected);
    emptySelectedProp();
}

function deletePropFromArray(prop)
{
    const index = propArray.findIndex(p => p === prop);
    if (index !== -1)
    {
      propArray.splice(index, 1);
    }
}
  