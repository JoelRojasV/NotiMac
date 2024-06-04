/*Numeros pares*/
function obtenerNumerosPares(arreglo) {
    return arreglo.filter(numero => numero % 2 === 0);
}

function obtenerPares() {
    const numerosInput = document.getElementById('numerosInput1').value;
    const numeros = numerosInput.split(',').map(numero => parseInt(numero.trim(), 10));
    const numerosPares = obtenerNumerosPares(numeros);
    document.getElementById('resultado1').innerText = 'Números pares: ' + numerosPares.join(', ');
}
/*Sumar elementos*/
function sumarElementos(arreglo) {
    return arreglo.reduce((acumulador, numero) => acumulador + numero, 0);
}

function sumar() {
    const numerosInput = document.getElementById('numerosInput2').value;
    const numeros = numerosInput.split(',').map(numero => parseFloat(numero.trim()));
    const suma = sumarElementos(numeros);
    document.getElementById('resultado2').innerText = 'La suma de los elementos es: ' + suma;
}
/*eliminar elementos duplicados*/
function eliminarDuplicados(arreglo) {
    return arreglo.filter((elemento, indice) => arreglo.indexOf(elemento) === indice);
}

function eliminar() {
    const elementosInput = document.getElementById('elementosInput3').value;
    const elementos = elementosInput.split(',').map(elemento => elemento.trim());
    const arregloSinDuplicados = eliminarDuplicados(elementos);
    document.getElementById('resultado3').innerText = 'Arreglo sin duplicados: ' + arregloSinDuplicados.join(', ');
}

/*contar elementos/ palabras*/
function contarPalabras(cadena) {
    const palabras = cadena.split(/\s+/);
    const contador = {};

    palabras.forEach(palabra => {
        if (contador[palabra]) {
            contador[palabra]++;
        } else {
            contador[palabra] = 1;
        }
    });

    return contador;
}

function contar() {
    const cadena = document.getElementById('cadenaInput4').value;
    const conteo = contarPalabras(cadena);
    let resultadoHTML = '<ul>';

    for (let palabra in conteo) {
        resultadoHTML += `<li>${palabra}: ${conteo[palabra]}</li>`;
    }

    resultadoHTML += '</ul>';
    document.getElementById('resultado4').innerHTML = resultadoHTML;
}

/*ordenar arreglo de forma ascendente*/
function ordenarAscendente(arreglo) {
    return arreglo.sort((a, b) => a - b);
}

function ordenar() {
    const numerosInput = document.getElementById('numerosInput5').value;
    const numeros = numerosInput.split(',').map(numero => parseFloat(numero.trim()));
    const numerosOrdenados = ordenarAscendente(numeros);
    document.getElementById('resultado5').innerText = 'Números ordenados: ' + numerosOrdenados.join(', ');
}

/*Convertir a mayúsculas*/
function convertirMayusculas(arreglo) {
    return arreglo.map(cadena => cadena.toUpperCase());
}

function convertir() {
    const cadenasInput = document.getElementById('cadenasInput6').value;
    const cadenas = cadenasInput.split(',').map(cadena => cadena.trim());
    const cadenasMayusculas = convertirMayusculas(cadenas);
    document.getElementById('resultado6').innerText = 'Cadenas en mayúsculas: ' + cadenasMayusculas.join(', ');
}

/*Encontrar máximo y mínimo*/
function foundMaximoMinimo() {
    const numerosInput = document.getElementById('numerosInput7').value;
    const numeros = numerosInput.split(',').map(numero => parseFloat(numero.trim()));
    const [maximo, minimo] = encontrarMaximoMinimo(numeros);
    document.getElementById('resultado7').innerText = `Máximo: ${maximo}, Mínimo: ${minimo}`;
}

function encontrarMaximoMinimo(arreglo) {
    const maximo = Math.max(...arreglo);
    const minimo = Math.min(...arreglo);
    return [maximo, minimo];
}

/*Combinar arreglos*/
function combinarArreglos(arreglo1, arreglo2) {
    return arreglo1.concat(arreglo2);
}

function combinar() {
    const arreglo1Input = document.getElementById('arreglo1Input').value;
    const arreglo2Input = document.getElementById('arreglo2Input').value;
    const arreglo1 = arreglo1Input.split(',').map(numero => parseInt(numero.trim(), 10));
    const arreglo2 = arreglo2Input.split(',').map(numero => parseInt(numero.trim(), 10));
    const resultado = combinarArreglos(arreglo1, arreglo2);
    document.getElementById('resultado8').innerText = 'Arreglo combinado: ' + resultado.join(', ');
}

/*Suma de cuadrados*/
function sumaCuadrados(vector) {
    return vector.reduce((acumulador, elemento) => acumulador + Math.pow(elemento, 2), 0);
}

function calcularSumaCuadrados() {
    const numerosInput = document.getElementById('numerosInput9').value;
    const numeros = numerosInput.split(',').map(numero => parseInt(numero.trim(), 10));
    const suma = sumaCuadrados(numeros);
    document.getElementById('resultado9').innerText = 'La suma de los cuadrados es: ' + suma;
}

/*Invertir arreglo*/
function invertirArreglo(arreglo) {
    return arreglo.reverse();
}

