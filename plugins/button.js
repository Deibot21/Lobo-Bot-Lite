let foto = imagen4
let handler = async (m, { conn, command }) => {
let user = db.data.users[m.sender]
let multi = `🌳 Es Mi Creador ⚡️`
await conn.sendButton(m.chat, multi, `🌼 ¡Hello! ` + nombre, foto, [
['☄️ Comoleto Menú', '!allmenu'],
['💚 LoboBot', '!sc'],
['⌨️ Creador', '#owner'],
['🛑 Hola Bot', '!bot Hey Wue Mas']], m)}
handler.customPrefix = /Ender|ender/i;
handler.command = new RegExp;
export default handler;