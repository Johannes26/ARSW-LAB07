
var apimok = (function () {
    var _mockdata = [];
    _mockdata["JhonConnor"] = [
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
    _mockdata["LexLuthor"] = [
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
    var getBlueprintsByAuthor = function (name, callback) {
        callback(
            _mockdata[name]
        );
    };

    var getBlueprintsByNameAndAuthor = function (autor, obra, callback) {
        callback(
            _mockdata[autor].filter(prueb => { return prueb.name === obra; })[0]
        );
    };

    var addPoint = (autor, obra, point) => {
        var p = _mockdata[autor].filter(obj => obj.name === obra)[0].points.push(point);
    }
    return {
        getBlueprintsByAuthor: getBlueprintsByAuthor,
        getBlueprintsByNameAndAuthor: getBlueprintsByNameAndAuthor
    }
})();