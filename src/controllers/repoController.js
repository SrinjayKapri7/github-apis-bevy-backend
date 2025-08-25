const axios = require('axios');
const Repo = require('../models/repoModel');

exports.searchAndStoreRepos = async (req, res) => {
  const { keyword } = req.body;
  try {

    const keywordRelatedData = await Repo.find({ keyword: { $regex: new RegExp(keyword, 'i') } });

    if(keywordRelatedData.length){
      res.status(200).json({ message: 'Data in DB.' });
    }else{
      const response = await axios.get(`https://api.github.com/search/repositories?q=${keyword}`);
      const repos = response.data.items;
  
      for (const repo of repos) {
        await Repo.updateOne(
          { id: repo.id },
          {
            id: repo.id,
            keyword: keyword,
            name: repo.name,
            full_name: repo.full_name,
            html_url: repo.html_url,
            description: repo.description,
            stargazers_count: repo.stargazers_count,
          },
          { upsert: true }
        );
      }
      res.status(200).json({ message: 'Data fetched and stored successfully.' });
    }
   
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch GitHub repos' });
  }
};

exports.getReposPaginated = async (req, res) => {
  const page = parseInt(req.query.page);
  const keyword = req.query.keyword;
  
  const limit = 10;
  try {
    if(keyword == "All"){
      const repos = await Repo.find()
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ stargazers_count: -1 });
      const count = await Repo.countDocuments();
      res.json({ repos, totalPages: Math.ceil(count / limit), currentPage: page });
    } else {
      const repos = await Repo.find({ keyword: keyword })
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ stargazers_count: -1 });
      const count = await Repo.countDocuments({ keyword: keyword });
      res.json({ repos, totalPages: Math.ceil(count / limit), currentPage: page });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to get repos' });
  }
};

exports.clearRepos = async (req, res) => {
 
  try {
   
    const deleted = await Repo.deleteMany({})

    if (deleted.deletedCount > 0) {
      res.status(200).json({ message: 'All repos deleted successfully.' });
    } else {
      res.status(200).json({ message: 'No repos found to delete.' });
    }

  } catch (err) {
    res.status(500).json({ error: 'Failed to delete repos' });
  }
};