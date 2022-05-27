var data1 = [];
var data2 = [];
var data3 = [];
var data4 = [];
var categories = [];
var type2color = {
    'D': '#000000',
};
var tyep2name = {
    'D': '幻灯片切换'
};

var dataSource = [];
var dataSource2 = [];

var ppt = [// 第四个0无标题，1有标题
//第一个对应topic索引
    [1, 25, 141, 1],
    [2, 142, 150, 1],
    [3, 165, 174, 1],
    [3, 197, 368, 1],
    [4, 369, 571, 1],
    [5, 572, 701, 1],
    [6, 702, 763, 1],
    [6, 969, 991, 1],
    [7, 1271, 1279, 1],
    [8, 1278, 1305, 1],
    [8, 1351, 1364, 1],
    [9, 1452, 1490, 1],
    [9, 1541, 1690, 1],
    [10, 1753, 1783, 1],
    [10, 1784, 1856, 1],
    [10, 1857, 1883, 0],
    [11, 1884, 2010, 1],
    [11, 2049, 2114, 1],
    [12, 2257, 2301, 1]
]

var topic = [
    ['无教学主题', 1, 25],
    ['无教学主题', 151, 164],
    ['无教学主题', 992, 1272],
    ['无教学主题', 1365, 1451],
    ['无教学主题', 1691, 1752],
    ['无教学主题', 2115, 2256],
    ['无教学主题', 2302, 2718],
    ['问题导入', 25, 141],
    ['本节学习内容', 142, 150],
    ['1.1 冲突的概念', 165, 368],
    ['1.2 冲突的类型', 369, 571],
    ['1.3 冲突的范围', 572, 701],
    ['1.4 冲突产生的原因', 702, 991],
    ['课堂思考', 1273, 1277],
    ['2.1 冲突的消极作用', 1278, 1364],
    ['2.2 冲突的积极作用', 1452, 1690],
    ['2.3 冲突的程度', 1753, 1883],
    ['2.4 冲突作用的区分', 1884, 2114],
    ['课堂互动', 2257, 2301]
]

for (var i = 0; i < topic.length; i++){
  if (categories.indexOf(topic[i][0]) == -1){
    categories.push(topic[i][0]);
  } 
}

var no_topic = 0;

for (var i = 0; i < topic.length; i++){
  if (topic[i][0] == '无教学主题'){
    no_topic = no_topic + topic[i][2] - topic[i][1];
      dataSource.push({
      name: "无教学主题",
      value: [categories.indexOf(topic[i][0]), topic[i][1], topic[i][2], topic[i][2] - topic[i][1]],
      itemStyle: {normal: {color: '#696969'}}
    }
  )}
  else {
      dataSource.push({
      name: "幻灯片教学主题",
      value: [categories.indexOf(topic[i][0]), topic[i][1], topic[i][2], topic[i][2] - topic[i][1]],
      itemStyle: {normal: {color: '#812990'}}
    }
  )
  }
}

var ppt_time = 0;


for (var i = 0; i < ppt.length; i++){
  ppt_time = ppt_time + (ppt[i][2] - ppt[i][1]);
  if (ppt[i][3] == 0){
     dataSource2.push({
      name: "无标题幻灯片页",
      value: [ppt[i][0], ppt[i][1]+2, ppt[i][2]-2, ppt[i][2] - ppt[i][1]-4],
      itemStyle: {normal: {color: '#FFD700'}}
    }
  )
  }
  else {
    dataSource2.push({
      name: "有标题幻灯片页",
      value: [ppt[i][0], ppt[i][1]+2, ppt[i][2]-2, ppt[i][2] - ppt[i][1]-4],
      itemStyle: {normal: {color: '#BFEFFF'}}
    }
  )}
}

// categories.push(ppt_time);
// categories.push(no_topic);

function changeTime(value) {
    let theTime = value;//秒
    let middle = 0;//分
    let hour = 0;//小时
    if (theTime > 59) {
        middle = parseInt(theTime / 60);
        theTime = parseInt(theTime % 60);
    }
    if (middle > 59) {
        hour = parseInt(middle / 60);
        middle = parseInt(middle % 60);
    }
    theTime < 10 ? theTime = '0' + theTime : theTime = theTime
    middle < 10 ? middle = '0' + middle : middle = middle
    hour < 10 ? hour = '0' + hour : hour = hour
    return middle + ':' + theTime
}

function renderItem(params, api) {
    var categoryIndex = api.value(0);
    var start = api.coord([api.value(1), categoryIndex]);
    var end = api.coord([api.value(2), categoryIndex]);
    var height = api.size([0, 1])[1] * 1;
    var rectShape = echarts.graphic.clipRectByRect(
        {
            x: start[0],
            y: start[1] - height / 2,
            width: end[0] - start[0],
            height: height
        },
        {
            x: params.coordSys.x,
            y: params.coordSys.y,
            width: params.coordSys.width,
            height: params.coordSys.height
        }
    );
    return (
        rectShape && {
            type: 'rect',
            transition: ['shape'],
            shape: rectShape,
            style: api.style()
        }
    );
}


