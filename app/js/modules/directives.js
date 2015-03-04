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
                        var clone = el.clone(),
                            toc = clone.find('#book-toc');

                        toc.replaceWith(toc.contents());

                        return clone.html();
                    };
                }
            };
        });
});
