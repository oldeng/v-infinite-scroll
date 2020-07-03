let rowNum = 6;
async function fetch(count) {
  let data = [];
  console.log("开始获取数据");
  for (let i = 0; i < count; i++) {
    let row = [];
    for (let j = 0; j < 3; j++) {
      row[j] = `r-${rowNum}-c-${j}`;
    }
    rowNum++;
    data.push(row);
  }

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data);
      console.log("获取数据为", data);
    }, 1000);
  });
}

        // let data = await fetch(5).then(data => {
        //   return data;
        // }).catch(err => {
        // });