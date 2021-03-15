var app = (function () {

    var author = null;
    var plano = null;

    var init = function () {
        var canvas = document.getElementById("myCanvas");
        console.info('initialized');
        console.log(offset)
        var offset = getOffset(canvas);
        if (window.PointerEvent) {
            canvas.addEventListener("pointerdown", _Draw);
        }
        else {
            canvas.addEventListener("mousedown", function (event) {
                alert('mousedown at ' + + ',' + event.clientY - offset.top);
            });
        }
    };

    function getOffset(obj) {
        var offsetLeft = 0;
        var offsetTop = 0;
        do {
            if (!isNaN(obj.offsetLeft)) {
                offsetLeft += obj.offsetLeft;
            }
            if (!isNaN(obj.offsetTop)) {
                offsetTop += obj.offsetTop;
            }
        } while (obj = obj.offsetParent);
        return { left: offsetLeft, top: offsetTop };
    }

    function _Draw(event) {
        console.log("Entro a dibujar", author, plano);
        if (author != null && plano != null) {
            var canvas = document.getElementById("myCanvas");
            var offset = getOffset(canvas);
            console.log(plano);
            apimok.addPoint(
                author,plano,{
                    x: event.pageX - offset.left,
                    y: event.pageY - offset.top
                }
            );
            _drawPlan(plano);
        }
    }



    var _funcModify = function (variable) {
        if (variable != null) {
            var arreglo = variable.map(function (blueprint) {
                return { key: blueprint.name, value: blueprint.points.length }
            })
            $("#tabla tbody").empty();
            arreglo.map(function (blueprint) {
                var temporal = '<tr><td id="nombreActor">' + blueprint.key + '</td><td id="puntos">' + blueprint.value + '</td><td type="button" class="button" onclick="app.drawPlan(\'' + blueprint.key + '\')">Open</td></tr>';
                $("#tabla tbody").append(temporal);
            })

            var valorTotal = arreglo.reduce(function (total, valor) {
                return total.value + valor.value;
            })
            document.getElementById("autorLabel").innerHTML = author;
            document.getElementById("puntosLabel").innerHTML = valorTotal;
        }
    };

    var _drawPlan = function (name) {
        author = document.getElementById("autor").value;
        obra = name;
        console.log(name);
        //apiclient.getBlueprintsByNameAndAuthor(author, obra, _funcDraw);
        apimok.getBlueprintsByNameAndAuthor(author, obra, _funcDraw);
    }


    var _funcDraw = function (vari) {
        if (vari) {
            author = vari.author;
            plano = vari.name;
            console.log(author, plano);
            var lastx = null;
            var lasty = null;
            var actx = null;
            var acty = null;
            var c = document.getElementById("myCanvas");
            var ctx = c.getContext("2d");

            ctx.clearRect(0, 0, 700, 450);
            ctx.beginPath();

            vari.points.map(function (prue) {
                if (lastx == null) {
                    lastx = prue.x;
                    lasty = prue.y;
                } else {
                    actx = prue.x;
                    acty = prue.y;
                    ctx.moveTo(lastx, lasty);
                    ctx.lineTo(actx, acty);
                    ctx.stroke();
                    lastx = actx;
                    lasty = acty;
                }
            });
        }
    }
    return {
        init: init,

        plansAuthor: function () {
            author = document.getElementById("autor").value;
            //apiclient.getBlueprintsByAuthor(author, _funcModify);
            apimok.getBlueprintsByAuthor(author, _funcModify);
        },

        drawPlan: _drawPlan
    };
})();