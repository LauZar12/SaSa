import SasaModel from "../models/singleTableModel.js";


export const getAllBusinesses = async (req, res) =>{  
  try {
        const result = await SasaModel.scan().filter("GS2_PK").beginsWith("user#").attributes(["Business_Name", "Business_City","Business_Address", "Business_Hours", "Business_Type", "Business_Localization", "Business_Logo_Url", "PK"]).exec();
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


export const editBusinessInfo = async (req, res) => {
  try {
    const businessId = req.params.businessId;

    if (!req.cookies.user) {
      return res.status(400).json({ message: 'Usuario no autenticado' });
    }
    
    const user = JSON.parse(req.cookies.user);
    const userId = user.PK;

    const { Business_Name, Business_Address, Business_City, Business_Hours, Business_Localization } = req.body;

    if (!Business_Name && !Business_Address && !Business_City && !Business_Hours && !Business_Localization) {
      return res.status(400).json({ message: 'No hay campos para actualizar' });
    }

    const updateData = {};
    if (Business_Name) updateData.Business_Name = Business_Name;
    if (Business_Address) updateData.Business_Address = Business_Address;
    if (Business_City) updateData.Business_City = Business_City;
    if (Business_Hours) updateData.Business_Hours = Business_Hours;
    if (Business_Localization) updateData.Business_Localization = Business_Localization;

    const PK = `${businessId}`;
    const SK = `${businessId}${userId}`;

    const updatedBusiness = await SasaModel.update({ PK, SK }, updateData);

    res.status(200).json({ message: 'Negocio editado correctamente', business: updatedBusiness });
  } catch (error) {
    console.error('Error actualizando el negocio:', error);
    res.status(500).json({ message: 'No se pudo actualizar la info del negocio' });
  }
};

