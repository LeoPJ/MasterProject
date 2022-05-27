var c = [8, 9.8, 13, 14, 17, 17, 17, 17, 17, 17, 17];
var t = [8, 10, 14, 16, 20, 23, 25, 29, 48, 59, 67];
var a = [];

for (var i = 0; i < 11; i++){
  a.push(17);
}

var precision = [];
var recall = [];
var f1 = [];

for (var i = 0; i < 11; i++){
  precision.push(c[i]/t[i]);
  recall.push(c[i]/a[i]);
  f1.push(2*precision[i]*recall[i]/(precision[i]+recall[i]));
}

option = {
  // title: {
  //   text: 'Stacked Line'
  // },
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ['Precision', 'Recall', 'F1'],
    textStyle: {fontSize: 17, color: '#000000'},
        itemGap: 40,
        top: 15
  },
  grid: {
      // top: 150,
      //   height: 200
    },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  xAxis: {
    type: 'category',
    // boundaryGap: false,
    data: [0.10, 0.13, 0.16, 0.19, 0.22, 0.25, 0.28, 0.31, 0.34, 0.37, 0.40],
    name: '相似度阈值',
    nameLocation: 'center',
    nameGap: 45,
    nameTextStyle: {fontSize: 20},
    axisLine: {
           formatter: function (val) {
                return changeTime(val);
            },
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
        }
  },
  series: [
    {
      name: 'Precision',
      type: 'line',
      lineStyle: {width: 3},
      data: precision,
      itemStyle: {color : '#0000CD'},
      symbolSize: 7,
      //       label: {
      //   show: true,
      //   position: 'top'
      // },
    },
    {
      name: 'Recall',
      type: 'line',
      data: recall,
      lineStyle: {width: 3},
      itemStyle: {color : '#00CD00'},
      symbolSize: 7,
    },
    {
      name: 'F1',
      type: 'line',
      data: f1,
      lineStyle: {width: 3},
      itemStyle: {color : '#EE6363'},
      symbolSize: 7,
    }
  ]
};