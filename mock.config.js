
let rowNum = 1;
module.exports = {
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
