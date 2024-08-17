const exoress = require('express');
const router = express.Router();

router.get('/test', (req, res) => {
    res.send('Hello from the test route!');
}
