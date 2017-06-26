(function () {
    angular
        .module('ProjectApp')
        .controller('homeController', homeController);

    function homeController(dashboardService, currentUser) {
        var model = this;
        model.currentUser = currentUser;

        model.searchManga = searchManga;


        function searchManga(query) {
            dashboardService
                .searchManga(null, query)
                .then(function (response) {
                    model.mangas = response;
                    console.log(response);
                })
        }
    }
})();