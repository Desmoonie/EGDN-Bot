module.exports = {
  name: "reglas",
  description: "Mostrar reglas del grupo",
  execute: async (client, message) => {
    const reglas = `
1. Respeto ante todo.
2. No spam ni publicidad.
3. No mensajes ofensivos.
4. Sigue las indicaciones de los admins.
`
    client.sendMessage(message.key.remoteJid, { text: reglas })
  }
}

