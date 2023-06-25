import conversationSchema from "../models/conversation.js";
import profileSchema from "../models/profile.js";
import moment from "moment";

const conversations = async (req, res) => {
  const userId = req.params.userId;

  try {
    //find conversation in conversationSchema
    const conversation = await conversationSchema.find({
      conversationFor: userId,
    });

    //store data in array
    let names = [];

    await Promise.all(
      conversation.map(async (item) => {
        const createdAt = moment(item.date);
        const now = moment();
        const duration = moment.duration(now.diff(createdAt));

        const years = duration.years();
        const months = duration.months();
        const days = duration.days();

        const date = moment(item.date);
        const getFormattedDate = (date) => {
          if (Math.abs(years)) {
            return `${date.format("MMM DD YYYY")}`;
          } else if (Math.abs(months)) {
            return `${date.format("MMM DD")}`;
          } else if (days) {
            return `${date.format("ddd")}`;
          } else {
            return date.format("hh:mm A");
          }
        };

        let profiles;

        if (item.members[0] === userId) {
          profiles = await profileSchema.findOne({
            Id: item.members[1],
          });
        }

        if (item.members[1] === userId) {
          profiles = await profileSchema.findOne({
            Id: item.members[0],
          });
        }

        // console.log(profiles.profilePic, 'come from profile')

        const profilePic = profiles ? profiles.profilePic : "";
        // console.log(profiless)

        names.push({
          profile: profilePic,
          name: item.receiverName,
          Id: item.members[1],
          convText: item.text,
          date: getFormattedDate(date),
        });
      })
    );

    console.log(names);
    res.status(200).send(names);
  } catch (error) {
    res.status(500).json(error);
  }
};

export default conversations;
