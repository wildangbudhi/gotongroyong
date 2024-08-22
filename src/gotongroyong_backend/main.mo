import HashMap "mo:base/HashMap";
import Array "mo:base/Array";
import Text "mo:base/Text";
import Float "mo:base/Float";
import Int "mo:base/Int";

actor {

  type Report = {
    latitude: Float;
    longitude: Float;
    image: Text;
  };

  stable var reportDatabases: [Report] = [];
  var reportMap: HashMap.HashMap<Text, Int> = HashMap.HashMap<Text, Int>(1, Text.equal, Text.hash);

  public shared (msg) func whoami() : async Principal {
      msg.caller
  };

  public query func greet(name : Text) : async Text {
    return "Hello, " # name # "!";
  };

  public func addReport(lat: Float, long: Float, image: Text) : async Bool {

    let newReport: Report = {
      latitude = lat;
      longitude = long;
      image = image;
    };

    reportDatabases := Array.append(reportDatabases, [newReport]);

    let newLatParent: Int = Float.toInt( lat * 1000 );
    let newLongParent: Int = Float.toInt( long * 1000 );

    let compareKey: Text = Int.toText( newLatParent ) # Int.toText( newLongParent );
    
    let c: ?Int = reportMap.get(compareKey);
    var counter: Int = switch c {
      case null 0;
      case (?Int) Int
    };

    counter += 1;
    reportMap.put(compareKey, counter);

    return true

  };

  public query func getReports() : async [Report] {
    return reportDatabases;
  };

  public query func getCounter( lat: Float, long: Float ) : async Int {
    let newLatParent: Int = Float.toInt( lat * 1000 );
    let newLongParent: Int = Float.toInt( long * 1000 );
    let compareKey: Text = Int.toText( newLatParent ) # Int.toText( newLongParent );
    let counter: ?Int = reportMap.get(compareKey);
    return switch counter {
      case null 0;
      case (?Int) Int
    };
  }

};