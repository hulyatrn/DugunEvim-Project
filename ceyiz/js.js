
        window.onload = function () {
            document.getElementById("slideRight").onclick = function () {
                document.getElementById('sw-slider').scrollLeft += 350;
            }
            document.getElementById("slideLeft").onclick = function () {
                document.getElementById('sw-slider').scrollLeft -= 350;
            }
        }
    