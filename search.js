const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');

// Manejar la solicitud del formulario
searchForm.addEventListener('submit', function (e) {
    e.preventDefault(); // Evitar que se envíe el formulario

    // Obtener el valor del campo de búsqueda
    const searchTerm = searchInput.value.trim();

    // Realizar la solicitud a la API de Open Library
    fetch(`https://openlibrary.org/search.json?q=${searchTerm}`)
        .then(response => response.json())
        .then(data => {
            // Limpiar los resultados anteriores
            searchResults.innerHTML = '';

            // Procesar los resultados
            data.docs.forEach(book => {
                // Verificar si el libro tiene una imagen de portada
                if (book.cover_i) {
                    const bookDiv = document.createElement('div');
                    bookDiv.classList.add('book');

                    // Crear elementos para mostrar la información del libro
                    const img = document.createElement('img');
                    img.src = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
                    img.alt = book.title;

                    const title = document.createElement('h3');
                    title.textContent = book.title;
                    title.classList.add('title-book');

                    const author = document.createElement('p');
                    author.textContent = `Autor: ${book.author_name ? book.author_name.join(', ') : 'Desconocido'}`;
                    author.classList.add('author-book');

                    const year = document.createElement('p');
                    year.textContent = `Año de lanzamiento: ${book.first_publish_year || 'Desconocido'}`;
                    year.classList.add('year-book');

                    // Agregar elementos al contenedor del libro
                    bookDiv.appendChild(img);
                    bookDiv.appendChild(title);
                    bookDiv.appendChild(author);
                    bookDiv.appendChild(year);

                    // Agregar el contenedor del libro a los resultados
                    searchResults.appendChild(bookDiv);
                }
            });
        })
        .catch(error => {
            console.error('Hubo un error:', error);
        });
});
