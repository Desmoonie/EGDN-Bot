// Aquí puedes manejar la bienvenida, por simplicidad, solo mensaje básico
module.exports = {
  name: "welcome",
  description: "Activa o desactiva mensajes de bienvenida (admins)",
  execute: async (client, message) => {
    // Implementar toggle o solo mensaje ejemplo
    client.sendMessage(message.key.remoteJid, { text: "Funcionalidad de bienvenida próximamente." }, { quoted: message })
  }
}

