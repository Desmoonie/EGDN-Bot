module.exports = {
  name: "estado",
  description: "Muestra si el bot está activo",
  execute: async (client, message) => {
    client.sendMessage(message.key.remoteJid, { text: "🤖 Edgnbot está activo y funcionando." })
  }
}

