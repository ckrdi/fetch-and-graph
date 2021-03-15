// data from : https://data.giss.nasa.gov/gistemp/
// mean from : https://earthobservatory.nasa.gov/world-of-change/DecadalTemp

getData();

async function getData() {
  const response = await fetch('data/ZonAnn.Ts+dSST.csv');
  const data = await response.text();
  const xs = [];
  const ys = [];
  const row = data.split('\n').slice(1);
  for (let i = 0; i < row.length; i++) {
    const columns = row[i].split(',');
    const year = columns[0];
    const temp = columns[1];
    xs.push(year);
    ys.push(parseFloat(temp) + 14);
  }

  const ctx = document.getElementById('myChart').getContext('2d');
  const chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
      labels: xs,
      datasets: [{
        label: 'Global Annual Mean Surface Air Temperature Change in C°',
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: ys
      }]
    },

    // Configuration options go here
    options: {
      scales: {
        yAxes: [{
          ticks: {
            // Include a sign in the ticks
            callback: function (value, index, values) {
              return value + "°";
            }
          }
        }]
      }
    }
  });
}