import axios from 'axios';
const handler = async (m, {
  conn,
  args,
  usedPrefix,
  command,
}) => {
  const res = (await axios.get(`https://raw.githubusercontent.com/EnderJs-CreatorGL/Lobo-Bot-Lite/master/src/JSON/navidad.json`)).data;
  const mystic = await res[Math.floor(res.length * Math.random())];
  conn.sendMessage(m.chat, {
    image: {
      url: mystic,
    },
    caption: `_Navidad 🧑‍🎄_`,
  }, {
    quoted: m,
  });
  // conn.sendButton(m.chat, `_Navidad 🧑‍🎄_`, author, Lobo, [['🔄 𝚂𝙸𝙶𝚄𝙸𝙴𝙽𝚃𝙴 🔄', `${usedPrefix + command}`]], m)
};
handler.help = ['navidad'];
handler.tags = ['internet'];
handler.command = /^(navidad)$/i;
export default handler;
