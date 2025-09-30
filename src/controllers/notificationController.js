const { Expo } = require("expo-server-sdk");
const expo = new Expo();
const { notificationModel } = require("../models/notificationSchema");

const saveToken = async (req, res) => {
  const { token } = req.body;
  try {
    if (Expo.isExpoPushToken(token)) {
      const savedToken = await notificationModel.create({
        token,
      });
      console.info("This is the expo push token:", savedToken);
      return res.status(200).json({
        success: true,
        message: "Token sent and saved successfully",
      });
    }

    return res.status(400).json({
      success: false,
      message: "Invalid token",
    });
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message, err.cause);
      return res.status(500).json({
        success: false,
        error: true,
        message: err.message,
        reason: err.cause,
      });
    }
  }
};

const sendNotification = async (req, res) => {
    const { title, body } = req.body
    try {
        const tokens = await notificationModel.find()
        const validTokens = tokens.map(t => t.token).filter(token => Expo.isExpoPushToken(token))

        if(validTokens.length === 0) {
            console.log("No token found!")
        }

        const messages = validTokens.map(pushToken => ({
            to: pushToken,
            sound: "default",
            title,
            body,
            data: {withSome: "data"}
        }))

        //send notifications

        const chunks = expo.chunkPushNotifications(messages)
        const tickets = []

        for (const chunk of chunks) {
            const ticketChunk = await expo.sendPushNotificationsAsync(chunk)
            tickets.push(...ticketChunk)
        }

        res.status(200).json({
            tickets,
            success: true,
            message: "Notification sent successfully"
        })

    } catch (err) {
        if(err instanceof Error) {
            return res.status(500).json({
                error: true,
                reason: err.cause,
                message: err.message
            })
        }
    }
}

module.exports = { saveToken, sendNotification }