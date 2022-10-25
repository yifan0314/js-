window.onload = function () {
  // 获取开始界面，为后面动画切换
  var start = document.querySelector(".start");
  // 获取加载界面，为后面动画切换
  var load = document.querySelector(".load");
  // 获取开始按钮
  var btn = document.querySelector(".playbtn");
  // 获取加载条
  var loadTiao = document.querySelector(".loadTiao");
  var loadTiaoWidth = window.getComputedStyle(loadTiao).width;
  // 获取进度
  var progresscon = document.querySelector(".progresscon");
  var spans = document.querySelector(".progresscon span");
  // 获取画布
  var main = document.querySelector(".main");
  // 获取分数
  var fenshu = document.querySelector(".fenshu span");
  var nums = 0;
  // 获取音乐按钮
  var yinyuebtn = document.querySelector(".close");
  // 获取音乐
  var music = document.querySelector("audio");
  // 获取血条宽度
  var xuetiao = document.querySelector(".xuetiao1");

  // 点击开始按钮切换界面并开始加载
  btn.onclick = function () {
    start.style.transform = "translateY(-100%)";

    var t = setInterval(function () {
      var now = parseInt(window.getComputedStyle(progresscon).width);
      //    console.log(now);
      if (now >= 289) {
        clearInterval(t);
        load.style.transform = "translateY(-100%)";
        xialuo();
      }

      //宽度=当前宽度+速度
      progresscon.style.width = now + 5 + "px";
      var width = parseInt((now / 289) * 100) + "%";
      spans.innerHTML = width;
    }, 100);
  };

  // 随机字母
  /* 
    先把26个字母放到数组中，随机数=数组下标——图片
    创建img，随机位置
    */
  function xialuo() {
    var letters = [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
    ];

    function down() {
      var num = Math.floor(Math.random() * 26);
      // 创建一个新的节点
      var img = document.createElement("img");
      var letter = letters[num].toLowerCase();
      img.src = `./img/play/zimu/${letter}.png`;
      img.classList.add(letter);
      //在父元素插入一个节点
      main.appendChild(img);
      img.style.position = "absolute";
      img.style.width = "80px";
      img.style.height = "80px";
      var top = Math.random() * (main.offsetHeight - 10);
      var left = Math.random() * main.offsetWidth;
      img.style.top = top + "px";
      img.style.left = left + "px";
    }
    for (var i = 0; i < 5; i++) {
      down();
    }

    // 落下()
    // top=当前的top+速度
    // top=当前字母距顶部距离+速度
    var t1 = setInterval(function () {
      // 获取生成的字母
      var imgList = document.querySelectorAll(".main img");
      if (imgList.length < 5) {
        for (var i = 0; i < 5 - imgList.length; i++) down();
      }
      for (var i = 0; i < imgList.length; i++) {
        var _top = imgList[i].offsetTop;
        imgList[i].style.top = _top + 10 + "px";
        if (_top >= innerHeight - 80) {
          imgList[i].style.display = "none";
          //删除子节点
          main.removeChild(imgList[i]);
          xuetiaoWidth = parseInt(getComputedStyle(xuetiao).width);
          console.log(xuetiaoWidth);
          xuetiao.style.width = xuetiaoWidth - 11 + "px";
          if (xuetiaoWidth == 0) {
            clearInterval(t1);
            alert("很遗憾，闯关失败!!!");
          }
        }
      }
    }, 50);

    // 消除字母
    // 获取键盘的按键，得到图片的类名，比较，相等，消色并移除
    window.onkeydown = function (e) {
      e = e || enevt;
      console.log(e.key);
      var imgList = document.querySelectorAll(".main img");
      for (var i = 0; i < imgList.length; i++) {
        if (imgList[i].className == e.key) {
          imgList[i].style.display = "none";
          main.removeChild(imgList[i]);
          nums += 10;
          fenshu.innerHTML = nums;
          if (nums == 100) {
            clearInterval(t1);
            alert("恭喜您，已通关！！！");
          }
        }
      }
    };
  }

  //血条消失

  // 音乐开关
  flag = false;
  yinyuebtn.onclick = function () {
    flag = !flag;
    if (flag) {
      music.play();
      yinyuebtn.src = "./img/play/jia.png";
    } else {
      music.pause();
      yinyuebtn.src = "./img/play/close.png";
    }
  };
};
