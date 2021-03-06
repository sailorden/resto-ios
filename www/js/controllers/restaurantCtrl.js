restaurant.controller('restaurantCtrl', function($scope, $rootScope, CommunicationServerService, $stateParams) {
    $scope.getInfoAboutRestoran = function() {
        CommunicationServerService.getRestaurantInfo($rootScope.userDataReservation.userToken, $stateParams.id_restaurant).then(function(responseServerRestaurant) {
            console.log("$scope.getInfoAboutRestoran === ", responseServerRestaurant);
            $scope.restaurantInfo = responseServerRestaurant.data.data.data[0];
            $scope.initMap($scope.restaurantInfo.address)
            console.log("$scope.restaurantInfo === ", $scope.restaurantInfo);
        }).finally(function() {});
    };

    $rootScope.toggle = false;
    $rootScope.activeMenu = function() {
        $rootScope.toggle = !$rootScope.toggle;
    };

    $rootScope.addFavourite = function() {
        alert("Добавлено в избранные");
    };

    $rootScope.shareFB = function() {
        alert("Будем делиться в ФБ");
    };

    $rootScope.shareVK = function() {
        alert("Будем делиться в VK");
    };

    $scope.initMap = function(address) {
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({ 'address': address }, function(results, status) {
            if (status === google.maps.GeocoderStatus.OK) {

                // var latLng = new google.maps.LatLng(55.6664507468, 37.7501590167);
                var mapOptions = {
                    center: results[0].geometry.location,
                    zoom: 16,
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                    disableDefaultUI: true
                };
                $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

                // resultsMap.setCenter(results[0].geometry.location);
                var marker = new google.maps.Marker({
                    map: $scope.map,
                    position: results[0].geometry.location
                });
            } else {
                alert('Geocode was not successful for the following reason: ' + status);
            }
        });
    };



    /*google.maps.event.addListenerOnce($scope.map, 'idle', function() {
    var marker = new google.maps.Marker({
        map: $scope.map,
        animation: google.maps.Animation.DROP,
        position: latLng
    });
    var infoWindow = new google.maps.InfoWindow({
        content: $scope.restaurantInfo.name
    });

    google.maps.event.addListener(marker, 'click', function() {
        infoWindow.open($scope.map, marker);
    });
});
*/



})
