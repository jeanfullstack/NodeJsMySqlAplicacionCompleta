const express = require('express'); //Inicializar express
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path= require('path');
const flash = require('connect-flash');
const session = require('express-session');
const MySQLStore = require('express-mysql-session');
const passport = require('passport');

const { database } = require('./keys');

//Hora 3 Min 40
/* npm run dev (Corre el servidor) */

//INITIALIZATIONS
const app = express();
require('./lib/passport');

//SETTINGS 
app.set('port', process.env.PORT || 4000);  //Se define el puerto
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: 'hbs',
    helpers: require('./lib/handlebars')
}));   
app.set('view engine', '.hbs');

//MIDDLEWARES
app.use(session({
    secret: 'faztmysqlnodesession',
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database)
}));
app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());


//GLOBAL VARIABLES
app.use((req, res, next) => {
    app.locals.message = req.flash('message');
    app.locals.success = req.flash('success');
    app.locals.user = req.user;
    next();
    //app.locals.success = req.flash('success');  
    //app.locals.message = req.flash('message');
    //app.locals.user = req.user;  
    //next();
});

//ROUTES
app.use(require('./routes/index'));
app.use(require('./routes/authentication'));
app.use('/links', require('./routes/links'));
/*  app.use(require('./routes/auto'));
app.use(require('./routes/enlaces')); */



//PUBLIC
app.use(express.static(path.join(__dirname, 'public')));


//STARTING THE SERVER
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));

});






//Min 30

/* Codigo del archivo
app.use(express.static(path.join(__dirname, 'public'))); */















//Codigo del archivo 
/* app.use(require('./routes/index'));
app.use(require('./routes/authentication'));
app.use('/links', require('./routes/links'));  links



app.use(require('./routes/authentication'));
app.use('/links', require('./routes/links'));*/



