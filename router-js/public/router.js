const routes = [
  {
    path: '/',
    data: `
      <h1>Welcome to Home page.</h1>
    `
  },
  { 
    path: '/main',
    data: `
      <h1>Welcome to Main page.</h1>
    `
  },
  { 
    path: '/profile',
    data: `
      <h1>Welcome to Profile page.</h1>
    `
  }
];

const root = document.getElementById('root');

function router(event) {
  event.preventDefault();
  history.pushState({}, 'newUrl', event.target.href);
  let route = routes.find(route => route.path == window.location.pathname);
  root.innerHTML = route.data;
  navColorLink();
}

window.addEventListener('popstate', function() {
  let data = routes.find(route => route.path == window.location.pathname);
  root.innerHTML = data.data;
})

window.addEventListener('DOMContentLoaded', function() {
  let route = routes.find(route => route.path == window.location.pathname);
  root.innerHTML = route.data;
  navColorLink();
})

const links = document.querySelectorAll('nav ul li a');

function navColorLink() {
  links.forEach(link => {
    if(link.href === window.location.href) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  })
}