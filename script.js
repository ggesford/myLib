const addDialog = document.querySelector(".add-modal");
const rateDialog = document.querySelector(".rate-modal");
const openAddModal = document.querySelector(".header__add-btn");
const readStatusRadioSet = document.getElementsByName("location");
const parentDiv = document.querySelector(".u-form-wrapper");
const rateReviewForm = createRateFormSection();
const addBookBtn = querySelector("#addBook");
const bookGridWrapper = querySelector(".shelf__cards");

openAddModal.addEventListener("click", () => addDialog.showModal());

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
  reviewTitle.textContent = "Review(optional)";
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
  parentDiv.removeChild(rateReviewForm);
}
function appendRateFormSection() {
  const belowButton = document.querySelector("#insertBefore");
  parentDiv.insertBefore(rateReviewForm, belowButton);
}

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
  this.renderBooks = function () {
    filterBooks().forEach((book) => renderBook(book));
  };
  this.renderBook = function (book) {
    const bookCard = document.createElement("div");
    const bookTitleAuthor = document.createElement("h3");
    bookTitleAuthor.textContent = `${book.title}, ${book.author}`;
    bookCard.appendChild(bookTitleAuthor);
    const bookPageCount = document.createElement("p");
    bookPageCount.textContent = `Page Count: ${book.pageCount}`;
    bookCard.appendChild(bookPageCount);
    if (book.location === "completeBook") {
      const bookRating = document.createElement("div");
      const bookRatingTitle = document.createElement("p");
      bookRatingTitle.textContent = "Rating:";
      bookRating.appendChild(bookRatingTitle);
      const bookRatingIcons = document.createElement("div");
      for (let i = 1; i <= book.rate; i++) {
        const bookRatingIcon = document.createElement("img");
        bookRatingIcon.src =
          "assets/images/bookmark-favorite-rating-star-svgrepo-com.svg";
        bookRatingIcons.appendChild(bookRatingIcon);
      }
      bookRating.appendChild(bookRatingIcons);
      bookCard.appendChild(bookRating);
    }
    const bookEdit = document.createElement("button");
    const bookEditIcon = document.createElement("img");
    bookEditIcon.src = "assets/images/gear-svgrepo-com.svg";
    bookEdit.appendChild(bookEditIcon);
    bookCard.appendChild(bookEdit);
    const bookDelete = document.createElement("button");
    const bookDeleteIcon = document.createElement("img");
    bookDeleteIcon.src = "assets/images/trash-blank-alt-svgrepo-com.svg";
    bookDelete.appendChild(bookDeleteIcon);
    bookCard.appendChild(bookDelete);
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
}
