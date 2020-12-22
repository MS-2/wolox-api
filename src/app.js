import express from 'express';
import morgan from "morgan";
import pkg from '../package.json';
import coinRoutes from './routes/coinGecko.routes';
import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes';
import indexRouter from './routes/index';
import path from 'path';

//initSetup
const app = express()

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Settings
app.set('pkg', pkg);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Routes
app.use('/', indexRouter);
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/', coinRoutes);

export default app