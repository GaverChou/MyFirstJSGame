/**
 * Created by GaverChou on 2015-02-08.
 * 需要改进的地方有：
 * 1.方块消除的时候是一行一行消除的，并且没有将数组向下移动；
 * 2.方块旋转的时候，田字形方块有问题；
 * 3.位置不能至中；
 * 4.在方块下落的瞬间无法左右移动；
 * 5.还没有绘制下一个方块的panel，游戏结束判断没做，分数记录没做，方块出现的位置需要改进；
 * 6.有几处代码重复，可以简化；
 * 7.没有按‘下’，方块加速的操作。
 */
var GameScene = {
    arr: null,
    type: null,
    nowBlock: null,
    width: 640,
    height: 960,
    wSize: 10,
    hSize: 18,
    blockWidth: this.width,
    blockHeight: this.height,
    blockArr: [],
    speed: 600,
    init: function (parent) {
        this.blockWidth = this.width / this.wSize;
        this.blockHeight = this.height / this.hSize;
        this.arr = new Array(this.hSize);
        for (var i = 0; i < this.hSize; i++) {
            this.arr[i] = new Array(this.wSize);
        }
        for (var i = 0; i < this.wSize; i++) {
            for (var j = 0; j < this.hSize; j++) {
                var b = GameStartLayer.createPanel(i * this.blockWidth, j * this.blockHeight, this.blockWidth, this.blockHeight);
                parent.appendChild(b);
                this.blockArr.push(b);
            }
        }
        this.nowBlock = BlockFactory.randomblock();
        document.onkeydown = this._KeyControl;
        setInterval('GameScene.paint()', this.speed);
    },
    //这里的0,1,2需要替换成变量，比较易读
    paint: function () {
        this.moveDown();
        for (var i = 0; i < this.wSize; i++) {
            for (var j = 0; j < this.hSize; j++) {
                if (this.arr[i][j] != 1 && this.arr[i][j] != 2) {
                    this.blockArr[i * this.hSize + j].select();
                } else {
                    this.blockArr[i * this.hSize + j].unselect();
                }
            }
        }
    },
    //判断是否超出了游戏范围与是否已经到达某个方块上方
    isDown: function (block) {
        for (var i = 0; i < block.length; i++) {
            if (!(block[i].y < this.hSize - 1 && block[i].y >= -1)) {
                return false;
            }
            if (this.arr[block[i].x][block[i].y + 1] == 1) {
                return false;
            }
        }
        return true;
    },
    //可能再处理后没有将2置换成1,并且下降的时候会把前面的覆盖掉//调试后发现是左右移动判断时出错
    moveDown: function () {
        this.eraise();
        //检查是否到底，是的话产生新的方块
        if (this.isDown(this.nowBlock)) {
            for (var i = 0; i < this.nowBlock.length; i++) {
                this.arr[this.nowBlock[i].x][this.nowBlock[i].y] = 0;
            }
            for (var i = 0; i < this.nowBlock.length; i++) {
                this.nowBlock[i].y += 1;
                this.arr[this.nowBlock[i].x][this.nowBlock[i].y] = 2;
            }
        } else {
            this.change2One();
            this.nowBlock = BlockFactory.randomblock();
        }
    },
    //方块停止运动时需要将数组置1
    change2One: function () {
        for (var i = 0; i < this.nowBlock.length; i++) {
            this.arr[this.nowBlock[i].x][this.nowBlock[i].y] = 1;
        }
    },
    //这里边界检测注意理解
    canRightMove: function (block) {
        for (var i = 0; i < block.length; i++) {
            if (block[i].x >= this.wSize - 1) {
                return false;
            }
            if (this.arr[block[i].x + 1][block[i].y] == 1) {
                return false;
            }
        }
        return true;
    },
    canLeftMove: function (block) {
        for (var i = 0; i < block.length; i++) {
            if (block[i].x <= 0) {
                return false;
            }
            if (this.arr[block[i].x - 1][block[i].y] == 1) {
                return false;
            }
        }
        return true;
    },
    //这里由于闭包问题，可以this会出错
    _KeyControl: function (event) {
        event = event || window.event;
        GameScene.keyEvent(event);
        return false;
    },
    keyEvent: function (e) {
        switch (event.keyCode) {
            case ActionType.KeyLeft:
            {
                this.lMove();
            }
                break;
            case  ActionType.KeyRight:
            {
                this.rMove();
            }
                break;
            case  ActionType.KeyUp:
            {
                this.rotation();
            }
                break;
            default:
            {
            }
                break;
        }
    },
    eraise: function () {
        for (var i = 0; i < this.hSize; i++) {
            if (this.eraiseOneRow(i)) {
                return;
            }
        }
    },
    //还要将上面的行掉下来，没有刷新行
    eraiseOneRow: function (i) {
        for (var j = 0; j < this.wSize; j++) {
            if (this.arr[j][i] != 1) {
                return false;
            }
        }
        for (var j = 0; j < this.wSize; j++) {
            this.arr[j][i] = 0;
        }
        //for (var j = 0; j < this.wSize; j++) {
        //    console.log(this.arr[j][i]);
        //}
        return true;
    },
    canRotate: function (rotateBlock) {
        for (var i = 0; i < rotateBlock.length; i++) {
            if (!(rotateBlock[i].y < this.hSize - 1 && rotateBlock[i].y >= -1 && rotateBlock[i].x < this.wSize - 1 && rotateBlock[i].x >= -1)) {
                return false;
            }
            if (this.arr[rotateBlock[i].x][rotateBlock[i].y] == 1) {
                return false;
            }
        }
        return true;
    },
    rotation: function () {
        var tmp = BlockFactory.ratate(this.nowBlock);
        if (this.canRotate(tmp)) {
            //应该不需要重置方块
            for (var i = 0; i < this.nowBlock.length; i++) {
                this.arr[this.nowBlock[i].x][this.nowBlock[i].y] = 0;
            }
            this.nowBlock = tmp;
            for (var i = 0; i < this.nowBlock.length; i++) {
                this.arr[this.nowBlock[i].x][this.nowBlock[i].y] = 2;
            }
            this.paint();
        }
    },
    rMove: function () {
        //检查是否到底，是的话产生新的方块,这里造成了无法在到底瞬间左右移动，需要改进
        if (this.isDown(this.nowBlock) && this.canRightMove(this.nowBlock)) {
            for (var i = 0; i < this.nowBlock.length; i++) {
                this.arr[this.nowBlock[i].x++][this.nowBlock[i].y] = 0;
                this.arr[this.nowBlock[i].x][this.nowBlock[i].y] = 2;
            }
            if (!this.isDown(this.nowBlock)) {
                this.change2One();
            }
            this.paint();
        }
    },
    lMove: function () {
        //检查是否到底，是的话产生新的方块
        if (this.isDown(this.nowBlock) && this.canLeftMove(this.nowBlock)) {
            for (var i = 0; i < this.nowBlock.length; i++) {
                this.arr[this.nowBlock[i].x--][this.nowBlock[i].y] = 0;
                this.arr[this.nowBlock[i].x][this.nowBlock[i].y] = 2;
            }
            if (!this.isDown(this.nowBlock)) {
                this.change2One();
            }
            this.paint();
        }
    }
}