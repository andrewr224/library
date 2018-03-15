let myLibrary = [];
let shelf = document.querySelector('.shelf');
let openForm = document.querySelector('.open-form');
let closeForm = document.querySelector('.close-form');
let addBook = document.querySelector('.add-book');
let form = document.querySelector('form');

function Book(params) {
  this.title  = params['title'],
  this.author = params['author'],
  this.pages  = params['pages'],
  this.read   = params['read'],

  this.isRead = function() {
    return this.read ? 'read' : 'not read';
  },

  this.toggleRead = function() {
    this.read = !this.read;
  };
};

function addBookToLibrary(e) {
  e.preventDefault();

  let book = new Book(gatherParams());

  myLibrary.push(book);

  toggleForm();
  render();
};

function gatherParams() {
  let title  = document.querySelector('input[name="title"]').value;
  let author = document.querySelector('input[name="author"]').value;
  let pages  = document.querySelector('input[name="pages"]').value;
  let read   = document.querySelector('input[name="read"]').checked;

  let params = {
    'title':  title,
    'author': author,
    'pages':  pages,
    'read':   read
  };

  return params;
}

function render() {
  clearShelf();

  for (let i = 0; i < myLibrary.length; i++) {
    let book = prepareBook(i);

    shelf.appendChild(book);
  }
}

function prepareBook(i) {
  let book = myLibrary[i];

  let box     = document.createElement('div');
  let title   = document.createElement('h3');
  let author  = document.createElement('p');
  let pages   = document.createElement('p');
  let read    = document.createElement('button');
  let destroy = document.createElement('button');

  box.classList.add('box');

  title.textContent = book.title;
  if (book.title.length > 47) { title.classList.add('smaller'); };

  author.textContent = `by ${book.author}`;
  if (book.author.length > 20) { author.classList.add('smaller'); };

  pages.textContent = `pages: ${book.pages}`;

  read.classList.add('read');
  read.innerHTML = book.isRead();
  read.dataset.target = i;
  read.addEventListener('click', toggleRead);

  destroy.classList.add('trash');
  destroy.dataset.target = i;
  destroy.innerHTML = '&#128465;';
  destroy.addEventListener('click', trash);

  box.appendChild(title);
  box.appendChild(author);
  box.appendChild(pages);
  box.appendChild(read);
  box.appendChild(destroy);

  return box;
}

function clearShelf() {
  while(shelf.firstChild) {
    shelf.removeChild(shelf.firstChild);
  }
}

function toggleForm() {
  form.reset();
  form.classList.toggle('hidden');
  openForm.classList.toggle('hidden');
}

function toggleRead() {
  let i = this.getAttribute('data-target');

  let book = myLibrary[i];

  book.toggleRead();

  render();
}

function trash() {
  let i = this.getAttribute('data-target');

  myLibrary.splice(i, 1);

  render();
}


function addBaseBooks() {
  let cesar  = new Book({'title': 'La Mort de Cesar', 'author': 'Volraire', 'pages': 35, 'read': true});
  let urteil = new Book({'title': 'Das Urteil', 'author': 'Franz Kafka', 'pages': 14, 'read': false});
  let island = new Book({'title': 'Treasure Island', 'author': 'Robert Stevenson', 'pages': 311, 'read': true});
  let medit  = new Book({'title': 'Meditations', 'author': 'Marcus Aurelius', 'pages': 106, 'read': true});
  let atlas  = new Book({'title': 'Atlas Shrugged', 'author': 'Ayn Rand', 'pages': 1188, 'read': false});
  let oldMan = new Book({'title': 'The Hundred-Year-Old Man Who Climbed Out of the Window and Disappeared', 'author': 'Jonas Jonasson', 'pages': 402, 'read': true});

  myLibrary.push(cesar);
  myLibrary.push(urteil);
  myLibrary.push(island);
  myLibrary.push(medit);
  myLibrary.push(atlas);
  myLibrary.push(oldMan);
}

addBaseBooks();
render();

openForm.addEventListener('click', toggleForm);
closeForm.addEventListener('click', toggleForm);
addBook.addEventListener('click', addBookToLibrary);
