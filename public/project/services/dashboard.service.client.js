(function () {
    angular
        .module('ProjectApp')
        .factory('dashboardService', dashboardService);

    function dashboardService($http) {

        return {
            searchManga: searchManga,
            findMangaByUserId: findMangaByUserId,
            createManga: createManga,
            deleteManga: deleteManga

        };

        function searchManga (userId, query) {
            var url = "/api/user/" + userId + "/" + query;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function deleteManga (userId, mangaId) {
            var url = "/api/user/" + userId + "/" + mangaId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function findMangaByUserId (userId) {
            console.log(userId);
            var url = "/api/user/" + userId + "/dashboard";
            return $http.get(url)
                .then(function (response) {
                    console.log(response);
                    return response.data;
                })
        }



        function createManga(userId, manga) {
            var url = "/api/user/" + userId + "/manga";
            return $http.post(url, manga)
                .then(function (response) {
                    return response.data;
                })
        }
    }

})();