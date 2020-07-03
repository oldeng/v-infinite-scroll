
let rowNum = 1;
let horizonNum = 0;
module.exports = {
    '/msg': function (req, res, next, Mock){
        let msg = '旅客朋友注意了，由广州南开往长沙南的G3804次列车即将开始检票，请买好G3884次列车的朋友抓紧时间检票上车';
        res.json({
            msg: msg.split('').map(item => {
                return [item]
            })
        })
    },
    '/horizon': function (req, res, next, Mock) {
        res.json(function () {
            let data = [];
            console.log("开始获取数据");
            for (let i = 0; i < 5; i++) {
              let row = [];
              row[0] = horizonNum++;
              row[1] = Mock.Random.cword(1);
              data.push(row);
            }
            return data;
        } ());
    },
    '/list': function (req, res, next, Mock) {
        res.json(function () {
            let data = [];
            console.log("开始获取数据");
            for (let i = 0; i < 5; i++) {
              let row = [];
              let railway = Mock.mock({
                'type|1': ['K', 'G', 'C', 'D', 'T', 'X'],
                'id': Mock.Random.integer(0, 10000)+''
              });
              row[0] = rowNum++;
              row[1] = railway.type+railway.id;
              row[2] = Mock.Random.city();
              row[3] = Mock.Random.city();
              row[4] = Mock.Random.date('HH:mm:ss');
              row[5] = Mock.Random.date('HH:mm:ss');
              row[6] = Mock.mock({
                'state|1': ['检票', '晚点', '准点', '停运']
              }).state
              rowNum++;
              data.push(row);
            }
            return data;
        } ());
    }
}
