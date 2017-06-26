(function () {
    angular
        .module('ProjectApp')
        .factory('userService', userService);

    function userService($http) {

        return {
            createUser: createUser,
            findUserByCredentials: findUserByCredentials,
            findUserById: findUserById,
            findUserByUsername: findUserByUsername,
            findAllUsers: findAllUsers,
            updateUser: updateUser,
            deleteUser: deleteUser,
            login: login,
            checkLoggedIn: checkLoggedIn,
            logout: logout,
            register: register,
            checkAdmin: checkAdmin,
            unregister: unregister,
        };

        function unregister() {
            var url = "/api/unregister/";
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function checkAdmin() {
            var url = "/api/checkAdmin";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function checkLoggedIn() {
            var url = "/api/checkLoggedIn";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function login(username, password) {
            var url = "/api/login";
            var credentials = {
                username: username,
                password: password,
            }
            return $http.post(url, credentials)
                .then(function (response) {
                    return response.data;
                });
        }

        function logout() {
            var url = '/api/logout';
            return $http.post(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function register(user) {
            var url = '/api/register';
            return $http.post(url, user)
                .then(function (response) {
                    return response.data;
                });
        }

        //-------------------before------------------------

        function createUser(user) {
            var url = "/api/user"
            return $http.post(url, user)
                .then(function (response) {
                    return response.data;
                })
        }

        function findUserByUsername(username) {
            var user = users.find(function (user) {
                return user.username === username;
            });
            if(typeof user === 'undefined')
                return null;
            return user;
        }

        function updateUser (userId, user) {
            var url = "/api/user/" + userId;
            return $http.put(url, user)
                .then(function (response) {
                return response.data;
            });
        }

        function deleteUser(userId) {
            var url = "/api/user/" + userId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findAllUsers(username, password) {
            var url = "/api/user";
            return $http.get(url)
                .then (function (response) {
                    return response.data;
                });
        }

        function findUserByCredentials(username, password) {
            var url = "/api/user?username=" + username + "&password=" + password;
            return $http.get(url)
                .then (function (response) {
                    return response.data;
                });
        }

        function findUserById(userId) {
            var url = "/api/user/" + userId;
            return $http.get(url)
                .then (function (response) {
                    return response.data;
                });
        }
    }
})();