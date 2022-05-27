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
    [1, 11, 13, 1],
    [2, 14, 109, 1],
    [3, 110, 161, 1],
    [4, 162, 189, 1],
    [4, 190, 264, 1],
    [4, 265, 416, 0],
    [5, 417, 597, 1],
    [5, 598, 699, 0],
    [5, 700, 718, 0],
    [5, 719, 720, 0],
    [5, 721, 774, 0],
    [6, 776, 940, 1],
    [6, 941, 962, 1],
    [3, 963, 964, 1],
    [7, 965, 1060, 1],
    [7, 1061, 1082, 1],
    [3, 1083, 1085, 1],
    [8, 1086, 1147, 1],
    [8, 1148, 1267, 1],
    [8, 1268, 1282, 1],
    [8, 1283, 1314, 1],
    [8, 1315, 1339, 1],
    [8, 1340, 1379, 1],
    [8, 1384, 1428, 1],
    [8, 1435, 1472, 1],
    [8, 1473, 1556, 1],
    [8, 1557, 1558, 1],
    [8, 1559, 1586, 0],
    [8, 1635, 1860, 0],
    [8, 1861, 1882, 0],
    [3, 1883, 1883, 1],
    [9, 1884, 1885, 1],
    [2, 1886, 1953, 1],
    [10, 1954, 1955, 1],
    [11, 1956, 1956, 1],
    [11, 1957, 2239, 1],
    [12, 2240, 2279, 1],
    [13, 2280, 2295, 1],
    [10, 2296, 2298, 1],
    [14, 2299, 2307, 1],
    [15, 2308, 2321, 1],
    [16, 2322, 2375, 1],
    [17, 2376, 2378, 1],
    [16, 2379, 2381, 1],
    [17, 2390, 2411, 1],
    [17, 2412, 2514, 1],
    [17, 2515, 2517, 1],
    [18, 2518, 2541, 1]
]

var topic = [
  ['无教学主题', 0, 10],
    ['无教学主题', 2382, 2389],
    ['本章概述', 11, 13],
    ['数据库设计', 14, 109],
    ['数据库设计概述', 110, 161],
    ['数据库设计不合理的表现', 162, 416],
    ['数据库设计的一些思考', 417, 774],
    ['数据库设计的特点', 776, 962],
    ['数据库设计概述', 963, 964],
    ['数据库设计方法', 965, 1082],
    ['数据库设计概述', 1083, 1085],
    ['数据库设计的基本步骤', 1086, 1882],
    ['数据库设计概述', 1883, 1883],
    ['数据库设计过程中的各级模式', 1884, 1885],
    ['数据库设计', 1886, 1953],
    ['需求分析', 1954, 1955],
    ['需求分析的任务', 1956, 2239],
    ['需求分析的重点', 2240, 2279],
    ['需求分析的难点', 2280, 2295],
    ['需求分析', 2296, 2298],
    ['需求分析的方法', 2299, 2307],
    ['调查用户需求的具体步骤', 2308, 2321],
    ['常用调查方法', 2322, 2375],
    ['进一步分析和表达用户需求', 2376, 2378],
    ['常用调查方法', 2379, 2381],
    ['进一步分析和表达用户需求', 2390, 2517],
    ['需求分析过程', 2518, 2541]
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

// categories.push(ppt_time);
// categories.push(no_topic);

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
        height: 440,
        right: 20,
        left: 150
    },
    xAxis: {
        min: 0,
        scale: true,
        max: 'dataMax',
        name: '视频时间（mm : ss）',
        nameLocation: 'center',
        nameGap: 33,
        nameTextStyle: {fontSize: 19},
        interval: 231,
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
              if (value.length > 8) {
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
          {name: 'A', coord: [175, 4], label: {show: true}},
          {name: 'B', coord: [245, 4], label: {show: true}},
          {name: 'C', coord: [380, 4], label: {show: true}},
          {name: 'D', coord: [1115, 8], label: {show: true}},
          {name: 'E', coord: [1410, 8], label: {show: true}},
          {name: 'F', coord: [1570, 8], label: {show: true}},
          {name: 'G', coord: [1624, 8], label: {show: true}},
          {name: 'H', coord: [1760, 8], label: {show: true}},
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