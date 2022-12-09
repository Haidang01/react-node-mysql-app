import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import userRoutes from './routes/users.js'
import postRoutes from './routes/posts.js'
import likeRoutes from './routes/likes.js'
import commentRoutes from './routes/comments.js'
import relationshipRoutes from './routes/relationships.js'
import authRoutes from './routes/auth.js'
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import multer from 'multer';
const app = express();

//MIDDLEWARE
app.use(cors({ credentials: true, }));
app.use(morgan('dev'))
app.use(bodyParser.json({ limit: '50mb', extended: true }));
app.use(express.json({ limit: '50mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());


// Multer UpLoad file
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '.././client/public/upload')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname)
  }
});

const upload = multer({ storage: storage })
app.post('/api/upload', upload.single("File"), (req, res, next) => {
  const file = req.file;
  console.log(file.filename);
  res.status(200).json(file.filename)
})

// ROUTES --------------------------------
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/likes', likeRoutes);
app.use('/api/relationships', relationshipRoutes);

app.listen(process.env.PORT, () => {
  console.log('Server is listening on port ' + process.env.PORT);
});