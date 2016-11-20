angular.module('travelApp')
  .controller('MainController', MainController);

MainController.$inject = ['$auth', '$state', '$rootScope' , 'User', 'UserSearch', '$scope'];

function MainController($auth, $state, $rootScope, User, UserSearch, $scope) {
  const main = this;
  main.searchBoxOpen = false;
  main.navToggle = false;

  if ($auth.getPayload()) {
    const userId = { id: $auth.getPayload()._id };
    this.currentUser = User.get(userId);
  }

  main.isLoggedIn = $auth.isAuthenticated;
  main.message = null;

  function logout() {
    $auth.logout()
      .then(() => {
        $state.go('home');
      });
  }
  const protectedStates = ['usersEdit', 'usersNew'];

  function secureState(e, toState) {
    main.message = null;
    if(!$auth.isAuthenticated && protectedStates.includes(toState.name)) {
      e.preventDefault();
      $state.go('login');
      main.message = 'You must be logged in to go there!';
    }
  }

  $rootScope.$on('$stateChangeStart', secureState);

  main.logout = logout;

  function search() {
    if (main.searchTerm.length !== 0){
      main.allUsers = UserSearch.query({search: main.searchTerm });
    } else {
      main.allUsers = 0;
    }
  }
  main.search = search;

  $scope.textAreaSetup = function($element){
    $element.attr('ui-codemirror', '');
  };
}
