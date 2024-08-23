import HashMap "mo:base/HashMap";
import Array "mo:base/Array";
import Text "mo:base/Text";
import Float "mo:base/Float";
import Int "mo:base/Int";
import Nat32 "mo:base/Nat32";
import List "mo:base/List";
import Ledger "canister:icrc1_ledger";
import Result "mo:base/Result";
import Debug "mo:base/Debug";
import Error "mo:base/Error";
import Principal "mo:base/Principal";

actor {

  type Account = {
    owner : Principal;
    subaccount : ?Blob;
  };

  type TransferArgs = {
    amount : Nat;
    toAccount : Account;
  };

  public shared ({ caller }) func transfer(args : TransferArgs) : async Result.Result<Ledger.BlockIndex, Text> {
    Debug.print(
      "Transferring "
      # debug_show (args.amount)
      # " tokens to account"
      # debug_show (args.toAccount)
    );

    let transferArgs : Ledger.TransferArg = {
      // can be used to distinguish between transactions
      memo = null;
      // the amount we want to transfer
      amount = args.amount;
      // we want to transfer tokens from the default subaccount of the canister
      from_subaccount = null;
      // if not specified, the default fee for the canister is used
      fee = null;
      // we take the principal and subaccount from the arguments and convert them into an account identifier
      to = args.toAccount;
      // a timestamp indicating when the transaction was created by the caller; if it is not specified by the caller then this is set to the current ICP time
      created_at_time = null;
    };

    try {
      // initiate the transfer
      let transferResult = await Ledger.icrc1_transfer(transferArgs);

      // check if the transfer was successfull
      switch (transferResult) {
        case (#Err(transferError)) {
          return #err("Couldn't transfer funds:\n" # debug_show (transferError));
        };
        case (#Ok(blockIndex)) { return #ok blockIndex };
      };
    } catch (error : Error) {
      // catch any errors that might occur during the transfer
      return #err("Reject message: " # Error.message(error));
    };
  };

  public shared (msg) func whoami() : async Principal {
      msg.caller
  };

  type Report = {
    latitude: Float;
    longitude: Float;
    image: Text;
  };

  func hashIntPair(pair: ( Int, Int )) : Nat32 {
    let (f1, f2) = pair;
    let hash = ( f1 * 1000 ) + f2;
    let hashResult = Nat32.fromIntWrap(hash);
    return hashResult;
  };

  func compareIntPair(pair1: ( Int, Int ), pair2: ( Int, Int )) : Bool {
    let (f1_1, f1_2) = pair1;
    let (f2_1, f2_2) = pair2;
    return f1_1 == f2_1 and f1_2 == f2_2;
  };

  var reportDatabases: List.List<Report> = List.fromArray([]);
  var reportMap: HashMap.HashMap<(Int, Int), Int> = HashMap.HashMap<(Int, Int), Int>(0, compareIntPair, hashIntPair);
  var cleaningConfirmationDatabases: List.List<Report> = List.fromArray([]);

  public shared (msg) func addReport(lat: Float, long: Float, image: Text) : async Bool {

    Debug.print( Principal.toText( msg.caller ) );

    let newReport: Report = {
      latitude = lat;
      longitude = long;
      image = image;
    };

    reportDatabases := List.push<Report>(newReport, reportDatabases);

    let compareKey: (Int, Int) = ( Float.toInt( lat * 1000 ), Float.toInt( long * 1000 ) );
    
    let c: ?Int = reportMap.get(compareKey);
    var counter: Int = switch c {
      case null 0;
      case (?Int) Int
    };

    counter += 1;
    reportMap.put(compareKey, counter);

    let tfAcc: Account = {
      owner = msg.caller;
      subaccount = null;
    };

    let tfArgs: TransferArgs = {
      amount = 1;
      toAccount = tfAcc;
    };

    let _ = transfer( tfArgs );

    return true

  };

  public query func getReports() : async [Report] {
    return List.toArray<Report>(reportDatabases);
  };

  type MapsReport = {
    lat: Float;
    long: Float;
    labelCount: Int;
  };

  public query func getReportMaps() : async [MapsReport] {

    var mapReports: [MapsReport] = [];

    for ((key, value) in reportMap.entries()) {
      let (latInt, longInt) = key;
      let lat = Float.fromInt( latInt ) / 1000.0;
      let long = Float.fromInt( longInt ) / 1000.0;

      let rep: MapsReport = {
        lat = lat;
        long = long;
        labelCount = value;
      };

      mapReports := Array.append( mapReports, [rep] );
      
    };

    return mapReports;

  };

  public query func getCounter( lat: Float, long: Float ) : async Int {
    let compareKey: (Int, Int) = ( Float.toInt( lat * 1000 ), Float.toInt( long * 1000 ) );
    let counter: ?Int = reportMap.get(compareKey);
    return switch counter {
      case null 0;
      case (?Int) Int
    };
  };

  public shared (msg) func confirmCleaning(lat: Float, long: Float, image: Text) : async Bool {

    let newConfirmation: Report = {
      latitude = lat;
      longitude = long;
      image = image;
    };

    cleaningConfirmationDatabases := List.push<Report>(newConfirmation, cleaningConfirmationDatabases);

    let compareKey: (Int, Int) = ( Float.toInt( lat * 1000 ), Float.toInt( long * 1000 ) );
    reportMap.delete(compareKey);

    reportDatabases := List.filter<Report>( 
      reportDatabases,
      func item { 
        Float.toInt( item.latitude * 1000 ) != Float.toInt( lat * 1000 ) 
        and Float.toInt( item.longitude * 1000 ) != Float.toInt( long * 1000 )
      }
    );

    let tfAcc: Account = {
      owner = msg.caller;
      subaccount = null;
    };

    let tfArgs: TransferArgs = {
      amount = 10;
      toAccount = tfAcc;
    };

    let _ = transfer( tfArgs );

    return true

  };

};