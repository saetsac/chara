/**
 * Created by sakharov on 10.04.17.
 */
export function DialogController($scope, $mdDialog) {
  $scope.dialog_hide = function() {
    $mdDialog.hide();
  };
  $scope.dialog_cancel = function() {
    $mdDialog.cancel();
  };
  $scope.dialog_answer = function(answer) {
    $mdDialog.hide(answer);
  };
}