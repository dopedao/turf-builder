
import {tiles, gridSize} from './main.js';
import {createDoor, removeDoor, tileSelect} from './UI.js';
import {scene} from './sceneSetup.js';
import {isLeftMouseDown} from './controls.js';
import {inDragSelect, isTileDoor} from './tile_actions.js';
import {propArray} from './props.js';
import {planeSize} from './tile_init.js';

export let selectionPlane;
export let selectedProp = [];
let highlightedTile = null;

const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
const intersectionPoint = new THREE.Vector3();

export function getIntersectedTile(event, camera)
{
    event.preventDefault();

    const mouse = new THREE.Vector2();
    const raycaster = new THREE.Raycaster();

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

	selectedProp = [];
	const intersectProps = raycaster.intersectObjects(propArray);

	if (intersectProps.length > 0)
	{
		selectedProp.push(intersectProps[0].object);
	}

    // const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
    // const intersectionPoint = new THREE.Vector3();
    raycaster.ray.intersectPlane(plane, intersectionPoint);

    const j = Math.round(intersectionPoint.x + (gridSize - 1) / 2);
    const i = Math.round(-intersectionPoint.z + (gridSize - 1) / 2);

    if (i >= 0 && i < gridSize && j >= 0 && j < gridSize)
    {
        const tileIndex = j * gridSize + i;
        return (tiles[tileIndex]);
    }

    return (null);
}

export function emptySelectedProp()
{
    selectedProp = [];
}

export function selectedTileColor(event, camera)
{
    if (tileSelect || createDoor || removeDoor)
    {
        if (inDragSelect == false)
        {
            const intersectedTile = getIntersectedTile(event, camera);
    
            if (intersectedTile && highlightedTile !== intersectedTile)
            {
                if (highlightedTile && highlightedTile.transparentPlane)
                {
                    scene.remove(highlightedTile.transparentPlane);
                    highlightedTile.transparentPlane = null;
                }
        
                if (!isLeftMouseDown)
                {
                    let transparentMaterial;

                    if (createDoor && intersectedTile.roomWall == false || createDoor && intersectedTile.door == true ||
                        createDoor && checkNeighborDoor(intersectedTile.id) == true || removeDoor)
                    {
                        transparentMaterial = new THREE.MeshBasicMaterial({
                            color: 0xa83a32,
                            transparent: true,
                            opacity: 0.5,
                        });
                    }
                    else
                    {
                        transparentMaterial = new THREE.MeshBasicMaterial({
                            color: 0x00ff00,
                            transparent: true,
                            opacity: 0.5,
                        });
                    }

                    const transparentPlaneGeometry = new THREE.PlaneGeometry(planeSize, planeSize);
                    const transparentPlane = new THREE.Mesh(
                        transparentPlaneGeometry,
                        transparentMaterial
                    );
        
                    transparentPlane.position.copy(intersectedTile.position);
                    transparentPlane.position.y += 0.005;
                    transparentPlane.rotation.x = -Math.PI / 2;
        
                    scene.add(transparentPlane);
                    intersectedTile.transparentPlane = transparentPlane;
                }
        
                highlightedTile = intersectedTile;
        
                console.log(
                    `ID: (${intersectedTile.id
					}), Pos: (${intersectedTile.position.x}, ${intersectedTile.position.z
					}), Act: (${intersectedTile.active
					}), extW: (${intersectedTile.extWall
					}), rooW: (${intersectedTile.roomWall
					}), rooId: (${intersectedTile.roomId
					}), door: (${intersectedTile.door
					}), prop: (${intersectedTile.prop
					}), sharedProps: (${intersectedTile.propSharedIds
					}), propType: (${intersectedTile.propType
					}), propId: (${intersectedTile.propId
					}), firstExtWall: (${intersectedTile.firstExtWall
					}), doubleExtWall: (${intersectedTile.doubleExtWall
					}), specialDoubleExtWall: (${intersectedTile.specialDouble
					}), thirdExtWall: (${intersectedTile.thirdExtWall
					}), doubleTopExtWall: (${intersectedTile.doubleTopExtWall
					}), doubleTopRoomWall: (${intersectedTile.doubleTopRoomWall})`
                );
            }
            else if (!intersectedTile && highlightedTile)
            {
                scene.remove(highlightedTile.transparentPlane);
                highlightedTile.transparentPlane = null;
                highlightedTile = null;
            }
        }
    }
    else
    {
        if (highlightedTile && highlightedTile.transparentPlane)
        {
            scene.remove(highlightedTile.transparentPlane);
            highlightedTile.transparentPlane = null;
        }
    }
}

