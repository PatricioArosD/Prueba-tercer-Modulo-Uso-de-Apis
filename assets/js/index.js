const formulario = document.querySelector("#formulario")
const ctx = document.getElementById('myChart');
let myChart;

const obtenerData = async () => {
  const res = await fetch("https://mindicador.cl/api/")
  const data = await res.json()
  return data
}

const obtenerDataMoneda = async () => {
  let moneda = document.querySelector("#moneda").value
  let url = `https://mindicador.cl/api/${moneda}`
  const res = await fetch(url)
  const dataMoneda = await res.json()
  return dataMoneda
}

const crearGrafico = async () => {
  let moneda = document.querySelector("#moneda").value
  try {
    if (myChart) {
      myChart.destroy(); // Destruir el gráfico existente si hay uno
    }
    const resultadomoneda = await obtenerDataMoneda()
    const fechascompletas = resultadomoneda.serie.map(item => item.fecha)
    const fechasActuales = (fechascompletas.map(fecha => fecha.slice(0, 10))).slice(-10)
    const valoresActuales = (resultadomoneda.serie.map(item => item.valor)).slice(-10)
    console.log(fechasActuales, valoresActuales)
    ctx.style.backgroundColor = "white";
    ctx.style.margin ="20px"
    myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: fechasActuales.reverse(),
        datasets: [{
          label: `Valor: ${moneda}`,
          borderColor: "rgb(255, 99, 132)",
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
    });
  }
  catch (error) { alert(error.menssage) }
};

let resultados = document.querySelector("#resultado")
html = ""
formulario.addEventListener("submit", async (event) => {
  event.preventDefault()
  let monto = document.querySelector("#monto").value
  let moneda = document.querySelector("#moneda").value
  try {
    let resultado = await obtenerData();
    const valorActual = (resultado[moneda].valor)
    const calculo = ((monto) / Number(valorActual)).toFixed(2)
    html = ""
    html += `<p>Resultado: $${calculo} </p>`
    resultados.innerHTML = html;
  } catch (error) {
    alert(error.menssage);
  }
  crearGrafico()
})
