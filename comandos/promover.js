module.exports = {
  name: "promover",
  description: "Dar admin a usuario (admins)",
  execute: async (client, message) => {
    const groupMetadata = await client.groupMetadata(message.key.remoteJid)
    const sender = message.key.participant
    const isAdmin = groupMetadata.participants.find(p => p.id === sender)?.admin
    if(!isAdmin) return client.sendMessage(message.key.remoteJid, { text: "Solo admins pueden usar este comando." }, { quoted: message })

    let userToPromote
    if(message.message.extendedTextMessage && message.message.extendedTextMessage.contextInfo) {
      userToPromote = message.message.extendedTextMessage.contextInfo.participant
    } else {
      return client.sendMessage(message.key.remoteJid, { text: "Etiqueta al usuario para promover." }, { quoted: message })
    }

    await client.groupParticipantsUpdate(message.key.remoteJid, [userToPromote], "promote")
    client.sendMessage(message.key.remoteJid, { text: "Usuario promovido a admin." })
  }
}

