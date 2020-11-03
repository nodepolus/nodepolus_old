Server : EventEmitter
       > Room[]
       > Player[]

Room : EventEmitter
       > Player[]
       > GameCode

GameObject : EventEmitter
       > Component[] Components

Socket : EventEmitter
       > writePacket()
       > address
       > 

Player : GameObject
       > string Username
       > number PlayerID
       > 

// ----------------------------

Packet : Object
      > number Type // Reliable, Unreliable, etc.
      > get function isReliable() {} // returns if packet is reliable

SubPacket : Object
      > number Type
      > virtual function constructor(Any) {}
      > virtual function serialize() {}
      > virtual function parse() {}

ReliablePacket : Packet
      > Any[] subpackets
      > number nonce