const { Comprehend } = require('aws-sdk');
const Axios = require('axios');
exports.handler = async (event) => {
    // TODO implement
    console.log(JSON.stringify(event));

    // 返信用のHTTPクライアント
    const axios = Axios.create({
        baseURL: 'https://api.line.me/v2/bot/',
        headers: {
            authorization: `Bearer ${process.env.CHANNEL_ACCESS_TOKEN}`
        }
    });
    // {
    //     "destination": "U09816cbb66f47b52439034e267624bdd",
    //     "events": [
    //         {
    //             "type": "message",
    //             "message": {
    //                 "type": "text",
    //                 "id": "14635305814473",
    //                 "text": "こんにちは"
    //             },
    //             "timestamp": 1629927717459,
    //             "source": {
    //                 "type": "user",
    //                 "userId": "Uc6d1807d59a0d007bee5567a44d2ebea"
    //             },
    //             "replyToken": "283100e2afbc4cc8a968ffc3ccf0f479",
    //             "mode": "active"
    //         }
    //     ]
    // }

    const comprehend = new Comprehend();
    const sentiment = await comprehend.batchDetectSentiment({
        LanguageCode: 'ja',
        TextList: [
            event.events[0].message.text
        ]
    }).promise();

    console.log(JSON.stringify(sentiment));

    let responseText = 'ふだんどおりが一番だね';
    const {
        Sentiment,
        SentimentScore
    } = sentiment.ResultList[0];

    switch (Sentiment) {
        case 'POSITIVE':
            if (SentimentScore.Positive > 0.90) {
                responseText = '今日もガンガンいきましょう！';
            } else if (SentimentScore.Positive > 0.60) {
                responseText = 'きっと今日もバッチリ';
            }
            break;
        case 'NEGATIVE':
            if (SentimentScore.Negative > 0.90) {
                responseText = 'いのちを大事に。。';
            } else if (SentimentScore.Negative > 0.60) {
                responseText = 'なにか元気ないね。嫌なことあった？';
            }
            break;
        case 'NEUTRAL': break;
        case 'MIXED': break;
        default: break;
    }
    console.log(responseText);

    // 返信するメッセージ
    const res = await axios.post('/message/reply', {
        replyToken: event.events[0].replyToken,
        messages: [
            {
                type: 'text',
                text: responseText
            }
        ]
    });
    console.log(res);

    return {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!'),
    };
};
