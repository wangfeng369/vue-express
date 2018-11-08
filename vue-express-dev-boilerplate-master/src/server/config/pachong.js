const eventproxy = require('eventproxy');
const superagent = require('superagent');
const cheerio = require('cheerio');
const fs = require('fs')
const url = require('url');

const cnodeUrl = 'https://www.jianshu.com/';
let mainJson = []
let obj = {}
let stad ={}
const ep = new eventproxy();
superagent.get(cnodeUrl)
    .set("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.84 Safari/537.36")
    .end(function (err, res) {
        if (err) {
            return console.error(err);
        }
        let topicUrls = [];
        const $ = cheerio.load(res.text);
        $('.content .title').each(function (idx, element) {
            const $element = $(element);
            const href = url.resolve(cnodeUrl, $element.attr('href'));
            topicUrls.push(href);
        });
        topicUrls.forEach(function (topicUrl) {
            superagent.get(topicUrl)
            .set("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.84 Safari/537.36")
            .end(function (err, res) {
                ep.emit('topic_html', [topicUrl, res.text]);
              });
          });     
        ep.after('topic_html', topicUrls.length, function (topics) {
        topics = topics.map((topicPair,index)=>{
            const topicUrl = topicPair[0];
            const topicHtml = topicPair[1];
            const $ = cheerio.load(topicHtml);
            let text = ''
            $('.show-content-free p').each(function(){
                text += $(this).text()+'<br/>';
            })
            let ids = $('.note-bottom div').eq(1).attr('data-note-id')
            let html = $('script[type="application/json"]').html();
            let newJson = JSON.parse(html)
            let view = newJson.note.views_count
            let comments = newJson.note.comments_count
            let like = newJson.note.likes_count
            let slug =  newJson.note.slug
            return ({
                id:ids,
                slug:slug,
                title: $('.article .title').text(),
                href: topicUrl,
                avatar: $('.author .avatar img').attr('src'),
                wordage:$('.meta .wordage').text(),
                publishTime:$('.meta .publish-time').text(),
                content:text,
                view: view,
                author: $('.author .info .name a').text(),
                comments: comments,
                like: like,
            });
        });

        console.log('final:');
        fs.appendFile('./data/result1.json', JSON.stringify(topics) ,'utf-8', function (err) {
            if(err) {
                console.log(err)
                throw new Error("appendFile failed...")

            };
            console.log("数据写入success...");

        });
        })
        
    });