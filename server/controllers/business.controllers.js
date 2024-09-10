import SasaModel from "../models/singleTableModel.js";


export const getAllBusinesses = async (req, res) =>{  
  try {
        const result = await SasaModel.scan().filter("GS2_PK").beginsWith("user#").attributes(["Business_Name", "Business_City","Business_Address", "Business_Hours", "Business_Type", "Business_Localization"]).exec();
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


export const getBusinessInfo = async (req, res) => {
    try{
      const businessId = req.params.businessId;
      const result = await SasaModel.query("PK").eq(businessId)
      .filter('GS2_PK').beginsWith('user#')
      .attributes(['Business_Name', 'Business_Address', 'Business_City', 'Business_Country', 'Business_Localization', 'Business_Hours'])
      .exec();
      res.status(200).json(result);
    } catch(error){
      console.error('Error fetching business info', error);
      res.status(500).json({ message: 'Error fetching biz info' });
    }

}

