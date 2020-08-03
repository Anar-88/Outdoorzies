
const api_key = '2aMRnPooBzIzAuqQpghLapKirW9whohVRS2Ioyy8'; 
const endpointURL = 'https://developer.nps.gov/api/v1/parks?';

function formatQueryString(params) {
  const items = [];
  Object.entries(params).forEach(([k, v]) => {
    items.push(`${encodeURIComponent(k)}=${encodeURIComponent(v)}`) 
  });
  const queryString = items.join('&');
  return queryString;
}

function displayLists(JSONresponse) {
  $('#listItems').empty();
  for (let i = 0; i < JSONresponse.data.length; i++) {
    $('#listItems').append(
      `<li style="font-size:26px"><h2 style="color: #FA8072">${JSONresponse.data[i].name}</h2>
      <p style="font-size:18px">${JSONresponse.data[i].description}</p>
      <p><i>${JSONresponse.data[i].url}</i></p>
      </li>`
    )};
  $('#results').removeClass('hidden');
};

function getParks(stateCode, limit) {
  const queryString = formatQueryString({
    api_key: api_key, 
    stateCode: stateCode,
    limit: limit
  });

  const url = `${endpointURL}${queryString}`;
  fetch(url)
    .then((response) => {
      if (response.ok && limit > 0) {
        return response.json();
      }
      $('#errorMessage').text(response.statusText);
    })
    .then(JSONresponse => {
      displayLists(JSONresponse);
    })
    .catch((err) => {
      $('#listItems').empty();
      $('#errorMessage').text(`Something went wrong with your request! Try again`);
    });
}

$(function() {
  $('#searchForm').submit(event => {  
    event.preventDefault();
    const searchTerm = $('#searchTerm').val();
    const limit = $('#maxResults').val();
    getParks(searchTerm, limit);
  });
});

