import { AmongUsMap } from "../../../../data/enums/amongUsMap";
import { PolusBuffer } from "../../../../util/polusBuffer";
import { Room } from "../../../../util/room";
import { PacketHandler } from "../../../packet";
import { SystemType } from "../../../packetElements/systemType";

export enum RepairAction {
  Repaired = 0x01,
  Unrepaired = 0x00,
}

export enum OpenAction {
  Opened = 0x01,
  Closed = 0x00,
  Unchanged = 0x02,
}

export enum DecontaminationAction {
  HeadInsideNeedsDecontaminated = 0x01,
  HeadOutsideNeedsDecontaminated = 0x02,
  HeadInsideAlreadyDecontaminated = 0x03,
  HeadOutsideAlreadyDecontaminated = 0x04,
}

export interface RepairLightsAmount {
  switchFlipped: number;
}

export interface QueueMedbayScan {
  playerID: number;
  isQueuedForScan: boolean;
  hasLeftQueue: boolean;
}

export interface RepairO2Amount {
  consoleNum: number;
  action: RepairAction;
  isRepaired: boolean;
}

export interface RepairReactorAmount {
  consoleNum: number;
  isRepaired: boolean;
  action: RepairAction;
}

export interface ViewCams {
  isViewing: boolean;
}

export interface ReopenDoorAmount {
  doorID: number;
}

export interface SabotageSystemAmount {
  systemID: SystemType;
}

export interface NormalCommunicationsAmount {
  repaired: boolean;
}

export interface HqCommunicationsAmount {
  repaired: boolean;
  opened: boolean;
  closed: boolean;
  codeSuccessful: boolean;
  consoleId: number;
}

export interface DecontaminationAmount {
  action: DecontaminationAction;
}

export type RepairAmount =
    | RepairLightsAmount
    | QueueMedbayScan
    | RepairO2Amount
    | RepairReactorAmount
    | ViewCams
    | ReopenDoorAmount
    | SabotageSystemAmount
    | NormalCommunicationsAmount
    | HqCommunicationsAmount
    | DecontaminationAmount

export interface RepairSystemPacket {
  System: SystemType;
  RepairerNetID: bigint;
  RepairAmount: RepairAmount;
}

