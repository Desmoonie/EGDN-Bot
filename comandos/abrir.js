module.exports = {
  name: "abrir",
  description: "Abre el grupo para que todos puedan enviar mensajes (admins)",
  execute: async (client, message) => {
    const groupMetadata = await client.groupMetadata(message.key.remoteJid)
    const sender = message.key.participant
    const isAdmin = groupMetadata.participants.find(p => p.id === sender)?.admin

    if(!isAdmin) return client.sendMessage(message.key.remoteJid, { text: "Solo admins pueden usar este comando." }, { quoted: message })

    await client.groupSettingUpdate(message.key.remoteJid, "not_announcement")
    client.sendMessage(message.key.remoteJid, { text: "Grupo abierto, todos pueden enviar mensajes." })
  }
}

