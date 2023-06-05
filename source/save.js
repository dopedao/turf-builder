
import {loadTiles, tiles} from './main.js';
import {scene} from './sceneSetup.js';
import {addExternalWalls, manageHalfPlanes} from './tile_actions.js';
import {createNewScene} from './sceneSetup.js';

export let tilesString = "";

export function saveTileGrid()
{
    stringifyTiles();
}

export function loadTileGrid(content)
{
    const decompressedContent = pako.ungzip(content, { to: 'string' });
    let parsedTiles = JSON.parse(decompressedContent);

    while(scene.children.length > 0)
    { 
        const object = scene.children[0];
        if (object.geometry) object.geometry.dispose();
        if (object.material) object.material.dispose();
        if (object.texture) object.texture.dispose();
        scene.remove(object);
    }

    createNewScene();
    loadTiles(parsedTiles);
    addExternalWalls();
    manageHalfPlanes();
}

export function stringifyTiles()
{
    let tilesCopy = tiles.map(tile =>
    {
        let {plane, ...tileCopy} = tile;
        return tileCopy;
    });

    tilesString = pako.gzip(JSON.stringify(tilesCopy), { to: 'string' });
    downloadStringAsFile("save.json", tilesString);
}


export function downloadStringAsFile(filename, content)
{
    const blob = new Blob([content], {type: "application/gzip"});
    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);
    link.download = filename;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}