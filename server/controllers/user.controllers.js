import { v4 as uuidv4 } from 'uuid';
import SasaModel from "../models/singleTableModel.js";

export const getAllUsers = async (req, res) => {
  try {
    const result = await SasaModel.scan().filter("PK").beginsWith("user#").filter("GS1_PK").beginsWith("business#").attributes(["User_Name", "Email", "Password", "Role", "Business_Name"]).exec();
    console.log(result);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Error fetching users' });
  }
};

export const getUserForLogin = async (req, res) => {
  const { Email, Password } = req.body;

  try {
    const result = await SasaModel.scan()
      .filter("Email").eq(Email)
      .filter("Password").eq(Password)
      .exec();

    if (result.length > 0) {
      // If a match is found
      res.status(200).json(result[0]);
    } else {
      res.status(404).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ message: 'Error logging in user' });
  }
};

export const addUser = async (req, res) => {
  try {
    const { User_Name, Email, Password, Role, Business_Name, Business_City, Business_Address, Business_Hours, Business_Type, Business_Localization, Business_Logo_Url } = req.body;

    // Check if all required fields are provided
    if (!User_Name || !Email || !Password || !Role) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

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
      let newBusiness = {
        PK: `business#${businessID}`,
        SK: `business#${businessID}${PK}`
      };

      newUser.GS1_PK = `business#${businessID}`;
      newUser.SK = `${PK}business#${businessID}`;

      newBusiness.GS2_PK = PK;
      newBusiness.Business_Name = Business_Name;
      newBusiness.Business_City = Business_City;
      newBusiness.Business_Address = Business_Address;
      newBusiness.Business_Hours = Business_Hours;
      newBusiness.Business_Type = Business_Type;
      newBusiness.Business_Localization = Business_Localization;
      newBusiness.Business_Logo_Url = Business_Logo_Url;

      const businessModel = new SasaModel(newBusiness);
      const businessResult = await businessModel.save();
      const userModel = new SasaModel(newUser);
      const userResult = await userModel.save();

      res.status(201).json({ message: 'User / Business added successfully', user: userResult, business: businessResult });

      return;
    }

    // Save the user to DynamoDB using Dynamoose
    const userModel = new SasaModel(newUser);
    const userResult = await userModel.save();
    res.status(201).json({ message: 'User added successfully', user: userResult });
  } catch (error) {
    console.error('Error adding user:', error);
    res.status(500).json({ message: 'Error adding user' });
  }
};