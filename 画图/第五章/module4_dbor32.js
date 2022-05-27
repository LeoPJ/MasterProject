var data1 = [];
var data2 = [];
var data3 = [];
var data4 = [];
var categories = ['讲授言语切换', '交互片段', '板书片段'];
var type2color = {
    'A': '#2F4F4F',
    'B': '#FF1493',
    'C': '#00C5CD',
    'D': '#812990',
    'E': '#d69be4'
};
var tyep2name = {
    'A': '讲授言语切换',
    'B': '交互片段',
    'C': '板书片段'
};
var dataSource = [

{name: 'B', startTime: 1983, endTime: 1999},
// {name: 'B', startTime: 2226.67, endTime: 2238.73},


    {name: 'C', startTime: 1621, endTime: 1658},
    {name: 'C', startTime: 1700, endTime: 1710},
    {name: 'C', startTime: 1782, endTime: 1795},


    {name: 'E', startTime: 1538, endTime: 2028},

    {name: 'A', startTime: 1543, endTime: 1558},
    {name: 'A', startTime: 1559, endTime: 1580},
    {name: 'A', startTime: 2010, endTime: 2023},

    {name: 'D', startTime: 1568, endTime: 2016},
];

var board = 0;
var talk = 0;

for (var i = 0; i < dataSource.length; i++) {
    if (dataSource[i].name == 'A') {
        data1.push({
            name: tyep2name[dataSource[i].name],
            value: [2, dataSource[i].startTime, dataSource[i].endTime, dataSource[i].endTime - dataSource[i].startTime],
            itemStyle: {normal: {color: type2color[dataSource[i].name]}}
        })
    } else if (dataSource[i].name == 'B') {
      talk = talk + dataSource[i].endTime - dataSource[i].startTime;
        data2.push({
            name: tyep2name[dataSource[i].name],
            value: [3, dataSource[i].startTime, dataSource[i].endTime, dataSource[i].endTime - dataSource[i].startTime],
            itemStyle: {normal: {color: type2color[dataSource[i].name]}}
        })
    } else if (dataSource[i].name == 'C') {
      board = board + dataSource[i].endTime - dataSource[i].startTime;
        data3.push({
            name: tyep2name[dataSource[i].name],
            value: [4, dataSource[i].startTime, dataSource[i].endTime, dataSource[i].endTime - dataSource[i].startTime],
            itemStyle: {normal: {color: type2color[dataSource[i].name]}}
        })
    } else if (dataSource[i].name == 'D') {
        data4.push({
            name: tyep2name[dataSource[i].name],
            value: [1, dataSource[i].startTime, dataSource[i].endTime, dataSource[i].endTime - dataSource[i].startTime],
            itemStyle: {normal: {color: type2color[dataSource[i].name]}}
        });
    } else if (dataSource[i].name == 'E') {
        data4.push({
            name: tyep2name[dataSource[i].name],
            value: [0, dataSource[i].startTime, dataSource[i].endTime, dataSource[i].endTime - dataSource[i].startTime],
            itemStyle: {normal: {color: type2color[dataSource[i].name]}}
        })
    }
}


var dataSource2 = [];

var ppt = [// 第四个0无标题，1有标题
//第一个对应topic索引
    [1, 1568, 1600, 1],
    [2, 1601, 1606, 1],
    [3, 1607, 1939, 1],
    [4, 1940, 1962, 1],
    [4, 1963, 1978, 1],
    [4, 1979, 2016, 1],
]
var ppt_time = 0;


