//Todo lo que quiera configurar de HBS se configura en este archivo

const hbs = require('hbs');
const path = require('path');

hbs.registerPartials(path.join(__dirname, '../views/partials'));

//require('../helpers/books.helper')