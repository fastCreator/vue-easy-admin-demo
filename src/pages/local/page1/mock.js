module.exports = {
  'get:/v1/apis/tableList' (req) {
    let arr = new Array(req.query.pageSize-0).fill(0)
    return {
      code: 200,
      data: {
        list: arr.map(it => ({
          id: Math.random(),
          name: '张三',
          age: parseInt(Math.random() * 80),
          sex: 0,
          mother: '吴**',
          father: '张**',
          birth: '2000-01-02',
          color: 'red',
          input: '输入值1',
          select: 'zhangsan',
          audio: 'http://m4a.inke.cn/sktv/ori/m4a_64/12/20/1000382_9605.m4a',
          header:
            'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3139953554,3011511497&fm=26&gp=0.jpg'
        })),
        pages: {
          allSize: 110
        }
      }
    }
  }
}
