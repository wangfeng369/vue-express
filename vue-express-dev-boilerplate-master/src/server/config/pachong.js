const eventproxy = require('eventproxy');
const superagent = require('superagent');
const cheerio = require('cheerio');
const fs = require('fs')
const url = require('url');

const cnodeUrl = 'https://www.jianshu.com/';
let mainJson = []
let obj = {}
let stad ={}
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
            superagent.get(href)
            .set("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.84 Safari/537.36")
                .end(function (err, res) {
                    if (err) {
                        return console.error(err);
                    }
                    let $ = cheerio.load(res.text);
                    let add = href;
                    //把数据存储到一个对象里
                    mainJson.push({
                        title: $('.article>h1').text().trim(),
                        href: add,
                        avatar: $('.avatar>img').attr('src'),
                        author: $('.info>name>a').text().trim(),
                        time: $('.publish-time').text().trim(),
                        wordage: $('.wordage').text().trim(),
                        view: $('meta>.views-count').text().trim(),
                        comment: $('.meta>.comments-count').text().trim(),
                        like: $('.meta>.likes-count').text().trim(),
                    })   

                
                })
        });
        fs.appendFile('./data/result1.json', JSON.stringify(mainJson), 'utf-8', function (err) {
            if (err) {
                console.log(err)
                throw new Error("appendFile failed...")

            };
            console.log("数据写入success...");

        }); 
      
     
        const ep = new eventproxy();

        // ep.after('p_html', topicUrls.length, function (topics) {
        // topics = topics.map(function (topicPair,index) {
        //     console.log(topicPair)
        //     const topicUrl = topicPair[0];
        //     const topicHtml = topicPair[1];
        //     const $ = cheerio.load(topicHtml);
        //     return ({
        //     title: $('.article>h1').text().trim(),
        //     href: topicUrl,
        //     avatar:$('.avatar>img').attr('src'),
        //     author:$('.info>name>a').text().trim(),
        //     time:$('.publish-time').text().trim(),
        //     wordage:$('.wordage').text().trim(),
        //     view:$('.views-count').text().trim(),
        //     comment:$('.comments-count').text().trim(),
        //     like:$('.likes-count').text().trim(),
        //     });
        // });

        // console.log('final:');
        // console.log(topics);
        // fs.appendFile('./data/result1.json', JSON.stringify(topics) ,'utf-8', function (err) {
        //     if(err) {
        //         console.log(err)
        //         throw new Error("appendFile failed...")

        //     };
        //     console.log("数据写入success...");

        // });
        // })
        // topicUrls.forEach(function (topicUrl) {
        //     superagent.get(topicUrl)
        //         .end(function (err, res) {
        //             console.log('fetch ' + topicUrl + ' successful');
        //             ep.emit('topic_html', [topicUrl, res.text]);

        //         });
        // });

    });