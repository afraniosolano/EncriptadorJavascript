/*    
¡Bienvenidas y bienvenidos a nuestro primer desafío!

Durante estas cuatro semanas, vamos a trabajar en una aplicación que encripta textos, así podrás intercambiar mensajes secretos con otras personas que 
sepan el secreto de la encriptación utilizada.

Las "llaves" de encriptación que utilizaremos son las siguientes:

La letra "e" es convertida para "enter"
La letra "i" es convertida para "imes"
La letra "a" es convertida para "ai"
La letra "o" es convertida para "ober"
La letra "u" es convertida para "ufat"
*/

let arrayLetras = [
  { letra: "a", conversion: "ai" },
  { letra: "e", conversion: "enter" },
  { letra: "i", conversion: "imes" },
  { letra: "o", conversion: "ober" },
  { letra: "u", conversion: "ufat" },
];

var ultimaOperacion = "enc";
function onclickEncriptar() {
  var areaEncriptar = document.getElementById("areaEncriptar");
  var areaDesencriptar = document.getElementById("areaDesencriptar");
  strEncriptar = ("" + areaEncriptar.value).trim();
  if (strEncriptar == "") {
    mostrarBlanco(true);
  } else {
    mostrarBlanco(false);
    areaDesencriptar.value = encriptarTexto(areaEncriptar.value);
    copiarPortaPapeles();
  }
}
function onclickDesencriptar() {
  var areaEncriptar = document.getElementById("areaEncriptar");
  var areaDesencriptar = document.getElementById("areaDesencriptar");
  strEncriptar = ("" + areaEncriptar.value).trim();
  if (strEncriptar == "") {
    mostrarBlanco(true);
  } else {
    mostrarBlanco(false);
    areaDesencriptar.value = desencriptarTexto(areaEncriptar.value);
    copiarPortaPapeles();
  }
}

function buscarObjetoLetra(letraBuscado) {
  for (let i = 0; i < arrayLetras.length; i++) {
    if (arrayLetras[i].letra === letraBuscado) {
      return arrayLetras[i];
    }
  }
  return null;
}

function buscarObjetoConversion(letraBuscado) {
  for (let i = 0; i < arrayLetras.length; i++) {
    if (arrayLetras[i].conversion === letraBuscado) {
      return arrayLetras[i];
    }
  }
  return null;
}

//console.log(encriptarTexto("murcielago"));
//console.log(desencriptarTexto("mufatrcimesenterlaigober"));

function encriptarTexto(texto) {
  ultimaOperacion = "enc";
  let textoEncriptado = "";

  for (let i = 0; i < texto.length; i++) {
    var objBuscado = buscarObjetoLetra(texto[i]);
    if (objBuscado) {
      textoEncriptado += objBuscado.conversion;
    } else {
      textoEncriptado += texto[i];
    }
  }

  return textoEncriptado;
}

function desencriptarTexto(textoEncriptado) {
  ultimaOperacion = "des";
  let texto = "";

  for (let i = 0; i < textoEncriptado.length; i++) {
    var enc;
    var inc;
    for (let j = 5; j >= 2; j--) {
      var substr = textoEncriptado.substring(i, i + j);
      enc = buscarObjetoConversion(substr);
      if (enc) {
        inc = j - 1;
        break;
      }
    }

    if (enc) {
      texto += enc.letra;
      i += inc;
    } else {
      texto += textoEncriptado[i];
    }
  }

  return texto;
}

const objAreaEncriptar = document.getElementById("areaEncriptar");

objAreaEncriptar.addEventListener("input", () => {
  objAreaEncriptar.value = objAreaEncriptar.value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
});

const objAreaDesencriptar = document.getElementById("areaDesencriptar");
objAreaDesencriptar.addEventListener("input", () => {
  objAreaDesencriptar.value = objAreaDesencriptar.value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
});

function copiarPortaPapeles() {
  const chkCopiar = document.getElementById("chkCopiar");
  if (chkCopiar.checked) {
    objAreaDesencriptar.select();
    document.execCommand("copy");
    objAreaDesencriptar.blur();
  }
}

const chkCopiar = document.getElementById("chkCopiar");
chkCopiar.addEventListener("change", () => {
  copiarPortaPapeles();
});

function mostrarBlanco(show) {
  if (show) {
    objAreaDesencriptar.style.backgroundImage = "url(img/bblanco.png)";
    objAreaDesencriptar.value =
      "Ningun Mensaje fue encontrado\nIngrese el texto que desee encriptar o desencriptar";
  } else {
    objAreaDesencriptar.style.backgroundImage = "none";
  }
}

// Detectar cuando se presiona la tecla Alt o la tecla C
document.addEventListener("keydown", function (event) {
  if (event.key === "©") {
    objAreaDesencriptar.value = encriptarTexto(objAreaEncriptar.value);
    event.preventDefault();
  }

  if (event.key === "√") {
    //ALT V
    objAreaDesencriptar.value = desencriptarTexto(objAreaEncriptar.value);
    event.preventDefault();
  }

  if (event.key === "∂") {
    //ALT D
    objAreaEncriptar.value = objAreaDesencriptar.value;
    if (ultimaOperacion == "enc") {
      objAreaDesencriptar.value = desencriptarTexto(objAreaEncriptar.value);
    } else {
      objAreaDesencriptar.value = encriptarTexto(objAreaEncriptar.value);
    }
    event.preventDefault();
  }
});
