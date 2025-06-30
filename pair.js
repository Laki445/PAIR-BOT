const { default: makeWASocket, useMultiFileAuthState, fetchLatestBaileysVersion } = require('@whiskeysockets/baileys');
const pino = require('pino');

module.exports = async function startPair(number) {
  const { version } = await fetchLatestBaileysVersion();
  const { state, saveCreds } = await useMultiFileAuthState(`session/${number}`);

  const sock = makeWASocket({
    version,
    logger: pino({ level: 'silent' }),
    auth: state,
    printQRInTerminal: false,
    browser: ['WebPair', 'Chrome', '1.0'],
  });

  sock.ev.on('creds.update', saveCreds);

  const code = await sock.requestPairingCode(number);
  return code;
}