function renderItem2(params, api) {
    var categoryIndex = api.value(0);
    var start = api.coord([api.value(1), categoryIndex]);
    var end = api.coord([api.value(2), categoryIndex]);
    var height = api.size([0, 1])[1] * 0.36;
    var rectShape = echarts.graphic.clipRectByRect(
        {
            x: start[0],
            y: start[1] - height / 2,
            width: end[0] - start[0],
            height: height
        },
        {
            x: params.coordSys.x,
            y: params.coordSys.y,
            width: params.coordSys.width,
            height: params.coordSys.height
        }
    );
    return (
        rectShape && {
            type: 'rect',
            transition: ['shape'],
            shape: rectShape,
            style: api.style()
        }
    );
}

option = {
    color: ['#812990','#696969','#BFEFFF','#FFD700'],
    legend: {
        data: ['幻灯片教学主题','无教学主题','有标题幻灯片页', '无标题幻灯片页'],
        textStyle: {fontSize: 18, color: '#000000'},
        itemGap: 30,
        // top: 40
    },
    tooltip: {
        formatter: function (params) {
            return params.marker + params.name + ': ' + changeTime(params.value[1]) 
            + '-' + changeTime(params.value[2]);
        }
    },
    toolbox: {
       feature: {saveAsImage: {pixelRatio: 2}}
    },
    // title: {
    //     text: 'Profile',
    //     left: 'center'
    // },
    // dataZoom: [
    //     {
    //         type: 'slider',
    //         filterMode: 'weakFilter',
    //         showDataShadow: false,
    //         top: 0,
    //         labelFormatter: ''
    //     },
    //     {
    //         type: 'inside',
    //         filterMode: 'weakFilter'
    //     }
    // ],
    grid: {
        height: 340,
        right: 30,
        left: 150,
    },
    xAxis: {
        min: 0,
        scale: true,
        max: 'dataMax',
        name: '视频时间（mm : ss）',
        nameLocation: 'center',
        nameGap: 33,
        nameTextStyle: {fontSize: 19},
        interval: 389,
        axisLabel: {
            formatter: function (val) {
                return changeTime(val);
            },
            fontSize: 17
        },
        axisLine: {
            show: true,
            lineStyle: {color: '#000000', width: 1}
        },
        splitLine: {show: true}
    },
    yAxis: {
        data: categories,
        name: '幻灯片教学主题',
        nameLocation: 'end',
        nameGap: 15,
        nameTextStyle: {fontSize: 19, align: 'right'},
        axisLabel: {margin: 8, fontSize: 13,
            formatter: function (value) {
              let valueTxt = ''
              if (value.length > 15) {
                valueTxt = value.substring(0, 8) + '...'
              } else {
                valueTxt = value + " "
              }
              return valueTxt
            }
        },
        axisLine: {lineStyle: {color: '#000000', width: 1}}
    },
    series: [
    {
      name: '幻灯片教学主题',
      type: 'custom',
      renderItem: renderItem,
      itemStyle: {
        opacity: 1
      },
      encode: {
        x: [1, 2],
        y: 0
      },
      data: dataSource,
    },
    {
      name: '无教学主题',
      type: 'custom',
      renderItem: renderItem,
      itemStyle: {
        opacity: 1
      },
      encode: {
        x: [1, 2],
        y: 0
      },
      data: dataSource,
    },
    {
      name:'有标题幻灯片页',
      type: 'custom',
      renderItem: renderItem2,
      itemStyle: {
        opacity: 1,
      },
      encode: {
        x: [1, 2],
        y: 0
      },
      data: dataSource2,
        markPoint: {
        data : [
          {name: 'A', coord: [2084, 11], label: {show: true}},
          {name: 'B', coord: [2222,0], label: {show: true}},
          {name: 'C', coord: [2270, 12], label: {show: true}},
          {name: 'D', coord: [2391, 0], label: {show: true}},
          {name: 'E', coord: [2637, 0], label: {show: true}},
        ],
        symbol: 'circle',
        symbolSize: 5,
        // symbolRotate: 180,
        // symbolOffset: [0, '-70%'],
        itemStyle: {color: '#FF0000'},
        label: {show: true, formatter: '{b}', fontSize: 16, color: '#FFFFFF',
        textBorderColor: '#FF0000', textBorderWidth: 4,
                fontWeight: 'bold', offset: [5, 15]},
       },
    },
    {
      name:'无标题幻灯片页',
      type: 'custom',
      renderItem: renderItem2,
      itemStyle: {
        opacity: 1,
      },
      encode: {
        x: [1, 2],
        y: 0
      },
      data: dataSource2,
    }
  ]
};