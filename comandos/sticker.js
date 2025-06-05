module.exports = {
  name: "sticker",
  description: "Convierte imagen a sticker",
  execute: async (client, message) => {
    const { downloadContentFromMessage, generateWAMessageFromContent, proto } = require("@adiwajshing/baileys")
    if(!message.message.imageMessage && !message.message.documentMessage) {
      return client.sendMessage(message.key.remoteJid, { text: "Envía una imagen con el comando" }, { quoted: message })
    }
    const stream = await downloadContentFromMessage(message.message.imageMessage || message.message.documentMessage, "image")
    let buffer = Buffer.from([])
    for await(const chunk of stream) buffer = Buffer.concat([buffer, chunk])

    const sticker = await client.sendMessage(message.key.remoteJid, { sticker: buffer }, { quoted: message })
  }
}

