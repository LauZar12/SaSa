import SasaModel from "../models/singleTableModel.js";

export const getAllProductsFromBusiness = async (req, res) => {
    try {
        const result = await SasaModel.scan().filter("GS3_PK").beginsWith("product#").attributes(["Product_Name", "Product_Description","Price", "Discount", "ExpirationDate"]).exec();
        console.log(result);
        res.status(200).json(result);
  } catch (error) {
        console.error('Error fetching businesses:', error);
        res.status(500).json({ message: 'Error fetching businesses' });
  }
}
