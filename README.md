# autobot

This bot will run tests scenarios with controlled result. This will help to setup pre-conditions of test to be faster. 

## Bet By Batch
Placing bets with multiple scenarios. 

- **API** https://l1-proxy1.lumigame.com/autobot/bet-by-batch?game=[GameName]

- **Params** 
```js
{
    "TC001": {
        "gameName": "MagicForest",
        "amount": 1,
        "betChoice": "0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24",
        "board": "6,4,1,3,8,4,2,8,8,6,8,1,6,4,2",
        "freeSpin": false
    },
    "TC002": {
        "gameName": "MagicForest",
        "amount": 0.1,
        "betChoice": "0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24",
        "board": "6,4,1,3,5,4,2,9,8,6,7,1,6,4,2",
        "freeSpin": false
    }
}
```

- **Response**
```js
{
    "result": {
        "TC001": {
            "roundId": 19259
        },
        "TC002": {
            "roundId": 19260
        }
    }
}
```
