var Mock = require('mockjs')
const { Random } = Mock
module.exports = {
  async 'get:/v1/apis/department' (req, delay) {
    await delay(200)
    return {
      code: 200,
      data: [
        {
          id: 1,
          label: '一级 1',
          children: [
            {
              id: 4,
              label: '二级 1-1',
              children: [
                {
                  id: 9,
                  label: '三级 1-1-1'
                },
                {
                  id: 10,
                  label: '三级 1-1-2'
                }
              ]
            }
          ]
        },
        {
          id: 2,
          label: '一级 2',
          children: [
            {
              id: 5,
              label: '二级 2-1'
            },
            {
              id: 6,
              label: '二级 2-2'
            }
          ]
        },
        {
          id: 12,
          label: '一级 2',
          children: [
            {
              id: 15,
              label: '二级 2-1'
            },
            {
              id: 16,
              label: '二级 2-2'
            }
          ]
        },
        ...[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14, 15].map(i => ({
          id: i + 100,
          label: `一级 ${i + 100}`
        }))
      ]
    }
  }
}
