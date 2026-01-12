import uploadCloudinary from "../config/cloudinary.js";
import User from "../models/user.model.js";


 export const getCurrentUser=async(req,res)=>{
    try {
       let  userId= req.userId;
       let user = await User.findById(userId).select("-password");
       if(!user){
        return res.status(500).json({message:"user not found"})
       }
       return res.status(201).json(user)
    } catch (error) {
        return res.status(500).json({message:`current user Error ${error}`})
    }
}


// export const editProfile = async (req, res) => {
//   try {
//     console.log("USER ID 👉", req.userId);
//     console.log("REQ.FILE 👉", req.file);

//     const { name } = req.body;
//     let updateData = { name };

//     if (req.file) {
//       const imageUrl = await uploadCloudinary(req.file.path);
//       console.log("CLOUDINARY URL 👉", imageUrl);
//       updateData.image = imageUrl;
//     }

//     const user = await User.findByIdAndUpdate(
//       req.userId,
//       updateData,
//       { new: true }
//     ).select("-password");

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     console.log("FINAL USER 👉", user);
//     return res.status(200).json(user);

//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "Profile update error" });
//   }
// };




export const editProfile = async (req, res) => {
  try {
    console.log("USER ID 👉", req.userId);
    console.log("REQ.FILE 👉", req.file);
    console.log("REQ.BODY 👉", req.body);

    const { name } = req.body;

    let updateData = {};

    // ✅ name → userName mapping
    if (name) {
      updateData.userName = name;
    }

    // ✅ image upload
    if (req.file) {
      const imageUrl = await uploadCloudinary(req.file.path);
      console.log("CLOUDINARY URL 👉", imageUrl);
      updateData.image = imageUrl;
    }

    const user = await User.findByIdAndUpdate(
      req.userId,
      updateData,
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log("FINAL USER 👉", user);
    return res.status(200).json(user);

  } catch (error) {
  console.error(error);
  return res.status(500).json({
    message: `Profile update error ${error}`
  });
}
};


export const getOtherUser= async(req,res)=>{
  try {
    let user= await User.find({
      id:{$ne:req.userId}

    }).select("-password")
    return res.status(200).json(user)
  } catch (error) {
    
    return res.status(500).json({ message: `getOther user error ${error}` });
  }
}

export const search = async (req, res) => {
  try {
    const { query } = req.query; // ✅ FIX

    if (!query) {
      return res.status(400).json({ message: "query is required" });
    }

    const users = await User.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { userName: { $regex: query, $options: "i" } }
      ]
    });

    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({
      message: `search user error ${error.message}`,
    });
  }
};
