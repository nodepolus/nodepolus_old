import { StaticMapData, DoorOrientation } from "./types";
import { Vector2 } from "../../packets/packetElements/vector";
import { loadColliders } from "./functions";
// import Polygon from "polygon";

let StaticData: StaticMapData = {
  doors: [
    {
      id: 0x00,
      orientation: DoorOrientation.VERTICAL,
      collider: {
        type: "box",
        name: "RightDoor",
        position: {
          x: 11.255,
          y: -9.4473,
          z: 1.0,
        },
        offset: {
          x: -0.0185557,
          y: 0.0,
        },
        rotation: {
          x: 0.0,
          y: 0.0,
          z: 0.0,
        },
        size: {
          x: 0.311332941,
          y: 2.25,
        },
        bounds: {
          max: {
            x: 11.3921108,
            y: -8.517607,
          },
          min: {
            x: 11.0807781,
            y: -10.3769932,
          },
        },
        isTrigger: true,
        enabled: true,
        isActiveAndEnabled: true,
        tag: "Untagged",
      },
    },
    {
      id: 0x01,
      orientation: DoorOrientation.HORIZONTAL,
      collider: {
        type: "box",
        name: "InternalDoor",
        position: {
          x: 7.48270035,
          y: -10.9220009,
          z: -0.0134999752,
        },
        offset: {
          x: -0.0217754841,
          y: -0.116015792,
        },
        rotation: {
          x: 0.0,
          y: 0.0,
          z: 0.0,
        },
        size: {
          x: 1.46073675,
          y: 0.7079685,
        },
        bounds: {
          max: {
            x: 8.167484,
            y: -10.6840324,
          },
          min: {
            x: 6.755829,
            y: -11.3920021,
          },
        },
        isTrigger: true,
        enabled: true,
        isActiveAndEnabled: true,
        tag: "Untagged",
      },
    },
    {
      id: 0x02,
      orientation: DoorOrientation.HORIZONTAL,
      collider: {
        type: "box",
        name: "BottomDoor",
        position: {
          x: 5.4228,
          y: -13.496,
          z: -0.0134999752,
        },
        offset: {
          x: -0.0217754841,
          y: -0.116015792,
        },
        rotation: {
          x: 0.0,
          y: 0.0,
          z: 0.0,
        },
        size: {
          x: 1.46073675,
          y: 0.7079685,
        },
        bounds: {
          max: {
            x: 6.137841,
            y: -13.2580318,
          },
          min: {
            x: 4.66381168,
            y: -13.9660015,
          },
        },
        isTrigger: true,
        enabled: true,
        isActiveAndEnabled: true,
        tag: "Untagged",
      },
    },
  ],
  rooms: [
    {
      id: 0x07,
      name: "Electrical",
      doors: [0x00, 0x01, 0x02], //TODO: Add door data
      boundaries: {
        type: "polygon",
        name: "Electrical",
        position: {
          x: 6.341,
          y: -13.475,
          z: 1.0,
        },
        offset: {
          x: 0.0,
          y: 0.0,
        },
        rotation: {
          x: 0.0,
          y: 0.0,
          z: 0.0,
        },
        bounds: {
          max: {
            x: 11.3031635,
            y: -8.51239,
          },
          min: {
            x: 1.44312763,
            y: -13.86746,
          },
        },
        isTrigger: true,
        enabled: true,
        isActiveAndEnabled: true,
        tag: "Untagged",
        points: [
          {
            x: -4.89787245,
            y: 4.94171333,
          },
          {
            x: -4.849384,
            y: 2.56060123,
          },
          {
            x: -1.916677,
            y: 2.55437565,
          },
          {
            x: -1.8114233,
            y: -0.392459869,
          },
          {
            x: 4.96216345,
            y: -0.36692524,
          },
          {
            x: 4.894976,
            y: 4.96261024,
          },
        ],
      },
      collision: [
        {
          type: "edge",
          name: "Walls",
          position: {
            x: 6.341,
            y: -13.475,
            z: 3.0,
          },
          offset: {
            x: 0.0,
            y: 0.0,
          },
          rotation: {
            x: 0.0,
            y: 0.0,
            z: 0.0,
          },
          bounds: {
            max: {
              x: 11.4079046,
              y: -10.2124033,
            },
            min: {
              x: 6.660733,
              y: -13.9699335,
            },
          },
          isTrigger: false,
          enabled: true,
          isActiveAndEnabled: true,
          tag: "Untagged",
          points: [
            {
              x: 0.319732666,
              y: -0.494933128,
            },
            {
              x: 5.04778433,
              y: -0.48552227,
            },
            {
              x: 5.06690454,
              y: 3.262597,
            },
            {
              x: 4.719129,
              y: 3.255908,
            },
            {
              x: 4.7431035,
              y: 3.05613518,
            },
            {
              x: 1.75592184,
              y: 3.06174946,
            },
            {
              x: 1.75021315,
              y: 2.07852173,
            },
            {
              x: 5.0568614,
              y: 2.095667,
            },
          ],
        },
        {
          type: "edge",
          name: "Walls",
          position: {
            x: 6.341,
            y: -13.475,
            z: 3.0,
          },
          offset: {
            x: 0.0,
            y: 0.0,
          },
          rotation: {
            x: 0.0,
            y: 0.0,
            z: 0.0,
          },
          bounds: {
            max: {
              x: 6.8839345,
              y: -10.4190512,
            },
            min: {
              x: 6.05589056,
              y: -13.9886656,
            },
          },
          isTrigger: false,
          enabled: true,
          isActiveAndEnabled: true,
          tag: "Untagged",
          points: [
            {
              x: -0.281147,
              y: -0.5112543,
            },
            {
              x: -0.284157753,
              y: 0.463637352,
            },
            {
              x: 0.0242218971,
              y: 0.471868515,
            },
            {
              x: 0.0220313072,
              y: 3.05594921,
            },
            {
              x: 0.5429344,
              y: 3.044631,
            },
            {
              x: 0.525984764,
              y: 2.09343719,
            },
            {
              x: 0.342384815,
              y: 2.08712769,
            },
            {
              x: 0.340109825,
              y: -0.5136652,
            },
            {
              x: -0.28510952,
              y: -0.513664246,
            },
          ],
        },
        {
          type: "edge",
          name: "Walls",
          position: {
            x: 6.341,
            y: -13.475,
            z: 3.0,
          },
          offset: {
            x: 0.0,
            y: 0.0,
          },
          rotation: {
            x: 0.0,
            y: 0.0,
            z: 0.0,
          },
          bounds: {
            max: {
              x: 11.4201508,
              y: -7.992749,
            },
            min: {
              x: 1.16365433,
              y: -13.9930067,
            },
          },
          isTrigger: false,
          enabled: true,
          isActiveAndEnabled: true,
          tag: "Untagged",
          points: [
            {
              x: -5.177346,
              y: 5.47220039,
            },
            {
              x: 5.07651,
              y: 5.48225164,
            },
            {
              x: 5.07915068,
              y: 4.22967625,
            },
            {
              x: 4.738543,
              y: 4.255743,
            },
            {
              x: 4.1270175,
              y: 4.299135,
            },
            {
              x: 3.759048,
              y: 4.505205,
            },
            {
              x: 3.38525248,
              y: 4.487715,
            },
            {
              x: 3.39660215,
              y: 4.354867,
            },
            {
              x: 1.37141991,
              y: 4.35096169,
            },
            {
              x: 1.36119366,
              y: 4.493826,
            },
            {
              x: -3.797804,
              y: 4.50204659,
            },
            {
              x: -4.12449551,
              y: 4.23850155,
            },
            {
              x: -4.754594,
              y: 4.52123165,
            },
            {
              x: -4.75265265,
              y: 3.06265545,
            },
            {
              x: -4.451182,
              y: 3.05085945,
            },
            {
              x: -4.46524954,
              y: 2.30712986,
            },
            {
              x: -4.77675056,
              y: 2.035184,
            },
            {
              x: -4.75587034,
              y: 0.46394062,
            },
            {
              x: -2.00006,
              y: 0.456061363,
            },
            {
              x: -1.98930407,
              y: 2.167551,
            },
            {
              x: -3.00837779,
              y: 2.12709713,
            },
            {
              x: -3.21057987,
              y: 2.30797863,
            },
            {
              x: -3.197067,
              y: 3.050271,
            },
            {
              x: -1.87901211,
              y: 3.03751469,
            },
            {
              x: -1.886426,
              y: 0.460950851,
            },
            {
              x: -1.53598785,
              y: 0.45786953,
            },
            {
              x: -1.54079771,
              y: -0.5180063,
            },
            {
              x: -2.0791707,
              y: -0.49944973,
            },
          ],
        },
        {
          type: "polygon",
          name: "barrier",
          position: {
            x: 1.94199991,
            y: -10.121,
            z: -0.00996995,
          },
          offset: {
            x: 0.0,
            y: 0.0,
          },
          rotation: {
            x: 0.0,
            y: 0.0,
            z: 0.0,
          },
          bounds: {
            max: {
              x: 2.262032,
              y: -10.0960979,
            },
            min: {
              x: 1.57145214,
              y: -10.4334507,
            },
          },
          isTrigger: false,
          enabled: true,
          isActiveAndEnabled: true,
          tag: "Untagged",
          points: [
            {
              x: -0.370547771,
              y: -0.142451286,
            },
            {
              x: -0.122613907,
              y: -0.312451363,
            },
            {
              x: 0.32003212,
              y: 0.0249023438,
            },
          ],
        },
        {
          type: "box",
          name: "transformer0001",
          position: {
            x: 8.834,
            y: -11.263,
            z: 1.0,
          },
          offset: {
            x: 0.02499628,
            y: -0.2606206,
          },
          rotation: {
            x: 0.0,
            y: 0.0,
            z: 0.0,
          },
          size: {
            x: 1.04000759,
            y: 0.8437624,
          },
          bounds: {
            max: {
              x: 9.379,
              y: -11.10174,
            },
            min: {
              x: 8.338991,
              y: -11.9455013,
            },
          },
          isTrigger: false,
          enabled: true,
          isActiveAndEnabled: true,
          tag: "Untagged",
        },
        {
          type: "box",
          name: "transformer0001 (1)",
          position: {
            x: 10.602,
            y: -11.263,
            z: 1.0,
          },
          offset: {
            x: 0.02499628,
            y: -0.2606206,
          },
          rotation: {
            x: 0.0,
            y: 0.0,
            z: 0.0,
          },
          size: {
            x: 1.04000759,
            y: 0.8437624,
          },
          bounds: {
            max: {
              x: 11.1470013,
              y: -11.10174,
            },
            min: {
              x: 10.1069927,
              y: -11.9455013,
            },
          },
          isTrigger: false,
          enabled: true,
          isActiveAndEnabled: true,
          tag: "Untagged",
        },
        {
          type: "box",
          name: "transformer0001 (2)",
          position: {
            x: 10.602,
            y: -13.107,
            z: -0.0130000114,
          },
          offset: {
            x: 0.02499628,
            y: -0.2606206,
          },
          rotation: {
            x: 0.0,
            y: 0.0,
            z: 0.0,
          },
          size: {
            x: 1.04000759,
            y: 0.8437624,
          },
          bounds: {
            max: {
              x: 11.1470013,
              y: -12.94574,
            },
            min: {
              x: 10.1069927,
              y: -13.7895012,
            },
          },
          isTrigger: false,
          enabled: true,
          isActiveAndEnabled: true,
          tag: "Untagged",
        },
        {
          type: "box",
          name: "transformer0001 (3)",
          position: {
            x: 8.825,
            y: -13.107,
            z: -0.0130000114,
          },
          offset: {
            x: 0.02499628,
            y: -0.2606206,
          },
          rotation: {
            x: 0.0,
            y: 0.0,
            z: 0.0,
          },
          size: {
            x: 1.04000759,
            y: 0.8437624,
          },
          bounds: {
            max: {
              x: 9.370001,
              y: -12.94574,
            },
            min: {
              x: 8.329992,
              y: -13.7895012,
            },
          },
          isTrigger: false,
          enabled: true,
          isActiveAndEnabled: true,
          tag: "Untagged",
        },
      ],
    },
    {
      id: 0x11,
      name: "Security",
      doors: [],
      boundaries: {
        type: "box",
        name: "Security",
        position: {
          x: 2.991,
          y: -11.94,
          z: 1.0,
        },
        offset: {
          x: 0.0,
          y: -0.117520452,
        },
        rotation: {
          x: 0.0,
          y: 0.0,
          z: 0.0,
        },
        size: {
          x: 2.87,
          y: 1.925041,
        },
        bounds: {
          max: {
            x: 4.42599964,
            y: -11.0949993,
          },
          min: {
            x: 1.55599988,
            y: -13.0200405,
          },
        },
        isTrigger: true,
        enabled: true,
        isActiveAndEnabled: true,
        tag: "NoSnow",
      },
      collision: [
        {
          type: "edge",
          name: "Walls",
          position: {
            x: 6.341,
            y: -13.475,
            z: 3.0,
          },
          offset: {
            x: 0.0,
            y: 0.0,
          },
          rotation: {
            x: 0.0,
            y: 0.0,
            z: 0.0,
          },
          bounds: {
            max: {
              x: 11.4201508,
              y: -7.992749,
            },
            min: {
              x: 1.16365433,
              y: -13.9930067,
            },
          },
          isTrigger: false,
          enabled: true,
          isActiveAndEnabled: true,
          tag: "Untagged",
          points: [
            {
              x: -5.177346,
              y: 5.47220039,
            },
            {
              x: 5.07651,
              y: 5.48225164,
            },
            {
              x: 5.07915068,
              y: 4.22967625,
            },
            {
              x: 4.738543,
              y: 4.255743,
            },
            {
              x: 4.1270175,
              y: 4.299135,
            },
            {
              x: 3.759048,
              y: 4.505205,
            },
            {
              x: 3.38525248,
              y: 4.487715,
            },
            {
              x: 3.39660215,
              y: 4.354867,
            },
            {
              x: 1.37141991,
              y: 4.35096169,
            },
            {
              x: 1.36119366,
              y: 4.493826,
            },
            {
              x: -3.797804,
              y: 4.50204659,
            },
            {
              x: -4.12449551,
              y: 4.23850155,
            },
            {
              x: -4.754594,
              y: 4.52123165,
            },
            {
              x: -4.75265265,
              y: 3.06265545,
            },
            {
              x: -4.451182,
              y: 3.05085945,
            },
            {
              x: -4.46524954,
              y: 2.30712986,
            },
            {
              x: -4.77675056,
              y: 2.035184,
            },
            {
              x: -4.75587034,
              y: 0.46394062,
            },
            {
              x: -2.00006,
              y: 0.456061363,
            },
            {
              x: -1.98930407,
              y: 2.167551,
            },
            {
              x: -3.00837779,
              y: 2.12709713,
            },
            {
              x: -3.21057987,
              y: 2.30797863,
            },
            {
              x: -3.197067,
              y: 3.050271,
            },
            {
              x: -1.87901211,
              y: 3.03751469,
            },
            {
              x: -1.886426,
              y: 0.460950851,
            },
            {
              x: -1.53598785,
              y: 0.45786953,
            },
            {
              x: -1.54079771,
              y: -0.5180063,
            },
            {
              x: -2.0791707,
              y: -0.49944973,
            },
          ],
        },
      ],
    },
    {
      id: 0x00,
      name: "02-to-Electrical Hallway",
      doors: [0x02, 0x03],
      boundaries: {
        type: "box",
        name: "Plastic",
        position: {
          x: 5.441,
          y: -16.0050011,
          z: 1.0,
        },
        offset: {
          x: -0.04791403,
          y: -0.248818874,
        },
        rotation: {
          x: 0.0,
          y: 0.0,
          z: 0.0,
        },
        size: {
          x: 1.57179737,
          y: 4.7029314,
        },
        bounds: {
          max: {
            x: 6.17898464,
            y: -13.9023552,
          },
          min: {
            x: 4.60718727,
            y: -18.6052856,
          },
        },
        isTrigger: true,
        enabled: true,
        isActiveAndEnabled: true,
        tag: "NoSnow",
      },
      collision: [
        {
          type: "edge",
          name: "TubeWalls",
          position: {
            x: 6.341,
            y: -13.475,
            z: 2.0,
          },
          offset: {
            x: 0.0,
            y: 0.0,
          },
          rotation: {
            x: 0.0,
            y: 0.0,
            z: 0.0,
          },
          bounds: {
            max: {
              x: 6.22798,
              y: -13.1780682,
            },
            min: {
              x: 6.21670961,
              y: -17.95516,
            },
          },
          isTrigger: false,
          enabled: true,
          isActiveAndEnabled: true,
          tag: "Untagged",
          points: [
            {
              x: -0.113019943,
              y: -4.48015976,
            },
            {
              x: -0.124290466,
              y: 0.296931267,
            },
          ],
        },
        {
          type: "edge",
          name: "TubeWalls",
          position: {
            x: 6.341,
            y: -13.475,
            z: 2.0,
          },
          offset: {
            x: 0.0,
            y: 0.0,
          },
          rotation: {
            x: 0.0,
            y: 0.0,
            z: 0.0,
          },
          bounds: {
            max: {
              x: 4.62309361,
              y: -13.2415524,
            },
            min: {
              x: 4.616889,
              y: -17.9625072,
            },
          },
          isTrigger: false,
          enabled: true,
          isActiveAndEnabled: true,
          tag: "Untagged",
          points: [
            {
              x: -1.71790648,
              y: 0.233447075,
            },
            {
              x: -1.7241106,
              y: -4.487507,
            },
          ],
        },
      ],
    },
    {
      id: 0x08,
      name: "02",
      doors: [0x03, 0x04],
      boundaries: {
        type: "polygon",
        name: "LifeSupport",
        position: {
          x: 3.579,
          y: -20.128,
          z: 1.0,
        },
        offset: {
          x: 0.0,
          y: 0.0,
        },
        rotation: {
          x: 0.0,
          y: 0.0,
          z: 0.0,
        },
        bounds: {
          max: {
            x: 7.02397346,
            y: -15.3682175,
          },
          min: {
            x: 0.114620209,
            y: -23.1113281,
          },
        },
        isTrigger: true,
        enabled: true,
        isActiveAndEnabled: true,
        tag: "Untagged",
        points: [
          {
            x: 0.6470113,
            y: 4.75978374,
          },
          {
            x: -3.46437955,
            y: 4.685568,
          },
          {
            x: -3.360895,
            y: -2.98332787,
          },
          {
            x: 0.852656841,
            y: -2.9491024,
          },
          {
            x: 0.9053793,
            y: -2.59501076,
          },
          {
            x: 3.44497347,
            y: -2.58711815,
          },
          {
            x: 3.410143,
            y: 1.44927979,
          },
          {
            x: 0.7201996,
            y: 1.4633007,
          },
        ],
      },
      collision: [
        {
          type: "edge",
          name: "Walls",
          position: {
            x: 3.579,
            y: -20.128,
            z: 2.0,
          },
          offset: {
            x: 0.0,
            y: 0.0,
          },
          rotation: {
            x: 0.0,
            y: 0.0,
            z: 0.0,
          },
          bounds: {
            max: {
              x: 7.160014,
              y: -17.7961349,
            },
            min: {
              x: 6.12193775,
              y: -22.8171844,
            },
          },
          isTrigger: false,
          enabled: true,
          isActiveAndEnabled: true,
          tag: "Untagged",
          points: [
            {
              x: 2.54293728,
              y: 2.30875969,
            },
            {
              x: 2.54629183,
              y: 1.35038185,
            },
            {
              x: 3.246426,
              y: 1.36101341,
            },
            {
              x: 3.26078749,
              y: -1.72287941,
            },
            {
              x: 2.96190357,
              y: -1.72427177,
            },
            {
              x: 2.96139526,
              y: -2.661749,
            },
            {
              x: 3.57438087,
              y: -2.68918419,
            },
            {
              x: 3.58101416,
              y: 2.33186722,
            },
            {
              x: 2.5430665,
              y: 2.31567383,
            },
          ],
        },
        {
          type: "edge",
          name: "Walls",
          position: {
            x: 3.579,
            y: -20.128,
            z: 2.0,
          },
          offset: {
            x: 0.0,
            y: 0.0,
          },
          rotation: {
            x: 0.0,
            y: 0.0,
            z: 0.0,
          },
          bounds: {
            max: {
              x: 5.28153944,
              y: -15.6875076,
            },
            min: {
              x: 0.310968876,
              y: -25.707,
            },
          },
          isTrigger: false,
          enabled: true,
          isActiveAndEnabled: true,
          tag: "Untagged",
          points: [
            {
              x: 0.7509031,
              y: 2.32065582,
            },
            {
              x: 1.26985455,
              y: 2.321659,
            },
            {
              x: 1.28711176,
              y: 1.33648491,
            },
            {
              x: 0.15099287,
              y: 1.34481621,
            },
            {
              x: 0.1332531,
              y: 2.12720871,
            },
            {
              x: 0.435073376,
              y: 2.127861,
            },
            {
              x: 0.444357872,
              y: 3.79112816,
            },
            {
              x: -0.2761383,
              y: 4.44049168,
            },
            {
              x: -1.356538,
              y: 4.431264,
            },
            {
              x: -1.40723753,
              y: 3.74737549,
            },
            {
              x: -1.70830476,
              y: 3.57282066,
            },
            {
              x: -2.16575146,
              y: 3.73146629,
            },
            {
              x: -2.39605212,
              y: 4.41441059,
            },
            {
              x: -3.263412,
              y: 4.43239,
            },
            {
              x: -3.24340773,
              y: 3.13866425,
            },
            {
              x: -2.9888792,
              y: 3.05570221,
            },
            {
              x: -2.98461747,
              y: 2.92396355,
            },
            {
              x: -2.7509985,
              y: 2.828848,
            },
            {
              x: -2.76101565,
              y: 2.11808586,
            },
            {
              x: -1.08526754,
              y: 2.108963,
            },
            {
              x: -1.08581042,
              y: -1.23049164,
            },
            {
              x: -1.49925423,
              y: -1.23593712,
            },
            {
              x: -1.50031471,
              y: -0.484823227,
            },
            {
              x: -1.22277951,
              y: -0.479764938,
            },
            {
              x: -1.2104423,
              y: 1.16934776,
            },
            {
              x: -1.5025568,
              y: 1.14994049,
            },
            {
              x: -1.69313729,
              y: 1.36871529,
            },
            {
              x: -2.461793,
              y: 1.36311531,
            },
            {
              x: -2.75008,
              y: 1.09459114,
            },
            {
              x: -2.740302,
              y: 0.92256546,
            },
            {
              x: -2.19015312,
              y: 0.932529449,
            },
            {
              x: -1.98255682,
              y: 0.6939564,
            },
            {
              x: -2.00308633,
              y: 0.432065964,
            },
            {
              x: -2.14316225,
              y: 0.348310471,
            },
            {
              x: -2.73679113,
              y: 0.3437519,
            },
            {
              x: -2.73437214,
              y: 0.14503479,
            },
            {
              x: -3.268031,
              y: -0.468221664,
            },
            {
              x: -2.73723316,
              y: -0.48633194,
            },
            {
              x: -2.76320124,
              y: -1.50637627,
            },
            {
              x: -3.249463,
              y: -1.5812397,
            },
            {
              x: -3.24234223,
              y: -2.30702019,
            },
            {
              x: -0.7857206,
              y: -2.31624222,
            },
            {
              x: -0.786008358,
              y: -3.07469559,
            },
            {
              x: -2.11788177,
              y: -3.068142,
            },
            {
              x: -2.26153016,
              y: -3.24793243,
            },
            {
              x: -3.26546,
              y: -3.48271751,
            },
            {
              x: -3.26520658,
              y: -4.864851,
            },
            {
              x: 0.725622654,
              y: -4.8341465,
            },
            {
              x: 0.732398033,
              y: -3.06087875,
            },
            {
              x: 0.486455917,
              y: -3.06999588,
            },
            {
              x: 0.487552643,
              y: -2.30277634,
            },
            {
              x: 0.724843,
              y: -2.31330872,
            },
            {
              x: 0.7262411,
              y: -1.719841,
            },
            {
              x: 1.683867,
              y: -1.72981071,
            },
            {
              x: 1.70253944,
              y: -2.71079445,
            },
            {
              x: 1.05477142,
              y: -2.69201279,
            },
            {
              x: 1.05486774,
              y: -5.57900047,
            },
          ],
        },
      ],
    },
    {
      id: 0x0c,
      name: "Weapons",
      doors: [0x05],
      boundaries: {
        type: "polygon",
        name: "Weapons",
        position: {
          x: 11.59,
          y: -23.23,
          z: 1.0,
        },
        offset: {
          x: 0.0,
          y: 0.0,
        },
        rotation: {
          x: 0.0,
          y: 0.0,
          z: 0.0,
        },
        bounds: {
          max: {
            x: 14.232007,
            y: -20.97405,
          },
          min: {
            x: 9.598535,
            y: -25.8466663,
          },
        },
        isTrigger: true,
        enabled: true,
        isActiveAndEnabled: true,
        tag: "Untagged",
        points: [
          {
            x: 0.691836357,
            y: 2.255949,
          },
          {
            x: 0.7838564,
            y: 0.819911957,
          },
          {
            x: -1.97145653,
            y: 0.8088169,
          },
          {
            x: -1.99146557,
            y: -2.55457878,
          },
          {
            x: 1.42858791,
            y: -2.61666679,
          },
          {
            x: 2.64200687,
            y: -1.43699265,
          },
          {
            x: 2.56501,
            y: 0.760831833,
          },
          {
            x: 2.1402216,
            y: 0.7899132,
          },
          {
            x: 2.17507458,
            y: 2.2461586,
          },
        ],
      },
      collision: [
        {
          type: "edge",
          name: "Walls",
          position: {
            x: 11.59,
            y: -23.23,
            z: -0.0206999779,
          },
          offset: {
            x: 0.0,
            y: 0.0,
          },
          rotation: {
            x: 0.0,
            y: 0.0,
            z: 0.0,
          },
          bounds: {
            max: {
              x: 14.3505936,
              y: -20.9390583,
            },
            min: {
              x: 9.431522,
              y: -26.22824,
            },
          },
          isTrigger: false,
          enabled: true,
          isActiveAndEnabled: true,
          tag: "Untagged",
          points: [
            {
              x: -2.13514519,
              y: -2.73852539,
            },
            {
              x: -2.15847778,
              y: 1.59184074,
            },
            {
              x: 0.603158951,
              y: 1.60082817,
            },
            {
              x: 0.5957842,
              y: 2.27175713,
            },
            {
              x: 0.8004589,
              y: 2.270567,
            },
            {
              x: 0.774311066,
              y: 0.7857189,
            },
            {
              x: -0.8089819,
              y: 0.7859669,
            },
            {
              x: -0.915843,
              y: 0.4931984,
            },
            {
              x: -1.33602047,
              y: 0.383119583,
            },
            {
              x: -1.47904682,
              y: 0.125509262,
            },
            {
              x: -1.4741354,
              y: -0.7323227,
            },
            {
              x: 0.0850019455,
              y: -0.7521324,
            },
            {
              x: 0.39683342,
              y: -1.02649879,
            },
            {
              x: 0.487542152,
              y: -1.42993355,
            },
            {
              x: 0.5231943,
              y: -1.95933914,
            },
            {
              x: 1.42007732,
              y: -1.940445,
            },
            {
              x: 2.52520275,
              y: -0.818676,
            },
            {
              x: 2.54200935,
              y: 0.738796234,
            },
            {
              x: 2.11977863,
              y: 0.7825241,
            },
            {
              x: 2.10046387,
              y: 2.27234077,
            },
            {
              x: 2.33115959,
              y: 2.29094124,
            },
            {
              x: 2.33223248,
              y: 1.61656,
            },
            {
              x: 2.76059341,
              y: 1.61594772,
            },
            {
              x: 2.74282455,
              y: -1.43299866,
            },
            {
              x: 1.23520947,
              y: -2.99823952,
            },
          ],
        }
      ],
    },
    {
      id: 0x0e,
      name: "Communications",
      doors: [0x06], 
      boundaries: 
    }
  ],
  vents: [
    {
      id: 0,
      position: new Vector2(1.9281311, -9.195087),
    },
    {
      id: 1,
      position: new Vector2(6.8989105, -14.047455),
    },
    {
      id: 2,
      position: new Vector2(3.5089645, -16.216679),
    },
    {
      id: 3,
      position: new Vector2(12.303043, -18.53483),
    },
    {
      id: 4,
      position: new Vector2(16.377811, -19.235523),
    },
    {
      id: 5,
      position: new Vector2(20.088806, -25.153582),
    },
    {
      id: 6,
      position: new Vector2(32.96254, -9.163349),
    },
    {
      id: 7,
      position: new Vector2(30.906845, -11.497368),
    },
    {
      id: 8,
      position: new Vector2(21.999237, -11.826963),
    },
    {
      id: 9,
      position: new Vector2(24.019531, -8.026855),
    },
    {
      id: 10,
      position: new Vector2(9.639431, -7.356678),
    },
    {
      id: 11,
      position: new Vector2(18.929123, -24.487068),
    },
  ],
  tasks: [
    {
      id: 0,
      collider: {
        type: "box",
        name: "panel_scanID",
        position: {
          x: 24.8164444,
          y: -16.2175217,
          z: 0.9999,
        },
        offset: {
          x: 0.0,
          y: 0.0,
        },
        rotation: {
          x: 0.0,
          y: 0.0,
          z: 0.0,
        },
        size: {
          x: 0.67,
          y: 0.59,
        },
        bounds: {
          max: {
            x: 25.1514435,
            y: -15.9225216,
          },
          min: {
            x: 24.4814453,
            y: -16.5125217,
          },
        },
        isTrigger: true,
        enabled: true,
        isActiveAndEnabled: true,
        tag: "Untagged",
      },
      name: "Swipe Card",
      isVisual: false,
      length: "common",
      stepCount: 1,
    },
    {
      id: 1,
      collider: {
        type: "box",
        name: "panel_keys",
        position: {
          x: 17.38076,
          y: 0.08402014,
          z: 0.9999,
        },
        offset: {
          x: 0.0,
          y: 0.0,
        },
        rotation: {
          x: 0.0,
          y: 0.0,
          z: 0.0,
        },
        size: {
          x: 0.5,
          y: 0.5,
        },
        bounds: {
          max: {
            x: 17.6082611,
            y: 0.311520159,
          },
          min: {
            x: 17.15326,
            y: -0.143479884,
          },
        },
        isTrigger: true,
        enabled: true,
        isActiveAndEnabled: true,
        tag: "Untagged",
      },
      name: "Insert Keys",
      isVisual: false,
      length: "common",
      stepCount: 1,
    },
    {
      id: 2,
      collider: {
        type: "box",
        name: "panel_boardingpass",
        position: {
          x: 25.75001,
          y: -16.03081,
          z: 0.9999,
        },
        offset: {
          x: 0.0,
          y: 0.0,
        },
        rotation: {
          x: 0.0,
          y: 0.0,
          z: 0.0,
        },
        size: {
          x: 0.7,
          y: 0.7,
        },
        bounds: {
          max: {
            x: 26.10001,
            y: -15.680809,
          },
          min: {
            x: 25.40001,
            y: -16.38081,
          },
        },
        isTrigger: true,
        enabled: true,
        isActiveAndEnabled: true,
        tag: "Untagged",
      },
      name: "Scan Boarding Pass",
      isVisual: false,
      length: "common",
      stepCount: 1,
    },
    {
      id: 3,
      collider: {
        type: "box",
        name: "panel_electrical_elec",
        position: {
          x: 3.06727982,
          y: -8.691476,
          z: 2.0,
        },
        offset: {
          x: 0.0,
          y: 0.00500000268,
        },
        rotation: {
          x: 0.0,
          y: 0.0,
          z: 0.0,
        },
        size: {
          x: 0.33,
          y: 0.23,
        },
        bounds: {
          max: {
            x: 3.23227978,
            y: -8.571476,
          },
          min: {
            x: 2.90227985,
            y: -8.801476,
          },
        },
        isTrigger: true,
        enabled: true,
        isActiveAndEnabled: true,
        tag: "Untagged",
      },
      name: "Fix Wiring", // electrical
      isVisual: false,
      length: "common",
      stepCount: 3,
    },
    {
      id: 4,
      collider: {
        type: "box",
        name: "panel_weapons",
        position: {
          x: 9.929073,
          y: -22.3909931,
          z: -0.0207099915,
        },
        offset: {
          x: 0.0149999857,
          y: 0.0,
        },
        rotation: {
          x: 0.0,
          y: 0.0,
          z: 0.0,
        },
        size: {
          x: 0.59,
          y: 0.63,
        },
        bounds: {
          max: {
            x: 10.2390738,
            y: -22.0759926,
          },
          min: {
            x: 9.649074,
            y: -22.7059937,
          },
        },
        isTrigger: true,
        enabled: true,
        isActiveAndEnabled: true,
        tag: "Untagged",
      },
      name: "Download Data", // Weapons
      isVisual: false,
      length: "short",
      stepCount: 2,
    },
    {
      id: 5,
      collider: {
        type: "box",
        name: "panel_data",
        position: {
          x: 27.7320423,
          y: -15.9733591,
          z: 0.9999,
        },
        offset: {
          x: 0.0,
          y: 0.0,
        },
        rotation: {
          x: 0.0,
          y: 0.0,
          z: 0.0,
        },
        size: {
          x: 0.33,
          y: 0.27,
        },
        bounds: {
          max: {
            x: 27.8970432,
            y: -15.8383579,
          },
          min: {
            x: 27.5670414,
            y: -16.1083584,
          },
        },
        isTrigger: true,
        enabled: true,
        isActiveAndEnabled: true,
        tag: "Untagged",
      },
      name: "Download Data", // Office
      isVisual: false,
      length: "short",
      stepCount: 2,
    },
    {
      id: 6,
      collider: {
        type: "box",
        name: "panel_data",
        position: {
          x: 6.565895,
          y: -8.702654,
          z: 0.0,
        },
        offset: {
          x: 0.0,
          y: 0.0,
        },
        rotation: {
          x: 0.0,
          y: 0.0,
          z: 0.0,
        },
        size: {
          x: 0.33,
          y: 0.27,
        },
        bounds: {
          max: {
            x: 6.730895,
            y: -8.567654,
          },
          min: {
            x: 6.400895,
            y: -8.837654,
          },
        },
        isTrigger: true,
        enabled: true,
        isActiveAndEnabled: true,
        tag: "Untagged",
      },
      name: "Download Data", // Electrical
      isVisual: false,
      length: "short",
      stepCount: 2,
    },
    {
      id: 7,
      collider: {
        type: "box",
        name: "panel_data",
        position: {
          x: 37.73663,
          y: -18.5094719,
          z: 1.0,
        },
        offset: {
          x: 0.0,
          y: 0.0,
        },
        rotation: {
          x: 0.0,
          y: 0.0,
          z: 0.0,
        },
        size: {
          x: 0.33,
          y: 0.27,
        },
        bounds: {
          max: {
            x: 37.90163,
            y: -18.3744717,
          },
          min: {
            x: 37.57163,
            y: -18.6444721,
          },
        },
        isTrigger: true,
        enabled: true,
        isActiveAndEnabled: true,
        tag: "Untagged",
      },
      name: "Download Data", // Specimen
      isVisual: false,
      length: "short",
      stepCount: 2,
    },
    {
      id: 8,
      collider: {
        type: "box",
        name: "panel_data",
        position: {
          x: 2.85304713,
          y: -15.3576088,
          z: 0.0,
        },
        offset: {
          x: 0.0,
          y: 0.0,
        },
        rotation: {
          x: 0.0,
          y: 0.0,
          z: 0.0,
        },
        size: {
          x: 0.33,
          y: 0.27,
        },
        bounds: {
          max: {
            x: 3.018047,
            y: -15.2226086,
          },
          min: {
            x: 2.68804717,
            y: -15.492609,
          },
        },
        isTrigger: true,
        enabled: true,
        isActiveAndEnabled: true,
        tag: "Untagged",
      },
      name: "Download Data", // O2
      isVisual: false,
      length: "short",
      stepCount: 2,
    },
    {
      id: 9,
      collider: {
        type: "box",
        name: "panel_simonsays",
        position: {
          x: 34.7577744,
          y: -18.8785362,
          z: 1.0,
        },
        offset: {
          x: 0.0,
          y: 0.0,
        },
        rotation: {
          x: 0.0,
          y: 0.0,
          z: 0.0,
        },
        size: {
          x: 0.56,
          y: 0.63,
        },
        bounds: {
          max: {
            x: 35.0377731,
            y: -18.5635357,
          },
          min: {
            x: 34.4777756,
            y: -19.1935368,
          },
        },
        isTrigger: true,
        enabled: true,
        isActiveAndEnabled: true,
        tag: "Untagged",
      },
      name: "Start Reactor",
      isVisual: false,
      length: "long",
      stepCount: 1,
    },
    {
      id: 10,
      collider: {
        type: "box",
        name: "panel_gascan",
        position: {
          x: 21.0663834,
          y: -11.2992172,
          z: 0.0,
        },
        offset: {
          x: 0.0,
          y: 0.0,
        },
        rotation: {
          x: 0.0,
          y: 0.0,
          z: 0.0,
        },
        size: {
          x: 0.36,
          y: 0.48,
        },
        bounds: {
          max: {
            x: 21.2463837,
            y: -11.0592175,
          },
          min: {
            x: 20.8863831,
            y: -11.539217,
          },
        },
        isTrigger: true,
        enabled: true,
        isActiveAndEnabled: true,
        tag: "Untagged",
      },
      name: "Fuel Engines",
      isVisual: false,
      length: "long",
      stepCount: 4,
    },
    {
      id: 11,
      collider: {
        type: "box",
        name: "panel_waterwheelRight",
        position: {
          x: 3.669,
          y: -24.15,
          z: -0.023900032,
        },
        offset: {
          x: 0.0,
          y: 0.0,
        },
        rotation: {
          x: 0.0,
          y: 0.0,
          z: 0.0,
        },
        size: {
          x: 0.72,
          y: 0.54,
        },
        bounds: {
          max: {
            x: 4.029,
            y: -23.88,
          },
          min: {
            x: 3.309,
            y: -24.42,
          },
        },
        isTrigger: true,
        enabled: true,
        isActiveAndEnabled: true,
        tag: "Untagged",
      },
      name: "Open Waterways",
      isVisual: false,
      length: "long",
      stepCount: 3,
    },
    {
      id: 12,
      collider: {
        type: "box",
        name: "panel_waterwheelRight",
        position: {
          x: 3.669,
          y: -24.15,
          z: -0.023900032,
        },
        offset: {
          x: 0.0,
          y: 0.0,
        },
        rotation: {
          x: 0.0,
          y: 0.0,
          z: 0.0,
        },
        size: {
          x: 0.72,
          y: 0.54,
        },
        bounds: {
          max: {
            x: 4.029,
            y: -23.88,
          },
          min: {
            x: 3.309,
            y: -24.42,
          },
        },
        isTrigger: true,
        enabled: true,
        isActiveAndEnabled: true,
        tag: "Untagged",
      },
      name: "Inspect Sample",
      isVisual: false,
      length: "long",
      stepCount: 2,
      timer: 60,
    },
    {
      id: 13,
      collider: {
        type: "box",
        name: "panel_waterjug",
        position: {
          x: 1.165,
          y: -23.086,
          z: 0.0,
        },
        offset: {
          x: -0.004999995,
          y: 0.0,
        },
        rotation: {
          x: 0.0,
          y: 0.0,
          z: 0.0,
        },
        size: {
          x: 0.4,
          y: 0.62,
        },
        bounds: {
          max: {
            x: 1.36,
            y: -22.776001,
          },
          min: {
            x: 0.9599999,
            y: -23.396,
          },
        },
        isTrigger: true,
        enabled: true,
        isActiveAndEnabled: true,
        tag: "Untagged",
      },
      name: "Replace Water Jug",
      isVisual: false,
      length: "long",
      stepCount: 2,
    },
    {
      id: 14,
      collider: {
        type: "box",
        name: "panel_node_gi",
        position: {
          x: 14.48,
          y: -12.17,
          z: -0.0121999979,
        },
        offset: {
          x: -0.0100000054,
          y: -0.004999995,
        },
        rotation: {
          x: 0.0,
          y: 0.0,
          z: 0.0,
        },
        size: {
          x: 0.39,
          y: 0.72,
        },
        bounds: {
          max: {
            x: 14.664999,
            y: -11.8150005,
          },
          min: {
            x: 14.275,
            y: -12.535,
          },
        },
        isTrigger: true,
        enabled: true,
        isActiveAndEnabled: true,
        tag: "Untagged",
      },
      name: "Fix Weather Node Node_GI",
      isVisual: false,
      length: "long",
      stepCount: 2,
    },
    {
      id: 15,
      collider: {
        type: "box",
        name: "panel_node_iro",
        position: {
          x: 7.16,
          y: -25.36,
          z: -0.0254000425,
        },
        offset: {
          x: -0.0100000054,
          y: -0.004999995,
        },
        rotation: {
          x: 0.0,
          y: 0.0,
          z: 0.0,
        },
        size: {
          x: 0.39,
          y: 0.72,
        },
        bounds: {
          max: {
            x: 7.34499931,
            y: -25.0050011,
          },
          min: {
            x: 6.955,
            y: -25.7250023,
          },
        },
        isTrigger: true,
        enabled: true,
        isActiveAndEnabled: true,
        tag: "Untagged",
      },
      name: "Fix Weather Node Node_IRO",
      isVisual: false,
      length: "long",
      stepCount: 2,
    },
    {
      id: 16,
      collider: {
        type: "box",
        name: "panel_node_pd",
        position: {
          x: 14.96,
          y: -25.44,
          z: -0.02550006,
        },
        offset: {
          x: -0.0100000054,
          y: -0.004999995,
        },
        rotation: {
          x: 0.0,
          y: 0.0,
          z: 0.0,
        },
        size: {
          x: 0.39,
          y: 0.72,
        },
        bounds: {
          max: {
            x: 15.145,
            y: -25.085,
          },
          min: {
            x: 14.7550011,
            y: -25.805,
          },
        },
        isTrigger: true,
        enabled: true,
        isActiveAndEnabled: true,
        tag: "Untagged",
      },
      name: "Fix Weather Node Node_PD",
      isVisual: false,
      length: "long",
      stepCount: 2,
    },
    {
      id: 17,
      collider: {
        type: "box",
        name: "panel_node_tb",
        position: {
          x: 8.37,
          y: -15.46,
          z: -0.0154999495,
        },
        offset: {
          x: -0.0100000054,
          y: -0.004999995,
        },
        rotation: {
          x: 0.0,
          y: 0.0,
          z: 0.0,
        },
        size: {
          x: 0.39,
          y: 0.72,
        },
        bounds: {
          max: {
            x: 8.555,
            y: -15.105,
          },
          min: {
            x: 8.165001,
            y: -15.8250008,
          },
        },
        isTrigger: true,
        enabled: true,
        isActiveAndEnabled: true,
        tag: "Untagged",
      },
      name: "Fix Weather Node Node_TB",
      isVisual: false,
      length: "long",
      stepCount: 2,
    },
    {
      id: 18,
      collider: {
        type: "box",
        name: "panel_wifi",
        position: {
          x: 11.0479994,
          y: -15.2979116,
          z: -0.0149099827,
        },
        offset: {
          x: 0.0,
          y: 0.0,
        },
        rotation: {
          x: 0.0,
          y: 0.0,
          z: 0.0,
        },
        size: {
          x: 0.25,
          y: 0.53,
        },
        bounds: {
          max: {
            x: 11.1729994,
            y: -15.0329113,
          },
          min: {
            x: 10.9229994,
            y: -15.562912,
          },
        },
        isTrigger: true,
        enabled: true,
        isActiveAndEnabled: true,
        tag: "Untagged",
      },
      name: "Reboot WiFi",
      isVisual: false,
      length: "long",
      stepCount: 2,
      timer: 60,
    },
    {
      id: 19,
      collider: {
        type: "box",
        name: "panel_Tree",
        position: {
          x: 1.654,
          y: -16.012001,
          z: 0.0,
        },
        offset: {
          x: 0.0,
          y: 0.0,
        },
        rotation: {
          x: 0.0,
          y: 0.0,
          z: 0.0,
        },
        size: {
          x: 0.48,
          y: 0.45,
        },
        bounds: {
          max: {
            x: 1.894,
            y: -15.7870007,
          },
          min: {
            x: 1.414,
            y: -16.2370014,
          },
        },
        isTrigger: true,
        enabled: true,
        isActiveAndEnabled: true,
        tag: "Untagged",
      },
      name: "Monitor Tree",
      isVisual: false,
      length: "short",
      stepCount: 1,
    },
    {
      id: 20,
      collider: {
        type: "box",
        name: "panel_manifolds",
        position: {
          x: 34.3813057,
          y: -19.4866753,
          z: 1.0,
        },
        offset: {
          x: 0.0,
          y: 0.0150000006,
        },
        rotation: {
          x: 0.0,
          y: 0.0,
          z: 0.0,
        },
        size: {
          x: 0.45,
          y: 0.36,
        },
        bounds: {
          max: {
            x: 34.6063042,
            y: -19.2916756,
          },
          min: {
            x: 34.1563072,
            y: -19.6516762,
          },
        },
        isTrigger: true,
        enabled: true,
        isActiveAndEnabled: true,
        tag: "Untagged",
      },
      name: "Unlock Manifolds",
      isVisual: false,
      length: "short",
      stepCount: 1,
    },
    {
      id: 21,
      collider: {
        type: "box",
        name: "panel_cooler1",
        position: {
          x: 36.4811172,
          y: -18.82867,
          z: 1.0,
        },
        offset: {
          x: -0.004999995,
          y: -0.004999995,
        },
        rotation: {
          x: 0.0,
          y: 0.0,
          z: 0.0,
        },
        size: {
          x: 0.8,
          y: 0.47,
        },
        bounds: {
          max: {
            x: 36.87612,
            y: -18.598671,
          },
          min: {
            x: 36.07612,
            y: -19.0686722,
          },
        },
        isTrigger: true,
        enabled: true,
        isActiveAndEnabled: true,
        tag: "Untagged",
      },
      name: "Store Artifacts",
      isVisual: false,
      length: "short",
      stepCount: 1,
    },
    {
      id: 22,
      collider: {
        type: "box",
        name: "panel_cooler1",
        position: {
          x: 36.4811172,
          y: -18.82867,
          z: 1.0,
        },
        offset: {
          x: -0.004999995,
          y: -0.004999995,
        },
        rotation: {
          x: 0.0,
          y: 0.0,
          z: 0.0,
        },
        size: {
          x: 0.8,
          y: 0.47,
        },
        bounds: {
          max: {
            x: 36.87612,
            y: -18.598671,
          },
          min: {
            x: 36.07612,
            y: -19.0686722,
          },
        },
        isTrigger: true,
        enabled: true,
        isActiveAndEnabled: true,
        tag: "Untagged",
      },
      name: "Fill Canisters",
      isVisual: false,
      length: "short",
      stepCount: 1,
    },
    {
      id: 23,
      collider: {
        type: "box",
        name: "panel_garbage",
        position: {
          x: 5.039,
          y: -20.658,
          z: -0.0205000639,
        },
        offset: {
          x: 0.0,
          y: 0.004999995,
        },
        rotation: {
          x: 0.0,
          y: 0.0,
          z: 0.0,
        },
        size: {
          x: 0.22,
          y: 0.28,
        },
        bounds: {
          max: {
            x: 5.149,
            y: -20.513,
          },
          min: {
            x: 4.929,
            y: -20.793,
          },
        },
        isTrigger: true,
        enabled: true,
        isActiveAndEnabled: true,
        tag: "Untagged",
      },
      name: "Empty Garbage",
      isVisual: false,
      length: "short",
      stepCount: 1,
    },
    {
      id: 24,
      collider: {
        type: "box",
        name: "panel_nav",
        position: {
          x: 15.9748106,
          y: 0.08402014,
          z: 0.9999,
        },
        offset: {
          x: 0.0,
          y: 0.0,
        },
        rotation: {
          x: 0.0,
          y: 0.0,
          z: 0.0,
        },
        size: {
          x: 0.5,
          y: 0.5,
        },
        bounds: {
          max: {
            x: 16.20231,
            y: 0.311520159,
          },
          min: {
            x: 15.7473106,
            y: -0.143479884,
          },
        },
        isTrigger: true,
        enabled: true,
        isActiveAndEnabled: true,
        tag: "Untagged",
      },
      name: "Chart Course",
      isVisual: false,
      length: "short",
      stepCount: 1,
    },
    {
      id: 25,
      collider: {
        type: "box",
        name: "fakeCollider_shower",
        position: {
          x: 40.36,
          y: -7.085,
          z: 2,
        },
        offset: {
          x: 0,
          y: 0.005,
        },
        rotation: {
          x: 0,
          y: 0,
          z: 0,
        },
        size: {
          x: 1,
          y: 0.5,
        },
        bounds: {
          max: {
            x: 40.775,
            y: -8.84,
          },
          min: {
            x: 40.445,
            y: -9.07,
          },
        },
        isTrigger: true,
        enabled: true,
        isActiveAndEnabled: true,
        tag: "Untagged",
      },
      name: "Submit Scan",
      isVisual: true,
      length: "short",
      stepCount: 1,
    },
    {
      id: 26,
      collider: {
        type: "box",
        name: "panel_weapons",
        position: {
          x: 9.929073,
          y: -22.3909931,
          z: -0.0207099915,
        },
        offset: {
          x: 0.0149999857,
          y: 0.0,
        },
        rotation: {
          x: 0.0,
          y: 0.0,
          z: 0.0,
        },
        size: {
          x: 0.59,
          y: 0.63,
        },
        bounds: {
          max: {
            x: 10.2390738,
            y: -22.0759926,
          },
          min: {
            x: 9.649074,
            y: -22.7059937,
          },
        },
        isTrigger: true,
        enabled: true,
        isActiveAndEnabled: true,
        tag: "Untagged",
      },
      name: "Clear Asteroids",
      isVisual: true,
      length: "short",
      stepCount: 20,
    },
    {
      id: 27,
      collider: {
        type: "box",
        name: "panel_node_ca",
        position: {
          x: 23.04,
          y: -6.94,
          z: -0.006899953,
        },
        offset: {
          x: -0.0100000054,
          y: -0.004999995,
        },
        rotation: {
          x: 0.0,
          y: 0.0,
          z: 0.0,
        },
        size: {
          x: 0.39,
          y: 0.72,
        },
        bounds: {
          max: {
            x: 23.225,
            y: -6.585,
          },
          min: {
            x: 22.835001,
            y: -7.30500031,
          },
        },
        isTrigger: true,
        enabled: true,
        isActiveAndEnabled: true,
        tag: "Untagged",
      },
      name: "Fix Weather Node Node_CA",
      isVisual: false,
      length: "long",
      stepCount: 2,
    },
    {
      id: 28,
      collider: {
        type: "box",
        name: "panel_node_mlg",
        position: {
          x: 30.86,
          y: -12.23,
          z: -0.0123000145,
        },
        offset: {
          x: -0.0100000054,
          y: -0.004999995,
        },
        rotation: {
          x: 0.0,
          y: 0.0,
          z: 0.0,
        },
        size: {
          x: 0.39,
          y: 0.72,
        },
        bounds: {
          max: {
            x: 31.045,
            y: -11.875,
          },
          min: {
            x: 30.655,
            y: -12.5949993,
          },
        },
        isTrigger: true,
        enabled: true,
        isActiveAndEnabled: true,
        tag: "Untagged",
      },
      name: "Fix Weather Node Node_MLG",
      isVisual: false,
      length: "long",
      stepCount: 2,
    },
    {
      id: 29,
      collider: {
        type: "box",
        name: "panel_telescope",
        position: {
          x: 33.8684273,
          y: -5.47126532,
          z: -0.005300045,
        },
        offset: {
          x: 0.0,
          y: 0.544,
        },
        rotation: {
          x: 0.0,
          y: 0.0,
          z: 0.0,
        },
        size: {
          x: 0.94,
          y: 1.51000011,
        },
        bounds: {
          max: {
            x: 34.33843,
            y: -4.172265,
          },
          min: {
            x: 33.3984261,
            y: -5.68226528,
          },
        },
        isTrigger: true,
        enabled: true,
        isActiveAndEnabled: true,
        tag: "Untagged",
      },
      name: "Align Telescope",
      isVisual: false,
      length: "short",
      stepCount: 1,
    },
    {
      id: 30,
      collider: {
        type: "polygon",
        name: "drill",
        position: {
          x: 27.89095,
          y: -6.15027857,
          z: -0.0067499876,
        },
        offset: {
          x: 0.0,
          y: 0.0,
        },
        rotation: {
          x: 0.0,
          y: 0.0,
          z: 0.0,
        },
        bounds: {
          max: {
            x: 28.4206619,
            y: -6.653845,
          },
          min: {
            x: 27.3400536,
            y: -7.23072624,
          },
        },
        isTrigger: false,
        enabled: true,
        isActiveAndEnabled: true,
        tag: "Untagged",
        points: [
          {
            x: -0.5508957,
            y: -0.78862,
          },
          {
            x: 0.04598427,
            y: -1.08044815,
          },
          {
            x: 0.5297127,
            y: -0.759050369,
          },
          {
            x: -0.08218765,
            y: -0.503566265,
          },
        ],
      },
      name: "Repair Drill",
      isVisual: false,
      length: "short",
      stepCount: 1,
    },
    {
      id: 31,
      collider: {
        type: "box",
        name: "panel_tempcold",
        position: {
          x: 31.34464,
          y: -6.67142,
          z: 0.9,
        },
        offset: {
          x: -0.004999995,
          y: -0.004999995,
        },
        rotation: {
          x: 0.0,
          y: 0.0,
          z: 0.0,
        },
        size: {
          x: 0.62,
          y: 0.67,
        },
        bounds: {
          max: {
            x: 31.6496429,
            y: -6.34142,
          },
          min: {
            x: 31.02964,
            y: -7.01142025,
          },
        },
        isTrigger: true,
        enabled: true,
        isActiveAndEnabled: true,
        tag: "Untagged",
      },
      name: "Record Temperature", // Lab
      isVisual: false,
      length: "short",
      stepCount: 1,
    },
    {
      id: 32,
      collider: {
        type: "box",
        name: "panel_temphot",
        position: {
          x: 30.93255,
          y: -15.324791,
          z: -0.0152000189,
        },
        offset: {
          x: -0.00999999,
          y: -0.004999995,
        },
        rotation: {
          x: 0.0,
          y: 0.0,
          z: 0.0,
        },
        size: {
          x: 0.64,
          y: 0.67,
        },
        bounds: {
          max: {
            x: 31.24255,
            y: -14.994791,
          },
          min: {
            x: 30.60255,
            y: -15.6647911,
          },
        },
        isTrigger: true,
        enabled: true,
        isActiveAndEnabled: true,
        tag: "Untagged",
      },
      name: "Record Temperature", // Outside
      isVisual: false,
      length: "short",
      stepCount: 1,
    },
  ],
  colliders: loadColliders("polus"),
};

export default StaticData;