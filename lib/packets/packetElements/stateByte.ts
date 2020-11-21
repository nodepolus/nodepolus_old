export interface StateByteInterface {
  VotedForPlayerPlayerID: number;
  IsDead: boolean;
  DidVote: boolean;
  DidReport: boolean;
}

export class StateByte {
  public static parse(byte: number): StateByteInterface {
    return {
      VotedForPlayerPlayerID: (byte & 0b00001111) - 1,
      DidReport: (byte & 0b00100000) > 0,
      DidVote: (byte & 0b01000000) > 0,
      IsDead: (byte & 0b10000000) > 0,
    };
  }
  public static serialize(data: StateByteInterface) {
    var returnInt = 0;

    returnInt += (data.VotedForPlayerPlayerID & 0b00001111) + 1;
    returnInt += (data.DidReport ? 1 : 0) * 0b00100000;
    returnInt += (data.DidVote ? 1 : 0) * 0b01000000;
    returnInt += (data.IsDead ? 1 : 0) * 0b10000000;

    return returnInt;
  }
}
