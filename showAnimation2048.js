function showNumberAnimation(i, j, randNumber) {
  // 获取对应位置的numberCell
  var numberCell = $('#number-cell-' + i + '-' + j)
  // 根据位置和值，调用修改样式的函数
  numberCell.css('background-color', getNumberBackgroundColor(randNumber))
  numberCell.css('color', getNumberColor(randNumber))
  numberCell.text(randNumber)

  numberCell.animate({
    width: "100px",
    height: "100px",
    top: getPosTop(i),
    left: getPosLeft(j)
  }, 50)
}

// 移动的动画
function showMoveAnimation(fromX, fromY, toX, toY) {
  // 获取from位置的numberCell
  var numberCell = $('#number-cell-' + fromX + '-' + fromY)
  numberCell.animate({
    top: getPosTop(toX),
    left: getPosLeft(toY)
  }, 200)
}