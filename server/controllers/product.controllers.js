import SasaModel from "../models/singleTableModel.js";

export const getAllProductsFromBusiness = async (req, res) => {
    try {
        const result = await SasaModel.scan().filter("GS3_PK").beginsWith("product#").attributes(["SK","GS3_PK","Product_Name", "Product_Description","Price", "Discount", "ExpirationDate", "Product_Quantity", "Available_Quantity"]).exec();
        console.log(result);
        res.status(200).json(result);
  } catch (error) {
        console.error('Error fetching businesses:', error);
        res.status(500).json({ message: 'Error fetching businesses' });
  }
}



export const getAllProductsFromBusinessV2 = async (req, res) => {
      try {
        const businessId = req.params.businessId; // Assuming you're passing the business ID as a URL parameter
        const result = await SasaModel.scan()
          .filter('GS1_PK', businessId)
          .filter('GS3_PK', 'begins_with', 'product#')
          .attributes(['SK', 'GS3_PK', 'Product_Name', 'Product_Description', 'Price', 'Discount', 'ExpirationDate', 'Product_Quantity', 'Available_Quantity'])
          .exec();
    
        console.log(result);
        res.status(200).json(result);
      } catch (error) {
        console.error('Error fetching businesses:', error);
        res.status(500).json({ message: 'Error fetching businesses' });
      }
    };
