$(function() {
    $(document).scroll(function() {
        if ($(document).scrollTop() >= $(".header-inner").height()) {
            $(".header-introduce").css({ "position": "fixed", "top": "0" })
        } else {
            $(".header-introduce").css("position", "static")
        }
    })
    var hashArr = ['/', '/tags/', '/categories/', '/archives/']
    hashArr.some(function(item, index) {
        if (item == window.location.pathname) {
            $(`.site-nav .menu li:eq(${index})`).find("a")[0].classList.add("active")
        }
    })

    $(".site-nav .menu").on("click", "li", function(e) {
        $(".site-nav .menu li").find("a").each((index, item) => {
            item.classList.remove("active")
        })
        $(this).find('a')[0].classList.add("active")
    })
    $(".site-overview-wrap").css({
        opacity: 1,
        transform: "translateY(0px)"
    })
    $(".post-block").css({
        opacity: 1,
        transform: "translateX(0px)"
    })
    $(".site-author-image").css("transform", "rotate(-360deg)")


    var song = [{
            'cover': '../../../../images/崔天琪.jpg',
            'src': '../../../../mp3/跟着感觉走.mp3',
            'title': '跟着感觉走 - 崔天琪'
        }, {
            'cover': '../../../../images/tiger.jpg',
            'src': '../../../../mp3/LovingStranger.flac',
            'title': 'LovingStranger - tiger'
        }, {
            'cover': '../../../../images/夏雨菲.jpg',
            'src': '../../../../mp3/可不可以.mp3',
            'title': '可不可以 - 夏雨菲'
        }, {
            'cover': '../../../../images/萧忆情.jpg',
            'src': '../../../../mp3/往后余生.mp3',
            'title': '往后余生 - 萧忆情'
        }, {
            'cover': '../../../../images/曹格.jpg',
            'src': '../../../../mp3/寂寞先生.mp3',
            'title': '寂寞先生 - 曹格'
        },
        {
            'cover': '../../../../images/莫文蔚.jpg',
            'src': '../../../../mp3/广岛之恋.mp3',
            'title': '广岛之恋 - 莫文蔚'
        },
        {
            'cover': '../../../../images/刘若英.jpg',
            'src': '../../../../mp3/后来.mp3',
            'title': '后来 - 刘若英'
        },
        {
            'cover': '../../../../images/康树龙.jpg',
            'src': '../../../../mp3/你是魔鬼中的天使.flac',
            'title': '你是魔鬼中的天使 - 康树龙'
        }
    ];

    var audioFn = audioPlay({
        song: song,
        autoPlay: false //是否立即播放第一首，autoPlay为true且song为空，会alert文本提示并退出
    });

    /* 向歌单中添加新曲目，第二个参数true为新增后立即播放该曲目，false则不播放 */
    // audioFn.newSong({
    //     'cover': 'images/cover4.jpg',
    //     'src': 'http://so1.111ttt.com:8282/2016/5/06m/06/199061931237.m4a?tflag=1494769315&pin=a0b26b2dddd976d74724841f6d2641d6&ip=114.233.172.33#.mp3',
    //     'title': '极乐净土 - GARNiDELiA'
    // }, false);

    /* 暂停播放 */
    //audioFn.stopAudio();

    /* 开启播放 */
    //audioFn.playAudio();

    /* 选择歌单中索引为3的曲目(索引是从0开始的)，第二个参数true立即播放该曲目，false则不播放 */
    //audioFn.selectMenu(3,true);

    /* 查看歌单中的曲目 */
    //console.log(audioFn.song);

    /* 当前播放曲目的对象 */
    // console.log(audioFn.audio);

    $(".audio-cover").click(function(e) {
        if (getViewportOffset().width > 992) {
            $(".audio-box").toggleClass("audio-box-width")
        }

    })
})


function getViewportOffset() {
    return window.innerWidth ? {
        width: window.innerWidth,
        height: window.innerHeight
    } : (document.compactMode != "BackCompact" ? {
        width: document.body.clientWidth,
        height: document.body.clientHeight
    } : {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight
    })
}