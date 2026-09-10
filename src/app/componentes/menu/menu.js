
      const menuBtn = document.getElementById('menu-btn');
      const sidebar = document.getElementById('sidebar');
      const logoutBtn = document.getElementById('logout-btn');

      logoutBtn.addEventListener('click', () => {
        window.location.href = 'login.html';
      });


      menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('open');
        sidebar.classList.toggle('open');
      });

      document.addEventListener('click', (e) => {
        if (!sidebar.contains(e.target) && !menuBtn.contains(e.target)) {
          sidebar.classList.remove('open');
          menuBtn.classList.remove('open');
        }
        });