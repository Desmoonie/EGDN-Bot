module.exports = {
  name: "ping",
  description: "Responde con pong",
  execute: async (client, message) => {
    await client.sendMessage(message.key.remoteJid, { text: "pong" }, { quoted: message })
  }
}

