// Inšpirácia: https://jsfiddle.net/soulwire/4ooupev9/


// Funkcia na enkódovanie

function encode( s ) {
    //var tmp = [];
    s = encodeURIComponent(s);
    const tmp = new Uint8Array(s.length);
    for ( var i = 0; i < s.length; i++ ) {
        // out[i] = s.charCodeAt(i);
        tmp[i] = s.charCodeAt(i)+1; // +1 pre "šifrovanie", inak vyhodí čitateľný JSON
        // treba ošetriť max prvok
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/charCodeAt
        if (tmp[i] > 65535)
            tmp[i] = 0;
    }
    //return String.fromCharCode.apply(null,tmp);
    return String.fromCharCode(...new Uint8Array(tmp));
}

function decode( s ) {
    var objectString = "";
    var i;
    for (i in s) {
        code = s.charCodeAt(i)-1;
        if (code < 0)
            code = 0;
        objectString += String.fromCharCode(code);
    }
    var a = objectString.split('');
    if (a[a.length-1] == "%")
        a.pop();
    objectString = a.join('');
    objectString = decodeURIComponent(objectString);
    return objectString;
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Cyclic_object_value
const getCircularReplacer = () => {
    const seen = new WeakSet();
    return (key, value) => {
        if (typeof value === "object" && value !== null) {
        if (seen.has(value)) {
            return;
        }
        seen.add(value);
        }
        return value;
    };
};

function exportGame(duel) {
    exportValues = {
        level: duel.level,
        chamber: duel.chamber,
        score: duel.score,
    }
    var base = btoa(encode(JSON.stringify(exportValues,getCircularReplacer())));
    return base;
}

function importGame(base) {
    try {
        var o = Object.setPrototypeOf(JSON.parse(decode(atob(base))),Duel.prototype);
        duel.level = o.level;
        duel.chamber = o.chamber;
        duel.score = o.score;
        duel.switchChamber(duel.level,duel.chamber);
    }
    catch {
        return 0;
    }
    return this.duel;
}

function downloadSave(base) {
    try {
        var blob = new Blob( [ base ], {
            type: 'application/octet-stream'
        });

        url = URL.createObjectURL( blob );
        var link = document.createElement( 'a' );
        link.setAttribute( 'href', url );
        link.setAttribute( 'download', 'saveThePrincess.txt' );

        var event = document.createEvent( 'MouseEvents' );
        event.initMouseEvent( 'click', true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
        link.dispatchEvent( event );
    }
    catch {
        return 0;
    }
    return 1;
}

// Samotné enkódovanie v onclick fnc. tlačidla pomocou JSON.stringify

// var button = document.getElementById( 'button' );
// button.addEventListener( 'click', function() {
    
//     var data = encode( JSON.stringify(hello, null, 4) );
//     // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify

//     var blob = new Blob( [ data ], {
//         type: 'application/octet-stream'
//     });
    
//     url = URL.createObjectURL( blob );
//     var link = document.createElement( 'a' );
//     link.setAttribute( 'href', url );
//     link.setAttribute( 'download', 'example.json' );
    
//     var event = document.createEvent( 'MouseEvents' );
//     event.initMouseEvent( 'click', true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
//     link.dispatchEvent( event );
// });

// Otestuj spätné dekódovanie premennej alebo vloženého súboru pomocou nejakej reverzie fnc. encode, najprv bez "+1"
// Použi JSON.parse() https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse