const { Command } = require('commander');
const program = new Command();

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  getUpdateContactById,
} = require('./contacts');

const invoceAction = async ({ action, id, name, email, phone, data }) => {
  switch (action) {
    case 'list':
      const contacts = await listContacts();
      console.table(contacts);
      break;

    case 'get':
      const contactId = await getContactById(id);
      if (!contactId) {
        console.warn(`\x1B[31m Contacts with id-${id} not found`);
      }
      console.table(contactId);
      break;

    case 'add':
      const newContact = await addContact(name, email, phone);
      console.table(newContact);
      break;

    case 'remove':
      const removeContactId = await removeContact(id);
      console.table(removeContactId);
      break;

    case 'update':
      const updateContact = await getUpdateContactById(id, name, email, phone);
      if (!updateContact) {
        console.warn(`\x1B[31m Contacts with id-${id} not found`);
      }
      console.table(updateContact);
      break;

    default:
      console.log('Unknown action');
  }
};

program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);
const argv = program.opts();

invoceAction(argv);
