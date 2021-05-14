window.onload = function () {
  if ($('.easy-pie-chart').length > 0) {
    $('.easy-pie-chart').easyPieChart({
      onStep(from, to, percent) {
        this.el.children[0].innerHTML = `${Math.round(percent)} %`;
      },
    });
  }
}


