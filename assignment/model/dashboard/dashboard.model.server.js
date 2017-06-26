var mongoose = require('mongoose');
var dashboardSchema = require('./dashboard.schema.server');

var dashboardModel = mongoose.model('dashboardModel', dashboardSchema);


dashboardModel.createManga = createManga;
dashboardModel.deleteManga = deleteManga;
dashboardModel.findMangaByUserId = findMangaByUserId;

module.exports = dashboardModel;

function createManga(manga) {
    return dashboardModel.create(manga);
}

function deleteManga(mangaId) {
    return dashboardModel.remove({_id: mangaId});
}

function findMangaByUserId(userId) {
    console.log(userId);
    return dashboardModel
        .find({"_user": "ObjectId(" + userId + ")"})
        .populate()
        .exec();
}



