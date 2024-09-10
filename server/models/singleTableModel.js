import dynamoose from "dynamoose";

const SasaSchema = new dynamoose.Schema({
  "PK": String,
  "SK":
  {
    "type": String,
    "rangeKey": true,
  },
  "User_Name": String,
  "Email": String,
  "Role": String,
  "Business_Name": String,
  "Product_Name": String,
  "Product_Description": String,
  "Price": Number,
  "Discount": Number,
  "ExpirationDate":String,
  "Available_Quantity":Number,
  "Product_Quantity":Number,
  "GS1_PK":String,
  "GS2_PK":String,
  "GS3_PK":String,
  "Password": String,
  "Business_City": String,
  "Business_Address": String,
  "Business_Hours": String
})

const SasaModel = dynamoose.model('SasaST', SasaSchema, {
  "create": true,
  "throughput": {
    "read": 1,
    "write": 1,
  },
  "initialize": true
});

// console.log(SasaSchema.rangeKey);
// console.log(SasaSchema.hashKey);
// console.log(SasaModel.name);

export default SasaModel;


