// 存储游戏数据的数组
var board = new Array()
// 存储游戏分数
var score = 0
// 记录每一个小格子是否已经发生过一次叠加
hasConflicted = new Array()

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
  generateOneNumber();
  generateOneNumber();
}

// 定义函数init()实现初始化棋盘的功能，即通过双重循环获取每一个小格子的坐标值，从而拼接出每一个小格子的id值。使用jQuery向每一个小格子添加css定位属性。
function init() {
  // 初始化小格子的位置
  // 双重循环获取每一个小格子的坐标值
  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      // 获取每一个小格子的id值
      var gridCell = $('#grid-cell-' + i + '-' + j);
      // 通过计算，设置每一个小格子在css中的top和left值
      gridCell.css('top', getPosTop(i))
      gridCell.css('left', getPosLeft(j))
    }
  }

  // 将一维数组board设定为二维数组，且每个元素值都为0
  for (var i = 0; i < 4; i++) {
    // 将每一个元素再一次设置为一个数组。使得board成为一个二维数组
    board[i] = new Array()
    hasConflicted[i] = new Array()
    // 将二维数组board中的每一个值都设置为0
    for (var j = 0; j < 4; j++) {
      board[i][j] = 0
      hasConflicted[i][j] = false
    }
  }

  // 通知前端需要对number-cell元素进行样式和内容上的设定。
  updateBoardView();

  // 初始化分数
  score = 0
}

function updateBoardView() {
  // 如果当前的页面里已经有了number-cell元素时，要将其都删除掉
  $(".number-cell").remove();
  // 根据当前的board的值来添加新的number-cell元素。
  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      $("#grid-container").append('<div class="number-cell" id="number-cell-' + i + '-' + j + '"></div>')
      // 操作当前坐标下的number-cell
      var theNumberCell = $('#number-cell-' + i + '-' + j);
      // 设置当前number-cell的具体属性
      if (board[i][j] == 0) {
        // 此时number-cell是不显示的(测试display:none)
        theNumberCell.css('width', '0px')
        theNumberCell.css('height', '0px')
        // 将number-cell的位置放在grid-celld(100*100px)的中间
        theNumberCell.css('top', getPosTop(i) + 50)
        theNumberCell.css('left', getPosLeft(j) + 50)
      } else {
        // 此时number-cell是显示的
        theNumberCell.css('width', '100px')
        theNumberCell.css('height', '100px')
        // 将number-cell的位置与grid-celld一致
        theNumberCell.css('top', getPosTop(i))
        theNumberCell.css('left', getPosLeft(j))
        // 当前显示的number-cell的样式换会随着显示数字的不同而不同
        theNumberCell.css('background-color', getNumberBackgroundColor(board[i][j]))
        theNumberCell.css('color', getNumberColor(board[i][j]))
        // 显示数字的值
        theNumberCell.text(board[i][j])
      }
      hasConflicted[i][j] = false
    }
  }
}

// 随机在格子里生成一个数字
function generateOneNumber() {
  // 首先判断当前情况，还能不能在生成一个数字了。
  if (noSpace(board))
    return false;
  // 随机一个位置(random()生成0~1的随机浮点数)
  var randx = parseInt(Math.floor(Math.random() * 4))
  var randy = parseInt(Math.floor(Math.random() * 4))
  // 判断随机位置上是否有数字
  var times = 0
  while (times < 50) {
    if (board[randx][randy] == 0)
      break;
    // 重新生成位置
    randx = parseInt(Math.floor(Math.random() * 4))
    randy = parseInt(Math.floor(Math.random() * 4))

    times++
  }
  if (times == 50) {
    // 人工寻找一个可以生成的位置
    for (var i = 0; i < 4; i++) {
      for (var j = 0; j < 4; j++) {
        if (board[i][j] == 0) {
          randx = i;
          randy = j
        }
      }
    }
  }
  // 随机一个数字(同等概率生成2或4)
  var randNumber = Math.random() < 0.5 ? 2 : 4
  // 在随机位置上显示随机数字
  board[randx][randy] = randNumber
  // 在前端显示
  showNumberAnimation(randx, randy, randNumber)
  return true;
}

$(document).keydown(function (event) {
  switch (event.keyCode) {
    // ←
    case 37:
      // 移动所有能向左移动的函数
      if (moveLeft()) {
        // 移动成功以后，生成一个新的数字
        setTimeout("generateOneNumber()", 210)
        // 判断游戏是否结束
        setTimeout("isGameOver()", 300)
      }
      break;
      // ↑
    case 38:
      // 移动所有能向左移动的函数
      if (moveUp()) {
        // 移动成功以后，生成一个新的数字
        setTimeout("generateOneNumber()", 210)
        // 判断游戏是否结束
        setTimeout("isGameOver()", 300)
      }
      break;
      // →
    case 39:
      // 移动所有能向左移动的函数
      if (moveRight()) {
        // 移动成功以后，生成一个新的数字
        setTimeout("generateOneNumber()", 210)
        // 判断游戏是否结束
        setTimeout("isGameOver()", 300)
      }

      break;
      // ↓
    case 40:
      // 移动所有能向左移动的函数
      if (moveDown()) {
        // 移动成功以后，生成一个新的数字
        setTimeout("generateOneNumber()", 210)
        // 判断游戏是否结束
        setTimeout("isGameOver()", 300)
      }
      break;
    default:
      break;
  }
});

