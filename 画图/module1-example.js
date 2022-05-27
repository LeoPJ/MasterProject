var data1 = [];
var data2 = [];
var data3 = [];
var data4 = [];
var categories = ['镜头分类'];
var type2color = {
    'A': '#7b9ce1',
    'B': '#e0bc78',
    'C': '#bd6d6c',
    'D': '#75d874'
};
var tyep2name = {
    'A': '投影内容全屏镜头',
    'B': '讲台区域聚焦镜头',
    'C': '教室后方全景镜头',
    'D': '教室前方全景镜头'
};
var dataSource = [
    {name: 'B', startTime: 1, endTime: 150},
    {name: 'D', startTime: 151, endTime: 157},
    {name: 'C', startTime: 158, endTime: 167},
    {name: 'D', startTime: 168, endTime: 179},
    {name: 'C', startTime: 180, endTime: 187},
    {name: 'B', startTime: 188, endTime: 226},
    {name: 'D', startTime: 227, endTime: 239},
    {name: 'B', startTime: 240, endTime: 369},
    {name: 'A', startTime: 370, endTime: 374},
    {name: 'C', startTime: 375, endTime: 400},
    {name: 'D', startTime: 401, endTime: 404},
    {name: 'B', startTime: 405, endTime: 628},
    {name: 'A', startTime: 629, endTime: 651},
    {name: 'B', startTime: 652, endTime: 799},
    {name: 'A', startTime: 800, endTime: 814},
    {name: 'B', startTime: 815, endTime: 829},
    {name: 'D', startTime: 830, endTime: 837},
    {name: 'C', startTime: 838, endTime: 840},
    {name: 'D', startTime: 841, endTime: 867},
    {name: 'B', startTime: 868, endTime: 943}
];

for (var i = 0; i < dataSource.length; i++) {
    if (dataSource[i].name == 'A') {
        data1.push({
            name: tyep2name[dataSource[i].name],
            value: [0, dataSource[i].startTime, dataSource[i].endTime, dataSource[i].endTime - dataSource[i].startTime],
            itemStyle: {normal: {color: type2color[dataSource[i].name]}}
        })
    } else if (dataSource[i].name == 'B') {
        data2.push({
            name: tyep2name[dataSource[i].name],
            value: [0, dataSource[i].startTime, dataSource[i].endTime, dataSource[i].endTime - dataSource[i].startTime],
            itemStyle: {normal: {color: type2color[dataSource[i].name]}}
        })
    } else if (dataSource[i].name == 'C') {
        data3.push({
            name: tyep2name[dataSource[i].name],
            value: [0, dataSource[i].startTime, dataSource[i].endTime, dataSource[i].endTime - dataSource[i].startTime],
            itemStyle: {normal: {color: type2color[dataSource[i].name]}}
        })
    } else if (dataSource[i].name == 'D') {
        data4.push({
            name: tyep2name[dataSource[i].name],
            value: [0, dataSource[i].startTime, dataSource[i].endTime, dataSource[i].endTime - dataSource[i].startTime],
            itemStyle: {normal: {color: type2color[dataSource[i].name]}}
        })
    }
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

option = {
    tooltip: {
        formatter: function (params) {
            return params.marker + params.name + ': ' + params.value[3] + ' s';
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
            top: 300,
            labelFormatter: ''
        },
        {
            type: 'inside',
            filterMode: 'weakFilter'
        }
    ],
    grid: {
        top: 120,
        height: 50
    },
    xAxis: {
        scale: true,
        name: '视频时间（mm : ss）',
        nameLocation: 'center',
        nameGap: 39,
        min: 720,
        max: 940,
        nameTextStyle: {fontSize: 19},
        interval: 44,
        axisLabel: {
            formatter: function (val) {
                return changeTime(val-720);
            },
            fontSize: 18
        },
        axisLine: {
            show: true,
            lineStyle: {color: '#000000', width: 1}
        }
    },
    yAxis: {
        data: [{value: '镜头分类', textStyle: {fontSize: 18, color: '#000000'}}],
        axisLabel: {margin: 13},
        axisLine: {lineStyle: {color: '#000000', width: 1.5}}
    },
    color: ['#7b9ce1', '#e0bc78', '#bd6d6c', '#75d874'],
    legend: {
        data: ['投影内容全屏镜头', '讲台区域聚焦镜头', '教室后方全景镜头', '教室前方全景镜头'],
        textStyle: {fontSize: 17, color: '#000000'},
        itemGap: 15,
        top: 65
    },
    series: [
        {
            type: 'custom',
            name: tyep2name['A'],
            renderItem: renderItem,
            markPoint: {
              data : [{coord: [808, 0], label: {show: true}}],
              symbol: 'pin',
              symbolSize: 35,
              symbolOffset: [0, '-40%'],
              itemStyle: {color: '#FF0000'},
              label: {show: true, formatter: 'A', fontSize: 14, fontWeight: 'bold'},
            },
            itemStyle: {
                opacity: 1
            },
            encode: {
                x: [1, 2],
                y: 0
            },
            data: data1
        },
        {
            type: 'custom',
            name: tyep2name['B'],
            renderItem: renderItem,
            markPoint: {
              data : [{coord: [768, 0], label: {show: true}}],
              symbol: 'pin',
              symbolSize: 35,
              symbolOffset: [0, '-40%'],
              itemStyle: {color: '#FF0000'},
              label: {show: true, formatter: 'B', fontSize: 14, fontWeight: 'bold'},
            },
            itemStyle: {
                opacity: 1
            },
            encode: {
                x: [1, 2],
                y: 0
            },
            data: data2
        },
        {
            type: 'custom',
            name: tyep2name['C'],
            renderItem: renderItem,
            markPoint: {
              data : [{coord: [838, 0], label: {show: true}}],
              symbol: 'pin',
              symbolSize: 35,
              symbolOffset: ['5%', '-40%'],
              itemStyle: {color: '#FF0000'},
              label: {show: true, formatter: 'C', fontSize: 14, fontWeight: 'bold'},
            },
            itemStyle: {
                opacity: 1
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
            markPoint: {
              data : [{coord: [858, 0], label: {show: true}}],
              symbol: 'pin',
              symbolSize: 35,
              symbolOffset: [0, '-40%'],
              itemStyle: {color: '#FF0000'},
              label: {show: true, formatter: 'D', fontSize: 14, fontWeight: 'bold'},
            },
            itemStyle: {
                opacity: 1
            },
            encode: {
                x: [1, 2],
                y: 0
            },
            data: data4
        }
    ]
};