
import {propType} from "./props_info.js";
import {setSelectedAddProp} from "./props.js";
import {atlas_floor_1_ID, atlas_arma_1_ID, setSelectedFloorTexture, setSelectedWallTexture,
        atlas_wall_1_ID} from "./texture.js";
import {saveTileGrid, loadTileGrid} from "./save.js";

export let freeTiles = 300;


document.getElementById('saveButton').addEventListener('click', saveTileGrid);

const loadButton = document.getElementById('loadButton');
const fileInput = document.getElementById('fileInput');

loadButton.addEventListener('click', function()
{
    fileInput.click();
});

fileInput.addEventListener('change', function() {
  const file = fileInput.files[0];
  const reader = new FileReader();

  reader.onload = function() {
      const contents = reader.result;
      loadTileGrid(contents);
  }

  reader.readAsText(file);
});

export let playUI = false;

export let tileUI = true;
export let tileAdd = true;
export let tileRemove = false;
export let tileSelect = true;
export let dragSelect = false;

export let roomUI = false;
export let createRoom = false;
export let removeRoom = false;
export let createDoor = false;
export let removeDoor = false;

export let paintUI = false;
export let paintFloor = false;
export let paintWall = false;

export let propUI = false;
export let addProp = false;
export let modifyProp = false;
export let deleteProp = false;

const playButton = document.getElementById('play');

const tileButton = document.getElementById('tile');
const tileAddButton = document.getElementById('tileAdd');
const tileRemoveButton = document.getElementById('tileRemove');
const tileSelectButton = document.getElementById('tileSelect');
const dragSelectButton = document.getElementById('dragSelect');

const roomButton = document.getElementById('room');
const createRoomButton = document.getElementById('createRoom');
const removeRoomButton = document.getElementById('removeRoom');
const createDoorButton = document.getElementById('createDoor');
const removeDoorButton = document.getElementById('removeDoor');

const paintButton = document.getElementById('paint');
const paintFloorButton = document.getElementById('paintFloor');
const paintWallButton = document.getElementById('paintWall');

const propButton = document.getElementById('props');
const addPropButton = document.getElementById('addProp');
const modifyPropButton = document.getElementById('modifyProp');
const deletePropButton = document.getElementById('deleteProp');


playButton.addEventListener('click', () =>
{

  playUI = true;

  roomUI = false;
  tileUI = false;
  paintUI = false;
  propUI = false;
  
  tileAdd = false;
  tileRemove = false;
  tileSelect = false;
  dragSelect = false;

  createRoom = false;
  removeRoom = false;
  createDoor = false;
  removeDoor = false;

  paintFloor = false;
  paintWall = false;

  addProp = false;
  modifyProp = false;
  deleteProp = false;

  playButton.classList.add('selected');
  
  tileButton.classList.remove('catSelected');
  roomButton.classList.remove('catSelected');
  paintButton.classList.remove('catSelected');
  propButton.classList.remove('catSelected');
  
  tileAddButton.classList.remove('selected');
  tileRemoveButton.classList.remove('selected');
  tileSelectButton.classList.remove('selected');
  dragSelectButton.classList.remove('selected');

  createRoomButton.classList.remove('selected');
  removeRoomButton.classList.remove('selected');
  createDoorButton.classList.remove('selected');
  removeDoorButton.classList.remove('selected');

  paintFloorButton.classList.remove('selected');
  paintWallButton.classList.remove('selected');

  addPropButton.classList.remove('selected');
  modifyPropButton.classList.remove('selected');
  deletePropButton.classList.remove('selected');

  hidePropTypes();
  hideFloorTextures();
  hideWallTextures();

});


tileButton.addEventListener('click', () =>
{
  playUI = false;

  roomUI = false;
  tileUI = true;
  paintUI = false;
  propUI = false;
  
  tileAdd = true;
  tileRemove = false;
  tileSelect = true;
  dragSelect = false;

  createRoom = false;
  removeRoom = false;
  createDoor = false;
  removeDoor = false;

  paintFloor = false;
  paintWall = false;

  addProp = false;
  modifyProp = false;
  deleteProp = false;

  playButton.classList.remove('selected');
  
  tileButton.classList.add('catSelected');
  roomButton.classList.remove('catSelected');
  paintButton.classList.remove('catSelected');
  propButton.classList.remove('catSelected');
  
  tileAddButton.classList.add('selected');
  tileRemoveButton.classList.remove('selected');
  tileSelectButton.classList.add('selected');
  dragSelectButton.classList.remove('selected');

  createRoomButton.classList.remove('selected');
  removeRoomButton.classList.remove('selected');
  createDoorButton.classList.remove('selected');
  removeDoorButton.classList.remove('selected');

  paintFloorButton.classList.remove('selected');
  paintWallButton.classList.remove('selected');

  addPropButton.classList.remove('selected');
  modifyPropButton.classList.remove('selected');
  deletePropButton.classList.remove('selected');

  hidePropTypes();
  hideFloorTextures();
  hideWallTextures();
});

