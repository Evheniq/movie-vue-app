# film-vue-app

This is a web application for viewing movies. It allows users to browse a collection of movies, view movie details and watch movie trailers.

## Features Implemented

- [x] Animated components
- [x] Carousel
- [x] Routing
- [x] 5 types of screens
- [x] Page of movie

## Special
- [x] Unit test using Jest
- [x] CI/CD using Github actions and auto publishing to github pages in separate branche
- [x] Publish in Github pages. There problem with CORS 😅

## Peculiarities
I expected that it would be possible to implement an architecture divided into functional modules, but the project turned out to be too small. Therefore, a simple architecture turned out.

There is code repetition due to the fact that you need to do the same thing in different implementations. For example, display a separate page of a movie when clicking on a separate URL in the list of movies. And for tablets, you need to make an exit block with information about the film.

It was decided to separate the components, rather than make one huge universal component. That's why there are two components "Carousel", "Movie List". Both display movies, but the logic of interaction is too different to work with one.
In order not to insert these two components into the virtual home, I hid them behind v-if with reference to the screen width. Performance optimization.
