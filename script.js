lib = {};

function Shelf(location) {
  this.location = location;
}

Object.setPrototypeOf(Shelf.prototype, lib.prototype);

function Book(title, author, pageCount, location, rate, review) {
  this.title = title;
  this.author = author;
  this.pageCount = pageCount;
  this.location = location;
  this.rate = rate;
  this.review = review;
}

Object.setPrototypeOf(Book.prototype, Shelf.prototype);
