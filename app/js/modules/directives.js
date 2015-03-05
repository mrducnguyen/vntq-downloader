'use strict';
/**
 * @doc overview
 * @id directives
 * @name Planner Directives
 * @desctipyion
 */
define(['jquery'], function ($) {
    angular.module('vntqDirectives', [])
        .directive('includeReplace', function () {
            return {
                require: 'ngInclude',
                restrict: 'A', /* optional */
                link: function (scope, el, attrs) {
                    el.replaceWith(el.contents());
                }
            };
        })

        .directive('exportHtmlBook', function () {
            return {
                restrict: 'A', /* optional */
                link: function (scope, el, attrs) {
                    if (!scope.exportHtmlBook) {
                        scope.$parent.exportHtmlBook = scope.exportHtmlBook = {};
                    }
                    scope.exportHtmlBook.getHTML = function () {
                        var book = scope.book;
                        if (scope[attrs.exportHtmlBook]) {
                            book = scope[attrs.exportHtmlBook];
                        }

                        console.log(book);

                        if (scope.exportHtmlBook.cachedHTML) {
                            return scope.exportHtmlBook.cachedHTML;
                        }
                        var clone = el.clone(),
                            toc = clone.find('#book-toc');

                        if (book.imgDataURL) {
                            var img = clone.find('p:first-child').find('img');
                            img.attr('src', book.imgDataURL);
                            console.log(img);
                        }

                        toc.replaceWith(toc.contents());

                        return (scope.exportHtmlBook.cachedHTML = clone.html());
                    };
                }
            };
        });
});