tileAddButton.addEventListener('click', () =>
{
  if (tileUI == true)
  {
    tileAdd = true;
    tileRemove = false;
    tileAddButton.classList.add('selected');
    tileRemoveButton.classList.remove('selected');
  }
});

tileRemoveButton.addEventListener('click', () =>
{
  if (tileUI == true)
  {
    tileRemove = true;
    tileAdd = false;
    tileRemoveButton.classList.add('selected');
    tileAddButton.classList.remove('selected');
  }
});

tileSelectButton.addEventListener('click', () =>
{
  if (tileUI == true)
  {
    tileSelect = true;
    dragSelect = false;
    tileSelectButton.classList.add('selected');
    dragSelectButton.classList.remove('selected');
  }
});

dragSelectButton.addEventListener('click', () =>
{
  if (tileUI == true)
  {
    tileSelect = false;
    dragSelect = true;
    tileSelectButton.classList.remove('selected');
    dragSelectButton.classList.add('selected');
  }
});

roomButton.addEventListener('click', () =>
{
  playUI = false;

  roomUI = true;
  tileUI = false;
  paintUI = false;
  propUI = false;

  tileAdd = false;
  tileRemove = false;
  tileSelect = false;
  dragSelect = false;

  createRoom = true;
  removeRoom = false;
  createDoor = false;
  removeDoor = false;

  paintFloor = false;
  paintWall = false;

  addProp = false;
  modifyProp = false;
  deleteProp = false;

  playButton.classList.remove('selected');
  
  tileButton.classList.remove('catSelected');
  roomButton.classList.add('catSelected');
  paintButton.classList.remove('catSelected');
  propButton.classList.remove('catSelected');
  
  tileAddButton.classList.remove('selected');
  tileRemoveButton.classList.remove('selected');
  tileSelectButton.classList.remove('selected');
  dragSelectButton.classList.remove('selected');

  createRoomButton.classList.add('selected');
  removeRoomButton.classList.remove('selected');
  createDoorButton.classList.remove('selected');
  removeDoorButton.classList.remove('selected');

  paintFloorButton.classList.remove('selected');
  paintWallButton.classList.remove('selected');

  addPropButton.classList.remove('selected');
  modifyPropButton.classList.remove('selected');
  deletePropButton.classList.remove('selected');

  hidePropTypes();
  hideFloorTextures();
  hideWallTextures();
});

createRoomButton.addEventListener('click', () =>
{
  if (roomUI == true)
  {
    createRoom = true;
    createDoor = false;
    removeRoom = false;
    removeDoor = false;
    removeDoorButton.classList.remove('selected');
    removeRoomButton.classList.remove('selected');
    createRoomButton.classList.add('selected');
    createDoorButton.classList.remove('selected');
  }
});

removeRoomButton.addEventListener('click', () =>
{
  if (roomUI == true)
  {
    removeRoom = true;
    createRoom = false;
    createDoor = false;
    removeDoor = false;
    removeRoomButton.classList.add('selected');
    createRoomButton.classList.remove('selected');
    createDoorButton.classList.remove('selected');
    removeDoorButton.classList.remove('selected');
  }
});

createDoorButton.addEventListener('click', () =>
{
  if (roomUI == true)
  {
    createDoor = true;
    createRoom = false;
    removeRoom = false;
    removeDoor = false;
    removeDoorButton.classList.remove('selected');
    removeRoomButton.classList.remove('selected');
    createDoorButton.classList.add('selected');
    createRoomButton.classList.remove('selected');
  }
});

removeDoorButton.addEventListener('click', () =>
{
  if (roomUI == true)
  {
    removeDoor = true;
    createRoom = false;
    createDoor = false;
    removeRoom = false;
    removeDoorButton.classList.add('selected');
    createRoomButton.classList.remove('selected');
    createDoorButton.classList.remove('selected');
    removeRoomButton.classList.remove('selected');
  }
});

