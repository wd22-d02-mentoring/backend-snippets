import express from 'express';
import { body, validationResult } from 'express-validator';
import cors from 'cors'
const app = express();

app.use(cors())

// BODY Parser for JSON data
app.use(express.json()); // parse incoming BODY JSON data into object req.body

app.get('/', (req, res) => {
  res.send('Hello from API!');
});

app.post(
  '/signup',
  body('username')
    .exists()
    .withMessage('Username nicht da! Wat soll dat?')
    .bail()
    .isLength({ min: 5 })
    .withMessage('Ey! 5 oder gar nix!'),
  body('email').isEmail().withMessage('Dit is keene Email, Buddy! '),
  body('pw').exists(),
  (req, res, next) => {
    const result = validationResult(req);
    console.log(result);

    if (!result.isEmpty()) {
      return res.status(400).json({ error: result.array() });
    }

    res.json({
      message: 'Signed you up, buddy!',
    });
  }
);

app.post('/todo', (req, res, next) => {
  try {
    const name = req.bodyy.name;

    res.json({
      message: 'todo created',
    });
  } catch (err) {
    next(err);
    // throw err
  }
});

// 404 catch all route
app.use((req, res, next) => {
  console.log('Route not found');
  const err = new Error('Route not found');
  // we use status code to indicate the problem of the USER
  // not us!
  err.status = 404;
  next(err);
});

// CENTRAL / GENERIC ERROR HANDLER
app.use((err, req, res, next) => {
  if (!err.status) {
    console.log('CENTRAL ERROR HANDLER', err);
  }
  res.status(err.status || 500).json({
    error: err.message,
  });
});

export default app;
