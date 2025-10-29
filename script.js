//UI Rendering//

const addDialog = document.querySelector(".add-modal");
const reviewText = document.querySelector(".review-modal__text");
const reviewDialog = document.querySelector(".review-modal");
const exitButton = document.querySelectorAll(".u-exit-btn");
const openAddModal = document.querySelector(".header__add-btn");
const readStatusRadioSet = document.getElementsByName("location");
const parentDiv = document.querySelector(".u-form-wrapper");
const rateReviewForm = createRateFormSection();
const bookGridWrapper = document.querySelector(".shelf__cards");
const shelfTitle = document.querySelector(".shelf__title");
const addDialogForm = document.querySelector(".add-modal__form");
const formTitle = document.getElementById("title");
const formAuthor = document.getElementById("author");
const formPageCount = document.getElementById("pageCount");
const formRating = document.getElementsByName("rating");
const formReview = document.getElementById("review");
const shelfTabs = document.querySelectorAll(".u-tab");

function renderBook(book) {
  const bookCard = document.createElement("div");
  bookCard.classList.add("card");
  bookCard.dataset.id = book.id;
  const bookTitleAuthor = document.createElement("h3");
  bookTitleAuthor.classList.add("card__title");
  bookTitleAuthor.textContent = `${book.title}, ${book.author}`;
  bookCard.appendChild(bookTitleAuthor);
  const bookPageCount = document.createElement("p");
  bookPageCount.classList.add("card__page-count");
  bookPageCount.textContent = `Page Count: ${book.pageCount}`;
  bookCard.appendChild(bookPageCount);
  if (book.location === "completeBook") {
    const bookRating = document.createElement("div");
    bookRating.classList.add("rating");
    const bookRatingIcons = document.createElement("div");
    bookRatingIcons.classList.add("rating__star-container");
    for (let i = 1; i <= (book.rate || 0); i++) {
      const bookRatingIcon = document.createElement("img");
      bookRatingIcon.classList.add("rating__star");
      bookRatingIcon.src = "assets/images/star-sharp-svgrepo-com.svg";
      bookRatingIcons.appendChild(bookRatingIcon);
    }
    bookRating.appendChild(bookRatingIcons);
    bookCard.appendChild(bookRating);
  } else {
    const bufferBox = document.createElement("div");
    bufferBox.classList.add("card__buffer-box");
    bookCard.appendChild(bufferBox);
  }
  const bookButtons = document.createElement("div");
  bookButtons.classList.add("card__buttons");
  if (book.review) {
    const bookReviewView = document.createElement("button");
    bookReviewView.addEventListener("click", () => {
      index = library.findBook(bookCard.dataset.id);
      populateReview(library.bookList[index]);
      reviewDialog.showModal();
    });
    bookReviewView.classList.add("card__button", "card__button--review-view");
    const bookReviewViewIcon = document.createElement("img");
    bookReviewViewIcon.classList.add("u-icon--small");
    bookReviewViewIcon.src = "assets/images/memo-svgrepo-com.svg";
    bookReviewView.appendChild(bookReviewViewIcon);
    bookButtons.appendChild(bookReviewView);
  }
  const bookEdit = document.createElement("button");
  bookEdit.addEventListener("click", () => {
    isEditing = bookCard.dataset.id;
    index = library.findBook(bookCard.dataset.id);
    populateForm(library.bookList[index]);
    addDialog.showModal();
  });
  bookEdit.classList.add("card__button", "card__button--edit");
  const bookEditIcon = document.createElement("img");
  bookEditIcon.classList.add("u-icon--small");
  bookEditIcon.src = "assets/images/gear-svgrepo-com.svg";
  bookEdit.appendChild(bookEditIcon);
  bookButtons.appendChild(bookEdit);
  const bookDelete = document.createElement("button");
  bookDelete.classList.add("card__button", "card__button--delete");
  bookDelete.addEventListener("click", () => {
    library.deleteBook(bookCard.dataset.id);
    refreshBooks(initialShelf);
  });
  const bookDeleteIcon = document.createElement("img");
  bookDeleteIcon.classList.add("u-icon--small");
  bookDeleteIcon.src = "assets/images/trash-blank-alt-svgrepo-com.svg";
  bookDelete.appendChild(bookDeleteIcon);
  bookButtons.appendChild(bookDelete);
  bookCard.appendChild(bookButtons);
  bookGridWrapper.appendChild(bookCard);
}

function renderBooks(shelf) {
  shelf.filterBooks().forEach(renderBook);
}

function clearBooks() {
  const bookCards = document.querySelectorAll(".shelf__cards > *");
  bookCards.forEach((book) => bookGridWrapper.removeChild(book));
}

function separateCamelCase(initialPhrase) {
  const arr = initialPhrase.split("");
  let index = arr.findIndex((char) => char === char.toUpperCase());
  let firstWord =
    initialPhrase.slice(0, 1).toUpperCase() + initialPhrase.slice(1, index);
  let secondWord = initialPhrase.slice(index);
  return `${firstWord} ${secondWord}s`;
}

function refreshBooks(shelf) {
  clearBooks();
  renderBooks(shelf);
  shelfTitle.textContent = separateCamelCase(shelf.location);
}