export function squareSelect(dragSelectTile, currentTile, border)
{
	let tempIDs = [];

	if (currentTile && dragSelectTile)
	{
		if (currentTile.position.x >= dragSelectTile.position.x)
		{
			if (currentTile.position.z >= dragSelectTile.position.z)
			{
				const diffX = (currentTile.position.x - dragSelectTile.position.x) + 1;
				const diffZ = ((currentTile.position.z - dragSelectTile.position.z) * gridSize) + 1;

                if (border == 0)
                {
				    tempIDs = inSquareIDs(dragSelectTile.id, diffX, diffZ, 1);
                }
                else if (border == 1)
                {
                    tempIDs = inSquareBorderIDs(dragSelectTile.id, diffX, diffZ, 1);
                }
			}
			else
			{
				const diffX = (currentTile.position.x - dragSelectTile.position.x) + 1;
				const diffZ = ((currentTile.position.z - dragSelectTile.position.z) * gridSize) - 1;
                
                if (border == 0)
                {
				    tempIDs = inSquareIDs(dragSelectTile.id, diffX, diffZ, 2);
                }
                else if (border == 1)
                {
                    tempIDs = inSquareBorderIDs(dragSelectTile.id, diffX, diffZ, 2);
                }
			}
		}
		else if (currentTile.position.x < dragSelectTile.position.x)
		{
			if (currentTile.position.z >= dragSelectTile.position.z)
			{
				const diffX = (currentTile.position.x - dragSelectTile.position.x) - 1;
				const diffZ = ((currentTile.position.z - dragSelectTile.position.z) * gridSize) + 1;
				
                if (border == 0)
                {
				    tempIDs = inSquareIDs(dragSelectTile.id, diffX, diffZ, 3);
                }
                else if (border == 1)
                {
                    tempIDs = inSquareBorderIDs(dragSelectTile.id, diffX, diffZ, 3);
                }
			}
			else
			{
				const diffX = (currentTile.position.x - dragSelectTile.position.x) - 1;
				const diffZ = ((currentTile.position.z - dragSelectTile.position.z) * gridSize) - 1;
				
                if (border == 0)
                {
				    tempIDs = inSquareIDs(dragSelectTile.id, diffX, diffZ, 4);
                }
                else if (border == 1)
                {
                    tempIDs = inSquareBorderIDs(dragSelectTile.id, diffX, diffZ, 4);
                }
			}
		}

        if (border == 0)
        {
            if (!selectionPlane)
            {
                createSelectionPlane(0x00ff00);
            }
            updateSelectionPlane(dragSelectTile, currentTile,0x00ff00);
        }
	}

	return (tempIDs);
}

