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
define(['jquery'], function ($) {
    angular.module('vntqControllers', ['vntqServices'])

        /**
         * @ngdoc controller
         * @name controllers.controller:ShowplannerController
         *
         * @description
         * ShowplannerController is the controller to display events
         */
        .controller('DownloadController', ['$scope', '$templateRequest', '$compile', '$document', '$timeout', '$anchorScroll', '$location', 'Books', function ($scope, $templateRequest, $compile, $document, $timeout, $anchorScroll, $location, Books) {

            $scope.book = {
                url: 'http://vnthuquan.net/truyen/truyen.aspx?tid=2qtqv3m3237nvntnvn4n3n31n343tq83a3q3m3237nvnmn',
                downloading: false
            };

            $scope.readyToShow = false;
            $timeout(function () {
                $scope.readyToShow = true;
            }, 0);

            $scope.gotoChapter = function (e) {
                $location.hash(e.target.hash.substring(1));
                $anchorScroll();
                e.preventDefault();
                e.stopPropagation();
            };

            $scope.doDownload = function () {
                if ($scope.book.downloading) {
                    return;
                }

                Books.download($scope.book).then(function () {
                    Books.startDownloadChapters($scope.book, appConfig.concurrentChapterDownload, 3);
                });
            };

            var fileContent;

            $scope.exportBook = function () {
                console.log($scope.exportHtmlBook.getHTML());
                fileContent =
                    "<html>" +
                        "<head>" +
                            "<title>" +
                                $scope.book.title +
                            "</title>" +
                        "</head>" +
                        "<body>" +
                            $scope.exportHtmlBook.getHTML() +
                        "</body>" +
                    "</html>";
                var blob = new Blob([fileContent], {type : 'text/html'});
                saveAs(blob, $scope.book.title + ".html");
            };

        }]);
});