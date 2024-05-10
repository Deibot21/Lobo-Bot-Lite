const handler = async (m, { conn, command, text }) => {
  const bibliaPercentage = Math.floor(Math.random() * 100);
  const isHighbiblia = bibliaPercentage >= 50;
  const bibliaMessages = [
"Isaias 41:10, No tengas miedo por que yo estoy con tigo, No te desalientes por que yo soy tu Dios, Te dare fuerzas y te ayudare te sostendre con mi mano derecha victoriosa"
,

"Juan 11:25 y 26, Yo soy la resureeccion y la vida, el que cree en mi aun que este muerto vivira, y todo aquel que vive y creen en mi, No morira eternamente"
,

  ];
  const notSoHighbibliaMessages = [
"Isaias 41:10, No tengas miedo por que yo estoy con tigo, No te desalientes por que yo soy tu Dios, Te dare fuerzas y te ayudare te sostendre con mi mano derecha victoriosa"
,

];
    const bibliaDescription = isHighbiblia ? "Esta es la palabra de Dios" : "Jehova Dios nuestro creador";

  const getRandomMessage = (messages) => messages[Math.floor(Math.random() * messages.length)];
  const bibliaMessage = isHighbiblia ? getRandomMessage(bibliaMessages) : getRandomMessage(notSoHighbibliaMessages);
  const response =
    `━━━━━━━⬣ 𝑹𝒆𝒚𝒏𝒂 𝒗𝒂𝒍𝒆𝒓𝒂 ⬣━━━━━━━\n` +
    `𝑩𝒆𝒏𝒅𝒊𝒄𝒊𝒐𝒏𝒆𝒔, ${text}  @${m.sender.split('@')[0]} ${bibliaDescription}
numero favorito ${bibliaPercentage}% de 100%*\n\n` +
    `*❥ ✦${bibliaMessage}*\n` +
    `━━━━━━━⬣ 𝑺𝒂𝒏𝒕𝒂 𝑩𝒊𝒃𝒍𝒊𝒂 ⬣━━━━━━━`    

  async function loading() {
var hawemod = [
"《 █▒▒▒▒▒▒▒▒▒▒▒》10%",
"《 ████▒▒▒▒▒▒▒▒》30%",
"《 ███████▒▒▒▒▒》50%",
"《 ██████████▒▒》80%",
"《 ████████████》100%"
]
   let { key } = await conn.sendMessage(m.chat, {text: `🌏 𝑬𝒏𝒗𝒊𝒂𝒏𝒅𝒐 𝒗𝒆𝒓𝒔𝒊𝒄𝒖𝒍𝒐`, mentions: conn.parseMention(response)}, {quoted: m})
 for (let i = 0; i < hawemod.length; i++) {
   await new Promise(resolve => setTimeout(resolve, 1000)); 
   await conn.sendMessage(m.chat, {text: hawemod[i], edit: key, mentions: conn.parseMention(response)}, {quoted: m}); 
  }
  await conn.sendMessage(m.chat, {text: response, edit: key, mentions: conn.parseMention(response)}, {quoted: m});         
 }
loading()    
};
handler.help = ['santabiblia'];
handler.tags = ['santabiblia'];
handler.command = /^(santabiblia|versiculo)$/i;
export default handler;