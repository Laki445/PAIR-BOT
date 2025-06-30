const { cmd } = require('../lib/command');

cmd('alive', async (m, sock) => {
  const msg = `🟢 *Bot is Alive!*

✅ Status: Online
👤 User: @${m.pushName || m.key.participant || m.key.remoteJid}
📆 Date: ${new Date().toLocaleDateString()}
⏰ Time: ${new Date().toLocaleTimeString()}

_Use .menu to see all commands!_`;

  await sock.sendMessage(m.key.remoteJid, {
    text: msg,
    mentions: [m.key.participant || m.key.remoteJid]
  }, { quoted: m });
});
