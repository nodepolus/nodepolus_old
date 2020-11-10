import PolusBuffer from "../../../../util/PolusBuffer.js";
import SystemType from "../../../PacketElements/SystemType.js"

export enum RepairAction {
	Repaired = 0x01,
	Unrepaired = 0x00
}

export enum OpenAction {
	Opened = 0x01,
	Closed = 0x00,
	Unchanged = 0x02
}

export enum DecontaminationAction {
    HeadInsideNeedsDecontaminated = 0x01,
    HeadOutsideNeedsDecontaminated = 0x02,
    HeadInsideAlreadyDecontaminated = 0x03,
    HeadOutsideAlreadyDecontaminated = 0x04
}

export interface RepairLightsAmount {
	switchFlipped: number
}

export interface QueueMedbayScan {
	playerID: number,
	isQueuedForScan: boolean,
	hasLeftQueue: boolean
}

export interface RepairO2Amount {
	consoleNum: number,
	action: RepairAction,
	isRepaired: boolean
}

export interface RepairReactorAmount {
	consoleNum: number,
	isRepaired: boolean,
	action: RepairAction
}

export interface ViewCams {
	isViewing: boolean
}

export interface ReopenDoorAmount {
	doorID: number
}

export interface SabotageSystemAmount {
	systemID: SystemType
}

export interface RepairCommunicationsAmount {
	consoleNum?: number,
	isRepaired: boolean,
	action?: RepairAction,
	isOpen?: OpenAction,
}

export interface DecontaminationAmount {
    action: DecontaminationAction
}

export interface RepairSystemPacket {
	System: SystemType,
	RepairerNetID: bigint,
	RepairAmount: RepairLightsAmount | QueueMedbayScan | RepairO2Amount | RepairReactorAmount | ViewCams | ReopenDoorAmount | SabotageSystemAmount | RepairCommunicationsAmount | DecontaminationAmount
}

export default class RepairSystem {
	parse(packet: PolusBuffer): RepairSystemPacket {
		let systemType = packet.readU8();
		let netID = packet.readVarInt();
		let amount = packet.readU8();
		let data: RepairSystemPacket = {
			System: systemType,
			RepairerNetID: netID,
			RepairAmount: {
				switchFlipped: 0//dummy data
			}
		};
		data.System = systemType;
		data.RepairerNetID = netID;
		switch(data.System) {
			case SystemType.Electrical:
				data.RepairAmount = {
					switchFlipped: amount
				}
				break;
			case SystemType.Medbay:
				data.RepairAmount = {
					isQueuedForScan: (amount & 0b10000000) != 0,
					hasLeftQueue:    (amount & 0b01000000) != 0,
					playerID:        (amount & 0b00011111)
				}
				break;
			case SystemType.O2:
				data.RepairAmount = {
					consoleNum: (amount & 0b00000011),
					isRepaired: (amount & 0b00010000) != 0,
					action:    ((amount & 0b01000000) != 0)?1:0
				}
				break;
			case SystemType.Reactor:
			case SystemType.Laboratory:
				data.RepairAmount = {
					consoleNum: (amount & 0b00000011),
					isRepaired: (amount & 0b00010000) != 0,
					action:    ((amount & 0b01000000) != 0)?1:0
				}
				break;
			case SystemType.Security:
				data.RepairAmount = {
					isViewing: (amount & 0b00000001) != 0
				}
				break;
			case SystemType.Doors:
				data.RepairAmount = {
					doorID: amount
				}
				break;
			case SystemType.Sabotage:
				data.RepairAmount = {
					systemID: amount
				}
				break;
			case SystemType.Communications:
				let temp;
				if((amount & 0x40) != 0) {
					temp = 1;
				} else {
					if((amount & 0x20) != 0) {
						temp = 0
					} else {
						temp = 2;
					}
				}
				data.RepairAmount = {
					consoleNum: (amount & 0b00000011),
					isRepaired: (amount & 0b10000000) == 0,
					action:    ((amount & 0b00010000) != 0)?1:0,
					isOpen: temp,
                }
                break;
            case SystemType.Decontamination:
            case SystemType.Decontamination2:
                data.RepairAmount = {
                    action: amount,
                }
                break;
		}
		return data;
	}
	serialize(packet: RepairSystemPacket): PolusBuffer {
		console.log("system: ", packet.System)
		var buf = new PolusBuffer();
		buf.writeU8(packet.System);
		buf.writeVarInt(packet.RepairerNetID);
		let retInteger = 0;
		console.log("system2: ", packet.System)
		switch(packet.System) {
			case SystemType.Electrical:
				buf.writeU8((<RepairLightsAmount>packet.RepairAmount).switchFlipped);
				break;
			case SystemType.Medbay:
				retInteger = 0;
				if ((<QueueMedbayScan>packet.RepairAmount).isQueuedForScan) retInteger += 0b10000000;
				if ((<QueueMedbayScan>packet.RepairAmount).hasLeftQueue)    retInteger += 0b01000000;
				retInteger += (<QueueMedbayScan>packet.RepairAmount).playerID & 0b00011111;
				buf.writeU8(retInteger);
				break;
			case SystemType.O2:
				retInteger = 0;
				if ((<RepairO2Amount>packet.RepairAmount).isRepaired) retInteger += 0b00010000;
				if ((<RepairO2Amount>packet.RepairAmount).action == RepairAction.Repaired) retInteger += 0b01000000;
				retInteger += (<RepairO2Amount>packet.RepairAmount).consoleNum & 0b00000011;
				buf.writeU8(retInteger);
				break;
			case SystemType.Reactor:
			case SystemType.Laboratory:
				retInteger = 0;
				if ((<RepairReactorAmount>packet.RepairAmount).isRepaired) retInteger += 0b00010000;
				if ((<RepairReactorAmount>packet.RepairAmount).action == RepairAction.Repaired) retInteger += 0b01000000;
				retInteger += (<RepairReactorAmount>packet.RepairAmount).consoleNum & 0b00000011;
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
				if ((<RepairCommunicationsAmount>packet.RepairAmount).isRepaired) retInteger += 0b00010000;
				if ((<RepairCommunicationsAmount>packet.RepairAmount).action == RepairAction.Repaired) retInteger += 0b00010000;
				if ((<RepairCommunicationsAmount>packet.RepairAmount).isOpen != OpenAction.Unchanged) {
					if ((<RepairCommunicationsAmount>packet.RepairAmount).isOpen == OpenAction.Opened) {
						retInteger += 0b01000000
					} else {
						retInteger += 0b00100000
					}
				}
				retInteger += (<RepairReactorAmount>packet.RepairAmount).consoleNum & 0b00000011;
				buf.writeU8(retInteger);
				break;
            case SystemType.Decontamination:
            case SystemType.Decontamination2:
                buf.writeU8((<DecontaminationAmount>packet.RepairAmount).action);
                break;
			default:
				throw new Error("RepairSystem Error: " + packet.System + " is not a valid system")

		}
		return buf;
	};
};
