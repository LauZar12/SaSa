import dynamoose from "dynamoose";

const SasaSTSchema = new dynamoose.Schema({
  PK: { type: String, hashKey: true },
  SK: { type: String, rangeKey: true },
  User_Name: { type: String },
  Email: { type: String },
  Role: { type: String },
  Address: {
    type: String,
    map: {
      Country: { type: String },
      City: { type: String },
    },
  },
  Business_Name: { type: String },
  Product_Name: { type: String },
  Product_Description: { type: String },
  Price: { type: Number },
  Discount: { type: Number },
  ExpirationDate: { type: String },
  Available_Quantity: { type: Number },
  Product_Quantity: { type: Number },
  GS1_PK: { type: String },
  GS2_PK: { type: String },
  GS3_PK: { type: String },
  Password: { type: String },
});

const SasaSTModel = dynamoose.model('SasaST', SasaSTSchema);

export default SasaSTModel;