// 获取当前设备的屏幕宽度
var documentWidth = window.screen.availWidth;
// 定义游戏大方块的宽度
var gridContainerWidth = 0.92 * documentWidth
// 定义每一个小方块的边长
var cellSideLength = 0.18 * documentWidth
// 定义小方块之间的间距
var cellSpace = 0.04 * documentWidth

// 计算小格子的css定位值
function getPosTop(i) {
  return cellSpace + i * (cellSideLength + cellSpace)
}

function getPosLeft(j) {
  return cellSpace + j * (cellSideLength + cellSpace)
}

// 样式会随着显示数字的不同而不同
function getNumberBackgroundColor(number) {
  switch (number) {
    case 2:
      return "#eee4da";
      break;
    case 4:
      return "#ede0c8";
      break;
    case 8:
      return "#f2b179";
      break;
    case 16:
      return "#f59563";
      break;
    case 32:
      return "#f67c5f";
      break;
    case 64:
      return "#f65e3b";
      break;
    case 128:
      return "#edcf72";
      break;
    case 256:
      return "#edcc61";
      break;
    case 512:
      return "#9c0";
      break;
    case 1024:
      return "#33b5e5";
      break;
    case 2048:
      return "#09c";
      break;
    case 4096:
      return "#a6c";
      break;
    case 8192:
      return "#93c";
      break;
  }
  return "black";
}

function getNumberColor(number) {
  if (number <= 4) {
    return "#776e65"
  }
  return "white"
}

// 判断棋盘格内还有没有空间
function noSpace(board) {
  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      if (board[i][j] == 0) {
        return false
      }
    }
  }
  return true;
}

// 判断当前的局势是否能够想左移动
function canMoveLeft(board) {
  for (var i = 0; i < 4; i++) {
    for (var j = 1; j < 4; j++) {
      // 如果当前元素处有数字
      if (board[i][j] != 0) {
        if (board[i][j - 1] == 0 || board[i][j - 1] == board[i][j]) {
          return true
        }
      }
    }
  }
  return false
}

// 判断当前的局势是否能够想右移动
function canMoveRight(board) {
  for (var i = 0; i < 4; i++) {
    for (var j = 2; j > 0; j--) {
      // 如果当前元素处有数字
      if (board[i][j] != 0) {
        if (board[i][j + 1] == 0 || board[i][j + 1] == board[i][j]) {
          return true
        }
      }
    }
  }
  return false
}

// 判断当前的局势是否能够向上移动
function canMoveUp() {
  for (var j = 0; j < 4; j++) {
    for (var i = 1; i < 4; i++) {
      // 如果当前元素处不为o
      if (board[i][j] != 0) {
        if (board[i - 1][j] == 0 || board[i - 1][j] == board[i][j]) {
          return true
        }
      }
    }
  }
  return false
}

// 判断当前的局势是否能够向下移动
function canMoveDown() {
  for (var j = 0; j < 4; j++) {
    for (var i = 2; i >= 0; i--) {
      // 如果当前元素处不为o
      if (board[i][j] != 0) {
        if (board[i + 1][j] == 0 || board[i + 1][j] == board[i][j]) {
          return true
        }
      }
    }
  }
  return false
}

// 判断横向路径上没有其他元素
function noBlockHorizontal(row, col1, col2, board) {
  for (var i = col1 + 1; i < col2; i++) {
    if (board[row][i] != 0) {
      return false
    }
  }
  return true
}
// 判断纵向路径上没有其他元素
function noBlockVertical(row1, row2, col, board) {
  for (var i = row1 + 1; i < row2; i++) {
    if (board[i][col] != 0) {
      return false
    }
  }
  return true
}

function noMove(board) {
  if (canMoveDown(board) || canMoveLeft(board) || canMoveRight(board) || canMoveUp(board)) {
    return true
  }
  return false
}