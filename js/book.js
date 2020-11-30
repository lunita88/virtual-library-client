
var book = {
    containerId: 'bookAuth',
    apiServer: API_URL+':'+API_PORT,
    firstPageTemplate: `
    <div class="bookAuth center firstBookPage">
      <div class="userForm">
        <div class="spinner" id="spinner"></div>
          <h3>Library</h3>
          <hr>
        <div>
          <button id="addBook">Add book</button>
        </div>
        <div>
          <button id="getBooks">Get Books</button>
        </div>
        <div>
          <button id="getBook">GET one book</button>
          <div id="findByIsbn">
          <input name="isbn-get" placeholder="ISBN">
          </div>
        </div>
      </div>
    </div>`.trim(),
      startSomePage: function() {
        document.getElementById("testProtectedButton").style.display = "none";
        document.getElementById(this.containerId).innerHTML = this.firstPageTemplate;
        document.getElementById("addBook").onclick = this.showCreatePage.bind(this);
        document.getElementById("getBooks").onclick = this.getBooksAll.bind(this);
        document.getElementById("getBook").onclick = this.showInput.bind(this);
      },
      showInput: function() {
         document.getElementById("findByIsbn").style.display="block";
         document.getElementById('getBook').onclick = this.getBook.bind(this);
      },
      bookTemplate: `
      <div class="bookAuth">
         <div class ="bookForm">
         <div class="spinner" id="spinner"></div>
         <button class"backBtn" id="back">BACK</button>
         <h3>Create New Book</h3> 
           <hr>
            <div>
                <label for="isbn">ISBN</label>
                <input name="isbn" placeholder="isbn">
            </div>
            <div>
                <label for="title">Title</label>
                <input name="title" placeholder="book title">
            </div>
            <div>
                <label for="author">Author</label>
                <input name="author" placeholder="book author">
            </div>
             <div>
                 <input type= "file" name="book_img">
             </div>
            <div>
                <label for="publish_date">Published Date</label>
                <input type="date" name="publish_date">
            </div>
            <div>
                <label for="publisher">Publisher</label>
                <input name="publisher" placeholder="book publisher">
            </div>
            <div>
                <label for="numOfPage">Number Of Pages</label>
                <input type="number" name="numOfPages" placeholder="number of pages">
            </div>
            <div>
               <button id="createBookBtn">Save new book</button>
            </div>
        </div>
      </div>`.trim(),
      showCreatePage: function() {
        document.getElementById(this.containerId).innerHTML = this.bookTemplate;
        document.getElementById("createBookBtn").onclick = this.createBook.bind(this);
        document.getElementById('back').onclick = this.startSomePage.bind(this);
    },
    createBook: function () {
      var form = new FormData();
      var img = document.querySelector('[name="book_img"]').files[0];
      console.log(img.name, img.size, img.type);
      form.append('book_img', img);
      form.append('isbn', document.querySelector('[name="isbn"]').value);
      form.append('title', document.querySelector('[name="title"]').value);
      form.append('author', document.querySelector('[name="author"]').value);
      form.append('publish_date', document.querySelector('[name="publish_date"]').value);
      form.append('publisher', document.querySelector('[name="publisher"]').value);
      form.append('numOfPages', document.querySelector('[name="numOfPages"]').value);
  /*
    var book = {
        "isbn": document.querySelector('[name="isbn"]').value,
        "title": document.querySelector('[name="title"]').value,
        "author": document.querySelector('[name="author"]').value,
        "publish_date": document.querySelector('[name="publish_date"]').value,
        "publisher": document.querySelector('[name="publisher"]').value,
        "numOfPages": document.querySelector('[name="numOfPages"]').value
    };
    */
    user.showSpinner();
    //console.log(book);
    const xhttp = new XMLHttpRequest();

    //xhttp.open("GET", API_URL + "/book/", false);

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
           // Typical action to be performed when the document is ready:
           //document.getElementById("demo").innerHTML = xhttp.responseText;
           console.log(xhttp.responseText);
           user.hideSpinner();
           user.exitAuthAndMsg('book is created.');
        }
    };

    xhttp.open("POST", API_URL + "/book/", true);
    //xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    //xhttp.send(JSON.stringify(book));
    xhttp.send(form);
    // xhttp.open("POST", API_URL + "/book/", true);
    // xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    //xhttp.send(JSON.stringify(book));
  },
  
  /* template for getBooks */
  allBooksListTemplate:`
  <div class=" bookAuth1  center">
    <div id="bookP">
    <button id="back">BACK</button>
    <h3>All books in library</h3>
    <table id="table" class="clasBody">
        <thead class="clasHead">
            <tr>
                <th>Isbn</th>
                <th>Title</th>
                <th>Book img</th>
            </tr>
        </thead>
            <tboody>
                <tr>
                </tr>
            </tbody>
        </table>
    </div>
  </div>`.trim(),
      getBooksAll: function() {
        document.getElementById(this.containerId).innerHTML = this.allBooksListTemplate;
        document.getElementById('back').onclick = this.startSomePage.bind(this);
        this.getBooks();

      },
      getBooks: function () {
        const xhttp = new XMLHttpRequest();
        //xhttp.open("GET", "http://185.39.3.120:8001/book", false);
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                console.log(xhttp.responseText);
                var res = JSON.parse(xhttp.responseText);
                const allBooksList = res.length;
                for(i=0; i < allBooksList; i++ ) {
                  document.getElementById('table').innerHTML += "<td>" + res[i].isbn + "</td>" + "<td>" + res[i].title + "</td>" + "<td>" + img.files[0] + "</td>";
                }
               // Typical action to be performed when the document is ready:
            }
        };
        xhttp.open("GET", API_URL + "/books/", true);
        xhttp.send();
    },
    /* template for getBook and edit and save edit*/
    oneBookTemplate:`
    <div>
       <div class="bookForm" id="oneBookPage">
       <div class="spinner" id="spinner"></div>
         <button id="back">BACK</button>
         <hr>
         <h3>selected book</h3> 
          <div>
              <label for="isbn">ISBN</label>
              <input name="isbn-get" id="isbn" placeholder="ISBN">
          </div>
          <div>
              <label for="title">Title</label>
              <input id="title" name="title" placeholder="book title">
          </div>
          <div>
              <label for="author">Author</label>
              <input id="author"  name="author" placeholder="book author">
          </div>
          <div>
              <label for="author">Image</label>
              <input type= "file" id ="img" name ="book_img">
          </div>
          <div>
              <label for="publish_date">Publish Date</label>
              <input id="publish_date" type="date"  name="publish_date">
          </div>
          <div>
              <label for="publisher">Publisher</label>
              <input id="publisher"  name="publisher" placeholder="book publisher">
          </div>
          <div>
              <label for="numOfPage">Number Of Pages</label>
              <input id="numOfPages" type="number"  name="numOfPages" placeholder="number of pages">
          
              <button id="saveEdit">SAVE EDIT</button>
              <button id="deleteBook" >Delete book</button>
              <input id="isbn" name="isbn-get" placeholder="ISBN"></input>
          </div>
      </div>
    </div>`.trim(),
   
    getOneBook: function() {
        document.getElementById(this.containerId).innerHTML = this.oneBookTemplate;
        user.exitAuthAndMsg('Book found');
        document.getElementById("deleteBook").onclick = this.deleteBook.bind(this);
        document.getElementById("saveEdit").onclick = this.saveEditBook.bind(this);
        document.getElementById('back').onclick = this.startSomePage.bind(this);
             
      },
    getBook: function() {
      var isbn = document.querySelector('[name="isbn-get"]').value;
      console.log(isbn);
      const xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
          if(this.readyState==4 && this.status==200) {
            var res = JSON.parse(xhttp.responseText);
            console.log(xhttp.response);
            book.getOneBook();
         
            document.querySelector('[name="isbn-get"]').value = res.isbn;
            document.querySelector('[name="title"]').value = res.title;
            document.querySelector('[name="author"]').value = res.author;
           // document.querySelector('[name="book_img"]').value = img.files;
            console.log(res.publish_date.substring(0,10));
            document.querySelector('[name="publish_date"]').value = res.publish_date.substring(0,10);
            document.querySelector('[name="publisher"]').value = res.publisher;
            document.querySelector('[name="numOfPages"]').value = res.numOfPages; 
            console.log(res.isbn);
            console.log(res.title);
        }      
      }
      xhttp.open("GET", API_URL + "/book/" + document.querySelector('[name="isbn-get"]').value, true);
      xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      xhttp.send();
    },
   
    deleteBook: function() {
        var isbn = document.getElementById('isbn').innerHTML;
        console.log(isbn);

        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState==4 && this.status==200) {
                console.log(xhttp.responseText);
                
                user.exitAuthAndMsg('Book deleted .');
               
            }
        }
        xhttp.open("DELETE", API_URL + "/book/" + document.querySelector('[name="isbn-get"]').value, true);
        xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhttp.send();
    },

saveEditBook: function () {

        var book = {
            "isbn": document.querySelector('[name="isbn-get"]').value,
            "title": document.querySelector('[name="title"]').value,
            "author": document.querySelector('[name="author"]').value,
            "publish_date": document.querySelector('[name="publish_date"]').value,
            "publisher": document.querySelector('[name="publisher"]').value,
            "numOfPages": document.querySelector('[name="numOfPages"]').value
        };
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                console.log(xhttp.responseText);  
                user.exitAuthAndMsg('changes saved successfully.');  
            }
        };
        xhttp.open("PUT", API_URL + "/book/" + document.querySelector('[name="isbn-get"]').value, true);
        xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhttp.send(JSON.stringify(book));
    },
      
};

