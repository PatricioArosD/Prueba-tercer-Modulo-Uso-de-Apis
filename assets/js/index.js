const formulario = document.querySelector("#formulario")

const obtenerData = async () => {
  const res = await fetch("https://mindicador.cl/api/")
  const data = await res.json()
  return data
}
const obtenerDataDolar = async () => {
  const res = await fetch("https://mindicador.cl/api/dolar")
  const dataDolar = await res.json()
  return dataDolar
}
const obtenerDataEuro = async () => {
  const res = await fetch("https://mindicador.cl/api/euro")
  const dataEuro = await res.json()
  return dataEuro
}
const obtenerDataUf = async () => {
  const res = await fetch("https://mindicador.cl/api/uf")
  const dataUf = await res.json()
  return dataUf
}
const crearGrafico = async () => {
  const ctx = document.getElementById('myChart');
  let moneda = document.querySelector("#moneda").value
  try{
    if(moneda = "dolar"){
      const resultadomoneda = await obtenerDataDolar()
    }
    else if(moneda = "euro"){
      const resultadomoneda = await obtenerDataEuro()
    }else if(moneda="uf"){
      const resultadomoneda = await obtenerDataUf()
    }
    const fechascompletas= resultadomoneda.serie.map(item => item.fecha)
    const fechasActuales= (fechascompletas.map(fecha => fecha.slice(0, 10))).slice(-10)
    const valoresActuales= (resultadomoneda.serie.map(item => item.valor)).slice(-10)
    console.log(fechasActuales,valoresActuales)
  
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: fechasActuales,
        datasets: [{
          label: 'Valor del dólar',
          data: valoresActuales,
          borderWidth: 1
        }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  })}
  catch(error){alert(error.message)}
};
crearGrafico()
let resultados = document.querySelector("#resultado")
html = ""
formulario.addEventListener("submit", async (event) => {
  event.preventDefault()
  let monto = document.querySelector("#monto").value
  let moneda = document.querySelector("#moneda").value
  try {
    let resultado = await obtenerData();
    const valorActual = (resultado[moneda].valor)
    const calculo = ((monto) / Number(valorActual))
    html = ""
    html += `<p>El valor obtenido es: ${calculo} </p>`
    resultados.innerHTML = html;
  } catch (error) {
    alert(error.message);
  }
})