function invertir() {
    const elementosInput = document.getElementById('elementosInput10').value;
    const elementos = elementosInput.split(',').map(elemento => elemento.trim());
    const arregloInvertido = invertirArreglo(elementos);
    document.getElementById('resultado10').innerText = 'Arreglo invertido: ' + arregloInvertido.join(', ');
}

/*Buscar valor*/
function valorPresente(arreglo, valor) {
    return arreglo.includes(valor);
}

function buscarValor() {
    const arregloInput = document.getElementById('arregloInput11').value;
    const valorInput = document.getElementById('valorInput11').value;
    const arreglo = arregloInput.split(',').map(elemento => elemento.trim());
    const valor = valorInput.trim();
    const presente = valorPresente(arreglo, valor);
    document.getElementById('resultado11').innerText = `¿El valor ${valor} está presente en el arreglo? ${presente}`;
}

/*Filtrar por longitud*/
function filtrarPorLongitud(arreglo, longitudMinima) {
    return arreglo.filter(cadena => cadena.length > longitudMinima);
}

function filtrar() {
    const cadenasInput = document.getElementById('cadenasInput12').value;
    const longitudInput = parseInt(document.getElementById('longitudInput12').value);
    const cadenas = cadenasInput.split(',').map(cadena => cadena.trim());
    const resultado = filtrarPorLongitud(cadenas, longitudInput);
    document.getElementById('resultado12').innerText = 'Cadenas filtradas: ' + resultado.join(', ');
}

/*Rotar arreglo hacia la izquierda*/
function rotarIzquierda(arreglo, veces) {
    const longitud = arreglo.length;
    const pasos = veces % longitud;

    if (pasos === 0) return arreglo;

    const primerParte = arreglo.slice(pasos);
    const segundaParte = arreglo.slice(0, pasos);
    return primerParte.concat(segundaParte);
}

function rotar() {
    const arregloInput = document.getElementById('arregloInput13').value;
    const vecesInput = parseInt(document.getElementById('vecesInput13').value);
    const arreglo = arregloInput.split(',').map(elemento => elemento.trim());
    const resultado = rotarIzquierda(arreglo, vecesInput);
    document.getElementById('resultado13').innerText = 'Arreglo rotado hacia la izquierda: ' + resultado.join(', ');
}

/*Sumar matrices*/
function sumarMatriz() {
    const matriz1Input = document.getElementById('matriz1Input').value;
    const matriz2Input = document.getElementById('matriz2Input').value;
    const matriz1 = matriz1Input.split('\n').map(fila => fila.split(',').map(Number));
    const matriz2 = matriz2Input.split('\n').map(fila => fila.split(',').map(Number));

    try {
        const resultado14 = sumarMatrices(matriz1, matriz2);
        document.getElementById('resultado14').innerText = 'La suma de las matrices es:\n' + resultado14.map(fila => fila.join(', ')).join('\n');
    } catch (error) {
        document.getElementById('resultado14').innerText = error.message;
    }
}

function sumarMatrices(matriz1, matriz2) {
    if (matriz1.length !== matriz2.length || matriz1[0].length !== matriz2[0].length) {
        throw new Error('Las matrices deben tener las mismas dimensiones para poder sumarlas.');
    }

    const filas = matriz1.length;
    const columnas = matriz1[0].length;
    const resultado14 = [];

    for (let i = 0; i < filas; i++) {
        const fila = [];
        for (let j = 0; j < columnas; j++) {
            fila.push(matriz1[i][j] + matriz2[i][j]);
        }
        resultado14.push(fila);
    }

    return resultado14;
}


/*Calcular estadísticas*/
function calcularEstadisticas(numeros) {
    const n = numeros.length;

    const media = numeros.reduce((acumulador, numero) => acumulador + numero, 0) / n;

    const numerosOrdenados = numeros.slice().sort((a, b) => a - b);
    const mediana = n % 2 === 0 ? (numerosOrdenados[n / 2 - 1] + numerosOrdenados[n / 2]) / 2 : numerosOrdenados[Math.floor(n / 2)];

    const frecuencias = {};
    numeros.forEach(numero => {
        frecuencias[numero] = (frecuencias[numero] || 0) + 1;
    });
    const modaFrecuenciaMaxima = Math.max(...Object.values(frecuencias));
    const moda = Object.keys(frecuencias).filter(numero => frecuencias[numero] === modaFrecuenciaMaxima).map(Number);

    const sumaCuadradosDiferenciaMedia = numeros.reduce((acumulador, numero) => acumulador + Math.pow(numero - media, 2), 0);
    const desviacionEstandar = Math.sqrt(sumaCuadradosDiferenciaMedia / n);

    return {
        media: media,
        mediana: mediana,
        moda: moda,
        desviacionEstandar: desviacionEstandar
    };
}

function calcular() {
    const numerosInput = document.getElementById('numerosInput15').value;
    const numeros = numerosInput.split(',').map(numero => parseFloat(numero.trim()));
    const estadisticas = calcularEstadisticas(numeros);
    document.getElementById('resultado15').innerText = `
        Media: ${estadisticas.media},
        Mediana: ${estadisticas.mediana},
        Moda: ${estadisticas.moda},
        Desviación Estándar: ${estadisticas.desviacionEstandar}
    `;
}