export const RepairSabotage: PacketHandler<RepairSystemPacket> = {
  parse(packet: PolusBuffer, room: Room): RepairSystemPacket {
    let systemType = packet.readU8();
    let netID = packet.readVarInt();
    let amount = packet.readU8();
    let data: RepairSystemPacket = {
      System: systemType,
      RepairerNetID: netID,
      RepairAmount: {
        switchFlipped: 0, //dummy data
      },
    };
    data.System = systemType;
    data.RepairerNetID = netID;
    switch (data.System) {
      case SystemType.Electrical:
        data.RepairAmount = {
          switchFlipped: amount,
        };
        break;
      case SystemType.Medbay:
        data.RepairAmount = {
          isQueuedForScan: (amount & 0b10000000) != 0,
          hasLeftQueue: (amount & 0b01000000) != 0,
          playerID: amount & 0b00011111,
        };
        break;
      case SystemType.O2:
        data.RepairAmount = {
          consoleNum: amount & 0b00000011,
          isRepaired: (amount & 0b00010000) != 0,
          action: (amount & 0b01000000) != 0 ? 1 : 0,
        };
        break;
      case SystemType.Reactor:
      case SystemType.Laboratory:
        data.RepairAmount = {
          consoleNum: amount & 0b00000011,
          isRepaired: (amount & 0b00010000) != 0,
          action: (amount & 0b01000000) != 0 ? 1 : 0,
        };
        break;
      case SystemType.Security:
        data.RepairAmount = {
          isViewing: (amount & 0b00000001) != 0,
        };
        break;
      case SystemType.Doors:
        data.RepairAmount = {
          doorID: amount,
        };
        break;
      case SystemType.Sabotage:
        data.RepairAmount = {
          systemID: amount,
        };
        break;
      case SystemType.Communications:
        if (room.settings.Map == AmongUsMap.MIRA_HQ) {
          data.RepairAmount = {
            repaired: (amount & 0x80) != 0,
            opened: (amount & 0x40) != 0,
            closed: (amount & 0x20) != 0,
            codeSuccessful: (amount & 0x10) != 0,
            consoleId: amount & 3,
          };
        } else {
          data.RepairAmount = {
            repaired: (amount & 0x80) != 0,
          };
        }
        break;
      case SystemType.Decontamination:
      case SystemType.Decontamination2:
        data.RepairAmount = {
          action: amount,
        };
        break;
    }
    return data;
  },

  serialize(packet: RepairSystemPacket, room: Room): PolusBuffer {
    // console.log("system: ", packet.System)
    var buf = new PolusBuffer();
    buf.writeU8(packet.System);
    buf.writeVarInt(packet.RepairerNetID);
    let retInteger = 0;
    // console.log("system2: ", packet.System)
    switch (packet.System) {
      case SystemType.Electrical:
        buf.writeU8((<RepairLightsAmount>packet.RepairAmount).switchFlipped);
        break;
      case SystemType.Medbay:
        retInteger = 0;
        if ((<QueueMedbayScan>packet.RepairAmount).isQueuedForScan)
          retInteger += 0b10000000;
        if ((<QueueMedbayScan>packet.RepairAmount).hasLeftQueue)
          retInteger += 0b01000000;
        retInteger +=
          (<QueueMedbayScan>packet.RepairAmount).playerID & 0b00011111;
        buf.writeU8(retInteger);
        break;
      case SystemType.O2:
        retInteger = 0;
        if ((<RepairO2Amount>packet.RepairAmount).isRepaired)
          retInteger += 0b00010000;
        if (
          (<RepairO2Amount>packet.RepairAmount).action == RepairAction.Repaired
        )
          retInteger += 0b01000000;
        retInteger +=
          (<RepairO2Amount>packet.RepairAmount).consoleNum & 0b00000011;
        buf.writeU8(retInteger);
        break;
      case SystemType.Reactor:
      case SystemType.Laboratory:
        retInteger = 0;
        if ((<RepairReactorAmount>packet.RepairAmount).isRepaired)
          retInteger += 0b00010000;
        if (
          (<RepairReactorAmount>packet.RepairAmount).action ==
          RepairAction.Repaired
        )
          retInteger += 0b01000000;
        retInteger +=
          (<RepairReactorAmount>packet.RepairAmount).consoleNum & 0b00000011;
        buf.writeU8(retInteger);
        break;
      case SystemType.Security:
        buf.writeBoolean((<ViewCams>packet.RepairAmount).isViewing);
        break;
      case SystemType.Doors:
        buf.writeU8((<ReopenDoorAmount>packet.RepairAmount).doorID);
        break;
      case SystemType.Sabotage:
        buf.writeU8((<SabotageSystemAmount>packet.RepairAmount).systemID);
        break;
      case SystemType.Communications:
        retInteger = 0;

        if (room.settings.Map == AmongUsMap.MIRA_HQ) {
          retInteger |= (<HqCommunicationsAmount>packet.RepairAmount).repaired
            ? 0x80
            : 0;
          retInteger |= (<HqCommunicationsAmount>packet.RepairAmount).opened
            ? 0x40
            : 0;
          retInteger |= (<HqCommunicationsAmount>packet.RepairAmount).closed
            ? 0x20
            : 0;
          retInteger |= (<HqCommunicationsAmount>packet.RepairAmount)
            .codeSuccessful
            ? 0x10
            : 0;
          retInteger += (<HqCommunicationsAmount>packet.RepairAmount).consoleId;
        } else {
          if ((<NormalCommunicationsAmount>packet.RepairAmount).repaired) {
            retInteger = 0x80;
          }
        }
        buf.writeU8(retInteger);
        break;
      case SystemType.Decontamination:
      case SystemType.Decontamination2:
        buf.writeU8((<DecontaminationAmount>packet.RepairAmount).action);
        break;
      default:
        throw new Error(
          "RepairSystem Error: " + packet.System + " is not a valid system"
        );
    }
    return buf;
  },
};
