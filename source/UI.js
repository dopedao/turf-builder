
import {propType} from "./props_info.js";
import {setSelectedAddProp} from "./props.js";

export let freeTiles = 300;

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

export let propUI = false;
export let addProp = false;
export let modifyProp = false;
export let deleteProp = false;

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

const propButton = document.getElementById('props');
const addPropButton = document.getElementById('addProp');
const modifyPropButton = document.getElementById('modifyProp');
const deletePropButton = document.getElementById('deleteProp');


tileButton.addEventListener('click', () =>
{
  roomUI = false;
  tileUI = true;
  propUI = false;
  
  tileAdd = true;
  tileRemove = false;
  tileSelect = true;
  dragSelect = false;

  createRoom = false;
  removeRoom = false;
  createDoor = false;
  removeDoor = false;

  addProp = false;
  modifyProp = false;
  deleteProp = false;
  
  tileButton.classList.add('catSelected');
  roomButton.classList.remove('catSelected');
  propButton.classList.remove('catSelected');
  
  tileAddButton.classList.add('selected');
  tileRemoveButton.classList.remove('selected');
  tileSelectButton.classList.add('selected');
  dragSelectButton.classList.remove('selected');

  createRoomButton.classList.remove('selected');
  removeRoomButton.classList.remove('selected');
  createDoorButton.classList.remove('selected');
  removeDoorButton.classList.remove('selected');

  addPropButton.classList.remove('selected');
  modifyPropButton.classList.remove('selected');
  deletePropButton.classList.remove('selected');

  hidePropTypes();
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
  roomUI = true;
  tileUI = false;
  propUI = false;

  tileAdd = false;
  tileRemove = false;
  tileSelect = false;
  dragSelect = false;

  createRoom = true;
  removeRoom = false;
  createDoor = false;
  removeDoor = false;

  addProp = false;
  modifyProp = false;
  deleteProp = false;
  
  tileButton.classList.remove('catSelected');
  roomButton.classList.add('catSelected');
  propButton.classList.remove('catSelected');
  
  tileAddButton.classList.remove('selected');
  tileRemoveButton.classList.remove('selected');
  tileSelectButton.classList.remove('selected');
  dragSelectButton.classList.remove('selected');

  createRoomButton.classList.add('selected');
  removeRoomButton.classList.remove('selected');
  createDoorButton.classList.remove('selected');
  removeDoorButton.classList.remove('selected');

  addPropButton.classList.remove('selected');
  modifyPropButton.classList.remove('selected');
  deletePropButton.classList.remove('selected');

  hidePropTypes();
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

propButton.addEventListener('click', () =>
{
  roomUI = false;
  tileUI = false;
  propUI = true;

  tileAdd = false;
  tileRemove = false;
  tileSelect = false;
  dragSelect = false;

  createRoom = false;
  removeRoom = false;
  createDoor = false;
  removeDoor = false;

  addProp = true;
  modifyProp = false;
  deleteProp = false;
  
  tileButton.classList.remove('catSelected');
  roomButton.classList.remove('catSelected');
  propButton.classList.add('catSelected');
  
  tileAddButton.classList.remove('selected');
  tileRemoveButton.classList.remove('selected');
  tileSelectButton.classList.remove('selected');
  dragSelectButton.classList.remove('selected');

  createRoomButton.classList.remove('selected');
  removeRoomButton.classList.remove('selected');
  createDoorButton.classList.remove('selected');
  removeDoorButton.classList.remove('selected');

  addPropButton.classList.add('selected');
  modifyPropButton.classList.remove('selected');
  deletePropButton.classList.remove('selected');

  displayPropTypes();
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