const express = require('express');
const router = express.Router();
const repoController = require('../controllers/repoController');

router.post('/search', repoController.searchAndStoreRepos);
router.get('/repos', repoController.getReposPaginated);

module.exports = router;
