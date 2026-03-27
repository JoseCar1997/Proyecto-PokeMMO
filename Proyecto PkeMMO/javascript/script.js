window.onload = function() {
    pedirDatos();
};

function pedirDatos() {
    var accesoConcedido = false;
    var arrayDatos = new Array();

    while (!accesoConcedido) {
        arrayDatos['dni'] = prompt("ACCESO RESTRINGIDO\nIndique su DNI:");
        arrayDatos['nombre'] = prompt("Indique su nombre completo:");
        arrayDatos['email'] = prompt("Indique su email:");

        var resultado = validar(arrayDatos);

        if (resultado.esValido) {
            accesoConcedido = true;
            
            var primLetNomMay = function(cadena) {
                return cadena.toLowerCase().split(' ')
                             .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                             .join(' ');
            };
            var letDniMay = (dni) => dni.slice(0, 8) + dni.slice(-1).toUpperCase();

            alert("Acceso concedido.\nBienvenido: " + primLetNomMay(arrayDatos['nombre']));
        } else {
            alert("DATOS INCORRECTOS O NO AUTORIZADOS:\n" + resultado.errores.join("\n"));
        }
    }
}

function validar(datos) {
    var listaErrores = [];
    
    if (datos['nombre'].trim().split(/\s+/).length !== 2) {
        listaErrores.push("- El nombre debe tener 2 palabras.");
    }
    if (!/^[0-9]{8}[a-zA-Z]$/.test(datos['dni'])) {
        listaErrores.push("- El DNI debe tener 8 números y 1 letra.");
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(datos['email'])) {
        listaErrores.push("- El email debe seguir el patrón texto@text.text.");
    }

    var autorizados = [
        { dni: "73677268b", nombre: "sergio sala", email: "sergio@gmail.com" },
        { dni: "20882553w", nombre: "jose carbonell", email: "jose@gmail.com" }
    ];

    var coincide = autorizados.find(u => 
        u.dni === datos['dni'].toLowerCase() && 
        u.nombre === datos['nombre'].toLowerCase() && 
        u.email === datos['email'].toLowerCase()
    );

    if (!coincide && listaErrores.length === 0) {
        listaErrores.push("- Usuario no reconocido en la base de datos.");
    }

    return {
        esValido: (listaErrores.length === 0 && coincide),
        errores: listaErrores
    };
}