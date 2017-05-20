// Listen for form submit
document.getElementById('app').addEventListener('submit', saveBookmark);

// Save Bookmark
function saveBookmark(e) {
  // Get form values
  var siteName =document.getElementById('sitename').value;
  var siteUrl =document.getElementById('siteurl').value;

  if (!validateForm(siteName, siteUrl)) {
    return false;
  }

  var bookmark = {
    name: siteName,
    url: siteUrl
  }


  if (localStorage.getItem('bookmarks') === null) {

    var bookmarks = [];
    // Add to array
    bookmarks.push(bookmark);
    // Set to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  } else {
    // Get bookmarks from localStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // Add bookmark to array
    bookmarks.push(bookmark);
    // And then re-set back to localStorage to add all
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }

  // Clear form
  document.getElementById('app').reset();

  // Re-fetch bookmarks
  fetchBookmarks();

  // Prevent form to submit when I don't want to
  e.preventDefault();
}


function deleteBookmark(url) {

  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  // Loop throught bookmarks
  for (var i =0;i < bookmarks.length;i++) {
    if (bookmarks[i].url == url) {
      // Aaaand remove it from array
      bookmarks.splice(i, 1);
    }
  }
  // Update new bookmarks to localStorage
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

  fetchBookmarks();
}


function fetchBookmarks() {

  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

  var bookmarksResults = document.getElementById('bookmarksResults');

  // Build our HTML & CSS output
  bookmarksResults.innerHTML = '';
  for(var i = 0; i < bookmarks.length; i++){
    var name = bookmarks[i].name;
    var url = bookmarks[i].url;

    bookmarksResults.innerHTML += '<div class="well">'+
                                  '<h3>'+name+
                                  ' <a class="btn" target="_blank" href="'+url+'">Visit</a> ' +
                                  ' <a onclick="deleteBookmark(\''+url+'\')" class="btn" href="#">Delete</a> ' +
                                  '</h3>'+
                                  '</div>';
  }
}


function validateForm(siteName, siteUrl) {
  if (!siteName || !siteUrl) {
    alert('Please fill in the form');
    return false;
  }

  var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);

  if (!siteUrl.match(regex)) {
    alert('Please use a valid URL');
    return false;
  }

  return true;
}