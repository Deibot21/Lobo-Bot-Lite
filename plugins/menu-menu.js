import { promises } from 'fs'
import { join } from 'path'
import fetch from 'node-fetch'
import { xpRange } from '../lib/levelling.js'

  let tags = {
  'main': '𝙄𝙉𝙁𝙊',
  'search': '𝘽𝙐𝙎𝙌𝙐𝙀𝘿𝘼𝙎',
  'jadibot': '𝙎𝙐𝘽𝘽𝙊𝙏𝙎',
  'rpg': '𝙀𝘾𝙊𝙉𝙊𝙈𝙄𝘼',
 // 'rg': '𝙍𝙀𝙂𝙄𝙎𝙏𝙍𝙊',
  'sticker': '𝙎𝙏𝙄𝘾𝙆𝙀𝙍',
  'xp': '𝙀𝙓𝙋',
 // 'calculator': '𝘾𝘼𝙇𝘾𝙐𝙇𝘼𝙏𝙊𝙍',
 // 'fix': 'Fɪx',
  'group': '𝙂𝙍𝙐𝙋𝙊𝙎',
 // 'buscadores': '𝘽𝙐𝙎𝘾𝘼𝘿𝙊𝙍𝙀𝙎',
  'database': '𝘿𝘼𝙏𝘼𝘽𝘼𝙎𝙀',
  'internet': '𝙄𝙉𝙏𝙀𝙍𝙉𝙀𝙏', 
 // 'stalk': 'Sᴛᴀʟᴋ',
  'premium': '𝙋𝙍𝙀𝙈𝙄𝙐𝙈',
  'frases': '𝙁𝙍𝘼𝙎𝙀𝙎',
  'downloader': '𝘿𝙀𝙎𝘾𝘼𝙍𝙂𝘼𝙎',
  'tools': '𝙃𝙀𝙍𝙍𝘼𝙈𝙄𝙀𝙉𝙏𝘼𝙎',
  'fun': '𝘿𝙄𝙑𝙀𝙍𝙎𝙄𝙊𝙉𝙀𝙎',
  'nsfw': '𝙉𝙎𝙁𝙒', 
 // 'image': 'Iᴍᴀɢᴇ',
  'random': '𝙍𝘼𝙉𝘿𝙊𝙈',
  'anime': '𝘼𝙉𝙄𝙈𝙀𝙎',
  'advanced': '𝘼𝙑𝘼𝙉𝘾𝙀𝘿',
  'owner': '𝙊𝙒𝙉𝙀𝙍', 
  'audio': '𝙀𝙁𝙀𝘾𝙏𝙊 - 𝘼𝙐𝘿𝙄𝙊', 
 // 'info': '𝙃',
 // 'ai': 'Aɪ',
 // 'adm': 'Aᴅᴍɪɴ',
 // 'General': 'Gᴇɴᴇʀᴀʟ',
 // 'maker': 'Mᴀᴋᴇʀ',
  'transformador': '𝘾𝙊𝙉𝙑𝙀𝙍𝙏𝙄𝘿𝙊𝙍𝙀𝙎',
}

const defaultMenu = {
  before: `

┏━━━━━━━━━━━━━━━━┓
┃ ⏤͟͟͞𝙄𝙉𝙁𝙊 𝘽𝙊𝙏
┗━━━━━━━━━━━━━━
┣🚩 *Vᴇʀɪғɪᴄᴀᴅᴏs* : %totalreg
┣🚩 *Rᴜɴᴛɪᴍᴇ* : %muptime
┣🚩 *Aᴜᴛᴏʀ* : %author
┗━━━━━━━━━━━━━━━━┛
 
┏━━━━━━━━━━━━━━━━┓
┃ ⏤͟͟͞𝙄𝙉𝙁𝙊 𝙐𝙎𝙀𝙍
┗━━━━━━━━━━━━━━
┣📚 *Nᴏᴍʙʀᴇ* : %name
┣📚 *Exᴘ* : %totalexp
┣📚 *Cᴏɪɴs* : %limit
┣📚 *Nɪᴠᴇʟ* : %level 
┗━━━━━━━━━━━━━━━━┛
%readmore
┏━━━━━━━━━━━━━━━━┓
┃ ⏤͟͟͞𝙄𝙉𝙁𝙊
┗━━━━━━━━━━━━━━
┣🐢 *.owner*
┣🐢 *.grupos*
┣🐢 *.info*
┣🐢 *.menu*
┣🐢 *.ping*
┣🐢 *.contactos*
┣🐢 *.blocklist*
┗━━━━━━━━━━━━━━━━┛

         *乂 ⺀ ʟɪꜱᴛᴀ - ᴄᴏᴍᴀɴᴅᴏꜱ ⺀ 乂*
`.trimStart(),
  header: '┏━━━━━━━━━━━━━━━━┓\n┃\t\t ⏤͟͟͞「 %category 」 \n┗━━━━━━━━━━━━━━',
  body: '┣🪐 *%cmd*\n',
  footer: '┗━━━━━━━━━━━━━━━━┛\n',
  after: 'Bot - Ender',
}