function moveLeft() {
  // 判断当前的局势是否能够想左移动
  if (!canMoveLeft(board))
    return false
  // moveLeft(遍历后三列)
  for (var i = 0; i < 4; i++) {
    for (var j = 1; j < 4; j++) {
      // 如果当前元素处有数字
      if (board[i][j] != 0) {
        // 对当前元素左边的元素都进行一次判定
        for (var k = 0; k < j; k++) {
          if (board[i][k] == 0 && noBlockHorizontal(i, k, j, board)) {
            // 当 当前元素左边的元素为0，并且移动路径中没有障碍物时，发生一次移动
            // 从i,j移动到i,k
            showMoveAnimation(i, j, i, k)
            board[i][k] = board[i][j]
            board[i][j] = 0
            // 这次判断结束
            continue
          } else if (board[i][k] == board[i][j] && noBlockHorizontal(i, k, j, board) && !hasConflicted[i][k]) {
            // 当 当前元素左边的元素与当前元素相等，并且移动路径中没有障碍物时，发生一次移动
            // 从i,j移动到i,k
            showMoveAnimation(i, j, i, k)
            // 数字相加
            board[i][k] += board[i][j];
            board[i][j] = 0
            // 加分
            score += board[i][k]
            // 将分数变化展示到前台
            updateScore(score)
            hasConflicted[i][k] = true
            // 这次判断结束
            continue
          }
        }
      }
    }
  }
  setTimeout("updateBoardView()", 200);
  return true
}

function moveRight() {
  // 判断当前的局势是否能够想左移动
  if (!canMoveRight(board))
    return false
  // moveRight(遍历前三列)
  for (var i = 0; i < 4; i++) {
    for (var j = 2; j >= 0; j--) {
      // 如果当前元素处有数字
      if (board[i][j] != 0) {
        // 对当前元素右边的元素都进行一次判定
        for (var k = 3; k > j; k--) {
          if (board[i][k] == 0 && noBlockHorizontal(i, j, k, board)) {
            // 当 当前元素左边的元素为0，并且移动路径中没有障碍物时，发生一次移动
            // 从i,j移动到i,k
            showMoveAnimation(i, j, i, k)
            board[i][k] = board[i][j]
            board[i][j] = 0
            // 这次判断结束
            continue
          } else if (board[i][k] == board[i][j] && noBlockHorizontal(i, j, k, board) && !hasConflicted[i][k]) {
            // 当 当前元素左边的元素与当前元素相等，并且移动路径中没有障碍物时，发生一次移动
            // 从i,j移动到i,k
            showMoveAnimation(i, j, i, k)
            // 数字相加
            board[i][k] += board[i][j];
            board[i][j] = 0
            // 加分
            score += board[i][k]
            // 将分数变化展示到前台
            updateScore(score)
            hasConflicted[i][k] = true
            // 这次判断结束
            continue
          }
        }
      }
    }
  }
  setTimeout("updateBoardView()", 200);
  return true
}

function moveUp() {
  // 判断当前的局势是否能够向上移动
  if (!canMoveUp(board))
    return false
  // moveUp（遍历后三行）
  for (var j = 0; j < 4; j++) {
    for (var i = 1; i < 4; i++) {
      // 如果当前元素处有数字
      if (board[i][j] != 0) {
        // 对当前元素上面的元素都进行一次判定
        for (var k = 0; k < i; k++) {
          if (board[k][j] == 0 && noBlockVertical(k, i, j, board)) {
            // 当 当前元素上边的元素为0，并且移动路径中没有障碍物时，发生一次移动
            // 从i,j移动到k,j
            showMoveAnimation(i, j, k, j)
            board[k][j] = board[i][j]
            board[i][j] = 0
            // 这次判断结束
            continue
          } else if (board[k][j] == board[i][j] && noBlockVertical(k, i, j, board) && !hasConflicted[k][j]) {
            // 当 当前元素上边的元素与当前元素相等，并且移动路径中没有障碍物时，发生一次移动
            // 从i,j移动到k,j
            showMoveAnimation(i, j, k, j)
            // 数字相加
            board[k][j] += board[i][j];
            board[i][j] = 0
            // 加分
            score += board[k][j]
            // 将分数变化展示到前台
            updateScore(score)
            hasConflicted[k][j] = true
            // 这次判断结束
            continue
          }
        }
      }
    }
  }
  setTimeout("updateBoardView()", 200);
  return true
}

function moveDown() {
  // 判断当前的局势是否能够向上移动
  if (!canMoveDown(board))
    return false
  // moveDown（遍历前三行）
  for (var j = 0; j < 4; j++) {
    for (var i = 2; i >= 0; i--) {
      // 如果当前元素处有数字
      if (board[i][j] != 0) {
        // 对当前元素上面的元素都进行一次判定
        for (var k = 3; k > i; k--) {
          if (board[k][j] == 0 && noBlockVertical(i, k, j, board)) {
            // 当 当前元素上边的元素为0，并且移动路径中没有障碍物时，发生一次移动
            // 从i,j移动到k,j
            showMoveAnimation(i, j, k, j)
            board[k][j] = board[i][j]
            board[i][j] = 0
            // 这次判断结束
            continue
          } else if (board[k][j] == board[i][j] && noBlockVertical(i, k, j, board) && !hasConflicted[k][j]) {
            // 当 当前元素上边的元素与当前元素相等，并且移动路径中没有障碍物时，发生一次移动
            // 从i,j移动到k,j
            showMoveAnimation(i, j, k, j)
            // 数字相加
            board[k][j] += board[i][j];
            board[i][j] = 0
            // 加分
            score += board[k][j]
            // 将分数变化展示到前台
            updateScore(score)
            hasConflicted[k][j] = true
            // 这次判断结束
            continue
          }
        }
      }
    }
  }
  setTimeout("updateBoardView()", 200);
  return true
}

function isGameOver() {
  if (noSpace(board) && noMove(board)) {
    gameOver()
  }
}

function gameOver() {
  alert('游戏结束')
}