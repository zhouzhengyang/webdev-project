(function () {
    angular
        .module('ProjectApp')
        .controller('profileController', profileController);

    function profileController(currentUser, $location, $routeParams, userService) {

        var model = this;
        var userId = currentUser._id;//$routeParams['userId'];
        model.updateUser = updateUser;
        model.unregister = unregister;
        model.user = currentUser;
        model.logout = logout;

        // userService
        //     .findUserById(userId)
        //     .then(renderUser);

        function init() {
            // renderUser(currentUser);
        }
        init();

        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/login');
                });
        }

        // function renderUser (user) {
        //     model.user = user;
        // }

        function unregister() {
            userService
                .unregister()
                .then(function () {
                    $location.url('/login');
                });
        }

        function updateUser(user) {
            userService
                .updateUser(user._id, user)
                .then(function () {
                    model.message = "User updated successfully";
                });
        }
    }
})();