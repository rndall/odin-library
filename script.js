const newBookBtn = document.querySelector("#new-book");
const yourBooks = document.querySelector("#your-books");
const newBookDialog = document.querySelector("#new-book-dialog");
const bookForm = document.querySelector("#book-form");
const closeBtn = document.querySelector("#close-btn");

const myLibrary = [];

class Book {
	constructor(title, author, pages, read) {
		this.title = title;
		this.author = author;
		this.pages = pages;
		this.read = read;
	}

	info() {
		return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? "already read" : "not read yet"}`;
	}

	toggleRead() {
		this.read = !this.read;
	}
}

addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 323, false);
addBookToLibrary("Romeo and Juliet", "William Shakespeare", 281, true);

displayBooks();

bookForm.addEventListener("submit", (e) => {
	e.preventDefault();

	const titleInput = document.querySelector("#title");
	const authorInput = document.querySelector("#author");
	const pagesInput = document.querySelector("#pages");
	const readInput = document.querySelector("#read");

	addBookToLibrary(
		titleInput.value,
		authorInput.value,
		+pagesInput.value,
		readInput.checked,
	);

	bookForm.reset();

	newBookDialog.close();

	displayBooks();
});

closeBtn.addEventListener("click", () => {
	newBookDialog.close();
});

newBookBtn.addEventListener("click", () => {
	newBookDialog.showModal();
});

function addBookToLibrary(title, author, pages, read) {
	const book = new Book(title, author, pages, read);
	myLibrary.push(book);
}

function displayBooks() {
	yourBooks.replaceChildren();

	for (const [i, book] of myLibrary.entries()) {
		const card = document.createElement("div");
		card.classList.add("card");

		const title = document.createElement("h3");
		title.classList.add("card__title");
		title.textContent = book.title;

		const author = document.createElement("p");
		author.classList.add("card__text", "card__text--italic");
		author.textContent = book.author;

		const pages = document.createElement("p");
		pages.classList.add("card__text");
		pages.textContent = `${book.pages} ${book.pages === 1 ? "page" : "pages"}`;

		const readStatus = document.createElement("button");
		readStatus.classList.add(
			"card__button",
			"button",
			book.read ? "button--state-success" : "button--state-danger",
		);
		readStatus.textContent = book.read ? "Already Read" : "Not Read Yet";
		readStatus.addEventListener("click", () => {
			myLibrary[i].toggleRead();
			displayBooks();
		});

		const removeBtn = document.createElement("button");
		removeBtn.classList.add("card__button", "button", "button--state-danger");
		removeBtn.textContent = "Remove";
		removeBtn.addEventListener("click", () => {
			myLibrary.splice(i, 1);
			displayBooks();
		});

		card.append(title, author, pages, readStatus, removeBtn);
		yourBooks.appendChild(card);
	}
}
