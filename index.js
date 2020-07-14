/*
 * @Author: omtech.cn 
 * @Date: 2020-07-03 10:41:46 
 * @Last Modified by: OMT.Xu
 * @Last Modified time: 2020-07-13 17:35:29
 */

'use strict'

window.param = { 
    $time:'#J_time .item',
    $choose:'#J_choose',
    $filtrate:'.J_filtrate',
    $menuBtn:'.J_menu',
    $menu:'.J_menu_box',
    $container:'.container',
    $mod:'.black-mod',
    $close:'.J_close',
    $menuClose:'.J_menu_close',
    flag:true,
    menusDom:'',
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
}

$(document).ready(function() {
    // 初始化菜单树
    toHtml(param.menuData);
    $("#J_menu_ul").html(param.menusDom);
    // active效果
    $('.J_active').on('touchstart',function(){
        $(this).addClass('active');
    })
    $('.J_active').on('touchend',function(){
        $(this).removeClass('active');
    })
})


/**
 *生成树dom
 *
 * @param {数据来源：Array} data
 */
function toHtml (data) {
    if(data.length>0) {
        if(param.flag){
            param.menusDom += '<ul>';
        } else {
            param.menusDom += '<ul class="dn">';
        }
        for (var i in data) {
            if(data[i].children && data[i].children.length>0){
                param.menusDom += '<li class="item J_active">';
                param.menusDom +=    '<i class="icon-down J_down" onclick=showChild(this,event)></i>';
                param.menusDom +=        '<a class="name" href="javascript:void(0);" onclick=showChild(this,event)>'+ data[i].value +'</a>';
            }
            else{
                param.menusDom += '<li class="item J_active">';
                param.menusDom +=        '<a class="name" href="#">'+ data[i].value +'</a>';
            }
            // 递归出口
            if(data[i].children && data[i].children.length>0){
                param.flag = false;
                toHtml(data[i].children)
            }
            param.menusDom += '</li>';
        }
        param.menusDom += '</ul>';
    }
}

// 下拉按钮 
function showChild (that,e) {
    var _that = $(that);
    _that.parent('.item').find('.icon-down:first').toggleClass('J_show');
    _that.parent('.item').toggleClass('open');
    _that.parent('.item').find('.name:first').toggleClass('blue');
    _that.parent('.item').find('ul:first').addClass("son").slideToggle();
    // 阻止冒泡
    e.stopPropagation(); 
    return false;
}