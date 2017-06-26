(function () {
    angular
        .module('ProjectApp')
        .controller('adminUserController', adminUserController);

    function adminUserController(userService) {
        var model = this;
        model.deleteUser = deleteUser;

        function init() {
            findAllUsers();
        }
        init();

        function deleteUser(user) {
            userService
                .deleteUser(user._id)
                .then(findAllUsers);
        }

        function findAllUsers() {
            userService
                .findAllUsers()
                .then(function (users) {
                    model.users = users;
                })
        }
    }
})();