//采用立即执行函数，避免变量名冲突
//1.给第一列第二部分设定点击事件
(function () {
    $('.monitor .tabs').on('click', 'a', function () {
        $(this).addClass('active').siblings('a').removeClass('active')
        $('.monitor .content').eq($(this).index()).show().siblings('.content').hide()
    })
    $('.marquee').each(function () {
        var rows = $(this).children().clone()
        $(this).append(rows)
    })
})();
//2.第一列第三部分的Echart图表，点位分布统计部分
(function () {
    var myChart = echarts.init(document.querySelector('.pie'))
    var option = {
        tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        series: [{
            name: "点位统计",
            type: "pie",
            radius: ['10%', '60%'],
            center: ["50%", "50%"],
            roseType: "radius",
            data: [{
                    value: 20,
                    name: "云南"
                },
                {
                    value: 26,
                    name: "北京"
                },
                {
                    value: 24,
                    name: "山东"
                },
                {
                    value: 25,
                    name: "河北"
                },
                {
                    value: 20,
                    name: "江苏"
                },
                {
                    value: 25,
                    name: "浙江"
                },
                {
                    value: 30,
                    name: "四川"
                },
                {
                    value: 38,
                    name: "湖北"
                }
            ],
            label: {
                fontSize: 10
            },
            labelLine: {
                length: 1,
                length2: 7
            }
        }],
    };
    myChart.setOption(option);
    window.addEventListener('resize', function () {
        myChart.resize()
    })
})();
//3.第二列第二部分的图表，全国用户总量统计
(function () {
    var myChart = echarts.init(document.querySelector('.bar'))
    var item = {
        name: '',
        value: 1200,
        // 柱子颜色
        itemStyle: {
            color: '#254065'
        },
        // 鼠标经过柱子颜色
        emphasis: {
            itemStyle: {
                color: '#254065'
            }
        },
        // 工具提示隐藏
        tooltip: {
            extraCssText: 'opacity:0'
        },
    }
    var option = {
        color: new echarts.graphic.LinearGradient(
            //控制渐变方向
            0, 0, 0, 1,
            [{
                    offset: 0,
                    color: '#00fffb'
                }, // 0 起始颜色
                {
                    offset: 1,
                    color: '#0061ce'
                } // 1 结束颜色
            ]
        ),
        tooltip: {
            trigger: 'item', //放到柱子上才会触发
        },
        grid: {
            top: '3%',
            left: '0',
            right: '3%',
            bottom: '3%',
            containLabel: true,
            show: true,
            borderColor: 'rgba(0, 240, 255, 0.3)'
        },
        xAxis: [{
            type: 'category',
            data: ['上海', '广州', '北京', '深圳', '合肥', '', '......', '', '杭州', '厦门', '济南', '成都', '重庆'],
            axisTick: {
                alignWithLabel: false,
                show: false
            },
            axisLabel: {
                color: '#4c9bfd'
            },
            axisLine: {
                lineStyle: {
                    color: 'rgba(0, 240, 255, 0.3)',
                }
            }
        }],
        yAxis: [{
            type: 'value',
            axisTick: {
                alignWithLabel: false,
                show: false
            },
            axisLabel: {
                color: '#4c9bfd'
            },
            axisLine: {
                lineStyle: {
                    color: 'rgba(0, 240, 255, 0.3)',
                }
            },
            splitLine: {
                lineStyle: {
                    color: '#4c9bfd'
                }
            }
        }, ],
        series: [{
            name: '直接访问',
            type: 'bar',
            barWidth: '60%',
            data: [2100, 1900, 1700, 1560, 1400, item, item, item, 900, 750, 600, 480, 240]
        }]
    };
    myChart.setOption(option);
    window.addEventListener('resize', function () {
        myChart.resize()
    })
})();
//4.第三列第一部分，设定点击事件和自动播放
(function () {
    var data = [{
        orders: '20,301,987',
        amount: '99834'
    }, {
        orders: '301,987',
        amount: '9834'
    }, {
        orders: '1,987',
        amount: '3834'
    }, {
        orders: '987',
        amount: '834'
    }]
    $('.order').on('click', '.filter a', function () {
        index = $(this).index()
        $(this).addClass('active').siblings().removeClass('active')
        $('.order h4:eq(0)').text(data[$(this).index()].orders)
        $('.order h4:eq(1)').text(data[$(this).index()].amount)
    })
    var index = 0
    var timer = setInterval(function () {
        index++
        if (index >= 4) {
            index = 0
        }
        $('.order .filter a').eq(index).click()
    }, 2000)
    $('.order').hover(function () {
        clearInterval(timer)
    }, function () {
        clearInterval(timer)
        timer = setInterval(function () {
            index++
            if (index >= 4) {
                index = 0
            }
            $('.order .filter a').eq(index).click()
        }, 2000)
    })
})();
//5.第三列第二部分，销售额统计部分，✨注意此处的tab栏切换，切换的是相应的数据，而不是控制盒子的显示
(function () {
    var data = {
        year: [
            [24, 40, 101, 134, 90, 230, 210, 230, 120, 230, 210, 120],
            [40, 64, 191, 324, 290, 330, 310, 213, 180, 200, 180, 79]
        ],
        quarter: [
            [23, 75, 12, 97, 21, 67, 98, 21, 43, 64, 76, 38],
            [43, 31, 65, 23, 78, 21, 82, 64, 43, 60, 19, 34]
        ],
        month: [
            [34, 87, 32, 76, 98, 12, 32, 87, 39, 36, 29, 36],
            [56, 43, 98, 21, 56, 87, 43, 12, 43, 54, 12, 98]
        ],
        week: [
            [43, 73, 62, 54, 91, 54, 84, 43, 86, 43, 54, 53],
            [32, 54, 34, 87, 32, 45, 62, 68, 93, 54, 54, 24]
        ]
    }
    var myChart = echarts.init(document.querySelector('.line'))
    var option = {
        color: ['#00f2f1', '#ed3f35'],
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            right: '10%',
            textStyle: {
                color: '#4c9bfd'
            },
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true,
            show: true,
            borderColor: '#012f4a'
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            axisTick: {
                show: false
            },
            axisLabel: {
                color: '#4c9bfd',
                fontSize: 10
            },
            axisLine: {
                show: false
            },
            boundaryGap: false
        },
        yAxis: {
            type: 'value',
            axisTick: {
                show: false
            },
            axisLabel: {
                color: '#4c9bfd'
            },
            splitLine: {
                lineStyle: {
                    color: '#012f4a'
                }
            }
        },
        series: [{
                name: '预期销售额',
                type: 'line',
                stack: '总量',
                data: data.year[0],
                smooth: true,
            },
            {
                name: '实际销售额',
                type: 'line',
                stack: '总量',
                data: data.year[1],
                smooth: true,
            }
        ]
    };
    myChart.setOption(option);
    $('.caption').on('click', 'a', function () {
        index = $(this).index() - 1
        $(this).addClass('active').siblings('a').removeClass('active')
        option.series[0].data = data[$(this).attr('data-type')][0]
        option.series[1].data = data[$(this).attr('data-type')][1]
        myChart.setOption(option);
    })
    var index = 0
    var timer = setInterval(function () {
        index++
        if (index >= 4) {
            index = 0
        }
        $('.caption a').eq(index).click()
    }, 2000)
    $('.sales').hover(function () {
            clearInterval(timer)
        },
        function () {
            clearInterval(timer)
            timer = setInterval(function () {
                index++
                if (index >= 4) {
                    index = 0
                }
                $('.caption a').eq(index).click()
            }, 2000)
        })
    window.addEventListener('resize', function () {
        myChart.resize()
    })
})();
//6.第三列第三部分（1），雷达图部分
(function () {
    var myChart = echarts.init(document.querySelector('.radar'))
    var option = {
        tooltip: {
            show: true,
            position: ['50%', '0%'],
            textStyle: {
                fontSize: 6,
                overflow: 'truncate'
            }
        },
        radar: {
            indicator: [{
                    name: '机场',
                    max: 100
                },
                {
                    name: '商场',
                    max: 100
                },
                {
                    name: '火车站',
                    max: 100
                },
                {
                    name: '汽车站',
                    max: 100
                },
                {
                    name: '地铁',
                    max: 100
                }
            ],
            radius: '65%',
            shape: 'circle',
            splitNumber: 4,
            name: {
                textStyle: {
                    color: '#4c9bfd'
                }
            },
            splitLine: {
                lineStyle: {
                    color: 'rgba(255,255,255,0.5)'
                }
            },
            splitArea: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: 'rgba(255, 255, 255, 0.5)'
                }
            }
        },
        series: [{
            name: '北京',
            type: 'radar',
            lineStyle: {
                normal: {
                    color: '#fff',
                    width: 1,
                    opacity: 0.5
                }
            },
            data: [
                [55, 31, 56, 21, 38]
            ],
            symbol: 'circle',
            symbolSize: 4,
            label: {
                show: true,
                fontSize: 10
            },
            itemStyle: {
                color: '#fff'
            },
            areaStyle: {
                color: 'rgba(238, 197, 102, 0.6)',
            }
        }]
    };
    myChart.setOption(option)
    window.addEventListener('resize', function () {
        myChart.resize()
    })
})();
//7.第三列第三部分（2），扇形图部分
(function () {
    var myChart = echarts.init(document.querySelector('.gauge'))
    var option = {
        series: [{
            name: '销售进度',
            type: 'pie',
            radius: ['130%', '150%'],
            center: ['48%', '80%'],
            emphasis: {
                label: {
                    show: true,
                    fontSize: '40',
                    fontWeight: 'bold'
                }
            },
            labelLine: {
                show: false
            },
            startAngle: 180,
            hoverOffset: 0,
            data: [{
                    value: 100,
                    itemStyle: {
                        color: new echarts.graphic.LinearGradient(
                            0,
                            0,
                            0,
                            1,
                            [{
                                    offset: 0,
                                    color: "#00c9e0"
                                },
                                {
                                    offset: 1,
                                    color: "#005fc1"
                                }
                            ]
                        )

                    }
                },
                {
                    value: 100,
                    itemStyle: {
                        color: '#12274d'
                    }
                },
                {
                    value: 200,
                    itemStyle: {
                        color: 'transparent'
                    }
                }
            ]
        }]
    };
    myChart.setOption(option)
    window.addEventListener('resize', function () {
        myChart.resize()
    })
})();
//8.第三列第四部分，热销排行,✨模拟从ajks获取数据，并渲染到页面上
(function () {
    var hotData = [{
            city: '北京', // 城市
            sales: '25, 179', // 销售额
            flag: true, //  上升还是下降
            brands: [ //  品牌种类数据
                {
                    name: '可爱多',
                    num: '9,086',
                    flag: true
                },
                {
                    name: '娃哈哈',
                    num: '8,341',
                    flag: true
                },
                {
                    name: '喜之郎',
                    num: '7,407',
                    flag: false
                },
                {
                    name: '八喜',
                    num: '6,080',
                    flag: false
                },
                {
                    name: '小洋人',
                    num: '6,724',
                    flag: false
                },
                {
                    name: '好多鱼',
                    num: '2,170',
                    flag: true
                },
            ]
        },
        {
            city: '河北',
            sales: '23,252',
            flag: false,
            brands: [{
                    name: '可爱多',
                    num: '3,457',
                    flag: false
                },
                {
                    name: '娃哈哈',
                    num: '2,124',
                    flag: true
                },
                {
                    name: '喜之郎',
                    num: '8,907',
                    flag: false
                },
                {
                    name: '八喜',
                    num: '6,080',
                    flag: true
                },
                {
                    name: '小洋人',
                    num: '1,724',
                    flag: false
                },
                {
                    name: '好多鱼',
                    num: '1,170',
                    flag: false
                },
            ]
        },
        {
            city: '上海',
            sales: '20,760',
            flag: true,
            brands: [{
                    name: '可爱多',
                    num: '2,345',
                    flag: true
                },
                {
                    name: '娃哈哈',
                    num: '7,109',
                    flag: true
                },
                {
                    name: '喜之郎',
                    num: '3,701',
                    flag: false
                },
                {
                    name: '八喜',
                    num: '6,080',
                    flag: false
                },
                {
                    name: '小洋人',
                    num: '2,724',
                    flag: false
                },
                {
                    name: '好多鱼',
                    num: '2,998',
                    flag: true
                },
            ]
        },
        {
            city: '江苏',
            sales: '23,252',
            flag: false,
            brands: [{
                    name: '可爱多',
                    num: '2,156',
                    flag: false
                },
                {
                    name: '娃哈哈',
                    num: '2,456',
                    flag: true
                },
                {
                    name: '喜之郎',
                    num: '9,737',
                    flag: true
                },
                {
                    name: '八喜',
                    num: '2,080',
                    flag: true
                },
                {
                    name: '小洋人',
                    num: '8,724',
                    flag: true
                },
                {
                    name: '好多鱼',
                    num: '1,770',
                    flag: false
                },
            ]
        },
        {
            city: '山东',
            sales: '20,760',
            flag: true,
            brands: [{
                    name: '可爱多',
                    num: '9,567',
                    flag: true
                },
                {
                    name: '娃哈哈',
                    num: '2,345',
                    flag: false
                },
                {
                    name: '喜之郎',
                    num: '9,037',
                    flag: false
                },
                {
                    name: '八喜',
                    num: '1,080',
                    flag: true
                },
                {
                    name: '小洋人',
                    num: '4,724',
                    flag: false
                },
                {
                    name: '好多鱼',
                    num: '9,999',
                    flag: true
                },
            ]
        }
    ]
    var supli = ``
    $.each(hotData, function (index, item) {
        supli += `<li><span>${item.city}</span><span>${item.sales}<s class=${item.flag?'icon-up':'icon-down'}></s></span></li>`
    })
    $('.sup').html(supli)
    $('.sup').on('mouseover', 'li', function () {
        index = $(this).index()
        render($(this))
    })

    function render(that) {
        that.addClass('active').siblings().removeClass('active')
        // hotData[$(this).index()].brands;
        var subli = ``
        $.each(hotData[that.index()].brands, function (i, items) {
            subli += `<li><span>${items.name}</span><span>${items.num} <s class=${items.flag?'icon-up':'icon-down'}></s></span></li>`
        })
        $('.sub').html(subli)
    }
    $('.sup li').eq(0).mouseover()
    var index = 0
    var timer = setInterval(function () {
        index++
        if (index >= $('.sup').children().length) {
            index = 0
        }
        // $('.sup li').eq(index).mouseover()
        render($('.sup li').eq(index))
    }, 2000)
    $(".province .sup").hover(function () {
            clearInterval(timer)
        },
        function () {
            clearInterval(timer)
            timer = setInterval(function () {
                index++
                if (index >= $('.sup').children().length) {
                    index = 0
                }
                // $('.sup li').eq(index).mouseover()
                render($('.sup li').eq(index))
            }, 2000)
        })
})()
// 9.地图部分