function populateForm(book) {
  formTitle.value = book.title;
  formAuthor.value = book.author;
  formPageCount.value = book.pageCount;
  readStatusRadioSet.forEach((radio) => {
    radio.checked = radio.value === book.location;
  });

  if (book.location === "completeBook") {
    appendRateFormSection();
    const formRating = document.getElementsByName("rating");
    const formReview = document.getElementById("review");
    formRating.forEach((rating) => {
      rating.checked = rating.value === book.rate;
    });
    formReview.value = book.review;
  } else {
    deleteRateFormSection();
  }
}

function populateReview(book) {
  reviewText.textContent = book.review;
}

function createRateFormSection() {
  const rateReviewSection = document.createElement("fieldset");
  rateReviewSection.classList = "add-modal__rate";
  const rateReviewTitle = document.createElement("legend");
  rateReviewTitle.textContent = "Rating/Review";
  rateReviewSection.appendChild(rateReviewTitle);
  const ratingSection = document.createElement("fieldset");
  const ratingTitle = document.createElement("legend");
  ratingTitle.textContent = "Rating";
  ratingSection.appendChild(ratingTitle);
  for (let i = 1; i <= 5; i++) {
    const input = document.createElement("input");
    input.type = "radio";
    input.name = "rating";
    input.id = `rating-${i}`;
    input.value = i;
    const label = document.createElement("label");
    label.htmlFor = `rating-${i}`;
    label.textContent = i;
    ratingSection.appendChild(input);
    ratingSection.appendChild(label);
  }
  rateReviewSection.appendChild(ratingSection);
  const reviewTitle = document.createElement("label");
  reviewTitle.htmlFor = "review";
  reviewTitle.textContent = "Review";
  rateReviewSection.appendChild(reviewTitle);
  const reviewInput = document.createElement("textarea");
  reviewInput.name = "review";
  reviewInput.id = "review";
  reviewInput.rows = "5";
  reviewInput.cols = "33";
  rateReviewSection.appendChild(reviewInput);
  return rateReviewSection;
}

function deleteRateFormSection() {
  if (parentDiv.contains(rateReviewForm)) {
    parentDiv.removeChild(rateReviewForm);
  }
}

function appendRateFormSection() {
  const belowButton = document.querySelector("#insertBefore");
  if (!parentDiv.contains(rateReviewForm)) {
    parentDiv.insertBefore(rateReviewForm, belowButton);
  }
}

//Data Handling//
let initialShelf;
let isEditing = null;

const library = {
  bookList: [],
  appendBook: function (newBook) {
    this.bookList.push(newBook);
  },
  findBook: function (bookID) {
    let index = this.bookList.findIndex((book) => book.id === bookID);
    return index;
  },

  deleteBook: function (bookID) {
    let index = this.findBook(bookID);
    if (index !== -1) {
      this.bookList.splice(index, 1);
    }
  },
};

function Shelf(location) {
  this.location = location;
  this.filterBooks = function () {
    if (this.location === "allBook") {
      return library.bookList;
    } else {
      return library.bookList.filter((book) => book.location === this.location);
    }
  };
  this.switchLocation = function (location) {
    this.location = location;
  };
}

function Book(title, author, pageCount, location, rate, review) {
  this.title = title;
  this.author = author;
  this.pageCount = pageCount;
  this.location = location;
  this.rate = rate;
  this.review = review;
  this.id = crypto.randomUUID();
  this.overwriteBook = function (
    newTitle,
    newAuthor,
    newPageCount,
    newLocation,
    newRating,
    newReview
  ) {
    this.title = newTitle;
    this.author = newAuthor;
    this.pageCount = newPageCount;
    this.location = newLocation;
    this.rate = newRating;
    this.review = newReview;
  };
}

//Page Initialization//

function initializePage() {
  initialShelf = new Shelf();
  initialShelf.switchLocation("allBook");
  refreshBooks(initialShelf);
}

//Event Listeners//

openAddModal.addEventListener("click", () => addDialog.showModal());

exitButton.forEach((btn) =>
  btn.addEventListener("click", () => {
    if (addDialog.open) {
      addDialog.close();
      addDialogForm.reset();
    } else if (reviewDialog.open) {
      reviewDialog.close();
    }
  })
);

addDialog.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const title = formData.get("title");
  const author = formData.get("author");
  const pageCount = formData.get("pageCount");
  const location = formData.get("location");
  const rating = formData.get("rating");
  const review = formData.get("review");
  if (isEditing === null) {
    const newBook = new Book(
      title,
      author,
      pageCount,
      location,
      rating,
      review
    );
    library.appendBook(newBook);
    console.log(newBook.id);
  } else {
    index = library.findBook(isEditing);
    library.bookList[index].overwriteBook(
      title,
      author,
      pageCount,
      location,
      rating,
      review
    );
    isEditing = null;
  }

  console.log(library.bookList);
  addDialogForm.reset();
  addDialog.close();
  refreshBooks(initialShelf);
});

readStatusRadioSet.forEach((radio) =>
  radio.addEventListener("change", (event) => {
    const chosen = event.target;
    if (chosen.value === "completeBook") {
      appendRateFormSection(createRateFormSection());
    } else {
      deleteRateFormSection();
    }
  })
);

shelfTabs.forEach((tab) =>
  tab.addEventListener("click", (event) => {
    initialShelf.switchLocation(event.target.dataset.id);
    refreshBooks(initialShelf);
  })
);

document.addEventListener("DOMContentLoaded", () => {
  initializePage();
});
