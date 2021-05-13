const express = require('express'),
  cors = require('cors'),
  bodyParser = require('body-parser'),
  cookieParser = require('cookie-parser'),
  mongoose = require('mongoose'),
  environment = require('./utils').environment,
  path = require('path');

const app = express();
// app.use(express.static(path.join(__dirname, 'client', 'build')));

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.use(cookieParser());
app.use(cors({ credentials: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('hello from the other side!'));
const authRoutes = require('./routes/authRoutes'),
  userRoutes = require('./routes/userRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

app.use((err, req, res, next) => {
  if (!err.statusCode) {
    err.statusCode = 500;
    err.message = err.message;
  }
  res.status(err.statusCode).json({ message: err.message });
});

const mongoURI = `mongodb+srv://${environment.db.user}:${environment.db.password}@cluster0.ftq3z.mongodb.net/wicked-letters?retryWrites=true&w=majority`;
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected with DB.');
  })
  .catch((err) => {
    console.log(err);
  });

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
// });

app.listen(process.env.PORT || 5000, () => {
  console.log('Server is up and running.');
});
