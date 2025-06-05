module.exports = {
  name: "owner",
  description: "Muestra información del propietario del bot",
  execute: async (client, message) => {
    client.sendMessage(message.key.remoteJid, { text: "Propietario: +51 939 962 568\nWhatsApp: wa.me/51939962568" })
  }
}

