var book = {
    containerId: 'bookAuth',
    apiServer: API_URL+':'+API_PORT,
    firstPageTemplate: `
    <div class="bookAuth1 center">
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
        //document.getElementById("testProtectedButton").style.display = "none";
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
      </div>`.trim(),
      showCreatePage: function() {
        document.getElementById(this.containerId).innerHTML = this.bookTemplate;
        document.getElementById("createBookBtn").onclick = this.createBook.bind(this);
        document.getElementById('back').onclick = this.startSomePage.bind(this);
    },
    createBook: function () {
      if(!user.isLoggedIn()) {
         user.showLogin();
         return;
      }
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
    //user.showSpinner();
    //console.log(book);
    const xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
           console.log(xhttp.responseText);
           //user.hideSpinner();
           user.exitAuthAndMsg('book is created.');
        }
    };

    xhttp.open("POST", this.apiServer + "/book/", true);
    xhttp.setRequestHeader("Authorization", "Bearer: " + user.getToken());
    xhttp.send(form);
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
                <th>Author</th>
            </tr>
        </thead>
            <tboody>
                <tr>
                </tr>
            </tbody>
        </table>
         <div>
             <button id="getBook">GET one book</button>
           <div class="findInput" id="findByIsbn">
             <input name="isbn-get" placeholder="ISBN">
           </div>
        </div>
    </div>
  </div>`.trim(),
      getBooksAll: function() {
        document.getElementById(this.containerId).innerHTML = this.allBooksListTemplate;
        document.getElementById('back').onclick = this.startSomePage.bind(this);
        document.getElementById("getBook").onclick = this.showInput.bind(this);
        this.getBooks();

      },
      getBooks: function () {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                console.log(xhttp.responseText);
                var res = JSON.parse(xhttp.responseText);
                const allBooksList = res.length;
                for(i=0; i < allBooksList; i++ ) {
                  document.getElementById('table').innerHTML += "<td>" + res[i].isbn + "</td>" + "<td>" + res[i].title + "</td>" + "<td>" + img.files[0] + "</td>";
                }
                  user.exitAuthAndMsg('books were found.');
               // Typical action to be performed when the document is ready:
            }
        };
        xhttp.open("GET", this.apiServer + "/books/", true);
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
               <input type= "file" name="book_img">
               <img name="imgName" id ="book_img">
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
          </div>
      </div>
    </div>`.trim(),
   
    getOneBook: function() {
        //document.getElementById("testProtectedButton").style.display = "none";
        document.getElementById(this.containerId).innerHTML = this.oneBookTemplate;
        user.exitAuthAndMsg('Book found');
        document.getElementById("saveEdit").onclick = this.saveEditBook.bind(this);
        document.getElementById('back').onclick = this.startSomePage.bind(this);
        //document.getElementById("editImg").onclick = this.saveEditImage.bind(this);  
      },
    getBook: function() {
        
      var isbn = document.querySelector('[name="isbn-get"]').value;
                 console.log(isbn);
        if(isbn.length < 1){
           alert("please check isbn");
           return;
      }
      var imgPath = book.apiServer;
      const xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
            if(this.readyState==4 && this.status==200) {
                var res = JSON.parse(xhttp.responseText);
                var image = imgPath + res.img;
                console.log(image);
                console.log(xhttp.response);
                book.getOneBook();
                console.log(res.img);
                console.log(imgPath + res.img);
         
            document.querySelector('[name="isbn-get"]').value = res.isbn;
            document.querySelector('[name="title"]').value = res.title;
            document.querySelector('[name="author"]').value = res.author;
            document.getElementById('book_img').src = image;
            console.log(res.publish_date.substring(0,10));
            document.querySelector('[name="publish_date"]').value = res.publish_date.substring(0,10);
            document.querySelector('[name="publisher"]').value = res.publisher;
            document.querySelector('[name="numOfPages"]').value = res.numOfPages; 
            console.log(res.isbn);
            console.log(res.title);
            user.exitAuthAndMsg('book is found.');
        }      
      }
      xhttp.open("GET", this.apiServer + "/book/" + isbn, true);
      xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      xhttp.send();
    },
   
    deleteBook: function() {
        if(!user.isLoggedIn()) {
            user.showLogin();
            return;
        }
        var isbn = document.getElementById('isbn').value;
        console.log(isbn);

        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState==4 && this.status==200) {
                console.log(xhttp.responseText);
                user.exitAuthAndMsg('Book deleted .');
               
            }
        }
        xhttp.open("DELETE", this.apiServer + "/book/" + isbn, true);
        xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhttp.setRequestHeader("Authorization", "Bearer: " + user.getToken());
        xhttp.send();
    },

saveEditBook: function () {
          if(!user.isLoggedIn()) {
              user.showLogin();
              return;
              }
          var imgPath = book.apiServer;
          var form = new FormData();
          var img = document.querySelector('[name="book_img"]');
          console.log(img);

          if(img.files.length > 0) {
            form.append('book_img', img.files[0]);
            console.log("add image to formData")
         }
          console.log(img.files[0].name, img.files[0].size, img.files[0].type);

          form.append('isbn', document.querySelector('[name="isbn-get"]').value);
          form.append('title', document.querySelector('[name="title"]').value);
          form.append('author', document.querySelector('[name="author"]').value);
          form.append('publish_date', document.querySelector('[name="publish_date"]').value);
          form.append('publisher', document.querySelector('[name="publisher"]').value);
          form.append('numOfPages', document.querySelector('[name="numOfPages"]').value);
       /* var book = {
            "isbn": document.querySelector('[name="isbn-get"]').value,
            "title": document.querySelector('[name="title"]').value,
            "author": document.querySelector('[name="author"]').value,
            "publish_date": document.querySelector('[name="publish_date"]').value,
            "publisher": document.querySelector('[name="publisher"]').value,
            "numOfPages": document.querySelector('[name="numOfPages"]').value
        }; */
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var image = imgPath + img.files[0].name;
                console.log(image);
                console.log(xhttp.responseText);  
                user.exitAuthAndMsg('changes saved successfully.');  
            }
        };
        xhttp.open("PUT", this.apiServer + "/book/" + document.querySelector('[name="isbn-get"]').value, true);
        xhttp.setRequestHeader("Authorization", "Bearer: " + user.getToken());
        xhttp.send(form);
    },
      
};

