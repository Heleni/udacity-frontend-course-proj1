### Version 1.1
# What's New
The code are modified according to reviewer's suggestion.
1. infoWindow is now populated with setContent instead of jQurery.
2. `.fail` method is used instead of `.error` for error handling.
3. `onerror` method is added to googlejs script.
4. A more reported location was used to insure New York Times data coverage.

Unresolved issure:
```
SUGGESTION
Consider using the text binding of Knockout to handle this error display. When a framework is being used, all interactive logic can be centralized via the framework. It makes code more organized/optimized.
```
I am still struggling a lot with Knockout. It seems that I need to set up a DOM in the index.html for the error message, which I don't like as it feels redundant. On the other hand, I haven't figure out how to bind the ko.observable to a script genrated DOM.

# Overview
This package is a required project of the ["Full Stack Web Developer" nanodegree][FSWD] at [Udacity]. The main objectives of this practice include building a responsive web application, 'Neighbourhood Maps', using jQuery, Ajax and third-party API's, implementing 'Model-View-ViewModel' via Knockout library, applying skillsets such as html, css, javascript, etc. The project is completely front-ended and can be run by opening the 'index.html' file in a browser. 

# Functions
The 'Neighbourhood Maps' will:
1. Display 3 main components: a Search bar, a List view, and a Map
2. The Search filters BOTH List view and Map markers by name
3. BOTH List view and Map markers are clickable. Clicking either will open an info window displaying the recent New York Times articles about that place.
4. Drag the person icon to a location will display the street view.

# How to use
Simply download the package and open the 'index.html' file in a browser.

# License
MIT

***********************
  [FSWD]: <https://www.udacity.com/course/full-stack-web-developer-nanodegree--nd004>
  [Udacity]: <https://www.udacity.com>
  [git]: <https://www.virtualbox.org/wiki/Downloads>
  [vb]: <https://www.virtualbox.org/wiki/Downloads>
  [vag]: <https://www.vagrantup.com/downloads>
  