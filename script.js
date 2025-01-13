const newBookBtn = document.querySelector("#new-book");
const yourBooks = document.querySelector("#your-books");
const newBookDialog = document.querySelector("#new-book-dialog");
const closeBtn = document.querySelector("#close-btn");

const myLibrary = [];

addBookToLibrary("Test1", "Elon Musk", 23, false);
addBookToLibrary("Test2", "Hana", 89, true);

displayBooks();

closeBtn.addEventListener("click", () => {
	newBookDialog.close();
});

newBookBtn.addEventListener("click", () => {
	newBookDialog.showModal();
});

function Book(title, author, pages, read) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;
	this.info = () =>
		`${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? "already read" : "not read yet"}`;
}

function addBookToLibrary(title, author, pages, read) {
	const book = new Book(title, author, pages, read);
	myLibrary.push(book);
}

function displayBooks() {
	for (const book of myLibrary) {
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
		pages.textContent = `${book.pages} pages`;

		const read = document.createElement("p");
		read.classList.add("card__text");
		read.textContent = book.read ? "Already Read" : "Not Read Yet";

		card.append(title, author, pages, read);
		yourBooks.appendChild(card);
	}
}
