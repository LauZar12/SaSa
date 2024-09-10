import SasaModel from "../models/singleTableModel.js";


export const getAllBusinesses = async (req, res) =>{  
  try {
        const result = await SasaModel.scan().filter("GS2_PK").beginsWith("user#").attributes(["Business_Name", "Business_City","Business_Address", "Business_Hours"]).exec();
        console.log(result);
        res.status(200).json(result);
  } catch (error) {
        console.error('Error fetching businesses:', error);
        res.status(500).json({ message: 'Error fetching businesses' });
  }
}

export const ola = async (req, res) => {
  const result = "haroooou";
  res.status(200).json(result);
}