for (var i = 0; i < ppt.length; i++){
  ppt_time = ppt_time + (ppt[i][2] - ppt[i][1]);
  if (ppt[i][3] == 0){
     dataSource2.push({
      name: "无标题幻灯片页",
      value: [1, ppt[i][1]+2, ppt[i][2]-2, ppt[i][2] - ppt[i][1]-4],
      itemStyle: {normal: {color: '#FFD700'}}
    }
  )
  }
  else {
    dataSource2.push({
      name: "有标题幻灯片页",
      value: [1, ppt[i][1], ppt[i][2], ppt[i][2] - ppt[i][1]],
      itemStyle: {normal: {color: '#BFEFFF'}}
    }
  )}
}



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
    var height = api.size([0, 1])[1] * 0.6;
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
    var height = api.size([0, 1])[1] * 0.25;
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
    dataZoom: [
        {
            type: 'slider',
            filterMode: 'weakFilter',
            showDataShadow: false,
            top: 400,
            labelFormatter: ''
        },
        {
            type: 'inside',
            filterMode: 'weakFilter'
        }
    ],
    grid: {
      left: 145,
        height: 250
    },
    xAxis: {
        min: 1520,
        scale: true,
        max: 2050,
        name: '视频时间（mm : ss）',
        nameLocation: 'center',
        nameGap: 33,
        nameTextStyle: {fontSize: 18},
        interval: 53,
        axisLabel: {
            formatter: function (val) {
                return changeTime(val);
            },
            fontSize: 17
        },
        axisLine: {
            show: true,
            lineStyle: {color: '#000000', width: 1}
        }
    },
    yAxis: {
      // name: '',
      //   nameLocation: 'end',
      //   nameGap: 15,
        nameTextStyle: {fontSize: 19, align: 'right'},
        data: [{value: '生成视频片段', textStyle: {fontSize: 17, color: '#000000'}},
        {value: '教学内容主题', textStyle: {fontSize: 17, color: '#000000'}},
          {value: '讲授情境切换时段', textStyle: {fontSize: 17, color: '#000000'}},
              {value: '交互情境片段', textStyle: {fontSize: 17, color: '#000000'}},
              {value: '板书情境片段', textStyle: {fontSize: 17, color: '#000000'}},
              // {value: board},
              // {value: talk}
              ],
        axisLabel: {margin: 5},
        axisLine: {lineStyle: {color: '#000000', width: 1.5}}
    },
    color: ['#812990','#BFEFFF','#2F4F4F' ,'#FF1493','#00C5CD' ,'#d69be4'],
    legend: {
        data: ['幻灯片内容主题','有标题幻灯片页', '讲授情境切换时段','交互情境片段','板书情境片段' ,'生成视频片段'],
        textStyle: {fontSize: 14, color: '#000000'},
        itemGap: 7,
        top: 25,
        orient: 'vertical',
        backgroundColor: '#FFFFFF',
        borderColor: '#000000',
        borderWidth: 1,
        right: 250
    },
    series: [
        {
            type: 'custom',
            name: '幻灯片内容主题',
            renderItem: renderItem,
            itemStyle: {
                opacity: 0.8
            },
            encode: {
                x: [1, 2],
                y: 0
            },
            data: data1
        },
        {
            type: 'custom',
            name: '有标题幻灯片页',
            renderItem: renderItem,
            itemStyle: {
                opacity: 0.8
            },
            encode: {
                x: [1, 2],
                y: 0
            },
            data: data2
        },
        {
            type: 'custom',
            name: '讲授情境切换时段',
            renderItem: renderItem,
            itemStyle: {
                opacity: 0.8
            },
            encode: {
                x: [1, 2],
                y: 0
            },
            data: data3
        },
                {
            type: 'custom',
            name: '交互情境片段',
            renderItem: renderItem,
            itemStyle: {
                opacity: 0.8
            },
            encode: {
                x: [1, 2],
                y: 0
            },
            data: data3
        },
                {
            type: 'custom',
            name: '板书情境片段',
            renderItem: renderItem,
            itemStyle: {
                opacity: 0.8
            },
            encode: {
                x: [1, 2],
                y: 0
            },
            data: data3
        },
                {
            type: 'custom',
            name: '生成视频片段',
            renderItem: renderItem,
            itemStyle: {
                opacity: 0.8
            },
            encode: {
                x: [1, 2],
                y: 0
            },
            data: data3
        },
        {
            type: 'custom',
            name: tyep2name['D'],
            renderItem: renderItem,
            itemStyle: {
                color: '#812990',
                opacity: 1
            },
            encode: {
                x: [1, 2],
                y: 0
            },
            data: data4,
      markPoint: {
        data : [
          {name: 'A', coord: [1550, 0], label: {show: true}},
          {name: 'B', coord: [1581, 0], label: {show: true}},
          {name: 'C', coord: [1653, 0], label: {show: true}},
          {name: 'D', coord: [1995, 0], label: {show: true}},
          {name: 'E', coord: [2021, 0], label: {show: true}},
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
      data: dataSource2
    }
    ]
};