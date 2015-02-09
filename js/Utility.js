/**
 * Created by GaverChou on 2015-02-09.
 * 工具类，实现了快速排序（没有用上）
 */
var Utility = {
    QSortByX: function (blockArr, low, high) {
        if(low>=high)return;
        var first = low;
        var last = high;
        var tmpBlock = blockArr[first];
        var key = tmpBlock.x;
        while(first<last){
            while(first<last&&blockArr[last].x<=key){--last;}
            blockArr[first] = blockArr[last];
            while(first<last&&blockArr[first].x>=key){++first;}
            blockArr[last] = blockArr[first];
        }
        blockArr[first] = tmpBlock;
        this.QSortByX(blockArr,low,first-1);
        this.QSortByX(blockArr,first+1,high);
    },
    QSortByY: function (blockArr, low, high) {
        if(low>=high)return;
        var first = low;
        var last = high;
        var tmpBlock = blockArr[first];
        var key = tmpBlock.y;
        while(first<last){
            while(first<last&&blockArr[last].y<=key){--last;}
            blockArr[first] = blockArr[last];
            while(first<last&&blockArr[first].y>=key){++first;}
            blockArr[last] = blockArr[first];
        }
        blockArr[first] = tmpBlock;
        this.QSortByX(blockArr,low,first-1);
        this.QSortByX(blockArr,first+1,high);
    }
}