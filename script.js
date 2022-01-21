
let myLibrary = [];

const addBookForm = document.forms['add-book-form'];

addBookForm.addEventListener('submit', function(e) {
	e.preventDefault();
	// adding book to myLibrary array
	const titleInput = addBookForm.querySelector('#title-input').value;
	const authorInput = addBookForm.querySelector('#author-input').value;
	const pagesInput = addBookForm.querySelector('#pages-input').value;
	const genreInput = addBookForm.querySelector('#genre-input').value;
	const isReadInput = addBookForm.querySelector('#is-read-input').value;
	myLibrary.push(new book(titleInput, authorInput, pagesInput, genreInput, isReadInput));

	const tableBody = document.getElementsByClassName('library-table-body')[0]; //grabing the whole table (library)
 	// creating a new row
	const tableRow = document.createElement('tr');
	let newBookIndex = (myLibrary.length - 1);
	for (const property in myLibrary[newBookIndex]) {
		let element = document.createElement('td');
		element.textContent = myLibrary[newBookIndex][property];
		tableRow.appendChild(element);
		console.log(element.textContent);
		if (element.textContent == 'true' || element.textContent == 'false'){
			let button = document.createElement('button');
			if (element.textContent == 'true') {
				button.textContent = 'READ';
				button.classList.add('book-read');
			}
			else {
				button.textContent = 'NOT READ';
				button.classList.add('book-not-read');
			}
			element.textContent = '';
			element.appendChild(button);
			button.classList.add('is-read-button');
			button.addEventListener('click', updateIsReadStatus);

		}
	}

	// creating an additional cell + the 'edit' button, its function and appending it
	const thEditButton = document.createElement('td');
	const editButton = document.createElement('button');
	editButton.classList.add('edit');
	thEditButton.appendChild(editButton);
	editButton.textContent = 'EDIT FIELDS';
	tableRow.appendChild(thEditButton);

	editButton.addEventListener('click', () => {
		cell = tableRow.querySelectorAll('td');
		if(editButton.textContent === 'EDIT FIELDS') {
			editButton.textContent = 'SAVE';
			let cellRowCounter = 0; // for the for...each loop below. Don't know how to do it in a different way.
			cell.forEach(element => {
				cellRowCounter++;
				if (cellRowCounter <= 4) {
					element.setAttribute('contenteditable', true);
					element.focus();
				}
			})
		}
		else {
			cell.forEach(element => {
					element.setAttribute('contenteditable', false);
					editButton.textContent = 'EDIT FIELDS';
				})
		}
	});


	// creating an additional cell + the 'delete' button, its function and appending it
	const thDeleteButton = document.createElement('td');
	const deleteButton = document.createElement('button');
	deleteButton.classList.add('delete');
	thDeleteButton.appendChild(deleteButton);
	deleteButton.textContent = 'X';
	tableRow.appendChild(thDeleteButton);
	deleteButton.addEventListener('click', () => {
		tableBody.removeChild(tableRow);
	});

	tableBody.appendChild(tableRow);
	addBookForm.reset();
});


function book(title, author, pages, genre, isRead) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.genre = genre;
	this.isRead = isRead;
}

function updateIsReadStatus() {
	let counter = 0;
	while (true) {
		if (this.classList[counter] == 'book-not-read') {
			this.classList.remove('book-not-read');
			this.classList.add('book-read');
			this.textContent = 'READ';
			++counter;
			break;
		}
		else if (this.classList[counter] == 'book-read') {
			this.classList.remove('book-read');
			this.classList.add('book-not-read');
			this.textContent = 'NOT READ';
			++counter;
			break;
		}
		counter++;
	}
}
