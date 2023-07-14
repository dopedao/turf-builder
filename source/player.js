
import {animPlayer, player_numCols, player_numRows, createTextureFromAtlas} from './texture.js';
import {playTimeOff} from './main.js';
import {scene, camera} from './sceneSetup.js';

export let playerPlane = null;

const up = 16;
const down = 48;
const left = 32;
const right = 0;

let upAnimIndex = 16;
let downAnimIndex = 48;
let leftAnimIndex = 32;
let rightAnimIndex = 0;

const idleRight = 64;
const idleLeft = 96;
const idleUp = 80;
const idleDown = 112;

export function createPlayerPlane()
{
	const geometry = new THREE.PlaneGeometry(4, 4);
	const material = new THREE.MeshBasicMaterial({
        transparent: true,
        opacity: 1
        });

    playerPlane = new THREE.Mesh(geometry, material);

    const texture = createTextureFromAtlas(animPlayer, 64, player_numRows, player_numCols);
    playerPlane.material.map = texture;
    playerPlane.material.needsUpdate = true;

    playerPlane.position.x = 0.0;
    playerPlane.position.z = 0.0;

	playerPlane.position.y = 0.5;
	playerPlane.rotation.x = -Math.PI / 2;
	scene.add(playerPlane);
}

export function destroyPlayerPlane()
{
    if (playerPlane)
    {
        playerPlane.material.map.dispose();
        playerPlane.material.dispose();
        playerPlane.geometry.dispose();
        scene.remove(playerPlane);
        playerPlane = null;
    }
    playTimeOff();
}

export let keys =
{
    up: false,
    down: false,
    left: false,
    right: false
};
  
export function playerControls()
{
window.addEventListener("keydown", (e) => {
        switch (e.code)
        {
        case "KeyW":
            keys.up = true;
            break;
        case "KeyS":
            keys.down = true;
            break;
        case "KeyA":
            keys.left = true;
            break;
        case "KeyD":
            keys.right = true;
            break;
        }
    }, false);

window.addEventListener("keyup", (e) => {
        switch (e.code)
        {
        case "KeyW":
            keys.up = false;
            break;
        case "KeyS":
            keys.down = false;
            break;
        case "KeyA":
            keys.left = false;
            break;
        case "KeyD":
            keys.right = false;
            break;
        }
    }, false);
}

export let frameCount = 0;
export let animationSpeed = 4;
const speed = 0.07;
let lastDirection = 'right';

export function playerMove()
{
    frameCount++;

    let xDirection = 0;
    let zDirection = 0;
    if (keys.up) zDirection -= 1;
    if (keys.down) zDirection += 1;
    if (keys.left) xDirection -= 1;
    if (keys.right) xDirection += 1;

    if (xDirection < 0) lastDirection = 'left';
    if (xDirection > 0) lastDirection = 'right';
    if (zDirection < 0) lastDirection = 'up';
    if (zDirection > 0) lastDirection = 'down';

    if (xDirection != 0 && zDirection != 0)
    {
        xDirection /= Math.sqrt(2);
        zDirection /= Math.sqrt(2);
    }

    playerPlane.position.x += speed * xDirection;
    playerPlane.position.z += speed * zDirection;

    camera.position.x = playerPlane.position.x;
    camera.position.z = playerPlane.position.z;

    if (xDirection == 0 && zDirection == 0)
    {
        let idleIndex = 0;
        switch(lastDirection)
        {
            case 'right':
                idleIndex = idleRight;
                break;
            case 'left':
                idleIndex = idleLeft;
                break;
            case 'up':
                idleIndex = idleUp;
                break;
            case 'down':
                idleIndex = idleDown;
                break;
        }
        const texture = createTextureFromAtlas(animPlayer, idleIndex, player_numRows, player_numCols);
        playerPlane.material.map = texture;
        playerPlane.material.needsUpdate = true;
    }
    else
    {
        if (frameCount >= animationSpeed)
        {
            frameCount = 0;

            if (keys.up)
            {
                upAnimIndex += 1;
                if (upAnimIndex > (up + 7))
                {
                    upAnimIndex = up;
                }

                const texture = createTextureFromAtlas(animPlayer, upAnimIndex, player_numRows, player_numCols);
                playerPlane.material.map = texture;
                playerPlane.material.needsUpdate = true;
            }
            if (keys.down)
            {
                downAnimIndex += 1;
                if (downAnimIndex > (down + 7))
                {
                    downAnimIndex = down;
                }

                const texture = createTextureFromAtlas(animPlayer, downAnimIndex, player_numRows, player_numCols);
                playerPlane.material.map = texture;
                playerPlane.material.needsUpdate = true;
            }
            if (keys.left)
            {
                leftAnimIndex += 1;
                if (leftAnimIndex > (left + 7))
                {
                    leftAnimIndex = left;
                }

                const texture = createTextureFromAtlas(animPlayer, leftAnimIndex, player_numRows, player_numCols);
                playerPlane.material.map = texture;
                playerPlane.material.needsUpdate = true;
            }
            if (keys.right)
            {
                rightAnimIndex += 1;
                if (rightAnimIndex > (right + 7))
                {
                    rightAnimIndex = right;
                }

                const texture = createTextureFromAtlas(animPlayer, rightAnimIndex, player_numRows, player_numCols);
                playerPlane.material.map = texture;
                playerPlane.material.needsUpdate = true;
            }
        }
    }
}