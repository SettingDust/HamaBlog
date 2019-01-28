const request = require('request-promise');
const moment = require('moment');
const config = require('../config');
const Item = require('./Item');

const id = {
    edmunddzhang: 433351,
    cam: 39865998,
    test: 2446425
};

const api = {
    video:
        'https://space.bilibili.com/ajax/member/getSubmitVideos?mid=:mid&pagesize=100&page=:page',
    live: 'https://api.live.bilibili.com/room/v1/Room/get_info?room_id=5050'
};

let tmp = new Set();
let content = tmp;

async function getVideos(mid) {
    let videos = new Set();
    let pages = 1;

    await request(
        api.video.replace(':mid', mid).replace(':page', pages),
        (error, response, body) => {
            if (error) console.warn('[HamaGame]', error);
            else {
                let data = JSON.parse(body);
                if (data.status === true) {
                    data = data.data;
                    videos = new Set(data.vlist);
                    pages = data.pages;
                }
            }
        }
    );

    for (let i = 2; i <= pages; i++) {
        await request(
            api.video.replace(':mid', mid).replace(':page', i),
            (error, response, body) => {
                if (error) console.warn('[HamaGame]', error);
                else {
                    const data = JSON.parse(body);
                    if (data.status === true) {
                        data.data.vlist.forEach(e => {
                            videos.add(e);
                        });
                    }
                }
            }
        );
    }
    return videos;
}

async function getLive() {
    let live = null;
    await request(api.live, (error, response, body) => {
        if (error) console.warn('[HamaGame]', error);
        else {
            let data = JSON.parse(body).data;
            if (data.live_status === 1) {
                live = new Item.Video(
                    data.title,
                    moment(data.live_time, 'YYYY-MM-DD HH:ss'),
                    'https://live.bilibili.com/5050',
                    'live',
                    data.keyframe
                );
            }
        }
    });
    return live;
}

function concatVideos(videos, type) {
    for (let video of videos) {
        tmp.add(
            new Item.Video(
                video.title, //.replace(/【.*】/, ''),
                moment(video.created, 'X'),
                `https://www.bilibili.com/av${video.aid}`,
                type,
                `https:${video.pic}`
            )
        );
    }
}

async function buildVideos() {
    await getVideos(id.edmunddzhang).then(result => {
        concatVideos(result, 'post');
    });
    await getVideos(id.cam).then(result => {
        concatVideos(result, 'record');
    });
}

async function buildPages() {
    hexo.locals.get('posts').forEach(e => {
        tmp.add(new Item.Article(e.title, e.date, e.canonical_path, e.display));
    });
}

//归并
function merge(left, right) {
    const re = [];
    while (left.length > 0 && right.length > 0) {
        if (
            left[0].timestamp.valueOf() > right[0].timestamp.valueOf() ||
            left[0].type === 'live'
        ) {
            re.push(left.shift());
        } else {
            re.push(right.shift());
        }
    }
    /* 当左右数组长度不等.将比较完后剩下的数组项链接起来即可 */
    return re.concat(left).concat(right);
}

function mergeSort(array) {
    if (array.length === 1) return array;
    /* 首先将无序数组划分为两个数组 */
    const mid = Math.floor(array.length / 2);
    const left = array.slice(0, mid);
    const right = array.slice(mid);
    /* 递归分别对左右两部分数组进行排序合并 */
    return merge(mergeSort(left), mergeSort(right));
}

function buildContent() {
    tmp = new Set();
    buildPages();
    getLive().then(result => {
        if (result) tmp.add(result);
    });
    buildVideos().then(() => {
        content = mergeSort(Array.from(tmp));
    });
}

buildContent();

setInterval(() => {
    buildContent();
}, 1000 * 60 * config.cacheTime || 20);

hexo.extend.helper.register('getContent', () => {
    return Array.from(content);
});

hexo.extend.helper.register('getJson', content => {
    return JSON.stringify(content);
});

hexo.extend.helper.register('startsWith', (content, s) => {
    return content.startsWith(s);
});

hexo.extend.helper.register('formatDate', moment => {
    moment.locale('zh-cn');
    return moment.calendar(null, {
        lastDay: '[昨天]HH:ss',
        sameDay: '[今天]HH:ss',
        lastWeek: '[上]dddHH:ss',
        sameElse: 'YYYY-MM-DD HH:ss'
    });
});

hexo.extend.helper.register('formatDateStd', moment => {
    moment.locale('zh-cn');
    return moment.calendar(null, {
        lastDay: 'YYYY-MM-DD HH:ss',
        sameDay: 'YYYY-MM-DD HH:ss',
        lastWeek: 'YYYY-MM-DD HH:ss',
        sameElse: 'YYYY-MM-DD HH:ss'
    });
});