let handler = async (m, { conn, usedPrefix: _p, __dirname }) => {
  try {
    let _package = JSON.parse(await promises.readFile(join(__dirname, '../package.json')).catch(_ => ({}))) || {}
    let { exp, limit, level } = global.db.data.users[m.sender]
    let { min, xp, max } = xpRange(level, global.multiplier)
    let name = await conn.getName(m.sender)
    let d = new Date(new Date + 3600000)
    let locale = 'es'
    // d.getTimeZoneOffset()
    // Offset -420 is 18.00
    // Offset    0 is  0.00
    // Offset  420 is  7.00
    let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
    let dateIslamic = Intl.DateTimeFormat(locale + '-TN-u-ca-islamic', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(d)
    let time = d.toLocaleTimeString(locale, {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    })
    let _uptime = process.uptime() * 1000
    let _muptime
    if (process.send) {
      process.send('uptime')
      _muptime = await new Promise(resolve => {
        process.once('message', resolve)
        setTimeout(resolve, 1000)
      }) * 1000
    }
    let muptime = clockString(_muptime)
    let uptime = clockString(_uptime)
    let totalreg = Object.keys(global.db.data.users).length
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
    let help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => {
      return {
        help: Array.isArray(plugin.tags) ? plugin.help : [plugin.help],
        tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
        prefix: 'customPrefix' in plugin,
        limit: plugin.limit,
        premium: plugin.premium,
        enabled: !plugin.disabled,
      }
    })
    for (let plugin of help)
      if (plugin && 'tags' in plugin)
        for (let tag of plugin.tags)
          if (!(tag in tags) && tag) tags[tag] = tag
    conn.menu = conn.menu ? conn.menu : {}
    let before = conn.menu.before || defaultMenu.before
    let header = conn.menu.header || defaultMenu.header
    let body = conn.menu.body || defaultMenu.body
    let footer = conn.menu.footer || defaultMenu.footer
    let after = conn.menu.after || (conn.user.jid == global.conn.user.jid ? '' : ``) + defaultMenu.after
    let _text = [
      before,
      ...Object.keys(tags).map(tag => {
        return header.replace(/%category/g, tags[tag]) + '\n' + [
          ...help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help).map(menu => {
            return menu.help.map(help => {
              return body.replace(/%cmd/g, menu.prefix ? help : '%p' + help)
                .replace(/%islimit/g, menu.limit ? '' : '')
                .replace(/%isPremium/g, menu.premium ? '' : '')
                .trim()
            }).join('\n')
          }),
          footer
        ].join('\n')
      }),
      after
    ].join('\n')
    let text = typeof conn.menu == 'string' ? conn.menu : typeof conn.menu == 'object' ? _text : ''
    let replace = {
      '%': '%',
      p: _p, uptime, muptime,
      taguser: '@' + m.sender.split("@s.whatsapp.net")[0],
      wasp: '@0',
      me: conn.getName(conn.user.jid),
      npmname: _package.name,
      version: _package.version,
      npmdesc: _package.description,
      npmmain: _package.main,
      author: _package.author.name,
      license: _package.license,
      exp: exp - min,
      maxexp: xp,
      totalexp: exp,
      xp4levelup: max - exp,
      github: _package.homepage ? _package.homepage.url || _package.homepage : '[unknown github url]',
      greeting, level, limit, name, weton, week, date, dateIslamic, time, totalreg, rtotalreg,
      readmore: readMore
    }
    text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])


   let pp1 = '
