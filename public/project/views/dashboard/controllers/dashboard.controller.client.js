(function () {
    angular
        .module('ProjectApp')
        .controller('dashboardController', dashboardController);

    function dashboardController(currentUser, $location, $routeParams, dashboardService) {

        var model = this;

        model.userId = $routeParams['userId'];

        model.deleteManga= deleteManga;

        function init() {
            dashboardService
                .findMangaByUserId(model.userId)
                .then(function (mangas) {
                    model.mangas = mangas;
                })

        }
        init();


        function deleteManga(mangaId) {
            dashboardService
                .deleteManga(mangaId)
                .then(function () {
                    $location.url('/user/'+ model.userId + '/dashboard');
                })
        }




    }
})();
