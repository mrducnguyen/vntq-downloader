window.appConfig = {

    numberTransform: ['0n', 'vn', '1n', 'nn', '2n', 'tn', '3n', 'qn', '4n', 'mn'],

    chapterBaseUrl: 'chuonghoi.aspx',
    chapterRegex: /noidung1\('chuonghoi\.aspx\?tid=(.*)'\)/,

    concurrentChapterDownload: 5,

    trustedSites: [
        // Allow same origin resource loads.
        'self',
        // Allow loading from our assets domain.  Notice the difference between * and **.
        'http://*.vnthuquan.net/**'
    ]
};