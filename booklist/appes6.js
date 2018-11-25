class Book {
  constructor(authorName, bookTitle, ISBN) {
    this.authorName = authorName;
    this.bookTitle = bookTitle;
    this.ISBN = ISBN;
  }
}

const bookForm = document.querySelector('#book-form');
const bookAuthor = document.querySelector('#author');
const bookTitle = document.querySelector('#title');
const bookISBN = document.querySelector('#isbn');
const bookList = document.querySelector('#book-list');

let books = [];

bookForm.addEventListener('submit', function(e) {
  e.preventDefault();
  let bookEntry = new Book(bookAuthor.value, bookTitle.value, bookISBN.value);
  books.push(bookEntry);
  let newRow = bookList.insertRow();
  newRow.innerHTML = `<tr class="bookEntries"><td>${bookEntry.bookTitle}</td><td>${bookEntry.authorName}</td><td>${bookEntry.ISBN}</td><td><a href="#" class="delete">X<a></td></tr>`;
  // console.log(books);
});

bookList.addEventListener('click', function(e) {
  if (e.target.className === 'delete'){
    let targetEntry = e.target.parentNode.previousSibling.textContent;
    books.forEach(function(b, i) {
      if (b.ISBN.trim() == targetEntry) {
        books.splice(i, 1);
      }
    });
    
    e.target.parentNode.parentNode.parentNode.removeChild(e.target.parentNode.parentNode);

  }
});