function inSquareIDs(baseID, diffX, diffZ, dir)
{
	let i = 0;
	let j = 0;
	let tempID = 0;
	let idArray = [];

	if (dir == 1)
	{
		i = (diffZ) / gridSize;
		tempID = baseID - 1;
		while (i > 0)
		{
			j = diffX;
			while (j > 0)
			{
				tempID = tempID + 1;
				idArray.push(tempID);
				j--;
			}
			tempID = (tempID - gridSize) - (diffX);
			i--;
		}
	}
	else if (dir == 2)
	{
		i = ((diffZ) / gridSize) * -1;
		tempID = baseID - 1;
		while (i > 0)
		{
			j = diffX;
			while (j > 0)
			{
				tempID = tempID + 1;
				idArray.push(tempID);
				j--;
			}
			tempID = (tempID + gridSize) - (diffX);
			i--;
		}
	}
	else if (dir == 3)
	{
		i = ((diffZ) / gridSize);
		tempID = baseID + 1;
		while (i > 0)
		{
			j = diffX * -1;
			while (j > 0)
			{
				tempID = tempID - 1;
				idArray.push(tempID);
				j--;
			}
			tempID = (tempID - gridSize) - (diffX);
			i--;
		}
	}
	else if (dir == 4)
	{
		i = ((diffZ) / gridSize) * -1;
		tempID = baseID + 1;
		while (i > 0)
		{
			j = diffX * -1;
			while (j > 0)
			{
				tempID = tempID - 1;
				idArray.push(tempID);
				j--;
			}
			tempID = (tempID + gridSize) - (diffX);
			i--;
		}
	}

	return (idArray);
}

function inSquareBorderIDs(baseID, diffX, diffZ, dir)
{
    let i = 0;
	let j = 0;
	let tempID = 0;
	let idArray = [];
    let allInfo = [];
    let lengthX = 0;
    let lengthY = 0;

	if (dir == 1)
	{
		i = (diffZ) / gridSize;
        lengthY = i;
        lengthX = diffX;
		tempID = baseID - 1;
		while (i > 0)
		{
			j = diffX;
			while (j > 0)
			{
                let wall = false;
                let corner = false;
                if (i < 1 || j == 1 || i == ((diffZ) / gridSize) || j == diffX)
                {
                    wall = true;
                }
                if (i < 1 && j == 1 || i < 1 && j == diffX || i == ((diffZ) / gridSize) && j == 1 ||
                    i == ((diffZ) / gridSize) && j == diffX)
                {
                    corner = true;
                }

				tempID = tempID + 1;
				idArray.push({tempID, wall, corner});
                

				j--;
			}
			tempID = (tempID - gridSize) - (diffX);
			i--;
		}
	}
	else if (dir == 2)
	{
		i = ((diffZ) / gridSize) * -1;
        lengthY = i;
        lengthX = diffX;
		tempID = baseID - 1;
		while (i > 0)
		{
			j = diffX;
			while (j > 0)
			{
                let wall = false;
                let corner = false;
                if (i < 1 || j == 1 || i == (((diffZ) / gridSize) * -1) || j == diffX)
                {
                    wall = true;
                }
                if (i < 1 && j == 1 || i < 1 && j == diffX || i == (((diffZ) / gridSize) * -1) && j == 1 ||
                    i == (((diffZ) / gridSize) * -1) && j == diffX)
                {
                    corner = true;
                }

				tempID = tempID + 1;
				idArray.push({tempID, wall, corner});
				j--;
			}
			tempID = (tempID + gridSize) - (diffX);
			i--;
		}
	}
	else if (dir == 3)
	{
		i = ((diffZ) / gridSize);
        lengthY = i;
        lengthX = diffX * -1;
		tempID = baseID + 1;
		while (i > 0)
		{
			j = diffX * -1;
			while (j > 0)
			{
                let wall = false;
                let corner = false;
                if (i < 1 || j == 1 || i == ((diffZ) / gridSize) || j == diffX * -1)
                {
                    wall = true;
                }
                if (i < 1 && j == 1 || i < 1 && j == diffX || i == ((diffZ) / gridSize) && j == 1 ||
                    i == ((diffZ) / gridSize) && j == diffX)
                {
                    corner = true;
                }

				tempID = tempID - 1;
				idArray.push({tempID, wall, corner});
				j--;
			}
			tempID = (tempID - gridSize) - (diffX);
			i--;
		}
	}
	else if (dir == 4)
	{
		i = ((diffZ) / gridSize) * -1;
        lengthY = i;
        lengthX = diffX * -1;
		tempID = baseID + 1;
		while (i > 0)
		{
			j = diffX * -1;
			while (j > 0)
			{
                let wall = false;
                let corner = false;
                if (i < 1 || j == 1 || i == (((diffZ) / gridSize) * -1) || j == diffX * -1)
                {
                    wall = true;
                }
                if (i < 1 && j == 1 || i < 1 && j == diffX || i == (((diffZ) / gridSize) * -1) && j == 1 ||
                    i == (((diffZ) / gridSize) * -1) && j == diffX)
                {
                    corner = true;
                }

				tempID = tempID - 1;
				idArray.push({tempID, wall, corner});
				j--;
			}
			tempID = (tempID + gridSize) - (diffX);
			i--;
		}
	}

    allInfo.push({idArray, lengthX, lengthY});

	return (allInfo);
}

