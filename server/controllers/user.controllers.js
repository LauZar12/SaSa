import { v4 as uuidv4 } from 'uuid';
import SasaModel from "../models/singleTableModel.js";

export const getAllUsers = async (req, res) =>{  
  try {
        const result = await SasaModel.scan().filter("PK").beginsWith("user#").filter("GS1_PK").beginsWith("business#").attributes(["User_Name", "Email", "Password", "Role", "Business_Name"]).exec();
        console.log(result);
        res.status(200).json(result);
  } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Error fetching users' });
  }
}

export const addUser = async (req, res) => {
    try {
      const { User_Name, Email, Password, Role, Business_Name, Business_City, Business_Address, Business_Hours, Business_Type, Business_Localization} = req.body;
  
      // Check if all required fields are provided
      if (!User_Name || !Email || !Password || !Role) {
        return res.status(400).json({ message: 'Missing required fields' });
      }
  
      // Generate PK based on the user email
      const PK = `user#${uuidv4()}`;
  
      // Base user object
      let newUser = {
        PK,
        SK: PK,
        User_Name,
        Email,
        Password,
        Role,
      };
  
      // If the user is an admin, add business-related fields
      if (Role === "admin") {
        if (!Business_Name) {
          return res.status(400).json({ message: 'Business_Name is required for admin users' });
        }
  
        const businessID = uuidv4();

        newUser.Business_Name = Business_Name;
        newUser.Busin
        newUser.GS1_PK = `business#${businessID}`;
        newUser.SK = `${PK}business#${businessID}`;
        newUser.Business_City = Business_City;
        newUser.Business_Address = Business_Address;
        newUser.Business_Hours = Business_Hours;
        newUser.Business_Type = Business_Type;
        newUser.Business_Localization = Business_Localization;
      }
  
      // Save the user to DynamoDB using Dynamoose
      const userModel = new SasaModel(newUser);
      const result = await userModel.save();
  
      res.status(201).json({ message: 'User added successfully', user: result });
    } catch (error) {
      console.error('Error adding user:', error);
      res.status(500).json({ message: 'Error adding user' });
    }
  };