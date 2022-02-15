const fs = require('fs/promises');

const contactsPath = require('../db/contactsPath');
console.log(contactsPath);

const updateContacts = async contacts => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
};

module.exports = updateContacts;
