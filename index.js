exports.handler = async (event) => {
    // TODO implement
    console.log(JSON.stringify(event));
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
    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!'),
    };
    return response;
};