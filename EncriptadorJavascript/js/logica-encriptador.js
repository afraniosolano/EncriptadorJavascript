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

function onclickEncriptar() {
  var areaEncriptar = document.getElementById("areaEncriptar");
  var areaDesencriptar = document.getElementById("areaDesencriptar");
  areaDesencriptar.value = encriptarTexto(areaEncriptar.value);
}
function onclickDesencriptar() {
  var areaEncriptar = document.getElementById("areaEncriptar");
  var areaDesencriptar = document.getElementById("areaDesencriptar");
  areaDesencriptar.value = desencriptarTexto(areaEncriptar.value);
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
