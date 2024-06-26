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

function handleSubmit(event) {
    event.preventDefault(); // Prevent the default form submission
    if (validateForm()) {
        // Collect the form data
        const formData = {
            tema: document.getElementById('tema') ? document.getElementById('tema').value : '',
            orientador: document.getElementById('orientador') ? document.getElementById('orientador').value : '',
            coorientador: document.getElementById('coorientador') ? document.getElementById('coorientador').value : '',
            objetivo: document.getElementById('objetivo') ? document.getElementById('objetivo').value : '',
            motivacao: document.getElementById('motivacao') ? document.getElementById('motivacao').value : ''
        };
        console.log(formData); // Log the form data
        // Store the form data in localStorage
        localStorage.setItem('formData', JSON.stringify(formData));
        // Redirect to the validation page
        window.location.href = 'validacao_terminal.html';
    }
}

function loadData() {
    const formData = JSON.parse(localStorage.getItem('formData'));
    console.log("dados recuperados: ", formData); // Log the retrieved data
    if (formData) {
        if (document.getElementById('tema')) document.getElementById('tema').value = formData.tema;
        if (document.getElementById('orientador')) document.getElementById('orientador').value = formData.orientador;
        if (document.getElementById('coorientador')) document.getElementById('coorientador').value = formData.coorientador;
        if (document.getElementById('objetivo')) document.getElementById('objetivo').value = formData.objetivo;
        if (document.getElementById('motivacao')) document.getElementById('motivacao').value = formData.motivacao;
    }
}

// Função para definir a data atual
function setDate() {
    const dateElement = document.getElementById('data_conclusao');
    if (dateElement) {
        const today = new Date().toISOString().split('T')[0];
        dateElement.value = today;
    }
}

function initializeForm() {
    setSidebarState();
    if (window.location.pathname.includes('validacao_terminal.html')) {
        loadData();
    } else if (window.location.pathname.includes('publicacao_terminal.html')) {
        loadData();
        setDate();
    } else if (window.location.pathname.includes('nota_terminal.html')) {
        document.getElementById('contextualizacao').addEventListener('input', calculateAverage);
        document.getElementById('relatorio').addEventListener('input', calculateAverage);
        document.getElementById('relevancia').addEventListener('input', calculateAverage);
        document.getElementById('apresentacao').addEventListener('input', calculateAverage);
        document.getElementById('consideracoes_finais').addEventListener('input', calculateAverage);
    }
}

// Função para calcular a média das notas
function calculateAverage() {
    const contextualizacao = parseFloat(document.getElementById('contextualizacao').value) || 0;
    const relatorio = parseFloat(document.getElementById('relatorio').value) || 0;
    const relevancia = parseFloat(document.getElementById('relevancia').value) || 0;
    const apresentacao = parseFloat(document.getElementById('apresentacao').value) || 0;
    const consideracoesFinais = parseFloat(document.getElementById('consideracoes_finais').value) || 0;
    
    const sum = contextualizacao + relatorio + relevancia + apresentacao + consideracoesFinais;
    const average = sum / 5;
    
    document.getElementById('nota_final').value = average.toFixed(2);
}

// Função para mostrar o modal
function showModal() {
    const modal = document.createElement('div');
    modal.style.position = 'fixed';
    modal.style.top = '50%';
    modal.style.left = '50%';
    modal.style.transform = 'translate(-50%, -50%)';
    modal.style.backgroundColor = 'white';
    modal.style.padding = '20px';
    modal.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';
    modal.innerHTML = `
        <h2>Formulário enviado com sucesso</h2>
        <button onclick="closeModal()">Fechar</button>
    `;
    document.body.appendChild(modal);
}

// Função para fechar o modal
function closeModal() {
    const modal = document.querySelector('div[style*="position: fixed"]');
    if (modal) {
        modal.remove();
    }
}

// Define o estado do sidebar ao carregar a página
window.onload = initializeForm;
