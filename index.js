'use strict';

const apiKEY = "LAOJ4E5Gmahb5g9mNIqb6f3YCBRt35mXAF34GbrC";

const searchURL = "https://developer.nps.gov/api/v1";

function displayResults(responseJson, maxResults){
    console.log(responseJson);
    $('#results-list').empty();
    for(let i = 0; i < responseJson.data.length; i++) {
        $('#results-list').append(
            `<li><h3><a href="${responseJson.data[i].url}">${responseJson.data[i].fullName}</a></h3>
            <p>${responseJson.data[i].description}</p></li>`
        )
    }
    $('#results').removeClass('hidden');
}

function getParks(query, maxResults = 10) {
    const url = searchURL + '/parks?stateCode=' + query + '&limit=' + maxResults + '&api_key=' + apiKEY;

    console.log(url);

    const options = {
        headers : new Headers({
            'X-Api-Key': apiKEY 
        })
    }

    fetch(url)
        .then(response => {
            if(response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayResults(responseJson,maxResults))
        .catch(err => {
            $('#js-error-message').text(`Something went wrong: ${err.message}`);
        })
}

function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        const searchTerm = $('#js-search-term').val();
        const maxResults = $('#js-max-results').val();
        getParks(searchTerm, maxResults);
    })
}

$(watchForm);