getData();

async function getData() {
  const response = await fetch('data/ZonAnn.Ts+dSST.csv');
  const data = await response.text();

  const row = data.split('\n').slice(1);
  for(let i = 0; i < row.length; i++) {
    const columns = row[i].split(',');
    const year = columns[0];
    const temp = columns[1];
    console.log(year, temp);
  }
}