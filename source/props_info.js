
export const sizeType = 
{
    SQ1: { sizeX: 1, sizeY: 1 },
    SQ2: { sizeX: 2, sizeY: 2 },
    SQ3: { sizeX: 3, sizeY: 3 },
    REC12:{ sizeX: 1, sizeY: 2 },
    REC13:{ sizeX: 1, sizeY: 3 },
    REC21:{ sizeX: 2, sizeY: 1 },
    REC23:{ sizeX: 2, sizeY: 3 },
    REC31:{ sizeX: 3, sizeY: 1 },
    REC32:{ sizeX: 3, sizeY: 2 },
};

export let propType =
{
    table:
    {
      name: "table",
      texturePath: "assets/textures/props/test3.png",
      numRows: "1",
      numCols: "1",
      textID: "0",
      sizeName: "SQ2",
      sizeType: sizeType.SQ2,
    },
    armchair:
    {
      name: "armchair",
      texturePath: "assets/textures/props/armChair.png",
      numRows: "2",
      numCols: "2",
      textID: "0",
      sizeName: "REC23",
      sizeType: sizeType.REC23,
    },
    sofa:
    {
      name: "sofa",
      texturePath: "assets/textures/props/test1.png",
      numRows: "1",
      numCols: "1",
      textID: "0",
      sizeName: "REC32",
      sizeType: sizeType.REC32,
    },
  };