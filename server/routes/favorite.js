const express = require('express');
const router = express.Router();
const { Favorite } = require('../models/Favorite');

router.post('/favoriteNumber', (req, res) => {
  // body -> index.js 의 bodyparser를 이용해서 프론트에서 전달받은 값을 사용할 수 있음
  Favorite.find({
    movieId: req.body.movieId,
    userFrom: req.body.userFrom,
  }).exec((err, info) => {
    // mongoDB에서 favorite 숫자를 가져오기
    if (err) {
      return res.status(400).send(err);
    }
    // 그다음에 프론트에 다시 숫자 정보를 보내주기
    res.status(200).json({ success: true, favoriteNumber: info.length });
  });
});

router.post('/favorited', (req, res) => {
  // 내가 이 영화를 Favorite 리스트에 넣었는지 정보를 DB에서 가져오기
  Favorite.find({
    movieId: req.body.movieId,
    userFrom: req.body.userFrom,
  }).exec((err, info) => {
    if (err) {
      return res.status(400).send(err);
    }

    res
      .status(200)
      .json({ success: true, favorited: info.length ? true : false });
  });
});

// router -> server -> return front
router.post('/getFavoritedMovie', (req, res) => {
  Favorite.find({ userFrom: req.body.userFrom }).exec((err, favorites) => {
    if (err) {
      return res.status(400).send(err);
    }
    return res.status(200).json({ success: true, favorites });
  });
});

module.exports = router;
