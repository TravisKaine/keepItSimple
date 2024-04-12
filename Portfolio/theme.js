
const themeMap = {
    dark: "light",
    light: "solar",
    solar: "dark"
  };
  
  const theme = localStorage.getItem('theme')
    || (tmp = Object.keys(themeMap)[0],
        localStorage.setItem('theme', tmp),
        tmp);
  const bodyClass = document.body.classList;
  bodyClass.add(theme);
  
  function toggleTheme() {
    const current = localStorage.getItem('theme');
    const next = themeMap[current];
  
    bodyClass.replace(current, next);
    localStorage.setItem('theme', next);

    const navbarBackgroundColor = window.getComputedStyle(document.querySelector('.navbar')).getPropertyValue('background-color');

    document.body.style.backgroundColor = navbarBackgroundColor;

    const body = document.body;
    if (next === 'dark') {
      body.style.backgroundColor = 'black'; // Dark background color
    } else if (next === 'light') {
      body.style.backgroundColor = 'white'; // Light background color
    } else if (next === 'solar') {
      body.style.backgroundColor = '#f5e5b8'; // Solar background color
    }
  }
  
  document.getElementById('themeButton').onclick = toggleTheme;

  window.onload = toggleThemeOnLoad;

