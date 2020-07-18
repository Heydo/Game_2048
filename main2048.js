// 存储游戏数据的数组
var board = new Array()
// 存储游戏分数
var score = 0

// 页面DOM元素加载结束后，立即执行
$(document).ready(function () {
  // 开始一个新的游戏(头部的标签按钮相应的也是这个函数)
  newGame();
});

// 定义newGame函数
function newGame() {
  // 初始化棋盘
  init();
  // 在随机两个格子中生成2或4的数字
}

// 定义函数init()实现初始化棋盘的功能，即通过双重循环获取每一个小格子的坐标值，从而拼接出每一个小格子的id值。使用jQuery向每一个小格子添加css定位属性。
function init() {
  // 双重循环获取每一个小格子的坐标值
  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      // 获取每一个小格子的id值
      var gridCell = $("#grid-cell-" + i + "-" + j);
      // 通过计算，设置每一个小格子在css中的top和left值
      gridCell.css('top', getPosTop(i))
      gridCell.css('left', getPosLeft(j))
    }
  }
}