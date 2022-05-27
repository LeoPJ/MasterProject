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
    [1, 1, 107, 1],
    [1, 108, 119, 0],
    [1, 120, 172, 0],
    [1, 173, 204, 0],
    [1, 205, 251, 0],
    [1, 252, 362, 0],
    [1, 363, 385, 0],
    [1, 386, 395, 0],
    [1, 396, 459, 0],
    [1, 460, 500, 0],
    [1, 501, 568, 0],
    [1, 569, 588, 0],
    [1, 608, 632, 0],
    [2, 633, 717, 1],
    [2, 718, 740, 0],
    [2, 741, 820, 0],
    [2, 821, 915, 0],
    [2, 916, 1009, 0],
    [2, 1010, 1116, 0],
    [2, 1117, 1152, 0],
    [2, 1153, 1197, 0],
    [2, 1198, 1203, 0],
    [2, 1204, 1269, 0],
    [2, 1270, 1285, 0],
    [2, 1286, 1336, 0],
    [2, 1337, 1363, 0],
    [2, 1364, 1474, 0],
    [2, 1475, 1592, 0],
    [2, 1618, 1814, 0],
    [2, 1815, 1958, 0],
    [2, 1959, 2010, 0],
    [2, 2011, 2075, 0],
    [2, 2076, 2164, 0],
]

var ppt_time = 0;
var no_topic = 0;

var topic = [
    ['无教学主题', 2165, 2714],
    ['三、北平大学区与北大学院', 1, 631],
    ['四、蒋梦麟、胡适与北大复兴', 632, 2164]
]

for (var i = 0; i < topic.length; i++){
  if (categories.indexOf(topic[i][0]) == -1){
    categories.push(topic[i][0]);
  } 
}

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
        height: 100,
        right: 30,
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
        interval: 388,
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
                valueTxt = value.substring(0, 8) + '\n' + value.substring(8, value.length)
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
          {name: 'A', coord: [62, 1], label: {show: true}},
          {name: 'B', coord: [291, 1], label: {show: true}},
          {name: 'C', coord: [659, 2], label: {show: true}},
          {name: 'D', coord: [760, 2], label: {show: true}},
          {name: 'E', coord: [2280, 0], label: {show: true}},
          {name: 'F', coord: [2594, 0], label: {show: true}},
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