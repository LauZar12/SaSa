import SasaModel from "../models/singleTableModel.js";
import {v4 as uuidv4} from 'uuid';

export const createSurpriseBox = async (req, res) => {
    try{
        const businessId = req.params.businessId;
        const { Available_Quantity } = req.body;

        if(!Available_Quantity){
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const PK = `surpbox#${uuidv4()}`;
        const GS1_PK = businessId;

        let newSurpriseBox = {
            PK,
            SK: PK,
            GS1_PK,
            Available_Quantity
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
        .attributes(['PK','Available_Quantity'])
        .exec();
        res.status(200).json({message: 'Surprise boxes:', result});
    } catch (error) {
        console.error('Error getting surprise boxes from business', error)
        res.status(500).json({ message: 'Failed to obtain surprise boxes' })
    }
}







