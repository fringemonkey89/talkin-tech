const express = require('express');
const routes;
const sequelize;
const path = require('path');

const exHb = require('epress-handlebars')
const helpers;
const handle = exHb.create({helpers})

const app = express();
const PORT = process.env.PORT || 3000;

const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sesh = {
    secret: 'can you keep a secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
}

app.use(session(sesh));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')))

app.engine('handlebars', handle.engine);

app.use(routes);

sequelize.sync({ force: false}).then(() => {
    app.listen(PORT, () => console.log(`now listening to port: ${PORT}`))
})