var video = []
for (var i = 0; i < 10; i++){
  video.push('片段' + (i+1));
}
var threshold = [
        0.22,
        0.14,
        0.12,
        {
          value: 0.29,
          itemStyle: {
            color: '#a90000'
          }
        },
        0.20,
        0.16,
        0.24,
        0.28,
        0.26,
        0.11
];


option = {
    grid: {
      // top: 150,
      height: 300
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
     name: '实验阈值结果',
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
      data:threshold,
      type: 'bar',
      barWidth : 50,
      label: {
        show: true,
        position: 'top',
        textStyle: {fontSize: 15, color: '#000000'}
      },
    }
  ]
};