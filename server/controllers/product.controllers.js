import SasaModel from "../models/singleTableModel.js";
import {v4 as uuidv4 } from 'uuid';

export const getAllProductsFromBusinessV2 = async (req, res) => {
      try {
        const businessId = req.params.businessId;
        console.log(businessId);
        const result = await SasaModel.query("PK").eq(businessId)
          .filter('GS3_PK').beginsWith('product#')
          .attributes(['Product_Name', 'Product_Description', 'Price', 'Discount', 'ExpirationDate', 'Product_Quantity', 'Available_Quantity'])
          .exec();
    
        console.log(result);
        res.status(200).json(result);
      } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Error fetching products' });
      }
    };
    

  export const getBusinessProducts = async (req, res) => {
  
      try {
        const businessId = req.params.businessId;
        console.log(businessId);
        const result = await SasaModel.query("PK").eq(businessId)
          .filter('GS3_PK').beginsWith('product#')
          .attributes(['Product_Name', 'Product_Description', 'Price', 'Discount', 'ExpirationDate', 'Product_Quantity', 'Available_Quantity'])
          .exec();
    
        console.log(result);
        res.status(200).json(result);
      } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Error fetching products' });
      }
  
  }


  export const createProduct = async (req, res) => {
    try {
      const businessId = req.params.businessId;
      console.log(businessId);
      const { Product_Name, Product_Description, ExpirationDate, Price, Discount } = req.body;

      if (!Product_Name || !Price || !Discount) {
        return res.status(400).json({ message: 'Missing required fields' });
      }

      const GS3_PK = `product#${uuidv4()}`;
      const PK = businessId;

      let newProduct = {
        PK,
        SK: PK,
        GS3_PK,
        Product_Name,
        Price,
        Discount,
      };

      
      newProduct.SK = `${PK}${GS3_PK}`;
      newProduct.Product_Description = Product_Description;
      newProduct.ExpirationDate = ExpirationDate;

      const productModel = new SasaModel(newProduct);
      const result = await productModel.save();

      res.status(201).json({ message: "Product added successfully", product: result })

    } catch(error){
      console.error('Error creating product', error);
      res.status(500).json({ message: "Failed product creation" })
    }
  }

