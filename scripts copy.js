function toggleNav() {
    var sidebar = document.getElementById("sidebar");
    var main = document.getElementById("main");
    var header = document.getElementById("header");
    var logout = document.getElementById("logout");
    if (sidebar.style.left === "0px") {
        sidebar.style.left = "-250px"; /* Esconda o sidebar */
        main.style.marginLeft = "0"; /* Reposicione o conteúdo principal */
        header.style.marginLeft = "0"; /* Reposicione o cabeçalho */
        logout.style.marginRight = "0"; /* Reposicione o logout */
    } else {
        sidebar.style.left = "0"; /* Mostre o sidebar */
        main.style.marginLeft = "250px"; /* Desloque o conteúdo principal */
        header.style.marginLeft = "250px"; /* Desloque o cabeçalho */
        logout.style.marginRight = "250px"; /* Desloque o logout */
    }
}

// Função para alternar submenus
document.querySelectorAll('.submenu-toggle').forEach(item => {
    item.addEventListener('click', function(e) {
        e.preventDefault();
        let submenu = this.nextElementSibling;
        submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block';
    });
});

// Função para definir submenu ativo
document.querySelectorAll('.submenu-item').forEach(item => {
    item.addEventListener('click', function(e) {
        document.querySelectorAll('.submenu-item').forEach(i => i.classList.remove('active'));
        this.classList.add('active');
    });
});
