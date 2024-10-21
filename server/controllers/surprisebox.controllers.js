import SasaModel from "../models/singleTableModel.js";
import {v4 as uuidv4} from 'uuid';

export const createSurpriseBox = async (req, res) => {
    try{
        const businessId = req.params.businessId;
        const { Available_Quantity, Price, Product_Name } = req.body;

        if(!Available_Quantity && !Price && !Product_Name){
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const PK = `surpbox#${uuidv4()}`;
        const GS1_PK = businessId;

        let newSurpriseBox = {
            PK,
            SK: PK,
            GS1_PK,
            Available_Quantity,
            Price,
            Product_Name
        };

        newSurpriseBox.SK = `${PK}${GS1_PK}`;
        
        const surpriseBoxModel = new SasaModel(newSurpriseBox);
        const result = await surpriseBoxModel.save();

        res.status(201).json({ message: "Surprise Box added successfully", surpriseBox: result })
    } catch (error){
        console.error('Error creating surprise box', error);
        res.status(500).jon({ message: 'Failed surprise box creation' })
    }
}



export const getAllSurpriseBoxesFromBusiness = async (req, res) => {
    try{
        const businessId = req.params.businessId;
        const result = await SasaModel.scan().filter("GS1_PK").eq(businessId)
        .filter("PK").beginsWith("surpbox#")
        .attributes(['PK','Available_Quantity', 'Price', 'Product_Name'])
        .exec();
        res.status(200).json({message: 'Surprise boxes:', result});
    } catch (error) {
        console.error('Error getting surprise boxes from business', error)
        res.status(500).json({ message: 'Failed to obtain surprise boxes' })
    }
}


export const editSurpriseBox = async (req, res) => {
    try{
        const businessId = req.params.businessId;
        const surpboxId = req.params.surpboxId;

        const { Available_Quantity, Price, Product_Name } = req.body;

        if(!Available_Quantity && !Price && !Product_Name){
            return res.status(400).json({ message: "No hay campos para actualizar" })
        }

        const updateData = {};
        if (Available_Quantity) updateData.Available_Quantity = Available_Quantity;
        if (Price) updateData.Price = Price;
        if (Product_Name) updateData.Product_Name = Product_Name;

        const PK = surpboxId;
        const SK = `${surpboxId}${businessId}`
        
        const updatedSurpbox = await SasaModel.update({ PK, SK }, updateData);

        res.status(200).json({ message: 'Surprise Box updated successfully!', surpbox: updatedSurpbox });
    } catch (error){
        console.error("Error updating surprise box", error);
        res.status(500).json({ message: 'Failed surprise box update' });
    }
}


export const deleteSurpriseBox = async (req, res) => {
    try{
        const businessId = req.params.businessId;
        const surpboxId = req.params.surpboxId;

        if(!businessId || !surpboxId) {
            return res.status(400).json({ message: 'Missing required parameters for deletion' })
        }

        const PK = surpboxId
        const SK = `${surpboxId}${businessId}`
        
        await SasaModel.delete({ PK, SK });

        res.status(200).json({ message: "Surpise Box deleted successfully!!" })
    } catch (error) {
        console.error("Error deleting surprise box", error);
        res.status(500).json({ message: "Failed to delete the surprise box" });
    }
}