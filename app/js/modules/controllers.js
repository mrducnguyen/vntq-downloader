'use strict';

/**
 * @doc module
 * @name controllers
 * @description
 *
 * ## Controllers
 *
 * Controllers of the applications
 */
angular.module('vntqControllers', ['vntqServices'])

    /**
     * @ngdoc controller
     * @name controllers.controller:ShowplannerController
     *
     * @description
     * ShowplannerController is the controller to display events
     */
    .controller('DownloadController', ['$scope', '$anchorScroll', '$location', 'Books', function ($scope, $anchorScroll, $location, Books) {

        $scope.book = {
            url: 'http://vnthuquan.net/truyen/truyen.aspx?tid=2qtqv3m3237nvntnvn4n3n31n343tq83a3q3m3237nvnmn',
            downloading: false
        };

        $scope.gotoChapter = function (id) {
            $location.hash(id);
            $anchorScroll();
        };

        $scope.doDownload = function () {
            if ($scope.book.downloading) {
                return;
            }

            Books.download($scope.book).then(function () {
                console.log($scope.book);
                Books.startDownloadChapters($scope.book, appConfig.concurrentChapterDownload);
            });
        };

    }]);