paintButton.addEventListener('click', () =>
{
  playUI = false;

  roomUI = false;
  tileUI = false;
  paintUI = true;
  propUI = false;

  tileAdd = false;
  tileRemove = false;
  tileSelect = false;
  dragSelect = false;

  createRoom = false;
  removeRoom = false;
  createDoor = false;
  removeDoor = false;

  paintFloor = true;
  paintWall = false;

  addProp = false;
  modifyProp = false;
  deleteProp = false;

  playButton.classList.remove('selected');
  
  tileButton.classList.remove('catSelected');
  roomButton.classList.remove('catSelected');
  paintButton.classList.add('catselected');
  propButton.classList.remove('catSelected');
  
  tileAddButton.classList.remove('selected');
  tileRemoveButton.classList.remove('selected');
  tileSelectButton.classList.remove('selected');
  dragSelectButton.classList.remove('selected');

  createRoomButton.classList.remove('selected');
  removeRoomButton.classList.remove('selected');
  createDoorButton.classList.remove('selected');
  removeDoorButton.classList.remove('selected');

  paintFloorButton.classList.add('selected');
  paintWallButton.classList.remove('selected');

  addPropButton.classList.remove('selected');
  modifyPropButton.classList.remove('selected');
  deletePropButton.classList.remove('selected');

  hidePropTypes();
  displayFloorTextures();
  hideWallTextures();
});

paintFloorButton.addEventListener('click', () =>
{
  if (paintUI == true)
  {
    paintFloor = true;
    paintWall = false;
    paintFloorButton.classList.add('selected');
    paintWallButton.classList.remove('selected');

    displayFloorTextures();
    hideWallTextures();
  }
});

paintWallButton.addEventListener('click', () =>
{
  if (paintUI == true)
  {
    paintFloor = false;
    paintWall = true;
    paintFloorButton.classList.remove('selected');
    paintWallButton.classList.add('selected');

    displayWallTextures();
    hideFloorTextures();
  }
});

function displayFloorTextures()
{
  document.getElementById("floorTexturesContainer").classList.remove("hidden");

  const floorTextureContainer = document.getElementById("floorTexturesContainer");
  floorTextureContainer.innerHTML = "";

  const firstTexKey = Object.keys(atlas_floor_1_ID)[0];

  for (const TexKey in atlas_floor_1_ID)
  {
    const texId = atlas_floor_1_ID[TexKey];
    const button = document.createElement("button");
    button.textContent = texId.id;
    button.classList.add("button");

    button.style.marginTop = "5px";
    button.style.marginLeft = "40px";

    if (TexKey === firstTexKey)
    {
      button.classList.add("selected");
      setSelectedFloorTexture(texId);
    }

    button.addEventListener("click", () =>
    {
      console.log("Selected floor texture type:", TexKey);
      setSelectedFloorTexture(texId);
      deselectAllFloorTextures();
      button.classList.add("selected");
    });

    floorTextureContainer.appendChild(button);
  }
}

function hideFloorTextures()
{
  const floorTextureContainer = document.getElementById("floorTexturesContainer");
  floorTextureContainer.classList.add("hidden");
}

function deselectAllFloorTextures()
{
  const floorTextureContainer = document.getElementById("floorTexturesContainer");
  const floorTextureButtons = floorTextureContainer.getElementsByClassName("button");
  for (const button of floorTextureButtons)
  {
    button.classList.remove("selected");
  }
}

function displayWallTextures()
{
  document.getElementById("wallTexturesContainer").classList.remove("hidden");

  const wallTextureContainer = document.getElementById("wallTexturesContainer");
  wallTextureContainer.innerHTML = "";

  const firstTexKey = Object.keys(atlas_wall_1_ID)[0];

  for (const TexKey in atlas_wall_1_ID)
  {
    const texId = atlas_wall_1_ID[TexKey];
    const button = document.createElement("button");
    button.textContent = texId.name;
    button.classList.add("button");

    button.style.marginTop = "5px";
    button.style.marginLeft = "40px";

    if (TexKey === firstTexKey)
    {
      button.classList.add("selected");
      setSelectedWallTexture(texId);
    }

    button.addEventListener("click", () =>
    {
      console.log("Selected wall texture type:", TexKey);
      setSelectedWallTexture(texId);
      deselectAllWallTextures();
      button.classList.add("selected");
    });

    wallTextureContainer.appendChild(button);
  }
}

