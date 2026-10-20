const nodemailer = require('nodemailer');
const fs = require('fs');

async function main() {
  console.log('Generating Ethereal SMTP test credentials...');
  const testAccount = await nodemailer.createTestAccount();
  
  console.log('Test Account Created:');
  console.log('User:', testAccount.user);
  console.log('Host:', testAccount.smtp.host);
  console.log('Port:', testAccount.smtp.port);

  const envLines = [
    'OWNER_EMAIL=owner@ssfurniture.in',
    'DEVELOPER_EMAIL=developer@ssfurniture.in',
    `SMTP_HOST=${testAccount.smtp.host}`,
    `SMTP_PORT=${testAccount.smtp.port}`,
    `SMTP_SECURE=${testAccount.smtp.secure}`,
    `SMTP_USER=${testAccount.user}`,
    `SMTP_PASS=${testAccount.pass}`,
    `SMTP_FROM_EMAIL=${testAccount.user}`,
    'SMTP_FROM_NAME="S.S. Furniture"',
    'NEXT_PUBLIC_SITE_URL=http://localhost:3000',
  ];

  fs.writeFileSync('.env.local', envLines.join('\n') + '\n');
  console.log('.env.local written successfully!');
}

main().catch(console.error);