https://telegra.ph/file/80da0f799ae6f2ef480ca.mp4'
    let pp2 = 'https://telegra.ph/file/80da0f799ae6f2ef480ca.mp4'

    //let img = await (await fetch('https://tinyurl.com/2y223gks')).buffer()  

await conn.reply(m.chat, '*Cargando El Menu 🚩*', m, { contextInfo:{ forwardingScore: 2022, isForwarded: true, externalAdReply: {title: '👋 Hola!!', body: saludo, sourceUrl: global.md, thumbnail: imagen4 }}})


await conn.sendMessage(m.chat, { react: { text: '🐺', key: m.key } })

//await conn.sendFile(m.chat, wm, text.trim(), img, img, channel, m)


    conn.sendMessage(m.chat, { video: { url: [pp1, pp2].getRandom() }, gifPlayback: true, caption: text.trim(), mentions: [m.sender] }, { quoted: m })

   //let img = await (await fetch('https://tinyurl.com/242jfywv')).buffer() 

//conn.sendFile(m.chat, img, 'out.png', text.trim(), m, true, { contextInfo: { 'forwardingScore': 200, 'isForwarded': true, externalAdReply:{ showAdAttribution: false, title: gcname, body: `h`, mediaType: 2, sourceUrl: gp2, thumbnail: miniurl}, mentions: [m.sender]}}, { quoted: m })

  } catch (e) {
    conn.reply(m.chat, '❎ Lo sentimos, el menú tiene un error.', m)
    throw e
  }
}

handler.help = ['menu']
handler.tags = ['main']
handler.command = ['menu', 'help', 'menú'] 
handler.register = true 
export default handler


const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}

  var ase = new Date();
  var hour = ase.getHours();
switch(hour){
  case 0: hour = 'Bᴜᴇɴᴀs Nᴏᴄʜᴇs 🌙'; break;
  case 1: hour = 'Bᴜᴇɴᴀs Nᴏᴄʜᴇs 💤'; break;
  case 2: hour = 'Bᴜᴇɴᴀs Nᴏᴄʜᴇs 🦉'; break;
  case 3: hour = 'Bᴜᴇɴᴏs Dɪᴀs ✨'; break;
  case 4: hour = 'Bᴜᴇɴᴏs Dɪᴀs 💫'; break;
  case 5: hour = 'Bᴜᴇɴᴏs Dɪᴀs 🌅'; break;
  case 6: hour = 'Bᴜᴇɴᴏs Dɪᴀs 🌄'; break;
  case 7: hour = 'Bᴜᴇɴᴏs Dɪᴀs 🌅'; break;
  case 8: hour = 'Bᴜᴇɴᴏs Dɪᴀs 💫'; break;
  case 9: hour = 'Bᴜᴇɴᴏs Dɪᴀs ✨'; break;
  case 10: hour = 'Bᴜᴇɴᴏs Dɪᴀs 🌞'; break;
  case 11: hour = 'Bᴜᴇɴᴏs Dɪᴀs 🌨'; break;
  case 12: hour = 'Bᴜᴇɴᴏs Dɪᴀs ❄'; break;
  case 13: hour = 'Bᴜᴇɴᴏs Dɪᴀs 🌤'; break;
  case 14: hour = 'Bᴜᴇɴᴀs Tᴀʀᴅᴇs 🌇'; break;
  case 15: hour = 'Bᴜᴇɴᴀs Tᴀʀᴅᴇs 🥀'; break;
  case 16: hour = 'Bᴜᴇɴᴀs Tᴀʀᴅᴇs 🌹'; break;
  case 17: hour = 'Bᴜᴇɴᴀs Tᴀʀᴅᴇs 🌆'; break;
  case 18: hour = 'Bᴜᴇɴᴀs Nᴏᴄʜᴇs 🌙'; break;
  case 19: hour = 'Bᴜᴇɴᴀs Nᴏᴄʜᴇs 🌃'; break;
  case 20: hour = 'Bᴜᴇɴᴀs Nᴏᴄʜᴇs 🌌'; break;
  case 21: hour = 'Bᴜᴇɴᴀs Nᴏᴄʜᴇs 🌃'; break;
  case 22: hour = 'Bᴜᴇɴᴀs Nᴏᴄʜᴇs 🌙'; break;
  case 23: hour = 'Bᴜᴇɴᴀs Nᴏᴄʜᴇs 🌃'; break;
}
  var greeting = hour;