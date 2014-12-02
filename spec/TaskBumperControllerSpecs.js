describe('taskBumperController', function() {
  
  beforeEach(module('app.taskBumper'));
 
 var $controller;

  beforeEach(inject(function(_$controller_){
    $controller = _$controller_;
  }));
     
    var $scope, controller;

    beforeEach( function(){
        $scope = {};
        controller = $controller('taskBumperCtrl', { $scope: $scope });
    });

     it('contient une méthode cleanAngularItem', function() {
      
      expect(cleanAngularItem).toBe.not.undefined();
    });

    it('contient des projets', function() {
      expect($scope.projects).toBeDefined();
    });

    it('contient des projets avec des couleurs', function() {
      var hasColors = true;
      for (var i = 0; i < $scope.projects.length;i++) {
          if ($scope.projects[i].color == undefined)
          {
            hasColors = false;
            break;
          }
      };
      expect(hasColors).toBeTruthy(hasColors);
    });

     it('et avec avec des titres', function() {
      var hasTitle = true;
      for (var i = 0; i < $scope.projects.length;i++) {
          if ($scope.projects[i].title == undefined)
          {
            hasTitle = false;
            break;
          }
      };
      expect(hasTitle).toBeTruthy();
    });
});


