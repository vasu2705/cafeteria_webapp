// var result = document.getElementById('random_String');
// 	function random_String_Generator() {
// 		result.innerHTML = Math.random().toString(36).slice(2);
// 	}

var form = document.getElementById("form");

form.addEventListener("mousemove", (e) => {
  var x = (window.innerWidth / 2 - e.pageX) / 12;
  var y = (window.innerHeight / 2 - e.pageY) / 12;

  form.style.transform = "rotateX(" + x + "deg)rotateY(" + y + "deg)";
});

form.addEventListener("mouseleave", function () {
  form.style.transform = "rotateX(0deg) rotateY(0deg)";
});
