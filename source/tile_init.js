
import {tiles} from './main.js';

export const planeSize = 1;

export function initTileSystem(width, height, scene)
{
  const tileSize = 1.0;
  const planeGeometry = new THREE.PlaneGeometry(planeSize, planeSize);

  for (let i = 0; i < width; i++)
  {
    for (let j = 0; j < height; j++)
    {
      const id = j * width + i + 1;
      const position = new THREE.Vector3(
        (i - (width - 1) / 2) * tileSize,
        0.002,
        (j - (height - 1) / 2) * -tileSize
      );
      const active = false;
      const extWall = false;
      const extWallTextId = 0;
      const extWallTexTileId = 0;
      const firstExtWall = false;
      const doubleExtWall = false;
      const specialDouble = false;
      const thirdExtWall = false;
      const doubleTopExtWall = false;
      const roomWall = false;
      const roomWallTexId = 0;
      const doubleTopRoomWall = false;
      const roomWallTopOfDoubleExtWall = false;
      const roomId = [];
      const door = false;
      const prop = false;
      const mainProp = false;
      const propId = 0;
      const propType = "";
      const propPos = new THREE.Vector3;
      const propSize = new THREE.Vector2;
      const propTextId = "";
      const propSharedIds = [];
      const miniProps = [];
      const textureID = 6;
      const atlasID = 1;

      const fillMaterial = new THREE.MeshBasicMaterial({
        color: 0x282e3b,
      });

      const plane = new THREE.Mesh(planeGeometry, fillMaterial);
      plane.position.copy(position);
      plane.rotation.x = -Math.PI / 2;
      scene.add(plane);

      const planePosition = plane.position;
      const planeRotation = plane.rotation.x;

      tiles.push({id, position, active, extWall, extWallTextId, extWallTexTileId, firstExtWall, doubleExtWall, specialDouble, thirdExtWall,
                    doubleTopExtWall, roomWall, roomWallTexId, doubleTopRoomWall, roomId, door, prop, propType, propSharedIds,
                    propId, miniProps, plane, textureID, atlasID, roomWallTopOfDoubleExtWall, planePosition, planeRotation,
                    mainProp, propPos, propSize, propTextId});
    }
  }
}