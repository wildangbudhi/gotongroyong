actor {
  public shared (msg) func whoami() : async Principal {
      msg.caller
  };
  public query func greet(name : Text) : async Text {
    return "Hello, " # name # "!";
  };
};