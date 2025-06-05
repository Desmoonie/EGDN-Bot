const { default: makeWASocket, useSingleFileAuthState, DisconnectReason } = require("@adiwajshing/baileys")
const { useSingleFileAuthState, DisconnectReason, makeWASocket } = require("@adiwajshing/baileys");
const { state, saveState } = useSingleFileAuthState("./session/auth_info.json");
const qrcode = require("qrcode-terminal")
const fs = require("fs")
const path = require("path")
const { prefix, ownerNumber } = require("./config")
const { isAdmin } = require("./utils")

const client = makeWASocket({
  auth: state,
  printQRInTerminal: true
})

client.ev.on("connection.update", (update) => {
  const { connection, lastDisconnect, qr } = update
  if(qr) qrcode.generate(qr, { small: true })
  if(connection === "close") {
    if((lastDisconnect.error)?.output?.statusCode !== DisconnectReason.loggedOut) {
      startBot()
    } else {
      console.log("Conexión cerrada. Sesión eliminada.")
    }
  }
  if(connection === "open") {
    console.log("Conectado correctamente")
  }
})

client.ev.on("creds.update", saveState)

const comandos = new Map()

// Cargar comandos
const comandosPath = path.join(__dirname, "comandos")
fs.readdirSync(comandosPath).forEach(file => {
  if(file.endsWith(".js")) {
    const command = require(path.join(comandosPath, file))
    comandos.set(command.name, command)
  }
})

client.ev.on("messages.upsert", async ({ messages }) => {
  const msg = messages[0]
  if(!msg.message || msg.key.fromMe) return

  const from = msg.key.remoteJid
  const sender = msg.key.participant || msg.key.remoteJid

  const messageContent = msg.message.conversation || msg.message.extendedTextMessage?.text
  if(!messageContent?.startsWith(prefix)) return

  const args = messageContent.slice(prefix.length).trim().split(/ +/)
  const commandName = args.shift().toLowerCase()

  if(!comandos.has(commandName)) return

  try {
    await comandos.get(commandName).execute(client, msg)
  } catch(e) {
    console.error(e)
  }
})

function startBot() {
  console.log("Iniciando bot...")
}

startBot()

