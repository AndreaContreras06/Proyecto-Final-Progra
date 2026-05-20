const mensaje = document.getElementById('mensaje');


document.getElementById('togglePass').addEventListener('click', () => {
    const input   = document.getElementById('contrasena');
    const icon    = document.getElementById('eyeIcon');
    const visible = input.type === 'text';
    input.type     = visible ? 'password' : 'text';
    icon.className = visible ? 'bi bi-eye' : 'bi bi-eye-slash';
});


function escapeHtml(text) {
    if (!text && text !== 0) return '';
    return String(text)
        .replace(/&/g,'&amp;').replace(/</g,'&lt;')
        .replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function getUsers() {
    try { return JSON.parse(localStorage.getItem('users') || '[]'); }
    catch (e) { return []; }
}
function saveUsers(u) { localStorage.setItem('users', JSON.stringify(u)); }


document.getElementById('btnRegistrar').addEventListener('click', () => {
    mensaje.textContent = '';
    const nombre     = document.getElementById('nombre').value.trim();
    const correo     = document.getElementById('correo').value.trim().toLowerCase();
    const contrasena = document.getElementById('contrasena').value;
    const genero     = document.getElementById('genero').value;

    if (!nombre || !correo || contrasena.length < 6) {
        mensaje.className = 'text-danger';
        mensaje.innerHTML = '<i class="bi bi-exclamation-circle me-1"></i>Rellena todos los campos correctamente.';
        return;
    }

    const usuarios = getUsers();
    if (usuarios.some(u => u.correo === correo)) {
        mensaje.className = 'text-danger';
        mensaje.innerHTML = '<i class="bi bi-exclamation-circle me-1"></i>Ya existe una cuenta con ese correo.';
        return;
    }

    const usuario = { nombre: escapeHtml(nombre), correo, contrasena, genero };
    usuarios.push(usuario);
    saveUsers(usuarios);
    localStorage.setItem('user', JSON.stringify({ nombre: usuario.nombre, correo }));

    mensaje.className = 'text-success';
    mensaje.innerHTML = '<i class="bi bi-check-circle me-1"></i>Registro correcto. Redirigiendo...';

    setTimeout(() => { window.location.href = 'index.html'; }, 900);
});

document.getElementById('btnVolver').addEventListener('click', () => {
    window.location.href = 'index.html';
});
