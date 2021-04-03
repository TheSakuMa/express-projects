"use strict";

window.addEventListener("load", function () {
  const saveAsFileBtn = document.getElementById("saveAsFileBtn");

  if (saveAsFileBtn) {
    // innerHTMLで取得されるのは、JSONオブジェクトではなく、文字列であることを留意
    const dataElement = document.getElementById("data").innerHTML;

    saveAsFileBtn.addEventListener("click", function (event) {
      event.preventDefault();
      saveAsFile(dataElement);
    });
  }
});

function saveAsFile(targetData) {
  // Blobコンストラクタの第一引数は、配列
  const blob = new Blob([targetData], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  // a要素を一時的に生成
  const a = document.createElement("a");
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const date = today.getDate();
  const hours = today.getHours();
  const minutes = today.getMinutes();
  document.body.appendChild(a);
  /**
   * String.prototype.slice()
   * str.slice(beginIndex[, endIndex])
   * beginIndex は、取り出しを開始する位置を示すインデックスで、
   * -2の場合、str.length + (-2) が開始位置となる
   */
  a.download = year.toString() + ('0' + month.toString()).slice(-2) + ('0' + date.toString()).slice(-2) + "_" + (hours.toString()).slice(-2) + (minutes.toString()).slice(-2) + ".json";
  a.href = url;
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
