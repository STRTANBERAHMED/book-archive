const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('search-btn');
const bookContainer = document.getElementById('book-container');
const errorDiv = document.getElementById('error');
const emptyDiv = document.getElementById('empty');
const resultDiv = document.getElementById('total-result');

searchBtn.addEventListener('click', function () {
    const searchText = searchInput.value;
    //clear
    errorDiv.innerText = '';
    bookContainer.innerHTML = '';
    // error handling
    if (searchText === '') {
        emptyDiv.innerText = 'search field cannot be empty';
        return;
    }
    // clear
    emptyDiv.innerText = '';
    bookContainer.innerHTML = '';
    searchInput.value = '';
    // main api
    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
        .then((res) => res.json())
        .then((data) => showData(data));
});

function showData(bookArray) {
    // total search result
    const div1 = document.createElement('div');
    div1.classList.add('bookArray');
    resultDiv.innerText = '';
    div1.innerHTML = `
    <h3>Total Result Found: ${bookArray.numFound}</h3>
    `;
    resultDiv.appendChild(div1);
    // error handling
    if (bookArray.numFound === 0) {
        errorDiv.innerText = 'no result found';
    } else {
        errorDiv.innerText = '';
    }
    // books details
    bookArray.docs.forEach(item => {
        const div2 = document.createElement('div');
        div2.classList.add('col-md-3');
        div2.innerHTML = `
            <div class="rounded overflow-hidden border p-2">
    <img
        src="https://covers.openlibrary.org/b/id/${item.cover_i}-L.jpg"
        class="w-100"
        alt=""
    />
</div>
<div
    class="
        py-2
        d-flex
        justify-content-between
        align-items-center
        d-md-block
        text-md-center
      "
>
    <h1>${item.title}</h1>
<p>Author Name: ${item.author_name}</p>
<p>Publisher: ${item.publisher}</p>
<p>First Publish Date: ${item.first_publish_year}</p>
            `;
        bookContainer.appendChild(div2);
    });
}