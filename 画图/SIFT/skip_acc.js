var full_c = [16, 9, 20, 12, 23, 10, 15, 15, 7, 18]; //按序相邻比较，检出的正确镜头数
var full_t = [22, 13, 29, 16, 31, 15, 18, 22, 9, 24]; //按序相邻比较，检出的镜头数
var part_c = [16, 8, 19, 12, 22, 10, 14, 15, 7, 17]; //跳跃抽样检测，检出的正确镜头数
var part_t = [23, 11, 28, 15, 31, 15, 18, 21, 9, 24]; //跳跃抽样检测，检出的镜头数
var a = [17, 9, 21, 12, 24, 10, 15, 16, 7, 19]; //标答

var video = []
for (var i = 0; i < 10; i++){
  video.push('片段' + (i+1));
}

var full_precision = [];
var full_recall = [];
var part_precision = [];
var part_recall = [];
// var f1 = [];

for (var i = 0; i < 10; i++){
    full_precision.push(full_c[i]/full_t[i]);
    full_recall.push(full_c[i]/a[i]);
    part_precision.push(part_c[i]/part_t[i]);
    part_recall.push(part_c[i]/a[i]);
}

option = {
  // title: {
  //   text: 'Stacked Line'
  // },
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    // data: ['Precision', 'Recall', 'F1'],
    textStyle: {fontSize: 17, color: '#000000'},
        itemGap: 40,
        top: 45
  },
  grid: {
      top: 100,
        height: 250
    },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
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
    name: '评价指标计算结果',
        nameLocation: 'center',
        nameGap: 45,
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
        },
      min: 0.4
  },
  series: [
    {
      name: 'Precision(按序相邻比较)',
      type: 'line',
      lineStyle: {width: 3},
      data: full_precision,
      itemStyle: {color : '#009ACD'},
      symbolSize: 7,
      //       label: {
      //   show: true,
      //   position: 'top'
      // },
    },
    {
      name: 'Recall(按序相邻比较)',
      type: 'line',
      lineStyle: {width: 3, type: 'dotted'},
      data: full_recall,
      itemStyle: {color : '#009ACD'},
      symbolSize: 7,
      symbol: 'roundRect'
    },
    {
      name: 'Precision(跳跃抽样检测)',
      type: 'line',
      lineStyle: {width: 3},
      data: part_precision,
      itemStyle: {color : '#32CD32'},
      symbolSize: 7,

    },
    {
      name: 'Recall(跳跃抽样检测)',
      type: 'line',
      lineStyle: {width: 3, type: 'dotted'},
      data: part_recall,
      itemStyle: {color : '#32CD32'},
      symbolSize: 7,
      symbol: 'roundRect'
    },
  ]
};