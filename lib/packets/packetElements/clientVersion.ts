export class ClientVersion {
  constructor(
    public year: number,
    public month: number,
    public day: number,
    public revision: number
  ) {}
  static parse(version: number): ClientVersion {
    let year = Math.floor(version / 25000);
    version %= 25000;
    let month = Math.floor(version / 1800);
    version %= 1800;
    let day = Math.floor(version / 50);
    let revision = version % 50;

    return new this(year, month, day, revision);
  }
  serialize(): number {
    return (
      this.year * 25000 + this.month * 1800 + this.day * 50 + this.revision
    );
  }
  matches(otherVersion: ClientVersion): boolean {
    return (
      this.year == otherVersion.year &&
      this.month == otherVersion.month &&
      this.day == otherVersion.day &&
      this.revision == otherVersion.revision
    );
  }
}
