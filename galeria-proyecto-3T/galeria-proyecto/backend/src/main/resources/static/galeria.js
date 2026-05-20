
const API_BASE = 'http://localhost:8080/api/galeria';


const statusEl      = document.getElementById('status');
const gridEl        = document.getElementById('grid');
const searchInput   = document.getElementById('searchInput');
const generoSelect  = document.getElementById('generoSelect');
const btnCargar     = document.getElementById('btnCargar');
const btnNuevo      = document.getElementById('btnNuevo');
const btnGuardar    = document.getElementById('btnGuardar');


const bsDetalle = new bootstrap.Modal(document.getElementById('modalDetalle'));
const bsCrud    = new bootstrap.Modal(document.getElementById('modalCrud'));


let listaOriginal = [];


function escHtml(t) {
    if (t == null) return '';
    return String(t)
        .replace(/&/g,'&amp;').replace(/</g,'&lt;')
        .replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function setStatus(msg, spin = false) {
    statusEl.innerHTML = spin
        ? `<span class="spinner-border spinner-border-sm me-2"></span>${msg}`
        : msg;
}


function cargarGaleria() {
    setStatus('Conectando con la API...', true);
    fetch(API_BASE)
        .then(res => {
            if (!res.ok) throw new Error(`Error HTTP ${res.status}`);
            return res.json();
        })
        .then(data => {
            listaOriginal = data;
            setStatus(`Galería cargada — <strong>${data.length}</strong> elementos.`);
            aplicarFiltros();
        })
        .catch(err => {
            setStatus(`<span class="text-danger"><i class="bi bi-exclamation-triangle me-1"></i>
                No se pudo conectar con la API. Asegúrate de que Spring Boot está en marcha
                en <code>http://localhost:8080</code>. (${err.message})</span>`);
        });
}

btnCargar.addEventListener('click', cargarGaleria);


function aplicarFiltros() {
    const texto  = searchInput.value.trim().toLowerCase();
    const genero = generoSelect.value.trim().toLowerCase();
    const lista  = listaOriginal.filter(e => {
        const okTitulo  = !texto  || (e.titulo    || '').toLowerCase().includes(texto);
        const okGenero  = !genero || (e.categoria || '').toLowerCase().includes(genero);
        return okTitulo && okGenero;
    });
    renderGrid(lista);
    if (listaOriginal.length > 0) {
        setStatus(`Mostrando <strong>${lista.length}</strong> de <strong>${listaOriginal.length}</strong> elementos.`);
    }
}

searchInput.addEventListener('input',  aplicarFiltros);
generoSelect.addEventListener('change', aplicarFiltros);


function renderGrid(lista) {
    gridEl.innerHTML = '';
    if (!lista.length) {
        gridEl.innerHTML = `<div class="col"><p class="text-secondary">No se encontraron resultados.</p></div>`;
        return;
    }
    lista.forEach(item => {
        const col = document.createElement('div');
        col.className = 'col';

        col.innerHTML = `
            <div class="card h-100" data-id="${item.id}">
                <div class="card-img-placeholder">
                    <i class="bi bi-film"></i>
                </div>
                <div class="card-body d-flex flex-column">
                    <div class="d-flex justify-content-between align-items-start mb-1">
                        <h6 class="card-title mb-0">${escHtml(item.titulo)}</h6>
                        <span class="badge-anio ms-2 flex-shrink-0">${escHtml(item.anio)}</span>
                    </div>
                    <p class="card-subtitle mb-2">
                        <i class="bi bi-tag me-1"></i>${escHtml(item.categoria)}
                    </p>
                    <p class="card-text flex-grow-1">${escHtml(item.descripcion)}</p>
                    <div class="card-actions mt-2">
                        <button class="btn-sm-icon btn-detalle" title="Ver detalle">
                            <i class="bi bi-eye"></i> Detalle
                        </button>
                        <button class="btn-sm-icon btn-editar" title="Editar">
                            <i class="bi bi-pencil"></i>
                        </button>
                        <button class="btn-sm-icon danger btn-borrar ms-auto" title="Eliminar">
                            <i class="bi bi-trash"></i>
                        </button>
                    </div>
                </div>
            </div>`;

        // Eventos de la tarjeta
        col.querySelector('.btn-detalle').addEventListener('click', () => abrirDetalle(item));
        col.querySelector('.btn-editar').addEventListener('click',  () => abrirEditar(item));
        col.querySelector('.btn-borrar').addEventListener('click',  () => confirmarBorrar(item));

        gridEl.appendChild(col);
    });
}


function abrirDetalle(item) {
    const logged = !!localStorage.getItem('user');
    if (!logged) {
        if (confirm('Debes registrarte para ver los detalles. ¿Ir a la página de registro?')) {
            window.location.href = 'registro.html';
        }
        return;
    }
    document.getElementById('detalleTitle').textContent = item.titulo;
    document.getElementById('detalleMeta').textContent  =
        `${item.categoria}  ·  ${item.anio}`;
    document.getElementById('detalleDesc').textContent  = item.descripcion;
    bsDetalle.show();
}


btnNuevo.addEventListener('click', () => {
    document.getElementById('crudTitle').textContent = 'Añadir elemento';
    document.getElementById('crudId').value          = '';
    document.getElementById('crudTitulo').value      = '';
    document.getElementById('crudCategoria').value   = '';
    document.getElementById('crudAnio').value        = '';
    document.getElementById('crudDescripcion').value = '';
    document.getElementById('crudError').textContent = '';
});


function abrirEditar(item) {
    document.getElementById('crudTitle').textContent     = 'Editar elemento';
    document.getElementById('crudId').value              = item.id;
    document.getElementById('crudTitulo').value          = item.titulo;
    document.getElementById('crudCategoria').value       = item.categoria;
    document.getElementById('crudAnio').value            = item.anio;
    document.getElementById('crudDescripcion').value     = item.descripcion;
    document.getElementById('crudError').textContent     = '';
    bsCrud.show();
}


btnGuardar.addEventListener('click', () => {
    const id          = document.getElementById('crudId').value;
    const titulo      = document.getElementById('crudTitulo').value.trim();
    const categoria   = document.getElementById('crudCategoria').value.trim();
    const anio        = parseInt(document.getElementById('crudAnio').value);
    const descripcion = document.getElementById('crudDescripcion').value.trim();
    const errorEl     = document.getElementById('crudError');

    if (!titulo || !categoria || !anio || !descripcion) {
        errorEl.textContent = 'Todos los campos son obligatorios.';
        return;
    }
    errorEl.textContent = '';

    const payload = { titulo, categoria, anio, descripcion };
    const esEdicion = id !== '';

    const url    = esEdicion ? `${API_BASE}/${id}` : API_BASE;
    const method = esEdicion ? 'PUT' : 'POST';

    fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })
    .then(res => {
        if (!res.ok) throw new Error(`Error HTTP ${res.status}`);
        return res.json();
    })
    .then(guardado => {
        bsCrud.hide();
        if (esEdicion) {
            const idx = listaOriginal.findIndex(e => e.id === guardado.id);
            if (idx !== -1) listaOriginal[idx] = guardado;
        } else {
            listaOriginal.unshift(guardado);
        }
        aplicarFiltros();
        setStatus(`<span class="text-success"><i class="bi bi-check-circle me-1"></i>
            Elemento ${esEdicion ? 'actualizado' : 'añadido'} correctamente.</span>`);
    })
    .catch(err => {
        errorEl.textContent = 'Error al guardar: ' + err.message;
    });
});


function confirmarBorrar(item) {
    if (!confirm(`¿Eliminar "${item.titulo}"? Esta acción no se puede deshacer.`)) return;

    fetch(`${API_BASE}/${item.id}`, { method: 'DELETE' })
        .then(res => {
            if (!res.ok && res.status !== 204) throw new Error(`Error HTTP ${res.status}`);
            listaOriginal = listaOriginal.filter(e => e.id !== item.id);
            aplicarFiltros();
            setStatus(`<span class="text-success"><i class="bi bi-check-circle me-1"></i>
                "${escHtml(item.titulo)}" eliminado.</span>`);
        })
        .catch(err => {
            setStatus(`<span class="text-danger">Error al eliminar: ${err.message}</span>`);
        });
}