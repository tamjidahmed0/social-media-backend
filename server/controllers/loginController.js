import userschema from "../models/user.js";
import profileSchema from "../models/profile.js";
import disableSchema from "../models/disable.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//post request for login
const login = async (req, res) => {
  try {
    //collect data from body
    const { username, email, password } = req.body;

    //find username and email
    const user = await userschema.findOne({
      $or: [{ username: username }, { email: email }],
    });

    if (user) {
      const encPass = await bcrypt.compare(password, user.password);
      if (encPass) {
        const disable = await disableSchema.findOne({
          username: username,
        });

        if (disable) {
          res.status(403).send({ title: disable.Title, text: disable.Text });
        } else {
          const resendtoken = jwt.sign(
            {
              username: username,
            },
            process.env.JWT_SECRET,
            { expiresIn: "1y" }
          );

          const profile = await profileSchema.findOne({ Id: user._id });

          const profilePic = profile ? profile.profilePic : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";

          res.json({ id: user._id, profile: profilePic, name: `${user.name}`, username: user.username, email: user.email, token: resendtoken });
        }
      } else {
        res.status(401).send({ msg: "username or password incorrect" });
      }
    } else {
      console.log("faild");
      res.status(401).send({ msg: "username or password incorrect" });
    }
  } catch (error) {
    res.send(error);
  }
};

export default login;
