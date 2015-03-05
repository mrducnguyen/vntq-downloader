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
                url: 'http://vnthuquan.net/truyen/truyen.aspx?tid=2qtqv3m3237nvntnvn4n3n31n343tq83a3q3m3237nvnmn'
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
                if ($scope.book && $scope.book.downloading) {
                    return;
                }

                var bookUrl = $scope.book.url;

                // create a new book object?!
                $scope.book = {
                    url: bookUrl
                };

                Books.download($scope.book).then(function () {
                    Books.startDownloadChapters($scope.book, appConfig.concurrentChapterDownload, 3);
                });
            };

            $scope.exportBook = function () {
                var bookHTML = $scope.exportHtmlBook.getHTML(),
                    fileContent = appConfig.bookTemplate;

                fileContent = fileContent.replace('{bookTitle}', $scope.book.title);
                fileContent = fileContent.replace('{bookContent}', bookHTML);
                var blob = new Blob([fileContent], {type : 'text/html;charset=utf-8'});
                saveAs(blob, $scope.book.title + ".html");
            };

        }]);
});