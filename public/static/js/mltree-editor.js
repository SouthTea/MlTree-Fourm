// +----------------------------------------------------------------------
// | MlTreeForum [ THE BEST FORUM ]
// +----------------------------------------------------------------------
// | Copyright (c) 2016-2018 https://mltree.top All rights reserved.
// +----------------------------------------------------------------------
// | Apache License v2 ( https://www.apache.org/licenses/LICENSE-2.0.html )
// +----------------------------------------------------------------------
// | Author: Kingsr <kingsrml@vip.qq.com>
// +----------------------------------------------------------------------

//注册一个全局变量

class MLTeditor {
    constructor(option) {
        this.option = option;
        this.Meditor = new SimpleMDE({
            element: document.getElementById("editor"),
            autofocus: true,
            autosave: {
                enabled: true,
                uniqueId: "MLTFEditor",
                delay: 1000,
            },
            placeholder: "请开始你的创作吧~",
            prompturls: true,
            renderingConfig: {
                codeSyntaxHighlighting: true
            }
        })
    }

    submitData(dataObj, callback) {
        $$.ajax({
            method: 'post',
            url: option.createUrl,
            data: dataObj,
            dataType: 'json',
            success: function (res) {
                callback(res);
            }
        });
    }

    setValue(content = '') {
        this.Meditor.Value(content)
    }

    getValue() {
        return this.Meditor.Value();
    }

    clearValue() {
        this.setValue('');
    }
}

//绑定上传附件事件
$$('#file').on('click', () => {
    mdui.dialog({
        content: "请注册账号，然后将附件上传至网盘后，再将网址粘贴过来。谢谢。<br>推荐MLT网盘、天翼云盘",
        buttons: [
            {
                text: 'MLT网盘',
                close: true,
                onClick: function () {
                    window.open('https://pan.kingsr.cc')
                }
            },
            {
                text: '百度网盘',
                close: true,
                onClick: function () {
                    window.open('https://pan.baidu.com')
                }
            },
            {
                text: '天翼云盘',
                close: true,
                onClick: function () {
                    window.open('https://cloud.189.cn/')
                }
            },
        ]
    })
});

//绑定回复事件
$$('#reply').on('click', function () {
    //切换回复面板可视状态
    $$('#replyPanel').toggleClass('mdui-hidden');
    $$('#editor').toggleClass('mdui-hidden');

    //获取当前设备指定面板宽度
    var device = layui.device(),
        k = '824px';
    if (device.weixin || device.android || device.ios) {
        k = '100%';
    }

    layer.open({
        type: 1,
        anim: 2,
        title: '回复『' + option.subject + '』',
        area: k,
        offset: 'b',
        btn: '发布',
        content: $$('#replyPanel'),
        cancel: function (index, layero) {
            $$('#replyPanel').toggleClass('mdui-hidden');
            $$('#editor').toggleClass('mdui-hidden');
        },
        yes: function (index, layero) {
            var data = $$('#replyPanel').serialize();
            data.reCid = re_cid;
            $$('#editor').toggleClass('mdui-hidden');
            $$('#replyPanel').toggleClass('mdui-hidden');
            editor.clear()
            layer.close(index);
            editor
            $$.ajax({
                method: 'post',
                url: option.commentUrl,
                data: data,
                dataType: 'json',
                success: function (res) {

                }
            });
        }
    });
});