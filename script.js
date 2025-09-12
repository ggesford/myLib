const addDialog = document.querySelector(".add-modal");
const rateDialog = document.querySelector(".rate-modal");
const openAddModal = document.querySelector(".header__add-btn");

openAddModal.addEventListener("click", () => addDialog.showModal());

const library = {
  bookList: [],
  appendBook: function (newBook) {
    this.bookList.push(newBook);
  },
  deleteBook: function (bookID) {
    let index = this.bookList.findIndex((book) => book.id === bookID);
    if (index !== -1) {
      this.bookList.splice(index, 1);
    }
  },
};

function Shelf(location) {
  this.location = location;
  this.filterBooks = function () {
    return library.bookList.filter((book) => book.location === this.location);
  };
}

function Book(title, author, pageCount, location, rate, review) {
  this.title = title;
  this.author = author;
  this.pageCount = pageCount;
  this.location = location;
  this.rate = rate;
  this.review = review;
  this.getInfo;
  this.id = crypto.randomUUID();
}
