
var apimok = (function () {
    var mockdata = [];
    mockdata["JhonConnor"] = [
        {
            author: "JhonConnor",
            name: "house",
            points: [
                {
                    x: 10,
                    y: 20
                },
                {
                    x: 15,
                    y: 25
                },
                {
                    x: 45,
                    y: 25
                }
            ]
        },
        {
            author: "JhonConnor",
            name: "bike",
            points: [
                {
                    x: 30,
                    y: 35
                },
                {
                    x: 40,
                    y: 45
                }
            ]
        }
    ];
    mockdata["LexLuthor"] = [
        {
            author: "LexLuthor",
            name: "kryptonite",
            points: [
                {
                    x: 60,
                    y: 65
                },
                {
                    x: 70,
                    y: 75
                }
            ]
        }
    ];
    return {
        getBlueprintsByAuthor: function (name, callback) {
            callback(
                mockdata[name]
            )
        },

        getBlueprintsByNameAndAuthor: function (autor, obra, callback) {
            callback(
                mockdata[autor].filter(prueb => { return prueb.name === obra; })[0]
            );
        },
        addPoint: (autor, obra, point) => {
            console.log("entro a agregar punto",autor);
            var p = mockdata[autor].filter(obj=>obj.name===obra)[0].points.push(point);
            console.log("allvvvv",p);
        }
    }
})();