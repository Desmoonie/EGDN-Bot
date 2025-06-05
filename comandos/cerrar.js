module.exports = {
  name: "cerrar",
  description: "Cierra el grupo para que solo admins puedan enviar mensajes (admins)",
  execute: async (client, message) => {
    const groupMetadata = await client.groupMetadata(message.key.remoteJid)
    const sender = message.key.participant
    const isAdmin = groupMetadata.participants.find(p => p.id === sender)?.admin

    if(!isAdmin) return client.sendMessage(message.key.remoteJid, { text: "Solo admins pueden usar este comando." }, { quoted: message })

    await client.groupSettingUpdate(message.key.remoteJid, "announcement")
    client.sendMessage(message.key.remoteJid, { text: "Grupo cerrado, solo admins pueden enviar mensajes." })
  }
}

