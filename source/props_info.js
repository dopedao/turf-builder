
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

export const propType =
{
    table:
    {
      name: "table",
      texturePath: "assets/textures/props/test3.png",
      sizeName: "SQ1",
      sizeType: sizeType.SQ1,
    },
    armchair:
    {
      name: "armchair",
      texturePath: "assets/textures/props/test2.png",
      sizeName: "SQ1",
      sizeType: sizeType.SQ1,
    },
    sofa:
    {
      name: "sofa",
      texturePath: "assets/textures/props/test1.png",
      sizeName: "REC21",
      sizeType: sizeType.REC21,
    },
    testSQ1:
    {
      name: "testSQ1",
      texturePath: "",
      sizeName: "SQ1",
      sizeType: sizeType.SQ1,
    },
    testSQ2:
    {
      name: "testSQ2",
      texturePath: "",
      sizeName: "SQ2",
      sizeType: sizeType.SQ2,
    },
    testSQ3:
    {
      name: "testSQ3",
      texturePath: "",
      sizeName: "SQ3",
      sizeType: sizeType.SQ3,
    },
    testREC12:
    {
      name: "testREC12",
      texturePath: "",
      sizeName: "REC12",
      sizeType: sizeType.REC12,
    },
    testREC13:
    {
      name: "testREC13",
      texturePath: "",
      sizeName: "REC13",
      sizeType: sizeType.REC13,
    },
    testREC21:
    {
      name: "testREC21",
      texturePath: "",
      sizeName: "REC21",
      sizeType: sizeType.REC21,
    },
    testREC23:
    {
      name: "testREC23",
      texturePath: "",
      sizeName: "REC23",
      sizeType: sizeType.REC23,
    },
    testREC31:
    {
      name: "testREC31",
      texturePath: "",
      sizeName: "REC31",
      sizeType: sizeType.REC31,
    },
    testREC32:
    {
      name: "testREC32",
      texturePath: "",
      sizeName: "REC32",
      sizeType: sizeType.REC32,
    },
  };