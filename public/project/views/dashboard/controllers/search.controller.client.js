(function () {
    angular
        .module('ProjectApp')
        .controller('searchController', searchController);

    function searchController(currentUser, $location, $routeParams, dashboardService) {

        var model = this;

        var userId = currentUser._id;//$routeParams['userId'];

        model.searchManga= searchManga;
        model.createManga= createManga;

        function createManga(manga) {
            var name = manga.title_english;
            var imgUrl = manga.image_url_lge;
            var mangaId = mange.id;
            var newManga = {
                name: name,
                imgUrl: imgUrl,
                mangaId: mangaId
            };
            newManga._user = userId;
            dashboardService
                .createManga(userId, newManga)
                .then(function () {
                    $location.url('/user/'+userId+'/search');
                })
        }

        function searchManga(query) {
            dashboardService
                .searchManga(userId, query)
                .then(function (response) {
                    model.mangas = response;
                    console.log(response);
                })
        }

    }
})();
