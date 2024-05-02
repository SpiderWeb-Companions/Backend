import * as tls from 'tls';

const SMTP_SERVER = 'smtp.gmail.com';
const SMTP_PORT = 465;
const USERNAME = process.env.ADMIN_EMAIL || '';
const PASSWORD = process.env.ADMIN_PASSWORD || '';

export async function send(RECIPIENT: string, message: string, SUBJECT: string) {
  const options: tls.ConnectionOptions = {
    host: SMTP_SERVER,
    port: SMTP_PORT,
    rejectUnauthorized: false,
  };

  const socket = tls.connect(options, () => {
    socket.once('data', handleServerGreeting);
  });

  const handleServerGreeting = () => {
    socket.write('HELO localhost\r\n');
    socket.once('data', handleHelloResponse);
  };

  const handleHelloResponse = () => {
    socket.write('AUTH LOGIN\r\n');
    socket.once('data', handleAuthLoginResponse);
  };

  const handleAuthLoginResponse = () => {
    socket.write(`${Buffer.from(USERNAME).toString('base64')}\r\n`);
    socket.once('data', handleUsernameResponse);
  };

  const handleUsernameResponse = () => {
    socket.write(`${Buffer.from(PASSWORD).toString('base64')}\r\n`);
    socket.once('data', handlePasswordResponse);
  };

  const handlePasswordResponse = () => {
    socket.write(`MAIL FROM:<${USERNAME}>\r\n`);
    socket.once('data', handleMailFromResponse);
  };

  const handleMailFromResponse = () => {
    socket.write(`RCPT TO:<${RECIPIENT}>\r\n`);
    socket.once('data', handleRcptToResponse);
  };

  const handleRcptToResponse = () => {
    socket.write('DATA\r\n');
    socket.once('data', handleDataResponse);
  };

  const handleDataResponse = () => {
    const emailData = `From: ${USERNAME}\r\nTo: ${RECIPIENT}\r\nSubject: ${SUBJECT}\r\n\r\n${message}\r\n.\r\n`;
    socket.write(emailData);
    socket.once('data', handleEmailSent);
  };

  const handleEmailSent = () => {
    socket.write('QUIT\r\n');
    socket.end();
  };

  socket.on('end', () => {
    console.log('Connection closed');
  });
}
