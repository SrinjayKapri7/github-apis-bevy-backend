const express = require('express');
const router = express.Router();
const repoController = require('../controllers/repoController');

router.post('/search', repoController.searchAndStoreRepos);
router.get('/repos', repoController.getReposPaginated);
router.delete('/clear-repos', repoController.clearRepos);

module.exports = router;
