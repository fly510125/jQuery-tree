# JQ-tree-
基于JQ实现的tree支持移动端。可自行扩展

------ 数据格式，理论可无限层级 ---------
menuData: [
        {
            "value": "热力图",
        },
        {
            "value": "数据概览",
        },
        {
            "value": "趋势分析",
            "children": [{
                "value": "趋势分析-1",
            },
            {
                "value": "趋势分析-2",
            },
            {
                "value": "趋势分析-3",
            }]
        },
        {
            "value": "实时访客",
        },
        {
            "value": "访问分析",
            "children": [{
                "value": "受访域名",
            },
            {
                "value": "受访页面",
            },
            {
                "value": "入口页分析",
            }]
        },
        {
            "value": "用户分析",
            "children": [{
                "value": "用户地域",
            },
            {
                "value": "用户留存",
            }]
        }
    ]
