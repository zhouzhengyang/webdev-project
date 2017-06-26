var app = require('../../express');
var dashboardModel = require('../model/dashboard/dashboard.model.server');
var passport = require('passport');
var nani = require('nani');

app.get   ('/api/user/:userId/:query', searchManga);
app.post  ('/api/user/:userId/manga', createManga);
app.delete('/api/user/:userId/:mangaId', deleteManga);
app.get   ('/api/user/:userId/dashboard', findMangaByUserId);


function createManga(req, res) {
    var manga = req.body;
    var userId = req.params['userId']
    manga._user = userId;
    manga.dateCreated = new Date();
    dashboardModel
        .createManga(manga)
        .then(function (response) {
            res.json(response);
        });
}

function searchManga(req, res) {
    var query = req.params.query;
    var url = 'manga/search/' + query;
    nani.init('dogleftko-4qtmy', 'sNLBKnmKZZhxfFPhDiy7zum5xF');
        //browse/manga
        //browse/anime
    nani.get(url)
        .then(function (response) {
            res.json(response);
        });
}

function deleteManga(req, res) {
    var mangaId = req.params['mangaId'];
    dashboardModel
        .deleteManga(mangaId)
        .then(function (status) {
                res.sendStatus(200);
            },
            function (err) {
                res.status(404).send("Unable to delete manga");
            }
        );
}

function findMangaByUserId(req, res) {
    console.log(req.params['userId'])
    dashboardModel
        .findMangaByUserId(req.params['userId'])
        .then(function (response) {
            console.log(response)
            res.json(response);
        });
}
