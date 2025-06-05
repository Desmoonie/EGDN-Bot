module.exports = {
  name: "kick",
  description: "Expulsar usuario del grupo (admins)",
  execute: async (client, message) => {
    const groupMetadata = await client.groupMetadata(message.key.remoteJid)
    const sender = message.key.participant
    const isAdmin = groupMetadata.participants.find(p => p.id === sender)?.admin
    if(!isAdmin) return client.sendMessage(message.key.remoteJid, { text: "Solo admins pueden usar este comando." }, { quoted: message })

    let userToKick
    if(message.message.extendedTextMessage && message.message.extendedTextMessage.contextInfo) {
      userToKick = message.message.extendedTextMessage.contextInfo.participant
    } else {
      return client.sendMessage(message.key.remoteJid, { text: "Etiqueta al usuario para expulsar." }, { quoted: message })
    }

    await client.groupParticipantsUpdate(message.key.remoteJid, [userToKick], "remove")
    client.sendMessage(message.key.remoteJid, { text: "Usuario expulsado." })
  }
}