function hideWallTextures()
{
  const wallTextureContainer = document.getElementById("wallTexturesContainer");
  wallTextureContainer.classList.add("hidden");
}

function deselectAllWallTextures()
{
  const wallTextureContainer = document.getElementById("wallTexturesContainer");
  const wallTextureButtons = wallTextureContainer.getElementsByClassName("button");
  for (const button of wallTextureButtons)
  {
    button.classList.remove("selected");
  }
}

propButton.addEventListener('click', () =>
{
  playUI = false;

  roomUI = false;
  tileUI = false;
  paintUI = false;
  propUI = true;

  tileAdd = false;
  tileRemove = false;
  tileSelect = false;
  dragSelect = false;

  createRoom = false;
  removeRoom = false;
  createDoor = false;
  removeDoor = false;

  paintFloor = false;
  paintWall = false;

  addProp = true;
  modifyProp = false;
  deleteProp = false;

  playButton.classList.remove('selected');
  
  tileButton.classList.remove('catSelected');
  roomButton.classList.remove('catSelected');
  paintButton.classList.remove('catSelected');
  propButton.classList.add('catSelected');
  
  tileAddButton.classList.remove('selected');
  tileRemoveButton.classList.remove('selected');
  tileSelectButton.classList.remove('selected');
  dragSelectButton.classList.remove('selected');

  createRoomButton.classList.remove('selected');
  removeRoomButton.classList.remove('selected');
  createDoorButton.classList.remove('selected');
  removeDoorButton.classList.remove('selected');

  paintFloorButton.classList.remove('selected');
  paintWallButton.classList.remove('selected');

  addPropButton.classList.add('selected');
  modifyPropButton.classList.remove('selected');
  deletePropButton.classList.remove('selected');

  displayPropTypes();
  hideFloorTextures();
  hideWallTextures();
});

addPropButton.addEventListener('click', () =>
{
  if (propUI == true)
  {
    addProp = true;
    modifyProp = false;
    deleteProp = false;

    addPropButton.classList.add('selected');
    modifyPropButton.classList.remove('selected');
    deletePropButton.classList.remove('selected');

    displayPropTypes();
  }
});

modifyPropButton.addEventListener('click', () =>
{
  if (propUI == true)
  {
    addProp = false;
    modifyProp = true;
    deleteProp = false;

    addPropButton.classList.remove('selected');
    modifyPropButton.classList.add('selected');
    deletePropButton.classList.remove('selected')

    hidePropTypes();
  }
});

deletePropButton.addEventListener('click', () =>
{
  if (propUI == true)
  {
    addProp = false;
    modifyProp = false;
    deleteProp = true;

    addPropButton.classList.remove('selected');
    modifyPropButton.classList.remove('selected');
    deletePropButton.classList.add('selected');

    hidePropTypes();
  }
});

function displayPropTypes()
{
  document.getElementById("propTypesContainer").classList.remove("hidden");

  const propTypesContainer = document.getElementById("propTypesContainer");
  propTypesContainer.innerHTML = "";

  const firstPropKey = Object.keys(propType)[0];

  for (const propKey in propType)
  {
    const prop = propType[propKey];
    const button = document.createElement("button");
    button.textContent = prop.name;
    button.classList.add("button");

    button.style.marginTop = "5px";
    button.style.marginLeft = "40px";

    if (propKey === firstPropKey)
    {
      button.classList.add("selected");
      setSelectedAddProp(prop);
    }

    button.addEventListener("click", () =>
    {
      console.log("Selected prop type:", propKey);
      setSelectedAddProp(prop);
      deselectAllPropButtons();
      button.classList.add("selected");
    });

    propTypesContainer.appendChild(button);
  }
}

function hidePropTypes()
{
  const propTypesContainer = document.getElementById("propTypesContainer");
  propTypesContainer.classList.add("hidden");
}

function deselectAllPropButtons()
{
  const propTypesContainer = document.getElementById("propTypesContainer");
  const propButtons = propTypesContainer.getElementsByClassName("button");
  for (const button of propButtons)
  {
    button.classList.remove("selected");
  }
}

function updateFreeTilesCounter(number)
{
  const counter = document.getElementById("freeTilesCounter");
  counter.textContent = `Free Tiles: ${number}`;
}

export function FreeTilesMin()
{
  freeTiles -= 1;
  updateFreeTilesCounter(freeTiles);
}

export function FreeTilesPlu()
{
  freeTiles += 1;
  updateFreeTilesCounter(freeTiles);
}

updateFreeTilesCounter(freeTiles);