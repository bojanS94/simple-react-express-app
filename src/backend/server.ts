import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// MongoDB Connection
mongoose
  .connect('mongodb://localhost:27017/myApp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Define models
interface IImage {
  url: string;
  description?: string;
}

interface IUser {
  username: string;
  images: IImage[];
}

const ImageSchema = new mongoose.Schema<IImage>({
  url: String,
  description: String,
});

const UserSchema = new mongoose.Schema<IUser>({
  username: { type: String, required: true },
  images: [ImageSchema],
});

const User = mongoose.model<IUser & mongoose.Document>('User', UserSchema);

// Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});

const upload = multer({ storage: storage });

// Routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/users', async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).send(newUser);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get('/users', async (req, res) => {
  const users = await User.find({});
  res.send(users);
});

app.patch('/users/:id', async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.send(user);
});

app.delete('/users/:id', async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  res.send(user);
});

app.post('/users/:id/images', upload.single('image'), async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    user.images.push({ url: req.file.path, description: req.body.description });
    await user.save();
    res.send(user);
  } else {
    res.status(404).send();
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