export function createSelectionPlane(colorPlane)
{
	const geometry = new THREE.PlaneGeometry(1, 1);
	const material = new THREE.MeshBasicMaterial({
	  color: colorPlane,
	  transparent: true,
	  opacity: 0.3
	});

	selectionPlane = new THREE.Mesh(geometry, material);
	selectionPlane.position.y = 0.5;
	selectionPlane.rotation.x = -Math.PI / 2;
	scene.add(selectionPlane);
}

export function updateSelectionPlane(dragSelectTile, currentTile, colorPlane)
{
  const midPoint = new THREE.Vector3()
    .addVectors(dragSelectTile.position, currentTile.position)
    .multiplyScalar(0.5);

  const distanceX = Math.abs(currentTile.position.x - dragSelectTile.position.x);
  const distanceZ = Math.abs(currentTile.position.z - dragSelectTile.position.z);

  selectionPlane.material.color.set(colorPlane);
  
  selectionPlane.position.copy(midPoint);
  //selectionPlane.position.z += 0.5;
  selectionPlane.position.y = 0.5;
  selectionPlane.rotation.x = -Math.PI / 2;
  selectionPlane.rotation.z = 0;
  selectionPlane.scale.set(distanceX + 1, distanceZ + 1, 1);
}

export function removeSelectionPlane()
{
	if (selectionPlane)
	{
		scene.remove(selectionPlane);
		selectionPlane = null;
	}
}

export function getNeighbors(tileId, width, height, size = 1)
{
	const neighbors = [];
	const startX = -size;
	const startY = -size;

	for (let dx = startX; dx <= size; dx++)
	{
		for (let dy = startY; dy <= size; dy++)
		{
			const neighborId = tileId + dx + dy * width;

			if (neighborId > 0 && neighborId <= width * height && neighborId !== tileId &&
				Math.abs(((tileId - 1) % width) - ((neighborId - 1) % width)) <= size &&
				Math.abs(Math.floor((tileId - 1) / width) - Math.floor((neighborId - 1) / width)) <= size)
			{
				neighbors.push(neighborId);
			}
		}
	}
	return neighbors;
}

function checkNeighborDoor(tileId)
{
    const   neighbors = getNeighbors(tileId, gridSize, gridSize, 1);
    let     i = 0;

    while (i < neighbors.length)
    {
        if (isTileDoor(neighbors[i]) == true)
        {
            return (true);
        }
        i++;
    }

    return (false);
}

let selectPlane = [];

export function selectPlanesAdd(tile, colorCode)
{
  	const alphaMat = new THREE.MeshBasicMaterial(
	{
		color: colorCode,
		//side: THREE.DoubleSide,
		transparent: true,
		opacity: 0.5,
	});

	const selectGeo = new THREE.PlaneGeometry(planeSize, planeSize);
	const plane = new THREE.Mesh(selectGeo, alphaMat);

	plane.position.copy(tile.position);
	plane.position.y += 0.007;
	plane.rotation.x = -Math.PI / 2;

	selectPlane.push(plane);
	scene.add(plane);
}

export function selectPlanesRemove()
{
	selectPlane.forEach((plane) =>
	{
	  scene.remove(plane);
	});
  
	selectPlane = [];
}