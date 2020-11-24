import { StaticMapData, DoorOrientation } from "./types";
import { SystemType } from "../../packets/packetElements/systemType";
import { Door } from "../../util/MapRooms";
import { Vector2 } from "../../packets/packetElements/vector";
import { loadColliders } from "./functions";
// import Polygon from "polygon";

let StaticData: StaticMapData = {
  doors: [
    new Door({
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
    }),
    new Door({
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
    }),
    new Door({
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
    }),
    new Door({
      id: 0x03,
      orientation: DoorOrientation.HORIZONTAL,
      collider: {
        "type": "box",
        "name": "TopDoor",
        "position": {
          "x": 5.492,
          "y": -18.301,
          "z": -0.018599987
        },
        "offset": {
          "x": -0.0217754841,
          "y": -0.116015792
        },
        "rotation": {
          "x": 0.0,
          "y": 0.0,
          "z": 0.0
        },
        "size": {
          "x": 1.46073675,
          "y": 0.7079685
        },
        "bounds": {
          "max": {
            "x": 6.20704126,
            "y": -18.06303
          },
          "min": {
            "x": 4.73301172,
            "y": -18.771
          }
        },
        "isTrigger": true,
        "enabled": true,
        "isActiveAndEnabled": true,
        "tag": "Untagged"
      }
    }),
    new Door({
      id: 0x04,
      orientation: DoorOrientation.HORIZONTAL,
      collider: {
        "type": "box",
        "name": "BottomDoor",
        "position": {
          "x": 5.90680027,
          "y": -22.348,
          "z": -0.0219000578
        },
        "offset": {
          "x": -0.0217754841,
          "y": -0.116015792
        },
        "rotation": {
          "x": 0.0,
          "y": 0.0,
          "z": 0.0
        },
        "size": {
          "x": 1.46073675,
          "y": 0.7079685
        },
        "bounds": {
          "max": {
            "x": 6.630493,
            "y": -22.1100311
          },
          "min": {
            "x": 5.138628,
            "y": -22.818
          }
        },
        "isTrigger": true,
        "enabled": true,
        "isActiveAndEnabled": true,
        "tag": "Untagged"
      }
    }),
    new Door({
      id: 0x05,
      orientation: DoorOrientation.HORIZONTAL,
      collider: {
        "type": "box",
        "name": "BottomDoor",
        "position": {
          "x": 13.0322,
          "y": -20.701,
          "z": -0.0207099915
        },
        "offset": {
          "x": -0.0217754841,
          "y": -0.116015792
        },
        "rotation": {
          "x": 0.0,
          "y": 0.0,
          "z": 0.0
        },
        "size": {
          "x": 1.46073675,
          "y": 0.7079685
        },
        "bounds": {
          "max": {
            "x": 13.7548323,
            "y": -20.4630318
          },
          "min": {
            "x": 12.2651529,
            "y": -21.1710014
          }
        },
        "isTrigger": true,
        "enabled": true,
        "isActiveAndEnabled": true,
        "tag": "Untagged"
      }
    }),
    new Door({
      id: 0x06,
      orientation: DoorOrientation.HORIZONTAL,
      collider: {
        "type": "box",
        "name": "BottomDoor",
        "position": {
          "x": 10.8987,
          "y": -19.159,
          "z": -0.0149099827
        },
        "offset": {
          "x": -0.0217754841,
          "y": -0.116015792
        },
        "rotation": {
          "x": 0.0,
          "y": 0.0,
          "z": 0.0
        },
        "size": {
          "x": 1.46073675,
          "y": 0.7079685
        },
        "bounds": {
          "max": {
            "x": 11.6201048,
            "y": -18.921032
          },
          "min": {
            "x": 10.1329565,
            "y": -19.6290016
          }
        },
        "isTrigger": true,
        "enabled": true,
        "isActiveAndEnabled": true,
        "tag": "Untagged"
      }
    }),
    new Door({
      id: 0x07,
      orientation: DoorOrientation.HORIZONTAL,
      collider: {
        "type": "box",
        "name": "RightDoor",
        "position": {
          "x": 28.7570019,
          "y": -17.0636,
          "z": 1.0
        },
        "offset": {
          "x": -0.0185557,
          "y": 0.0
        },
        "rotation": {
          "x": 0.0,
          "y": 0.0,
          "z": 0.0
        },
        "size": {
          "x": 0.311332941,
          "y": 2.25
        },
        "bounds": {
          "max": {
            "x": 28.8588619,
            "y": -16.14183
          },
          "min": {
            "x": 28.627573,
            "y": -17.98537
          }
        },
        "isTrigger": true,
        "enabled": true,
        "isActiveAndEnabled": true,
        "tag": "Untagged"
      }
    }),
    new Door({
      id: 0x08,
      orientation: DoorOrientation.HORIZONTAL,
      collider: {
        "type": "box",
        "name": "LeftDoor",
        "position": {
          "x": 17.4170017,
          "y": -21.7231,
          "z": 1.0
        },
        "offset": {
          "x": -0.0185557,
          "y": 0.0
        },
        "rotation": {
          "x": 0.0,
          "y": 0.0,
          "z": 0.0
        },
        "size": {
          "x": 0.311332941,
          "y": 2.25
        },
        "bounds": {
          "max": {
            "x": 17.5188618,
            "y": -20.80317
          },
          "min": {
            "x": 17.2875729,
            "y": -22.6430321
          }
        },
        "isTrigger": true,
        "enabled": true,
        "isActiveAndEnabled": true,
        "tag": "Untagged"
      }
    }),
    new Door({
      id: 0x09,
      orientation: DoorOrientation.HORIZONTAL,
      collider: {
        "type": "box",
        "name": "BottomDoor",
        "position": {
          "x": 26.6080017,
          "y": -8.808,
          "z": 1.0
        },
        "offset": {
          "x": -0.0217754841,
          "y": -0.116015792
        },
        "rotation": {
          "x": 0.0,
          "y": 0.0,
          "z": 0.0
        },
        "size": {
          "x": 1.46073675,
          "y": 0.7079685
        },
        "bounds": {
          "max": {
            "x": 27.3230438,
            "y": -8.57003
          },
          "min": {
            "x": 25.8490143,
            "y": -9.278
          }
        },
        "isTrigger": true,
        "enabled": true,
        "isActiveAndEnabled": true,
        "tag": "Untagged"
      }
    }),
    new Door({
      id: 0x0a,
      orientation: DoorOrientation.VERTICAL,
      collider: {
        "type": "box",
        "name": "RightDoor",
        "position": {
          "x": 24.7800026,
          "y": -9.5651,
          "z": 1.0
        },
        "offset": {
          "x": -0.0185557,
          "y": 0.0
        },
        "rotation": {
          "x": 0.0,
          "y": 0.0,
          "z": 0.0
        },
        "size": {
          "x": 0.311332941,
          "y": 2.25
        },
        "bounds": {
          "max": {
            "x": 24.8741913,
            "y": -8.640302
          },
          "min": {
            "x": 24.66032,
            "y": -10.4898977
          }
        },
        "isTrigger": true,
        "enabled": true,
        "isActiveAndEnabled": true,
        "tag": "Untagged"
      }
    }),
    new Door({
      id: 0x0b,
      orientation: DoorOrientation.HORIZONTAL,
      collider: {
        "type": "box",
        "name": "RightDoor",
        "position": {
          "x": 17.2930012,
          "y": -10.8416,
          "z": 1.0
        },
        "offset": {
          "x": -0.0185557,
          "y": 0.0
        },
        "rotation": {
          "x": 0.0,
          "y": 0.0,
          "z": 0.0
        },
        "size": {
          "x": 0.311332941,
          "y": 2.25
        },
        "bounds": {
          "max": {
            "x": 17.3871918,
            "y": -9.934747
          },
          "min": {
            "x": 17.173317,
            "y": -11.7484541
          }
        },
        "isTrigger": true,
        "enabled": true,
        "isActiveAndEnabled": true,
        "tag": "Untagged"
      }
    })
  ],
  rooms: [
    {
      id: SystemType.Electrical,
      name: "Electrical",
      doors: [0x00, 0x01, 0x02],
      vents: [0x00, 0x01],
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
      id: SystemType.Security,
      name: "Security",
      doors: [],
      vents: [0x00],
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
      id: SystemType.Hallway,
      name: "02-to-Electrical Hallway",
      doors: [0x02, 0x03],
      vents: [],
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
      id: SystemType.O2,
      name: "02",
      doors: [0x03, 0x04],
      vents: [0x02],
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
        {
          type: "box",
          name: "storage_middlewall",
          position: {
            x: 4.759,
            y: -20.275,
            z: -0.0204000473,
          },
          offset: {
            x: 0.0,
            y: -0.08441925,
          },
          rotation: {
            x: 0.0,
            y: 0.0,
            z: 0.0,
          },
          size: {
            x: 2.063809,
            y: 1.20532608,
          },
          bounds: {
            max: {
              x: 5.790904,
              y: -19.7567558,
            },
            min: {
              x: 3.7270956,
              y: -20.9620819,
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
      id: SystemType.Weapons,
      name: "Weapons",
      doors: [0x05],
      vents: [],
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
        },
      ],
    },
    {
      id: SystemType.Communications,
      name: "Communications",
      doors: [0x06],
      vents: [0x03],
      boundaries: {
        type: "polygon",
        name: "Comms",
        position: {
          x: 11.839,
          y: -16.348,
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
            x: 13.2661171,
            y: -15.457859,
          },
          min: {
            x: 10.1526108,
            y: -19.509861,
          },
        },
        isTrigger: true,
        enabled: true,
        isActiveAndEnabled: true,
        tag: "Untagged",
        points: [
          {
            x: 1.36410046,
            y: 0.8901396,
          },
          {
            x: -1.66514874,
            y: 0.8674736,
          },
          {
            x: -1.686389,
            y: -3.14355087,
          },
          {
            x: -0.1903925,
            y: -3.16186142,
          },
          {
            x: -0.163761139,
            y: -2.01547623,
          },
          {
            x: 1.4271183,
            y: -2.043827,
          },
        ],
      },
      collision: [
        {
          type: "polygon",
          name: "Walls",
          position: {
            x: 11.839,
            y: -16.348,
            z: -0.0148999691,
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
              x: 13.6837521,
              y: -14.723,
            },
            min: {
              x: 9.954119,
              y: -19.6246452,
            },
          },
          isTrigger: false,
          enabled: true,
          isActiveAndEnabled: true,
          tag: "Untagged",
          points: [
            {
              x: -0.06721401,
              y: -3.27664566,
            },
            {
              x: -0.008723259,
              y: -2.17267418,
            },
            {
              x: 1.56469536,
              y: -2.17241859,
            },
            {
              x: 1.60833359,
              y: 0.358451843,
            },
            {
              x: 1.84475327,
              y: 0.556856155,
            },
            {
              x: 1.82321453,
              y: 1.12928581,
            },
            {
              x: 1.48576641,
              y: 1.62154961,
            },
            {
              x: -0.04,
              y: 1.615,
            },
            {
              x: -0.25,
              y: 1.625,
            },
            {
              x: -1.884881,
              y: 1.6215477,
            },
            {
              x: -1.79115868,
              y: -3.253563,
            },
            {
              x: -1.59644222,
              y: -3.260334,
            },
            {
              x: -1.63720036,
              y: 0.708847046,
            },
            {
              x: 1.030889,
              y: 0.749778748,
            },
            {
              x: 1.156208,
              y: 0.166755676,
            },
            {
              x: 1.37698746,
              y: 0.10342598,
            },
            {
              x: 1.377471,
              y: -1.3856678,
            },
            {
              x: -0.2589922,
              y: -1.39202309,
            },
            {
              x: -0.282920837,
              y: -3.25704,
            },
          ],
        },
        {
          type: "polygon",
          name: "commstable",
          position: {
            x: 11.4201593,
            y: -16.720417,
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
          bounds: {
            max: {
              x: 11.897644,
              y: -16.5310135,
            },
            min: {
              x: 10.9391708,
              y: -17.0408974,
            },
          },
          isTrigger: false,
          enabled: true,
          isActiveAndEnabled: true,
          tag: "Untagged",
          points: [
            {
              x: 0.2570343,
              y: 0.189403534,
            },
            {
              x: -0.123981476,
              y: 0.185901642,
            },
            {
              x: -0.3565836,
              y: 0.135391235,
            },
            {
              x: -0.4774847,
              y: 0.0009880066,
            },
            {
              x: -0.4809885,
              y: -0.159461975,
            },
            {
              x: -0.3505373,
              y: -0.295957565,
            },
            {
              x: 0.141381264,
              y: -0.320480347,
            },
            {
              x: 0.466977119,
              y: -0.192966461,
            },
            {
              x: 0.477485657,
              y: 0.0009288788,
            },
          ],
        },
      ],
    },
    {
      id: SystemType.Office,
      name: "Office",
      doors: [0x07, 0x08],
      vents: [0x04],
      boundaries: {
        type: "box",
        name: "Office",
        position: {
          x: 22.21,
          y: -17.27,
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
          x: 12.74,
          y: 2.7,
        },
        bounds: {
          max: {
            x: 28.579998,
            y: -15.92,
          },
          min: {
            x: 15.84,
            y: -18.62,
          },
        },
        isTrigger: true,
        enabled: true,
        isActiveAndEnabled: true,
        tag: "Untagged",
      },
      collision: [
        {
          type: "polygon",
          name: "Walls",
          position: {
            x: 22.2670021,
            y: -21.0,
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
              x: 28.91121,
              y: -17.8130989,
            },
            min: {
              x: 21.6145172,
              y: -24.35947,
            },
          },
          isTrigger: false,
          enabled: true,
          isActiveAndEnabled: true,
          tag: "Untagged",
          points: [
            {
              x: 2.781414,
              y: 2.24113655,
            },
            {
              x: 3.08620262,
              y: 2.25448036,
            },
            {
              x: 3.08058739,
              y: 1.1726532,
            },
            {
              x: -0.6524849,
              y: 1.18344116,
            },
            {
              x: -0.6139412,
              y: -1.25628471,
            },
            {
              x: -0.178323746,
              y: -1.4489727,
            },
            {
              x: -0.117221832,
              y: 0.413417816,
            },
            {
              x: 3.0995636,
              y: 0.382156372,
            },
            {
              x: 3.084303,
              y: -2.002655,
            },
            {
              x: 2.26744652,
              y: -2.022543,
            },
            {
              x: 2.25959778,
              y: -2.98506165,
            },
            {
              x: 3.0763607,
              y: -2.98594284,
            },
            {
              x: 3.071354,
              y: -3.35742188,
            },
            {
              x: 3.38467026,
              y: -3.35946846,
            },
            {
              x: 3.40324974,
              y: 2.02518845,
            },
            {
              x: 6.644205,
              y: 2.01656914,
            },
            {
              x: 6.635395,
              y: 3.18676949,
            },
            {
              x: 6.312195,
              y: 3.186901,
            },
            {
              x: 6.307783,
              y: 2.978527,
            },
            {
              x: 2.771223,
              y: 2.99912834,
            },
          ],
        },
        {
          type: "polygon",
          name: "Walls",
          position: {
            x: 22.2670021,
            y: -21.0,
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
              x: 21.6395454,
              y: -18.0169239,
            },
            min: {
              x: 17.8802376,
              y: -18.8836689,
            },
          },
          isTrigger: false,
          enabled: true,
          isActiveAndEnabled: true,
          tag: "Untagged",
          points: [
            {
              x: -0.627456665,
              y: 2.983076,
            },
            {
              x: -4.3865757,
              y: 2.9765377,
            },
            {
              x: -4.38676643,
              y: 2.18756485,
            },
            {
              x: -4.13083649,
              y: 2.13066483,
            },
            {
              x: -0.9009094,
              y: 2.116331,
            },
            {
              x: -0.634021759,
              y: 2.19774628,
            },
          ],
        },
        {
          type: "polygon",
          name: "Walls",
          position: {
            x: 22.2670021,
            y: -21.0,
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
              x: 28.9088364,
              y: -15.3586206,
            },
            min: {
              x: 15.614831,
              y: -21.5193253,
            },
          },
          isTrigger: false,
          enabled: true,
          isActiveAndEnabled: true,
          tag: "Untagged",
          points: [
            {
              x: 0.641439438,
              y: 2.223814,
            },
            {
              x: 1.519907,
              y: 2.21631241,
            },
            {
              x: 1.61479378,
              y: 3.11574936,
            },
            {
              x: 1.571455,
              y: 4.747154,
            },
            {
              x: 2.22670937,
              y: 4.68468857,
            },
            {
              x: 2.22056961,
              y: 4.50926,
            },
            {
              x: 4.75140572,
              y: 4.5396843,
            },
            {
              x: 5.0420723,
              y: 4.704365,
            },
            {
              x: 6.30429268,
              y: 4.7083683,
            },
            {
              x: 6.31226158,
              y: 4.1554985,
            },
            {
              x: 6.64183426,
              y: 4.1441555,
            },
            {
              x: 6.63877869,
              y: 5.630599,
            },
            {
              x: -6.65217,
              y: 5.64138031,
            },
            {
              x: -6.63888,
              y: 0.20165062,
            },
            {
              x: -5.02276039,
              y: 0.222295761,
            },
            {
              x: -5.012661,
              y: -0.519323349,
            },
            {
              x: -4.698656,
              y: -0.5074558,
            },
            {
              x: -4.693472,
              y: 0.2589798,
            },
            {
              x: -4.303692,
              y: 0.411006927,
            },
            {
              x: -4.28679848,
              y: 1.18321419,
            },
            {
              x: -6.299184,
              y: 1.17365265,
            },
            {
              x: -6.29948235,
              y: 2.08698082,
            },
            {
              x: -5.65181732,
              y: 2.23508453,
            },
            {
              x: -5.64209,
              y: 2.97284126,
            },
            {
              x: -5.816492,
              y: 2.98724365,
            },
            {
              x: -5.79788,
              y: 4.539627,
            },
            {
              x: -5.382471,
              y: 4.563381,
            },
            {
              x: -5.26436234,
              y: 4.6512394,
            },
            {
              x: -0.33288002,
              y: 4.670204,
            },
            {
              x: -0.3153038,
              y: 4.44876671,
            },
            {
              x: 1.12287521,
              y: 4.44363976,
            },
            {
              x: 1.11711884,
              y: 2.99411,
            },
            {
              x: 0.6273365,
              y: 2.99427032,
            },
          ],
        },
        {
          type: "polygon",
          name: "caftable",
          position: {
            x: 19.5551167,
            y: -17.068,
            z: -0.01699996,
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
              x: 21.4040051,
              y: -16.8124466,
            },
            min: {
              x: 17.7062283,
              y: -17.447998,
            },
          },
          isTrigger: false,
          enabled: true,
          isActiveAndEnabled: true,
          tag: "Untagged",
          points: [
            {
              x: 1.46310616,
              y: -0.2572422,
            },
            {
              x: 1.84499991,
              y: -0.099999994,
            },
            {
              x: 1.8488884,
              y: 0.00277484953,
            },
            {
              x: 1.451664,
              y: 0.148885384,
            },
            {
              x: 0.773887634,
              y: 0.253329873,
            },
            {
              x: -0.6788883,
              y: 0.255553842,
            },
            {
              x: -1.48485565,
              y: 0.150260583,
            },
            {
              x: -1.8488884,
              y: 0.03610958,
            },
            {
              x: -1.84499991,
              y: -0.12,
            },
            {
              x: -1.81499994,
              y: -0.14,
            },
            {
              x: -1.515,
              y: -0.26,
            },
            {
              x: -0.724999964,
              y: -0.38,
            },
            {
              x: 0.664999962,
              y: -0.38,
            },
          ],
        },
        {
          type: "box",
          name: "projector",
          position: {
            x: 22.791378,
            y: -16.86384,
            z: -0.01670003,
          },
          offset: {
            x: -0.314265,
            y: -0.451836,
          },
          rotation: {
            x: 0.0,
            y: 0.0,
            z: 0.0,
          },
          size: {
            x: 0.5014701,
            y: 0.446327925,
          },
          bounds: {
            max: {
              x: 22.7278481,
              y: -17.0925121,
            },
            min: {
              x: 22.2263756,
              y: -17.53884,
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
      id: SystemType.Admin,
      name: "Admin",
      doors: [],
      vents: [0x05],
      boundaries: {
        type: "polygon",
        name: "Admin",
        position: {
          x: 22.2670021,
          y: -21.0,
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
            x: 25.5388412,
            y: -20.5406456,
          },
          min: {
            x: 19.5073624,
            y: -26.5331917,
          },
        },
        isTrigger: true,
        enabled: true,
        isActiveAndEnabled: true,
        tag: "Untagged",
        points: [
          {
            x: -2.5666008,
            y: 0.390115738,
          },
          {
            x: -2.75963974,
            y: -5.53319359,
          },
          {
            x: 0.450466156,
            y: -5.27660751,
          },
          {
            x: 0.4078083,
            y: -2.905569,
          },
          {
            x: 3.215107,
            y: -2.843277,
          },
          {
            x: 3.27183723,
            y: 0.4593544,
          },
        ],
      },
      collision: [
        {
          type: "polygon",
          name: "Walls",
          position: {
            x: 22.2670021,
            y: -21.0,
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
              x: 28.91121,
              y: -17.8130989,
            },
            min: {
              x: 21.6145172,
              y: -24.35947,
            },
          },
          isTrigger: false,
          enabled: true,
          isActiveAndEnabled: true,
          tag: "Untagged",
          points: [
            {
              x: 2.781414,
              y: 2.24113655,
            },
            {
              x: 3.08620262,
              y: 2.25448036,
            },
            {
              x: 3.08058739,
              y: 1.1726532,
            },
            {
              x: -0.6524849,
              y: 1.18344116,
            },
            {
              x: -0.6139412,
              y: -1.25628471,
            },
            {
              x: -0.178323746,
              y: -1.4489727,
            },
            {
              x: -0.117221832,
              y: 0.413417816,
            },
            {
              x: 3.0995636,
              y: 0.382156372,
            },
            {
              x: 3.084303,
              y: -2.002655,
            },
            {
              x: 2.26744652,
              y: -2.022543,
            },
            {
              x: 2.25959778,
              y: -2.98506165,
            },
            {
              x: 3.0763607,
              y: -2.98594284,
            },
            {
              x: 3.071354,
              y: -3.35742188,
            },
            {
              x: 3.38467026,
              y: -3.35946846,
            },
            {
              x: 3.40324974,
              y: 2.02518845,
            },
            {
              x: 6.644205,
              y: 2.01656914,
            },
            {
              x: 6.635395,
              y: 3.18676949,
            },
            {
              x: 6.312195,
              y: 3.186901,
            },
            {
              x: 6.307783,
              y: 2.978527,
            },
            {
              x: 2.771223,
              y: 2.99912834,
            },
          ],
        },
        {
          type: "edge",
          name: "Walls",
          position: {
            x: 22.2670021,
            y: -21.0,
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
              x: 25.6508942,
              y: -19.8261,
            },
            min: {
              x: 17.23896,
              y: -26.8918343,
            },
          },
          isTrigger: false,
          enabled: true,
          isActiveAndEnabled: true,
          tag: "Untagged",
          points: [
            {
              x: -2.849391,
              y: -5.89183235,
            },
            {
              x: -2.85272026,
              y: -2.98830414,
            },
            {
              x: -4.089777,
              y: -3.03974152,
            },
            {
              x: -4.192972,
              y: -2.80377769,
            },
            {
              x: -5.028042,
              y: -2.790514,
            },
            {
              x: -5.01713,
              y: -1.49760818,
            },
            {
              x: -4.71700668,
              y: -1.48636627,
            },
            {
              x: -4.71217346,
              y: -1.8544178,
            },
            {
              x: -2.63645744,
              y: -1.8625145,
            },
            {
              x: -2.63505936,
              y: 0.108249664,
            },
            {
              x: -3.03006554,
              y: 0.450252533,
            },
            {
              x: -3.03801155,
              y: 1.17369461,
            },
            {
              x: -1.90321922,
              y: 1.1739006,
            },
            {
              x: -1.91858292,
              y: 0.4359913,
            },
            {
              x: -2.19770813,
              y: 0.42811203,
            },
            {
              x: -2.279316,
              y: 0.313259125,
            },
            {
              x: -2.54323,
              y: 0.2924347,
            },
            {
              x: -2.53515434,
              y: -4.688156,
            },
            {
              x: -1.79289055,
              y: -4.679619,
            },
            {
              x: -1.79240227,
              y: -2.78805161,
            },
            {
              x: -1.33778,
              y: -2.789772,
            },
            {
              x: -1.3481636,
              y: -4.68327332,
            },
            {
              x: 0.3791809,
              y: -4.65856934,
            },
            {
              x: 0.382770538,
              y: -3.841896,
            },
            {
              x: -0.6909733,
              y: -3.848484,
            },
            {
              x: -0.6962929,
              y: -2.773243,
            },
            {
              x: 0.380472183,
              y: -2.79462814,
            },
            {
              x: 0.385807037,
              y: -2.03153419,
            },
            {
              x: 0.989187241,
              y: -2.03007317,
            },
            {
              x: 1.00628281,
              y: -2.97827148,
            },
            {
              x: 0.489973068,
              y: -2.982647,
            },
            {
              x: 0.475347519,
              y: -4.67865944,
            },
            {
              x: 3.08922577,
              y: -4.67291451,
            },
            {
              x: 3.08083725,
              y: -4.3182354,
            },
            {
              x: 3.383894,
              y: -4.327448,
            },
            {
              x: 3.38090515,
              y: -4.98884773,
            },
          ],
        },
        {
          type: "box",
          name: "mapTable",
          position: {
            x: 23.8940678,
            y: -21.606,
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
            x: 1.79629159,
            y: 1.0,
          },
          bounds: {
            max: {
              x: 24.7922134,
              y: -21.106,
            },
            min: {
              x: 22.9959221,
              y: -22.106,
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
      id: SystemType.Decontamination,
      name: "Left Decontamination",
      doors: [],
      vents: [],
      boundaries: {
        type: "box",
        name: "LowerDecon",
        position: {
          x: 24.05,
          y: -24.74,
          z: 1.0,
        },
        offset: {
          x: 0.0562665462,
          y: -0.13,
        },
        rotation: {
          x: 0.0,
          y: 0.0,
          z: 0.0,
        },
        size: {
          x: 2.57253313,
          y: 1.68,
        },
        bounds: {
          max: {
            x: 25.3925323,
            y: -24.0299988,
          },
          min: {
            x: 22.82,
            y: -25.71,
          },
        },
        isTrigger: true,
        enabled: true,
        isActiveAndEnabled: true,
        tag: "NoSnow",
      },
      collision: [
        {
          type: "polygon",
          name: "Walls",
          position: {
            x: 22.2670021,
            y: -21.0,
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
              x: 28.91121,
              y: -17.8130989,
            },
            min: {
              x: 21.6145172,
              y: -24.35947,
            },
          },
          isTrigger: false,
          enabled: true,
          isActiveAndEnabled: true,
          tag: "Untagged",
          points: [
            {
              x: 2.781414,
              y: 2.24113655,
            },
            {
              x: 3.08620262,
              y: 2.25448036,
            },
            {
              x: 3.08058739,
              y: 1.1726532,
            },
            {
              x: -0.6524849,
              y: 1.18344116,
            },
            {
              x: -0.6139412,
              y: -1.25628471,
            },
            {
              x: -0.178323746,
              y: -1.4489727,
            },
            {
              x: -0.117221832,
              y: 0.413417816,
            },
            {
              x: 3.0995636,
              y: 0.382156372,
            },
            {
              x: 3.084303,
              y: -2.002655,
            },
            {
              x: 2.26744652,
              y: -2.022543,
            },
            {
              x: 2.25959778,
              y: -2.98506165,
            },
            {
              x: 3.0763607,
              y: -2.98594284,
            },
            {
              x: 3.071354,
              y: -3.35742188,
            },
            {
              x: 3.38467026,
              y: -3.35946846,
            },
            {
              x: 3.40324974,
              y: 2.02518845,
            },
            {
              x: 6.644205,
              y: 2.01656914,
            },
            {
              x: 6.635395,
              y: 3.18676949,
            },
            {
              x: 6.312195,
              y: 3.186901,
            },
            {
              x: 6.307783,
              y: 2.978527,
            },
            {
              x: 2.771223,
              y: 2.99912834,
            },
          ],
        },
        {
          type: "edge",
          name: "Walls",
          position: {
            x: 22.2670021,
            y: -21.0,
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
              x: 25.6508942,
              y: -19.8261,
            },
            min: {
              x: 17.23896,
              y: -26.8918343,
            },
          },
          isTrigger: false,
          enabled: true,
          isActiveAndEnabled: true,
          tag: "Untagged",
          points: [
            {
              x: -2.849391,
              y: -5.89183235,
            },
            {
              x: -2.85272026,
              y: -2.98830414,
            },
            {
              x: -4.089777,
              y: -3.03974152,
            },
            {
              x: -4.192972,
              y: -2.80377769,
            },
            {
              x: -5.028042,
              y: -2.790514,
            },
            {
              x: -5.01713,
              y: -1.49760818,
            },
            {
              x: -4.71700668,
              y: -1.48636627,
            },
            {
              x: -4.71217346,
              y: -1.8544178,
            },
            {
              x: -2.63645744,
              y: -1.8625145,
            },
            {
              x: -2.63505936,
              y: 0.108249664,
            },
            {
              x: -3.03006554,
              y: 0.450252533,
            },
            {
              x: -3.03801155,
              y: 1.17369461,
            },
            {
              x: -1.90321922,
              y: 1.1739006,
            },
            {
              x: -1.91858292,
              y: 0.4359913,
            },
            {
              x: -2.19770813,
              y: 0.42811203,
            },
            {
              x: -2.279316,
              y: 0.313259125,
            },
            {
              x: -2.54323,
              y: 0.2924347,
            },
            {
              x: -2.53515434,
              y: -4.688156,
            },
            {
              x: -1.79289055,
              y: -4.679619,
            },
            {
              x: -1.79240227,
              y: -2.78805161,
            },
            {
              x: -1.33778,
              y: -2.789772,
            },
            {
              x: -1.3481636,
              y: -4.68327332,
            },
            {
              x: 0.3791809,
              y: -4.65856934,
            },
            {
              x: 0.382770538,
              y: -3.841896,
            },
            {
              x: -0.6909733,
              y: -3.848484,
            },
            {
              x: -0.6962929,
              y: -2.773243,
            },
            {
              x: 0.380472183,
              y: -2.79462814,
            },
            {
              x: 0.385807037,
              y: -2.03153419,
            },
            {
              x: 0.989187241,
              y: -2.03007317,
            },
            {
              x: 1.00628281,
              y: -2.97827148,
            },
            {
              x: 0.489973068,
              y: -2.982647,
            },
            {
              x: 0.475347519,
              y: -4.67865944,
            },
            {
              x: 3.08922577,
              y: -4.67291451,
            },
            {
              x: 3.08083725,
              y: -4.3182354,
            },
            {
              x: 3.383894,
              y: -4.327448,
            },
            {
              x: 3.38090515,
              y: -4.98884773,
            },
          ],
        },
      ],
    },
    {
      id: SystemType.Hallway,
      name: "Left Decontamination Hallway",
      doors: [],
      vents: [],
      boundaries: {
        type: "box",
        name: "RightTube",
        position: {
          x: 29.5740013,
          y: -22.956,
          z: 1.0,
        },
        offset: {
          x: 0.08,
          y: 0.0,
        },
        rotation: {
          x: 0.0,
          y: 0.0,
          z: 0.0,
        },
        size: {
          x: 7.85,
          y: 7.0,
        },
        bounds: {
          max: {
            x: 33.5790024,
            y: -19.456,
          },
          min: {
            x: 25.7290039,
            y: -26.456,
          },
        },
        isTrigger: true,
        enabled: true,
        isActiveAndEnabled: true,
        tag: "Untagged",
      },
      collision: [
        {
          type: "edge",
          name: "Walls",
          position: {
            x: 29.5740013,
            y: -22.956,
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
              x: 33.7259674,
              y: -20.3659821,
            },
            min: {
              x: 25.3608055,
              y: -24.3459778,
            },
          },
          isTrigger: false,
          enabled: true,
          isActiveAndEnabled: true,
          tag: "Untagged",
          points: [
            {
              x: -4.213196,
              y: -1.33669853,
            },
            {
              x: -2.79054451,
              y: -1.3899765,
            },
            {
              x: -2.59830284,
              y: -1.13146973,
            },
            {
              x: -2.62485886,
              y: 2.27549362,
            },
            {
              x: -2.32546043,
              y: 2.56362915,
            },
            {
              x: 4.151966,
              y: 2.59001732,
            },
          ],
        },
        {
          type: "edge",
          name: "Walls",
          position: {
            x: 29.5740013,
            y: -22.956,
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
              x: 33.6578369,
              y: -21.1534252,
            },
            min: {
              x: 25.6049118,
              y: -25.3241787,
            },
          },
          isTrigger: false,
          enabled: true,
          isActiveAndEnabled: true,
          tag: "Untagged",
          points: [
            {
              x: -3.96908951,
              y: -2.36817932,
            },
            {
              x: -1.27605057,
              y: -2.36700821,
            },
            {
              x: -1.01020908,
              y: -2.16160965,
            },
            {
              x: -1.01882553,
              y: 1.41253853,
            },
            {
              x: -0.699604034,
              y: 1.80257416,
            },
            {
              x: 4.0838356,
              y: 1.79183388,
            },
          ],
        },
      ],
    },
    {
      id: SystemType.Specimens,
      name: "Specimen",
      doors: [],
      vents: [],
      boundaries: {
        type: "polygon",
        name: "Sounds",
        position: {
          x: 36.45,
          y: -20.753,
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
            x: 39.6388626,
            y: -18.4700966,
          },
          min: {
            x: 33.67475,
            y: -23.4518013,
          },
        },
        isTrigger: true,
        enabled: true,
        isActiveAndEnabled: true,
        tag: "Untagged",
        points: [
          {
            x: 1.54924774,
            y: 2.24473953,
          },
          {
            x: -1.46404648,
            y: 2.28290367,
          },
          {
            x: -2.77264023,
            y: 0.944107056,
          },
          {
            x: -2.7752533,
            y: -1.34132767,
          },
          {
            x: -1.480053,
            y: -2.68783188,
          },
          {
            x: 1.7371788,
            y: -2.698801,
          },
          {
            x: 3.13408279,
            y: -1.38043785,
          },
          {
            x: 3.18886185,
            y: 0.4930153,
          },
        ],
      },
      collision: [
        {
          type: "edge",
          name: "Walls",
          position: {
            x: 36.45,
            y: -20.753,
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
              x: 38.4529,
              y: -17.9881477,
            },
            min: {
              x: 33.62392,
              y: -20.3710823,
            },
          },
          isTrigger: false,
          enabled: true,
          isActiveAndEnabled: true,
          tag: "Untagged",
          points: [
            {
              x: -2.82608032,
              y: 0.392379761,
            },
            {
              x: -2.708622,
              y: 0.381917953,
            },
            {
              x: -2.460579,
              y: 0.920717239,
            },
            {
              x: -2.108677,
              y: 0.908659,
            },
            {
              x: -1.1146965,
              y: 1.91052437,
            },
            {
              x: 1.64467239,
              y: 1.93633842,
            },
            {
              x: 1.883934,
              y: 1.70659828,
            },
            {
              x: 2.00289917,
              y: 1.78388023,
            },
            {
              x: 2.00288773,
              y: 2.494379,
            },
            {
              x: 1.77809906,
              y: 2.76485062,
            },
            {
              x: 1.48935318,
              y: 2.75980186,
            },
          ],
        },
        {
          type: "edge",
          name: "Walls",
          position: {
            x: 36.45,
            y: -20.753,
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
              x: 39.4841728,
              y: -19.0908623,
            },
            min: {
              x: 33.6063042,
              y: -22.5366974,
            },
          },
          isTrigger: false,
          enabled: true,
          isActiveAndEnabled: true,
          tag: "Untagged",
          points: [
            {
              x: -2.8221817,
              y: -0.5101452,
            },
            {
              x: -2.84369659,
              y: -0.226577759,
            },
            {
              x: -2.722744,
              y: -0.229927063,
            },
            {
              x: -2.637268,
              y: -0.5611458,
            },
            {
              x: -2.349205,
              y: -0.5486641,
            },
            {
              x: -1.96166992,
              y: -0.560745239,
            },
            {
              x: -1.82143021,
              y: -0.7048321,
            },
            {
              x: -1.81853485,
              y: -1.38725853,
            },
            {
              x: -1.38547516,
              y: -1.75176811,
            },
            {
              x: 1.37112427,
              y: -1.78369713,
            },
            {
              x: 1.42976379,
              y: -1.33931923,
            },
            {
              x: 1.60656357,
              y: -0.948722839,
            },
            {
              x: 2.013008,
              y: -0.8441849,
            },
            {
              x: 2.59375381,
              y: -0.828113556,
            },
            {
              x: 2.92287064,
              y: -0.440242767,
            },
            {
              x: 2.91033173,
              y: 0.5700016,
            },
            {
              x: 2.70706177,
              y: 0.882749557,
            },
            {
              x: 2.72252274,
              y: 1.56887817,
            },
            {
              x: 2.8481102,
              y: 1.662138,
            },
            {
              x: 3.034172,
              y: 1.44061661,
            },
          ],
        },
        {
          type: "box",
          name: "Walls",
          position: {
            x: 36.45,
            y: -20.753,
            z: 2.0,
          },
          offset: {
            x: 0.0116481781,
            y: 0.124215126,
          },
          rotation: {
            x: 0.0,
            y: 0.0,
            z: 0.0,
          },
          size: {
            x: 2.905674,
            y: 0.624101639,
          },
          bounds: {
            max: {
              x: 37.9144821,
              y: -20.3167343,
            },
            min: {
              x: 35.008812,
              y: -20.940834,
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
      id: SystemType.Hallway,
      name: "Right Decontamination Hallway",
      doors: [],
      vents: [],
      boundaries: {
        type: "polygon",
        name: "RightTubeTop",
        position: {
          x: 38.993,
          y: -15.734,
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
            x: 40.0938339,
            y: -11.7992134,
          },
          min: {
            x: 38.0701065,
            y: -20.2530289,
          },
        },
        isTrigger: true,
        enabled: true,
        isActiveAndEnabled: true,
        tag: "Untagged",
        points: [
          {
            x: -0.9228897,
            y: 3.9347868,
          },
          {
            x: -0.8956833,
            y: -2.921094,
          },
          {
            x: 0.5693283,
            y: -4.51902866,
          },
          {
            x: 1.10083389,
            y: -3.86970425,
          },
          {
            x: 1.06180191,
            y: 3.90828419,
          },
        ],
      },
      collision: [
        {
          type: "edge",
          name: "Walls",
          position: {
            x: 38.993,
            y: -15.734,
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
              x: 39.8663635,
              y: -11.7795811,
            },
            min: {
              x: 39.345993,
              y: -19.1797123,
            },
          },
          isTrigger: false,
          enabled: true,
          isActiveAndEnabled: true,
          tag: "Untagged",
          points: [
            {
              x: 0.8733635,
              y: 3.95442,
            },
            {
              x: 0.8599739,
              y: -2.621194,
            },
            {
              x: 0.674823761,
              y: -3.10209942,
            },
            {
              x: 0.3529892,
              y: -3.445712,
            },
          ],
        },
        {
          type: "edge",
          name: "Walls",
          position: {
            x: 38.993,
            y: -15.734,
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
              x: 38.260788,
              y: -11.8143215,
            },
            min: {
              x: 38.2563324,
              y: -18.107687,
            },
          },
          isTrigger: false,
          enabled: true,
          isActiveAndEnabled: true,
          tag: "Untagged",
          points: [
            {
              x: -0.732212067,
              y: 3.91967964,
            },
            {
              x: -0.736671448,
              y: -2.37368679,
            },
          ],
        },
      ],
    },
    {
      id: SystemType.Decontamination2,
      name: "Right Decontamination",
      doors: [],
      vents: [],
      boundaries: {
        type: "box",
        name: "UpperDecon",
        position: {
          x: 39.47,
          y: -10.14,
          z: 1.0,
        },
        offset: {
          x: 0.08621216,
          y: -0.318847179,
        },
        rotation: {
          x: 0.0,
          y: 0.0,
          z: 0.0,
        },
        size: {
          x: 2.78022,
          y: 2.25475216,
        },
        bounds: {
          max: {
            x: 40.9463234,
            y: -9.33147049,
          },
          min: {
            x: 38.1661034,
            y: -11.5862236,
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
            x: 32.9670029,
            y: -8.46,
            z: 4.0,
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
              x: 38.444088,
              y: -8.14327049,
            },
            min: {
              x: 24.6037254,
              y: -11.8469372,
            },
          },
          isTrigger: false,
          enabled: true,
          isActiveAndEnabled: true,
          tag: "Untagged",
          points: [
            {
              x: 5.470684,
              y: -2.42076015,
            },
            {
              x: 5.477085,
              y: -3.374031,
            },
            {
              x: -0.66178894,
              y: -3.38693714,
            },
            {
              x: -0.664390564,
              y: -2.95184231,
            },
            {
              x: -8.362118,
              y: -2.9662466,
            },
            {
              x: -8.363277,
              y: -1.85385323,
            },
            {
              x: -8.035952,
              y: -1.8564043,
            },
            {
              x: -8.039198,
              y: -2.002884,
            },
            {
              x: -0.460372925,
              y: -2.00340176,
            },
            {
              x: -0.4674759,
              y: -0.8121948,
            },
            {
              x: -0.9297333,
              y: -0.8231087,
            },
            {
              x: -0.9319763,
              y: -0.05526066,
            },
            {
              x: -0.465374,
              y: -0.06551552,
            },
            {
              x: -0.45916748,
              y: 0.316449165,
            },
            {
              x: -0.3510208,
              y: 0.316729546,
            },
            {
              x: -0.3593788,
              y: -0.05814171,
            },
            {
              x: 2.695858,
              y: -0.05202961,
            },
            {
              x: 2.69852066,
              y: -0.8163824,
            },
            {
              x: 2.53617477,
              y: -0.8158102,
            },
            {
              x: 2.53050613,
              y: -1.29785061,
            },
            {
              x: 2.43028259,
              y: -1.301734,
            },
            {
              x: 2.427044,
              y: -0.9060335,
            },
            {
              x: 1.53917313,
              y: -0.893575668,
            },
            {
              x: 1.542141,
              y: -1.34755707,
            },
            {
              x: 0.240093231,
              y: -1.33760071,
            },
            {
              x: 0.266819,
              y: -0.7910557,
            },
            {
              x: -0.341117859,
              y: -0.7786989,
            },
            {
              x: -0.3618431,
              y: -2.429411,
            },
            {
              x: 2.41873169,
              y: -2.4240036,
            },
            {
              x: 2.4233284,
              y: -2.27011776,
            },
            {
              x: 2.534996,
              y: -2.27280235,
            },
            {
              x: 2.53157425,
              y: -2.41893768,
            },
            {
              x: 4.846325,
              y: -2.414257,
            },
            {
              x: 4.85033035,
              y: -1.89909744,
            },
            {
              x: 5.18009567,
              y: -1.898674,
            },
            {
              x: 5.17835236,
              y: -2.41857719,
            },
            {
              x: 5.472843,
              y: -2.42128181,
            },
          ],
        },
        {
          type: "edge",
          name: "Walls",
          position: {
            x: 32.9670029,
            y: -8.46,
            z: 4.0,
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
              x: 41.3360329,
              y: -5.262764,
            },
            min: {
              x: 24.6016121,
              y: -11.857584,
            },
          },
          isTrigger: false,
          enabled: true,
          isActiveAndEnabled: true,
          tag: "Untagged",
          points: [
            {
              x: -8.175886,
              y: 0.162028313,
            },
            {
              x: -8.364248,
              y: 0.150140762,
            },
            {
              x: -8.365393,
              y: -0.887557,
            },
            {
              x: -8.031784,
              y: -0.901137352,
            },
            {
              x: -8.030746,
              y: -0.8215046,
            },
            {
              x: -6.974577,
              y: -0.817383766,
            },
            {
              x: -6.98381042,
              y: 0.150697708,
            },
            {
              x: -8.203381,
              y: 0.157569885,
            },
            {
              x: -8.199486,
              y: 1.863009,
            },
            {
              x: -4.47790337,
              y: 1.86258554,
            },
            {
              x: -4.50777054,
              y: 0.576724052,
            },
            {
              x: -4.885107,
              y: 0.561789036,
            },
            {
              x: -5.69865036,
              y: 0.1480732,
            },
            {
              x: -5.715187,
              y: -0.8244953,
            },
            {
              x: -5.29667473,
              y: -0.824494362,
            },
            {
              x: -5.32354736,
              y: -0.9690418,
            },
            {
              x: -2.851513,
              y: -0.9502773,
            },
            {
              x: -2.85860252,
              y: -0.8034401,
            },
            {
              x: -2.1979084,
              y: -0.847849846,
            },
            {
              x: -2.18250084,
              y: -0.07922554,
            },
            {
              x: -3.667963,
              y: -0.04723072,
            },
            {
              x: -3.66057014,
              y: 0.7628503,
            },
            {
              x: -3.96555328,
              y: 0.786059856,
            },
            {
              x: -3.98860931,
              y: 1.25855494,
            },
            {
              x: -3.69883919,
              y: 1.39206886,
            },
            {
              x: -2.1955452,
              y: 1.4808588,
            },
            {
              x: -0.456260681,
              y: 1.4745512,
            },
            {
              x: -0.437698364,
              y: 1.276402,
            },
            {
              x: -0.3344307,
              y: 1.26768208,
            },
            {
              x: -0.348510742,
              y: 2.64369154,
            },
            {
              x: 0.272438049,
              y: 3.197236,
            },
            {
              x: 2.0010376,
              y: 3.18405914,
            },
            {
              x: 2.655449,
              y: 2.60258245,
            },
            {
              x: 3.965889,
              y: 2.54875946,
            },
            {
              x: 3.97102356,
              y: 1.64280748,
            },
            {
              x: 3.989418,
              y: 1.03840256,
            },
            {
              x: 4.047985,
              y: 0.961071,
            },
            {
              x: 4.245907,
              y: 0.8959942,
            },
            {
              x: 4.334404,
              y: 0.9667945,
            },
            {
              x: 6.45591354,
              y: 0.919873238,
            },
            {
              x: 6.633568,
              y: 0.966937542,
            },
            {
              x: 6.71566,
              y: 1.0762248,
            },
            {
              x: 6.72654724,
              y: 1.636653,
            },
            {
              x: 8.0475235,
              y: 1.64063406,
            },
            {
              x: 8.042419,
              y: -0.061671257,
            },
            {
              x: 6.682869,
              y: -0.0515480042,
            },
            {
              x: 6.685524,
              y: 0.251665115,
            },
            {
              x: 4.31438828,
              y: 0.208628654,
            },
            {
              x: 3.96288681,
              y: -0.071352005,
            },
            {
              x: 3.95680237,
              y: -0.8096838,
            },
            {
              x: 4.85372543,
              y: -0.8155651,
            },
            {
              x: 4.859535,
              y: -0.9272051,
            },
            {
              x: 5.17983246,
              y: -0.9459448,
            },
            {
              x: 5.195339,
              y: -0.8108511,
            },
            {
              x: 8.047436,
              y: -0.79427433,
            },
            {
              x: 8.041065,
              y: -2.42155647,
            },
            {
              x: 6.73300934,
              y: -2.419817,
            },
            {
              x: 6.743122,
              y: -3.38312054,
            },
            {
              x: 8.36903,
              y: -3.397584,
            },
          ],
        },
      ],
    },
    {
      id: SystemType.Laboratory,
      name: "Laboratory",
      doors: [0x09, 0x0a],
      vents: [0x06],
      boundaries: {
        type: "polygon",
        name: "Science",
        position: {
          x: 32.9670029,
          y: -8.46,
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
            x: 41.14503,
            y: -4.6868186,
          },
          min: {
            x: 24.7400856,
            y: -11.5526447,
          },
        },
        isTrigger: true,
        enabled: true,
        isActiveAndEnabled: true,
        tag: "Untagged",
        points: [
          {
            x: -8.226919,
            y: 2.037671,
          },
          {
            x: -0.422359467,
            y: 3.773181,
          },
          {
            x: 8.178028,
            y: 2.9045682,
          },
          {
            x: 8.126873,
            y: -0.705636,
          },
          {
            x: 5.045624,
            y: -0.764065742,
          },
          {
            x: 5.032303,
            y: -3.09264565,
          },
          {
            x: -0.39440155,
            y: -2.78949738,
          },
          {
            x: -8.212685,
            y: -2.810627,
          },
        ],
      },
      collision: [
        {
          type: "edge",
          name: "Walls",
          position: {
            x: 32.9670029,
            y: -8.46,
            z: 4.0,
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
              x: 38.444088,
              y: -8.14327049,
            },
            min: {
              x: 24.6037254,
              y: -11.8469372,
            },
          },
          isTrigger: false,
          enabled: true,
          isActiveAndEnabled: true,
          tag: "Untagged",
          points: [
            {
              x: 5.470684,
              y: -2.42076015,
            },
            {
              x: 5.477085,
              y: -3.374031,
            },
            {
              x: -0.66178894,
              y: -3.38693714,
            },
            {
              x: -0.664390564,
              y: -2.95184231,
            },
            {
              x: -8.362118,
              y: -2.9662466,
            },
            {
              x: -8.363277,
              y: -1.85385323,
            },
            {
              x: -8.035952,
              y: -1.8564043,
            },
            {
              x: -8.039198,
              y: -2.002884,
            },
            {
              x: -0.460372925,
              y: -2.00340176,
            },
            {
              x: -0.4674759,
              y: -0.8121948,
            },
            {
              x: -0.9297333,
              y: -0.8231087,
            },
            {
              x: -0.9319763,
              y: -0.05526066,
            },
            {
              x: -0.465374,
              y: -0.06551552,
            },
            {
              x: -0.45916748,
              y: 0.316449165,
            },
            {
              x: -0.3510208,
              y: 0.316729546,
            },
            {
              x: -0.3593788,
              y: -0.05814171,
            },
            {
              x: 2.695858,
              y: -0.05202961,
            },
            {
              x: 2.69852066,
              y: -0.8163824,
            },
            {
              x: 2.53617477,
              y: -0.8158102,
            },
            {
              x: 2.53050613,
              y: -1.29785061,
            },
            {
              x: 2.43028259,
              y: -1.301734,
            },
            {
              x: 2.427044,
              y: -0.9060335,
            },
            {
              x: 1.53917313,
              y: -0.893575668,
            },
            {
              x: 1.542141,
              y: -1.34755707,
            },
            {
              x: 0.240093231,
              y: -1.33760071,
            },
            {
              x: 0.266819,
              y: -0.7910557,
            },
            {
              x: -0.341117859,
              y: -0.7786989,
            },
            {
              x: -0.3618431,
              y: -2.429411,
            },
            {
              x: 2.41873169,
              y: -2.4240036,
            },
            {
              x: 2.4233284,
              y: -2.27011776,
            },
            {
              x: 2.534996,
              y: -2.27280235,
            },
            {
              x: 2.53157425,
              y: -2.41893768,
            },
            {
              x: 4.846325,
              y: -2.414257,
            },
            {
              x: 4.85033035,
              y: -1.89909744,
            },
            {
              x: 5.18009567,
              y: -1.898674,
            },
            {
              x: 5.17835236,
              y: -2.41857719,
            },
            {
              x: 5.472843,
              y: -2.42128181,
            },
          ],
        },
        {
          type: "edge",
          name: "Walls",
          position: {
            x: 32.9670029,
            y: -8.46,
            z: 4.0,
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
              x: 41.3360329,
              y: -5.262764,
            },
            min: {
              x: 24.6016121,
              y: -11.857584,
            },
          },
          isTrigger: false,
          enabled: true,
          isActiveAndEnabled: true,
          tag: "Untagged",
          points: [
            {
              x: -8.175886,
              y: 0.162028313,
            },
            {
              x: -8.364248,
              y: 0.150140762,
            },
            {
              x: -8.365393,
              y: -0.887557,
            },
            {
              x: -8.031784,
              y: -0.901137352,
            },
            {
              x: -8.030746,
              y: -0.8215046,
            },
            {
              x: -6.974577,
              y: -0.817383766,
            },
            {
              x: -6.98381042,
              y: 0.150697708,
            },
            {
              x: -8.203381,
              y: 0.157569885,
            },
            {
              x: -8.199486,
              y: 1.863009,
            },
            {
              x: -4.47790337,
              y: 1.86258554,
            },
            {
              x: -4.50777054,
              y: 0.576724052,
            },
            {
              x: -4.885107,
              y: 0.561789036,
            },
            {
              x: -5.69865036,
              y: 0.1480732,
            },
            {
              x: -5.715187,
              y: -0.8244953,
            },
            {
              x: -5.29667473,
              y: -0.824494362,
            },
            {
              x: -5.32354736,
              y: -0.9690418,
            },
            {
              x: -2.851513,
              y: -0.9502773,
            },
            {
              x: -2.85860252,
              y: -0.8034401,
            },
            {
              x: -2.1979084,
              y: -0.847849846,
            },
            {
              x: -2.18250084,
              y: -0.07922554,
            },
            {
              x: -3.667963,
              y: -0.04723072,
            },
            {
              x: -3.66057014,
              y: 0.7628503,
            },
            {
              x: -3.96555328,
              y: 0.786059856,
            },
            {
              x: -3.98860931,
              y: 1.25855494,
            },
            {
              x: -3.69883919,
              y: 1.39206886,
            },
            {
              x: -2.1955452,
              y: 1.4808588,
            },
            {
              x: -0.456260681,
              y: 1.4745512,
            },
            {
              x: -0.437698364,
              y: 1.276402,
            },
            {
              x: -0.3344307,
              y: 1.26768208,
            },
            {
              x: -0.348510742,
              y: 2.64369154,
            },
            {
              x: 0.272438049,
              y: 3.197236,
            },
            {
              x: 2.0010376,
              y: 3.18405914,
            },
            {
              x: 2.655449,
              y: 2.60258245,
            },
            {
              x: 3.965889,
              y: 2.54875946,
            },
            {
              x: 3.97102356,
              y: 1.64280748,
            },
            {
              x: 3.989418,
              y: 1.03840256,
            },
            {
              x: 4.047985,
              y: 0.961071,
            },
            {
              x: 4.245907,
              y: 0.8959942,
            },
            {
              x: 4.334404,
              y: 0.9667945,
            },
            {
              x: 6.45591354,
              y: 0.919873238,
            },
            {
              x: 6.633568,
              y: 0.966937542,
            },
            {
              x: 6.71566,
              y: 1.0762248,
            },
            {
              x: 6.72654724,
              y: 1.636653,
            },
            {
              x: 8.0475235,
              y: 1.64063406,
            },
            {
              x: 8.042419,
              y: -0.061671257,
            },
            {
              x: 6.682869,
              y: -0.0515480042,
            },
            {
              x: 6.685524,
              y: 0.251665115,
            },
            {
              x: 4.31438828,
              y: 0.208628654,
            },
            {
              x: 3.96288681,
              y: -0.071352005,
            },
            {
              x: 3.95680237,
              y: -0.8096838,
            },
            {
              x: 4.85372543,
              y: -0.8155651,
            },
            {
              x: 4.859535,
              y: -0.9272051,
            },
            {
              x: 5.17983246,
              y: -0.9459448,
            },
            {
              x: 5.195339,
              y: -0.8108511,
            },
            {
              x: 8.047436,
              y: -0.79427433,
            },
            {
              x: 8.041065,
              y: -2.42155647,
            },
            {
              x: 6.73300934,
              y: -2.419817,
            },
            {
              x: 6.743122,
              y: -3.38312054,
            },
            {
              x: 8.36903,
              y: -3.397584,
            },
          ],
        },
        {
          type: "box",
          name: "Walls",
          position: {
            x: 32.9670029,
            y: -8.46,
            z: 4.0,
          },
          offset: {
            x: -7.545576,
            y: 1.65469074,
          },
          rotation: {
            x: 0.0,
            y: 0.0,
            z: 0.0,
          },
          size: {
            x: 1.208847,
            y: 0.330618858,
          },
          bounds: {
            max: {
              x: 26.02585,
              y: -6.64,
            },
            min: {
              x: 24.8170033,
              y: -6.97061872,
            },
          },
          isTrigger: false,
          enabled: true,
          isActiveAndEnabled: true,
          tag: "Untagged",
        },
        {
          type: "polygon",
          name: "Hole",
          position: {
            x: 26.6270027,
            y: -7.76,
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
              x: 27.13068,
              y: -7.36224174,
            },
            min: {
              x: 26.14983,
              y: -8.007652,
            },
          },
          isTrigger: false,
          enabled: true,
          isActiveAndEnabled: true,
          tag: "Untagged",
          points: [
            {
              x: 0.239480972,
              y: 0.361874878,
            },
            {
              x: -0.04014969,
              y: 0.3977583,
            },
            {
              x: -0.3717575,
              y: 0.291810334,
            },
            {
              x: -0.477174759,
              y: 0.06942779,
            },
            {
              x: -0.266590118,
              y: -0.246924579,
            },
            {
              x: 0.135038376,
              y: -0.247652233,
            },
            {
              x: 0.409980774,
              y: -0.120740592,
            },
            {
              x: 0.503677368,
              y: 0.154155076,
            },
          ],
        },
        {
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
        {
          type: "box",
          name: "sciencetable",
          position: {
            x: 34.8684425,
            y: -7.10855627,
            z: -0.00699996948,
          },
          offset: {
            x: 0.0,
            y: -0.18661356,
          },
          rotation: {
            x: 0.0,
            y: 0.0,
            z: 0.0,
          },
          size: {
            x: 1.81,
            y: 0.756773,
          },
          bounds: {
            max: {
              x: 35.77344,
              y: -6.91678333,
            },
            min: {
              x: 33.9634438,
              y: -7.67355633,
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
      id: SystemType.Storage,
      name: "Storage",
      doors: [0x0b],
      vents: [0x08],
      boundaries: {
        type: "polygon",
        name: "Storage",
        position: {
          x: 19.52,
          y: -11.84,
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
            x: 22.68535,
            y: -10.5939608,
          },
          min: {
            x: 17.1778736,
            y: -13.5567026,
          },
        },
        isTrigger: true,
        enabled: true,
        isActiveAndEnabled: true,
        tag: "Untagged",
        points: [
          {
            x: -2.2522068,
            y: 1.24603939,
          },
          {
            x: -2.34212685,
            y: -0.457489967,
          },
          {
            x: -1.0325489,
            y: -0.4683466,
          },
          {
            x: -1.06824875,
            y: -1.69854355,
          },
          {
            x: 3.16535,
            y: -1.71670246,
          },
          {
            x: 3.06131744,
            y: 1.18908119,
          },
        ],
      },
      collision: [
        {
          type: "edge",
          name: "Walls",
          position: {
            x: 20.07,
            y: -11.9400005,
            z: 2.0,
          },
          offset: {
            x: -0.55,
            y: 0.1,
          },
          rotation: {
            x: 0.0,
            y: 0.0,
            z: 0.0,
          },
          bounds: {
            max: {
              x: 22.8675232,
              y: -9.943956,
            },
            min: {
              x: 17.1267166,
              y: -13.648016,
            },
          },
          isTrigger: false,
          enabled: true,
          isActiveAndEnabled: true,
          tag: "Untagged",
          points: [
            {
              x: -2.377121,
              y: -0.490704536,
            },
            {
              x: -2.14493942,
              y: -0.502742767,
            },
            {
              x: -2.15008354,
              y: -0.7977123,
            },
            {
              x: -1.93026733,
              y: -1.208271,
            },
            {
              x: -1.136219,
              y: -1.09682178,
            },
            {
              x: -1.139677,
              y: -1.80801487,
            },
            {
              x: 3.33946419,
              y: -1.79717731,
            },
            {
              x: 3.34752274,
              y: 1.89405441,
            },
            {
              x: -2.39328122,
              y: 1.89604378,
            },
            {
              x: -2.37696576,
              y: 1.28780746,
            },
            {
              x: -0.9554062,
              y: 1.213233,
            },
            {
              x: -0.872964859,
              y: 1.10266972,
            },
            {
              x: 0.704458237,
              y: 1.090723,
            },
            {
              x: 0.9997196,
              y: 0.575773239,
            },
            {
              x: 3.14907265,
              y: -0.04615307,
            },
            {
              x: 3.13252258,
              y: -0.765730858,
            },
            {
              x: 2.66357231,
              y: -0.562554359,
            },
            {
              x: 2.162239,
              y: -1.06421661,
            },
            {
              x: -0.0332489,
              y: -1.05419636,
            },
            {
              x: -0.0429210663,
              y: -0.581345558,
            },
            {
              x: -0.423578978,
              y: -0.560765266,
            },
            {
              x: -0.48078537,
              y: -0.306134224,
            },
            {
              x: -0.6453972,
              y: -0.154605865,
            },
            {
              x: -0.999359131,
              y: -0.178555489,
            },
            {
              x: -1.01389885,
              y: 0.2460413,
            },
            {
              x: -2.380209,
              y: 0.263773918,
            },
            {
              x: -2.37634659,
              y: -0.495850563,
            },
          ],
        },
      ],
    },
    {
      id: SystemType.Dropship,
      name: "Dropship",
      doors: [],
      vents: [],
      boundaries: {
        type: "box",
        name: "Dropship",
        position: {
          x: 16.62,
          y: -3.03,
          z: 1.0,
        },
        offset: {
          x: 0.0,
          y: 0.9924736,
        },
        rotation: {
          x: 0.0,
          y: 0.0,
          z: 0.0,
        },
        size: {
          x: 6.38,
          y: 9.500006,
        },
        bounds: {
          max: {
            x: 19.5229015,
            y: 2.19565344,
          },
          min: {
            x: 13.7171,
            y: -6.449352,
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
            x: 16.62,
            y: -4.0583,
            z: 1.0,
          },
          offset: {
            x: 0.0,
            y: 1.13,
          },
          rotation: {
            x: 0.0,
            y: 0.0,
            z: 0.0,
          },
          bounds: {
            max: {
              x: 23.7523232,
              y: -0.4777422,
            },
            min: {
              x: 5.41311646,
              y: -7.94642258,
            },
          },
          isTrigger: false,
          enabled: true,
          isActiveAndEnabled: true,
          tag: "Untagged",
          points: [
            {
              x: -12.3152561,
              y: -4.718243,
            },
            {
              x: -10.5112162,
              y: -4.635438,
            },
            {
              x: -8.706219,
              y: -4.89295959,
            },
            {
              x: -7.15536737,
              y: -4.66456175,
            },
            {
              x: -6.63587666,
              y: -4.4619627,
            },
            {
              x: -6.16834354,
              y: -3.76551867,
            },
            {
              x: -4.39437628,
              y: -4.556422,
            },
            {
              x: -2.61616468,
              y: -5.402662,
            },
            {
              x: -2.43278027,
              y: -3.5164957,
            },
            {
              x: -2.55254078,
              y: 2.21454144,
            },
            {
              x: -1.00452161,
              y: 2.79459381,
            },
            {
              x: 1.00758946,
              y: 2.80467844,
            },
            {
              x: 2.656118,
              y: 2.22906828,
            },
            {
              x: 2.54364657,
              y: -3.53409433,
            },
            {
              x: 2.83641839,
              y: -5.35089731,
            },
            {
              x: 6.342974,
              y: -3.818965,
            },
            {
              x: 7.293869,
              y: -3.902595,
            },
            {
              x: 7.837717,
              y: -3.78017426,
            },
          ],
        },
      ],
    },
  ],
  vents: [
    {
      id: 0,
      position: new Vector2(1.9281311, -9.195087),
      collider: {
        type: "box",
        name: "ElectricalVent",
        position: {
          x: 1.9289999,
          y: -9.558001,
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
          x: 0.75,
          y: 0.34,
        },
        bounds: {
          max: {
            x: 2.29899979,
            y: -9.38800049,
          },
          min: {
            x: 1.54899979,
            y: -9.728001,
          },
        },
        isTrigger: true,
        enabled: true,
        isActiveAndEnabled: true,
        tag: "Untagged",
      },
    },
    {
      id: 1,
      position: new Vector2(6.8989105, -14.047455),
      collider: {
        type: "box",
        name: "ElecFenceVent",
        position: {
          x: 6.9,
          y: -14.41,
          z: 2.0,
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
          x: 0.75,
          y: 0.34,
        },
        bounds: {
          max: {
            x: 7.27,
            y: -14.24,
          },
          min: {
            x: 6.52,
            y: -14.58,
          },
        },
        isTrigger: true,
        enabled: true,
        isActiveAndEnabled: true,
        tag: "Untagged",
      },
    },
    {
      id: 2,
      position: new Vector2(3.5089645, -16.216679),
      collider: {
        type: "box",
        name: "LifeSuppVent",
        position: {
          x: 3.51,
          y: -16.58,
          z: 2.0,
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
          x: 0.75,
          y: 0.34,
        },
        bounds: {
          max: {
            x: 3.88,
            y: -16.41,
          },
          min: {
            x: 3.13,
            y: -16.75,
          },
        },
        isTrigger: true,
        enabled: true,
        isActiveAndEnabled: true,
        tag: "Untagged",
      },
    },
    {
      id: 3,
      position: new Vector2(12.303043, -18.53483),
      collider: {
        type: "box",
        name: "CommsVent",
        position: {
          x: 12.304,
          y: -18.8979988,
          z: 2.0,
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
          x: 0.75,
          y: 0.34,
        },
        bounds: {
          max: {
            x: 12.674,
            y: -18.7279987,
          },
          min: {
            x: 11.924,
            y: -19.0679989,
          },
        },
        isTrigger: true,
        enabled: true,
        isActiveAndEnabled: true,
        tag: "Untagged",
      },
    },
    {
      id: 4,
      position: new Vector2(16.377811, -19.235523),
      collider: {
        type: "box",
        name: "OfficeVent",
        position: {
          x: 16.379,
          y: -19.599,
          z: 2.0,
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
          x: 0.75,
          y: 0.34,
        },
        bounds: {
          max: {
            x: 16.749,
            y: -19.429,
          },
          min: {
            x: 15.9990005,
            y: -19.769001,
          },
        },
        isTrigger: true,
        enabled: true,
        isActiveAndEnabled: true,
        tag: "Untagged",
      },
    },
    {
      id: 5,
      position: new Vector2(20.088806, -25.153582),
      collider: {
        type: "box",
        name: "AdminVent",
        position: {
          x: 20.0890026,
          y: -25.517,
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
          x: 0.75,
          y: 0.34,
        },
        bounds: {
          max: {
            x: 20.4590034,
            y: -25.347,
          },
          min: {
            x: 19.7090034,
            y: -25.687,
          },
        },
        isTrigger: true,
        enabled: true,
        isActiveAndEnabled: true,
        tag: "Untagged",
      },
    },
    {
      id: 6,
      position: new Vector2(32.96254, -9.163349),
      collider: {
        type: "box",
        name: "BathroomVent",
        position: {
          x: 32.963,
          y: -9.526,
          z: 2.0,
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
          x: 0.75,
          y: 0.34,
        },
        bounds: {
          max: {
            x: 33.333,
            y: -9.356,
          },
          min: {
            x: 32.583,
            y: -9.696,
          },
        },
        isTrigger: true,
        enabled: true,
        isActiveAndEnabled: true,
        tag: "Untagged",
      },
    },
    {
      id: 7,
      position: new Vector2(30.906845, -11.497368),
      collider: {
        type: "box",
        name: "SubBathroomVent",
        position: {
          x: 30.9070034,
          y: -11.8600006,
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
          x: 0.75,
          y: 0.34,
        },
        bounds: {
          max: {
            x: 31.2770042,
            y: -11.6900005,
          },
          min: {
            x: 30.5270042,
            y: -12.0300007,
          },
        },
        isTrigger: true,
        enabled: true,
        isActiveAndEnabled: true,
        tag: "Untagged",
      },
    },
    {
      id: 8,
      position: new Vector2(21.999237, -11.826963),
      collider: {
        type: "box",
        name: "StorageVent",
        position: {
          x: 22.0,
          y: -12.1900005,
          z: 2.0,
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
          x: 0.75,
          y: 0.34,
        },
        bounds: {
          max: {
            x: 22.37,
            y: -12.02,
          },
          min: {
            x: 21.62,
            y: -12.3600006,
          },
        },
        isTrigger: true,
        enabled: true,
        isActiveAndEnabled: true,
        tag: "Untagged",
      },
    },
    {
      id: 9,
      position: new Vector2(24.019531, -8.026855),
      collider: {
        type: "box",
        name: "ScienceBuildingVent",
        position: {
          x: 24.02,
          y: -8.39,
          z: 2.0,
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
          x: 0.75,
          y: 0.34,
        },
        bounds: {
          max: {
            x: 24.3900013,
            y: -8.22,
          },
          min: {
            x: 23.6400013,
            y: -8.56,
          },
        },
        isTrigger: true,
        enabled: true,
        isActiveAndEnabled: true,
        tag: "Untagged",
      },
    },
    {
      id: 10,
      position: new Vector2(9.639431, -7.356678),
      collider: {
        type: "box",
        name: "ElectricBuildingVent",
        position: {
          x: 9.64,
          y: -7.72,
          z: 2.0,
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
          x: 0.75,
          y: 0.34,
        },
        bounds: {
          max: {
            x: 10.01,
            y: -7.54999971,
          },
          min: {
            x: 9.26,
            y: -7.89,
          },
        },
        isTrigger: true,
        enabled: true,
        isActiveAndEnabled: true,
        tag: "Untagged",
      },
    },
    {
      id: 11,
      position: new Vector2(18.929123, -24.487068),
      collider: {
        type: "box",
        name: "SouthVent",
        position: {
          x: 18.93,
          y: -24.85,
          z: 2.0,
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
          x: 0.75,
          y: 0.34,
        },
        bounds: {
          max: {
            x: 19.3000011,
            y: -24.68,
          },
          min: {
            x: 18.5500011,
            y: -25.02,
          },
        },
        isTrigger: true,
        enabled: true,
        isActiveAndEnabled: true,
        tag: "Untagged",
      },
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