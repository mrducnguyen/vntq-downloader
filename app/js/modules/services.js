'use strict';

/**
 * @doc module
 * @id services
 * @name Planner Services
 * @desctipyion The behind-the-scene workers, talk to the server and get data
 */
define(['jquery'], function ($) {
    angular.module('vntqServices', [])

        /**
         * @ngdoc service
         * @name services:Event
         * @description Event service provide all things needed to query, generate hash, share links
         */
        .service('Books', ['$http', '$q', '$timeout', function ($http, $q, $timeout) {

            // TODO:
            // don't know why AngularJS $http won't work here,
            // even using forceCors
            var downloadBookImage = function (book) {

                book.imgBlobDownloading = true;

                var xhr = new XMLHttpRequest();

                // Use JSFiddle logo as a sample image to avoid complicating
                // this example with cross-domain issues.
                xhr.open( "GET", book.imgUrl, true );

                // Ask for the result as an ArrayBuffer.
                xhr.responseType = "arraybuffer";

                xhr.onload = function( e ) {
                    // Obtain a blob: URL for the image data.
                    var arrayBufferView = new Uint8Array( this.response );
                    book.imgBlob = new Blob( [ arrayBufferView ], { type: book.imgMIME } );
                    var reader = new FileReader();
                    reader.readAsDataURL(book.imgBlob);
                    reader.onloadend = function() {
                        book.imgDataURL = reader.result;
                        book.imgBlobDownloading = false;
                    };
                };

                xhr.send();
            };

            var parseChapter = function (book, chapterContent, firstChapter) {
                var parts = chapterContent.split('--!!tach_noi_dung!!--'),
                    metaData = $($.parseHTML(parts[1])),
                    content = $($.parseHTML(parts[2])).filter('div'),
                    metaPara = metaData.find('p'),
                    paragraphs = [],
                    firstCharacter;

                content.find('> div').each(function () {
                    var $this = $(this),
                        singleP = {},
                        imgUrl;
                    if ($this.attr('id') == 'chuhoain') {
                        imgUrl = $this.find('img').attr('src');
                        firstCharacter = {
                            letter: imgUrl.substring(imgUrl.lastIndexOf('.') - 1, imgUrl.lastIndexOf('.')),
                            imgUrl: imgUrl
                        };
                    } else {
                        singleP.content = $this.text().replace(/^(\s|\n|\r|\n\r|\r\n)+|(\s|\n|\r|\n\r|\r\n)+$/g, '');
                        if (firstCharacter) {
                            singleP.firstCharacter = firstCharacter;
                            singleP.content = firstCharacter.letter + singleP.content;
                            firstCharacter = false;
                        }

                        paragraphs.push(singleP);
                    }
                });

                if (firstChapter) {
                    book.author = $(metaPara[1]).text();
                    book.editor = $(metaPara[2]).text();
                    book.shortDesc = $(metaPara[4]).text();
                    book.imgUrl = metaData.find('img').attr('src');
                    book.imgExt = book.imgUrl.substring(book.imgUrl.lastIndexOf('.') + 1);
                    switch (book.imgExt) {
                        case "jpg":
                            book.imgMIME = "image/jpeg";;
                            break;
                        case "png":
                            book.imgMIME = "image/png";
                            break;
                        case "gif":
                            book.imgMIME = "image/gif";
                            break;
                        default:
                            book.imgMIME = "";
                    }
                    downloadBookImage(book);
                }

                return {
                    title: $(metaPara[3]).text(),
                    desc: $(metaPara[4]).text(),
                    paragraphs: paragraphs
                };
            };

            var getBooksMetaInfo = function (dom) {
                var chapList = dom.find('.toolbar').first(),
                    bookMeta = chapList.parent().children('div').first(),
                    chapters = [];
                chapList.find('acronym > div').each(function () {
                    var $this = $(this);
                    chapters.push({
                        title: $this.find('a').text(),
                        id: $this.attr('onclick').match(appConfig.chapterRegex)[1]
                    });
                });

                return {
                    title: bookMeta.find('strong').text(),
                    category: bookMeta.find('.style32').text(),
                    chapters: chapters
                };
            };

            var getChapter = function (book, idx) {
                var chapter = book.chapters[idx];
                chapter.downloading = true;
                return $http.get(book.baseUrl + appConfig.chapterBaseUrl + '?tid=' + chapter.id)
                    .then(
                        function (resp) {
                            angular.extend(chapter, parseChapter(book, resp.data, idx === 0));
                            chapter.downloaded = true;
                            chapterDownloadFinish(book, idx);
                        },

                        function () {

                        })
                    .finally(function () {
                        chapter.downloading = false;
                    });
            };

            var chapterDownloadFinish = function (book, idx) {
                // remove the promise object out of the array
                var i = 0,
                    j = book.chapterDownloadThreads.length;
                for (; i < j; i++) {
                    if (book.chapterDownloadThreads[i].idx === idx) {
                        book.chapterDownloadThreads.splice(i, 1);
                        break;
                    }
                }

                // start a new download thread if not complete yet
                if (!book.stopChapterDownload && book.chapterDownloadLast < book.chapterToDownload) {
                    // start another downloading thread
                    book.chapterDownloadThreads.push({
                        idx: book.chapterDownloadLast,
                        promise: getChapter(book, book.chapterDownloadLast)
                    });
                    book.chapterDownloadLast++;
                }

                if (book.chapterDownloadThreads.length === 0) {
                    // all finished
                    book.downloadingChapters = false;
                }
            };

            var parseBook = function (html) {
                var dom = $($.parseHTML(html));
                return getBooksMetaInfo(dom);
            };

            var parseUrl = function (book) {
                book.baseUrl = book.url.slice(0, book.url.lastIndexOf('/') + 1);
            };

            return {
                download: function (book) {
                    if (!book.url)
                        throw 'Book URL must be set before download';
                    parseUrl(book);
                    console.log(book);
                    book.downloading = true;
                    return $http.get(book.url)
                        .then(
                            function (resp) {
                                angular.extend(book, parseBook(resp.data));
                                book.downloaded = true;
                            },
                            function () {

                            })
                        .finally(function () {
                            book.downloading = false;
                        });
                },

                downloadChapter: function (book, idx) {
                    return getChapter(book, idx);
                },

                startDownloadChapters: function (book, concurrent, count) {
                    if (!book.downloaded) {
                        var self = this;
                        this.download(book).then(function () {
                            self.startDownloadChapter(book);
                        });
                        return;
                    }
                    if (book.downlingChapters) {
                        return;
                    }

                    if (!count) {
                        count = book.chapters.length;
                    }

                    if(concurrent > count) {
                        concurrent = count;
                    }

                    book.downloadingChapters = true;
                    book.chapterDownloadedCount = 0;
                    book.chapterToDownload = count;
                    book.chapterDownloadThreads = [];
                    for (var i = 0; i < concurrent; i++) {
                        book.chapterDownloadThreads.push({
                            idx: i,
                            promise: this.downloadChapter(book, i)
                        });
                    }

                    book.chapterDownloadLast = concurrent;
                },

                stopDownloadChapters: function (book) {
                    //TODO:
                    // implement a stop download function?!
                }
            };
        }]);
});