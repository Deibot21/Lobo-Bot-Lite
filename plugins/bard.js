import fetch from 'node-fetch'

var handler = async (m, { text,  usedPrefix, command }) => {

if (!text) throw `🔮 _*INGRESE UN TEXTO*_`

try {

//await m.reply(wait)
var apii = await fetch(`https://vihangayt.me/tools/bard?q=${encodeURIComponent(text)}`)
var res = await apii.json()
await m.reply(res.result)

} catch (error) {
console.error(error)
throw '📍 *Ocurrió Un Error*'
}

}
handler.command = ['bard']
handler.help = ['bard']
handler.tags = ['tools']

handler.premium = false

export default handler