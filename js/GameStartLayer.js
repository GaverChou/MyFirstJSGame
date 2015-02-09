/**
 * Created by GaverChou on 2015-02-07.
 */
var GameStartLayer = {
    parent: null,
    width: 640,
    height: 960,
    item: [],
    index: 0,
    init: function (parent) {
        this.parent = parent;
        var panel = this.createPanel(0, 0, this.width, this.height);
        var startBtn = this.createBtn('开始游戏', 1, 200, 70);
        startBtn.select();
        var rankBtn = this.createBtn('排行榜', 2, 200, 70);
        var endBtn = this.createBtn('退出游戏', 3, 200, 70);
        panel.appendChild(startBtn);
        panel.appendChild(rankBtn);
        panel.appendChild(endBtn);
        this.item.push(startBtn);
        this.item.push(rankBtn);
        this.item.push(endBtn);
        parent.appendChild(panel);
        this.index = 0;
        document.onkeydown = this._KeyControl;
        return this;
    },
    createDiv: function () {
        var div = document.createElement('div');
        return div;
    },
    createBtn: function (name, index, w, h) {
        var div = this.createDiv();
        div.style.position = "absolute";
        div.innerHTML = name;
        div.style.width = w + "px";
        div.style.height = h + "px";
        div.style.left = (this.width - w) / 2 + 'px';
        div.style.top = h / 2 + index * this.height / 6 + "px";
        div.style.textAlign = "center";
        div.style.backgroundColor = "blue";
        div.style.border = "solid 1px black";
        div.select = function () {
            this.style.backgroundColor = "pink";
        };
        div.unselect = function () {
            this.style.backgroundColor = "blue";
        };
        return div;
    },
    createPanel: function (x, y, w, h) {
        var div = this.createDiv();
        div.style.position = "absolute";
        div.style.width = w + "px";
        div.style.height = h + "px";
        div.style.left = x + "px";
        div.style.top = y + "px";
        div.style.backgroundColor = "white";
        div.style.textAlign = "center";
        div.style.border = "solid 1px black";
        div.select = function () {
            this.style.backgroundColor = "white";
        };
        div.unselect = function () {
            this.style.backgroundColor = "black";
        };
        return div;
    },
    _KeyControl: function(event) {
        event = event || window.event;
        GameStartLayer._KControl(event);
        return false;
    },
    _KControl: function (event) {
        switch (event.keyCode) {
            case ActionType.KeyUp:
            {
                if (this.index > 0) {
                    for (var i = 0; i < this.item.length; i++) {
                        this.item[i].unselect();
                    }
                    this.item[--this.index].select();
                }
            }
                break;
            case ActionType.KeyDown:
            {
                if (this.index < 2) {
                    for (var i = 0; i < this.item.length; i++) {
                        this.item[i].unselect();
                    }
                    this.item[++this.index].select();
                }
            }
                break;
            case ActionType.KeyEnter:
            {
                alert('开始游戏');
            }
                break;
            default:
            {
            }
                break;
        }
    }
};