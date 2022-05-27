var video = []
for (var i = 0; i < 10; i++){
  video.push('片段' + (i+1));
}
var full_t = [56.1, 91.4, 80.3, 74.3, 65.9, 70.6, 92.7, 68.8, 59.1, 97.3];
var part_t = [20.6, 39.5, 27.4, 22.3, 29.6, 28.7, 33.4, 21.5, 22.6, 32.9];


option = {
   legend: {
        textStyle: {fontSize: 18, color: '#000000'},
        itemGap: 70,
        top: 50
    },
    grid: {
      top: 100,
      height: 250
    },
  xAxis: {
    type: 'category',
    data: video,
    name: '视频片段',
    nameLocation: 'center',
    nameGap: 45,
    nameTextStyle: {fontSize: 20},
    axisLine: {
            show: true,
            lineStyle: {color: '#000000', width: 1},
            // symbol: ['none', 'arrow'],
            // symbolSize: [7, 10],
            // symbolOffset: [0, 7]
     },
    axisLabel: {
            fontSize: 16,
            margin: 13
    },
  },
  yAxis: {
    type: 'value',
     name: '计算时长（秒）',
        nameLocation: 'center',
        nameGap: 50,
        nameTextStyle: {fontSize: 20},
            axisLabel: {
            fontSize: 16,
            margin: 13
        },
        axisLine: {
            show: true, lineStyle: {color: '#000000', width: 1.5},
            // symbol: ['none', 'arrow'],
            // symbolSize: [7, 10],
            // symbolOffset: [0, 7]
        }
  },
  series: [
    {
      name: '按序相邻比较',
      data: full_t,
      type: 'bar',
      // barWidth : 50,
      label: {
        show: true,
        position: 'top',
        textStyle: {fontSize: 14, color: '#000000'}
      },
      itemStyle: {
        color: '#009ACD'
      }
    },
    {
      name: '跳跃抽样检测',
      data: part_t,
      type: 'bar',
      // barWidth : 50,
      label: {
        show: true,
        position: 'top',
        textStyle: {fontSize: 14, color: '#000000'}
      },
      itemStyle:{
        color: '#32CD32'
      }
    },
  ]
};