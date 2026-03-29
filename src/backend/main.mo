import Time "mo:core/Time";
import Map "mo:core/Map";
import Text "mo:core/Text";
import Order "mo:core/Order";

actor {
  type ContactEntry = {
    timestamp : Time.Time;
    name : Text;
    email : Text;
    phone : Text;
    message : Text;
  };

  type Property = {
    title : Text;
    location : Text;
    price : Nat;
    propertyType : Text;
    description : Text;
    bedrooms : Nat;
    bathrooms : Nat;
    area : Nat;
  };

  module Property {
    public func compare(property1 : Property, property2 : Property) : Order.Order {
      Text.compare(property1.location, property2.location);
    };
  };

  let contactEntries = Map.empty<Time.Time, ContactEntry>();
  let properties = Map.fromIter<Text, Property>([
    (
      "Worli",
      {
        title = "Luxury Apartment in Worli";
        location = "Worli, Mumbai";
        price = 250000000;
        propertyType = "Apartment";
        description = "Spacious 4BHK apartment with sea view in Worli";
        bedrooms = 4;
        bathrooms = 5;
        area = 3500;
      },
    ),
    (
      "Juhu",
      {
        title = "Premium Villa in Juhu";
        location = "Juhu, Mumbai";
        price = 450000000;
        propertyType = "Villa";
        description = "Luxurious villa with private pool in Juhu";
        bedrooms = 5;
        bathrooms = 6;
        area = 7000;
      },
    ),
    (
      "Bandra",
      {
        title = "Modern Apartment in Bandra";
        location = "Bandra, Mumbai";
        price = 180000000;
        propertyType = "Apartment";
        description = "3BHK apartment with modern amenities in Bandra";
        bedrooms = 3;
        bathrooms = 4;
        area = 2200;
      },
    ),
    (
      "Colaba",
      {
        title = "Exclusive Penthouse in Colaba";
        location = "Colaba, Mumbai";
        price = 300000000;
        propertyType = "Penthouse";
        description = "Penthouse with panoramic views of Mumbai skyline";
        bedrooms = 4;
        bathrooms = 5;
        area = 4000;
      },
    ),
  ].values());

  public shared ({ caller }) func submitContactForm(name : Text, email : Text, phone : Text, message : Text) : async () {
    let timestamp = Time.now();
    let entry : ContactEntry = {
      timestamp;
      name;
      email;
      phone;
      message;
    };
    contactEntries.add(timestamp, entry);
  };

  public query ({ caller }) func getAllContactEntries() : async [ContactEntry] {
    contactEntries.values().toArray();
  };

  public shared ({ caller }) func addProperty(property : Property) : async () {
    properties.add(property.location, property);
  };

  public query ({ caller }) func getAllProperties() : async [Property] {
    properties.values().toArray().sort();
  };

  public query ({ caller }) func getProperty(location : Text) : async ?Property {
    properties.get(location);
  };
};
