// data from : https://data.giss.nasa.gov/gistemp/
// mean from : https://earthobservatory.nasa.gov/world-of-change/DecadalTemp

getData();

async function getData() {
  const response = await fetch('../data/ZonAnn.Ts+dSST.csv');
  const data = await response.text();
  const xs = [];
  const yGlobal = [];
  const yNorth = [];
  const ySouth = [];
  const row = data.split('\n').slice(1);
  for (let i = 0; i < row.length; i++) {
    const columns = row[i].split(',');
    xs.push(columns[0]);
    yGlobal.push(parseFloat(columns[1]) + 14);
    yNorth.push(parseFloat(columns[2]) + 14);
    ySouth.push(parseFloat(columns[3]) + 14);
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
          backgroundColor: 'black',
          borderColor: 'black',
          data: yGlobal
        }, 
        {
          label: 'Northern Hemisphere Annual Mean Surface Air Temperature Change in C°',
          fill: false,
          backgroundColor: 'red',
          borderColor: 'red',
          data: yNorth
        }, 
        {
          label: 'Southern Hemisphere Annual Mean Surface Air Temperature Change in C°',
          fill: false,
          backgroundColor: 'blue',
          borderColor: 'blue',
          data: ySouth
        }

      ]
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