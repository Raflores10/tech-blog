const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const Handlebars = require('handlebars');
const allRoutes = require('./controllers');
const dayjs = require('dayjs');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3003;
const { User,Post,Comment} = require('./models');

const sess = {
    secret: "secret",
    cookie: {
        maxAge:1000*60*60*2
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(session(sess));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(express.static('public'));

const hbs = exphbs.create({});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use('/',allRoutes);

app.get("/sessions",(req,res)=>{
    res.json(req.session)
})

Handlebars.registerHelper("dateFormat", function(dateData) {
    return dayjs(dateData).format("MMM DD YYYY")
});

sequelize.sync({ force: false }).then(function() {
    app.listen(PORT, function() {
    console.log(`App listening on http://localhost:${PORT}`);
    });
});