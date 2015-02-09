/**
 * Created by GaverChou on 2015-02-08.
 * 用于生产方块类型数组，与旋转方块的类
 */
var BlockFactory = {
    TIAN: 0,
    L: 1,
    Z: 2,
    T: 3,
    AL: 4,
    AZ:5,
    AT: 6,
    I: 7,
    createBlock: function (type) {
        var block = new Array(4);
        switch (type) {
            case BlockFactory.TIAN:
            {
                block[0] = {x: 5, y: 0};
                block[1] = {x: 6, y: 0};
                block[2] = {x: 5, y: -1};
                block[3] = {x: 6, y: -1};
            }
                break;
            case BlockFactory.L:
            {
                block[3] = {x: 5, y: -1};
                block[2] = {x: 5, y: 0};
                block[1] = {x: 5, y: 1};
                block[0] = {x: 6, y: 1};
            }
                break;
            case BlockFactory.Z:
            {
                block[3] = {x: 5, y: -1};
                block[2] = {x: 6, y: -1};
                block[1] = {x: 6, y: 0};
                block[0] = {x: 7, y: 0};
            }
                break;
            case BlockFactory.AZ:
            {
                block[3] = {x: 7, y: -1};
                block[2] = {x: 6, y: -1};
                block[1] = {x: 6, y: 0};
                block[0] = {x: 5, y: 0};
            }
                break;
            case BlockFactory.T:
            {
                block[3] = {x: 5, y: -1};
                block[2] = {x: 6, y: -1};
                block[1] = {x: 7, y: -1};
                block[0] = {x: 6, y: 0};
            }
                break;
            case BlockFactory.AT:
            {
                block[3] = {x: 5, y: 0};
                block[2] = {x: 6, y:0};
                block[1] = {x: 7, y: 0};
                block[0] = {x: 6, y:-1};
            }
                break;
            case BlockFactory.AL:
            {
                block[3] = {x: 6, y: -1};
                block[2] = {x: 6, y: 0};
                block[1] = {x: 6, y: 1};
                block[0] = {x: 5, y: 1};
            }
                break;
            case BlockFactory.I:
            {
                block[3] = {x: 6, y: -1};
                block[2] = {x: 6, y: 0};
                block[1] = {x: 6, y: 1};
                block[0] = {x: 6, y: 2};
            }
                break;
            default :
            {
            }
        }
        return block;
    },
    randomblock: function () {
        var type = parseInt(Math.random() * 8);
        return this.createBlock(type);
    },
    copyBlock: function (src) {
        var target = new Array(src.length);
        for (var i = 0; i < src.length; i++) {
            target[i] = {x: src[i].x, y: src[i].y};
        }
        return target;
    },
    //围绕着圆心旋转，因此步骤为：
    //1.找出中心点
    //2.利用旋转公式算出旋转后的点
    ratate: function (block) {
        var tmpBlock = this.copyBlock(block);
        var cx = 0;
        var cy = 0;
        for (var i = 0; i < block.length; i++) {
            cx += tmpBlock[i].x;
            cy += tmpBlock[i].y;
        }
        cx = Math.round(cx / block.length);
        cy = Math.round(cy / block.length);
        for (var i = 0; i < block.length; i++) {
            tmpBlock[i].x = cx + cy - block[i].y;
            tmpBlock[i].y = cy - cx + block[i].x;
        }
        return tmpBlock;
    }
}