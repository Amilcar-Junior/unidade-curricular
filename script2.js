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

// Função para alternar o sidebar
function toggleNav() {
    var sidebar = document.getElementById("sidebar");
    var main = document.getElementById("main");
    var header = document.getElementById("header");
    var logout = document.getElementById("logout");
    if (sidebar.style.left === "0px") {
        sidebar.style.left = "-250px"; // Esconda o sidebar
        main.style.marginLeft = "0"; // Reposicione o conteúdo principal
        header.style.marginLeft = "0"; // Reposicione o cabeçalho
        logout.style.marginRight = "0"; // Reposicione o logout
        localStorage.setItem('sidebarState', 'closed'); // Armazena o estado do sidebar como fechado
    } else {
        sidebar.style.left = "0"; // Mostre o sidebar
        main.style.marginLeft = "250px"; // Desloque o conteúdo principal
        header.style.marginLeft = "250px"; // Desloque o cabeçalho
        logout.style.marginRight = "250px"; // Desloque o logout
        localStorage.setItem('sidebarState', 'open'); // Armazena o estado do sidebar como aberto
    }
}

// Função para definir o estado do sidebar ao carregar a página
function setSidebarState() {
    var sidebar = document.getElementById("sidebar");
    var main = document.getElementById("main");
    var header = document.getElementById("header");
    var logout = document.getElementById("logout");
    var state = localStorage.getItem('sidebarState');
    if (state === 'open') {
        sidebar.style.left = "0"; // Mostre o sidebar
        main.style.marginLeft = "250px"; // Desloque o conteúdo principal
        header.style.marginLeft = "250px"; // Desloque o cabeçalho
        logout.style.marginRight = "250px"; // Desloque o logout
    } else {
        sidebar.style.left = "-250px"; // Esconda o sidebar
        main.style.marginLeft = "0"; // Reposicione o conteúdo principal
        header.style.marginLeft = "0"; // Reposicione o cabeçalho
        logout.style.marginRight = "0"; // Reposicione o logout
    }
}

function validateForm() {
    let isValid = true;
    const fields = document.querySelectorAll('.form-control');
    fields.forEach(field => {
        if (field.value.trim() === '') {
            field.classList.add('error');
            field.classList.remove('success');
            isValid = false;
        } else {
            field.classList.remove('error');
            field.classList.add('success');
        }
    });
    return isValid;
}
