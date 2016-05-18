var searchField = document.getElementById('search-field');
var noResult = document.getElementById('no-result');
var keyword = document.getElementById('keyword');
var iconList = document.getElementsByClassName('item-icon');
var banner = document.getElementById('banner');
var bannerIcon = document.getElementById('icon');
var result = iconList.length;

/**
 * Search
 */
searchField.addEventListener('keyup', function(e) {
  e.preventDefault;
  var keycode = e.keyCode;

  if (keycode != 13) {
    var value = e.target.value;
    keyword.innerText = value;
    result = 0;

    for (var i = 0; i < iconList.length; i++) {
      var icon = iconList[i];
      var iconDiv = icon.querySelector('[class^="fl-icon-"]');
      var classname = iconDiv.getAttribute('class');
      var iconName = classname.replace('fl-icon-', '');

      if(iconName.indexOf(value) == -1) {
        icon.style.display = 'none';
      } else {
        result++;
        icon.style.display = 'block';
      }
    }
  }

  if (result == 0) {
    noResult.style.display = "block";
  } else {
    noResult.style.display = "none";
  }

  return false;
});

/**
 * Copy to clipboard
 */
for (var i = 0; i < iconList.length; i++) {
  var icon = iconList[i];
  icon.addEventListener('click', copy(i));
}

function copy(i) {
  return function() {
    icon = iconList[i];
    var copyboard = icon.getElementsByClassName('copyboard')[0];
    copyboard.select();

    try {
      bannerIcon.innerText = copyboard.value;
      banner.style.display = "block";
      document.execCommand('copy');

      setTimeout(function(e) {
        banner.style.display = "none";
      }, 2000);

    }
    catch (err) {
      alert('please press Ctrl/Cmd+C to copy');
    }
  }
}
