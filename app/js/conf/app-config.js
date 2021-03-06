window.appConfig = {

    numberTransform: ['0n', 'vn', '1n', 'nn', '2n', 'tn', '3n', 'qn', '4n', 'mn'],

    chapterBaseUrl: 'chuonghoi.aspx',
    chapterRegex: /noidung1\('chuonghoi\.aspx\?tid=(.*)'\)/,

    concurrentChapterDownload: 5,
    bookTemplate:   "<?xml version='1.0' encoding='UTF-8' ?>"+
                    "<html>" +
                        "<head>" +
                            "<meta http-equiv='content-type' content='application/xhtml+xml; charset=UTF-8' >" +
                            "<title>{bookTitle}</title>" +
                        "</head>" +
                        "<body>{bookContent}</body>" +
                    "</html>",

    trustedSites: [
        // Allow same origin resource loads.
        'self',
        // Allow loading from our assets domain.  Notice the difference between * and **.
        'http://*.vnthuquan.net/**'
    ]
};