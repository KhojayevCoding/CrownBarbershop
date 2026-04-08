// Storage keys
const STORAGE_KEYS = {
    BARBERS: 'barbers',
    BOOKINGS: 'bookings',
    CURRENT_CLIENT: 'currentClient',
    CURRENT_BARBER: 'currentBarber',
    IS_DARK_MODE: 'isDarkMode'
};

// Initialize - HECH QANDAY DEFAULT BARBER YO'Q! BO'SH ARRAY!
function initData() {
    // BARBERS - always empty array, no defaults!
    if (!localStorage.getItem(STORAGE_KEYS.BARBERS)) {
        localStorage.setItem(STORAGE_KEYS.BARBERS, JSON.stringify([]));
    }
    
    // BOOKINGS - empty array
    if (!localStorage.getItem(STORAGE_KEYS.BOOKINGS)) {
        localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify([]));
    }
    
    // Check dark mode
    const isDark = localStorage.getItem(STORAGE_KEYS.IS_DARK_MODE);
    if (isDark === 'true') {
        document.body.classList.add('dark-mode');
    }
}

function getBarbers() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.BARBERS) || '[]');
}

function getBookings() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.BOOKINGS) || '[]');
}

function saveBookings(bookings) {
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
}

function saveBarbers(barbers) {
    localStorage.setItem(STORAGE_KEYS.BARBERS, JSON.stringify(barbers));
}

function getCurrentDate() {
    const today = new Date();
    return today.toISOString().split('T')[0];
}

function toggleDarkMode(enable) {
    if (enable) {
        document.body.classList.add('dark-mode');
        localStorage.setItem(STORAGE_KEYS.IS_DARK_MODE, 'true');
    } else {
        document.body.classList.remove('dark-mode');
        localStorage.setItem(STORAGE_KEYS.IS_DARK_MODE, 'false');
    }
}

function renderApp() {
    const currentClient = localStorage.getItem(STORAGE_KEYS.CURRENT_CLIENT);
    const currentBarberId = localStorage.getItem(STORAGE_KEYS.CURRENT_BARBER);
    
    if (currentClient) {
        renderClientDashboard(currentClient);
    } else if (currentBarberId) {
        const barber = getBarbers().find(b => b.id === currentBarberId);
        if (barber) {
            renderBarberDashboard(barber);
        } else {
            localStorage.removeItem(STORAGE_KEYS.CURRENT_BARBER);
            renderStartPage();
        }
    } else {
        renderStartPage();
    }
}

function renderStartPage() {
    const app = document.getElementById('app');
    app.innerHTML = `
        <div class="role-container">
            <div class="role-card" onclick="showClientLogin()">
                <div class="role-icon">
                    <i class="fas fa-user"></i>
                </div>
                <h2>Mijoz</h2>
                <p>Kirish</p>
            </div>
            <div class="role-card" onclick="showBarberLogin()">
                <div class="role-icon">
                    <i class="fas fa-cut"></i>
                </div>
                <h2>Sartarosh</h2>
                <p>Kirish yoki Ro'yxatdan o'tish</p>
            </div>
        </div>
    `;
}

// Client login
window.showClientLogin = function() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-title">
                <i class="fas fa-user"></i> Mijoz Kirish
            </div>
            <div class="modal-input">
                <label>Ismingiz</label>
                <input type="text" id="clientName" placeholder="Ismingizni kiriting">
            </div>
            <div class="modal-buttons">
                <button class="btn btn-primary" onclick="clientLogin()">Kirish</button>
                <button class="btn btn-secondary" onclick="closeModal()">Bekor</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
};

window.clientLogin = function() {
    const name = document.getElementById('clientName')?.value.trim();
    if (name) {
        localStorage.setItem(STORAGE_KEYS.CURRENT_CLIENT, name);
        toggleDarkMode(true);
        closeModal();
        renderApp();
    } else {
        alert("Ismingizni kiriting!");
    }
};

// Barber section
window.showBarberLogin = function() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-title">
                <i class="fas fa-cut"></i> Sartarosh
            </div>
            <div class="modal-buttons" style="flex-direction: column;">
                <button class="btn btn-primary" onclick="showBarberRegister()">Ro'yxatdan o'tish</button>
                <button class="btn btn-secondary" onclick="showBarberLoginForm()">Kirish</button>
                <button class="btn btn-secondary" onclick="closeModal()">Bekor</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
};

window.showBarberRegister = function() {
    closeModal();
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-title">
                <i class="fas fa-user-plus"></i> Ro'yxatdan o'tish
            </div>
            <div class="modal-input">
                <label>Ism</label>
                <input type="text" id="barberFirstName" placeholder="Ism">
            </div>
            <div class="modal-input">
                <label>Familiya</label>
                <input type="text" id="barberLastName" placeholder="Familiya">
            </div>
            <div class="modal-input">
                <label>Tug'ilgan yil</label>
                <input type="text" id="barberBirthYear" placeholder="Masalan: 1990">
            </div>
            <div class="modal-input">
                <label>Tajriba (yil)</label>
                <input type="text" id="barberExperience" placeholder="Masalan: 8">
            </div>
            <div class="modal-buttons">
                <button class="btn btn-primary" onclick="registerBarber()">Ro'yxatdan o'tish</button>
                <button class="btn btn-secondary" onclick="closeModal()">Bekor</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
};

window.showBarberLoginForm = function() {
    closeModal();
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-title">
                <i class="fas fa-sign-in-alt"></i> Sartarosh Kirish
            </div>
            <div class="modal-input">
                <label>Ism</label>
                <input type="text" id="barberFirstName" placeholder="Ism">
            </div>
            <div class="modal-input">
                <label>Familiya</label>
                <input type="text" id="barberLastName" placeholder="Familiya">
            </div>
            <div class="modal-buttons">
                <button class="btn btn-primary" onclick="barberLogin()">Kirish</button>
                <button class="btn btn-secondary" onclick="closeModal()">Bekor</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
};

window.barberLogin = function() {
    const firstName = document.getElementById('barberFirstName')?.value.trim();
    const lastName = document.getElementById('barberLastName')?.value.trim();
    
    const barbers = getBarbers();
    const barber = barbers.find(b => b.firstName === firstName && b.lastName === lastName);
    
    if (barber) {
        localStorage.setItem(STORAGE_KEYS.CURRENT_BARBER, barber.id);
        toggleDarkMode(true);
        closeModal();
        renderApp();
    } else {
        alert("Sartarosh topilmadi! Iltimos, ro'yxatdan o'ting.");
    }
};

window.registerBarber = function() {
    const firstName = document.getElementById('barberFirstName')?.value.trim();
    const lastName = document.getElementById('barberLastName')?.value.trim();
    const birthYear = document.getElementById('barberBirthYear')?.value;
    const experience = document.getElementById('barberExperience')?.value;
    
    if (firstName && lastName && birthYear && experience) {
        const barbers = getBarbers();
        const newBarber = {
            id: Date.now().toString(),
            firstName: firstName,
            lastName: lastName,
            birthYear: parseInt(birthYear),
            experience: parseInt(experience)
        };
        barbers.push(newBarber);
        saveBarbers(barbers);
        localStorage.setItem(STORAGE_KEYS.CURRENT_BARBER, newBarber.id);
        toggleDarkMode(true);
        closeModal();
        renderApp();
        alert("✅ Muvaffaqiyatli ro'yxatdan o'tdingiz!");
    } else {
        alert("Barcha maydonlarni to'ldiring!");
    }
};

window.closeModal = function() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => modal.remove());
};

// Client Dashboard
function renderClientDashboard(clientName) {
    const barbers = getBarbers();
    const bookings = getBookings();
    const myBookings = bookings.filter(b => b.clientName === clientName).sort((a,b) => new Date(b.date) - new Date(a.date));
    
    const app = document.getElementById('app');
    app.innerHTML = `
        <div class="header">
            <div class="logo">
                <i class="fas fa-crown"></i>
                <h1>Crown Barber Shop</h1>
            </div>
            <div class="profile">
                <div class="profile-avatar">${clientName.charAt(0).toUpperCase()}</div>
                <span class="profile-name">${clientName}</span>
                <button class="logout-btn" onclick="logout()"><i class="fas fa-sign-out-alt"></i> Chiqish</button>
            </div>
        </div>
        
        <div class="card">
            <div class="card-title">
                <i class="fas fa-cut"></i> Sartaroshlar
            </div>
            <div class="barber-list" id="barberList">
                ${barbers.length === 0 ? '<div class="empty-state"><i class="fas fa-info-circle"></i><div>Hozircha sartaroshlar mavjud emas<br><small>Sartarosh sifatida ro\'yxatdan o\'ting</small></div></div>' : ''}
                ${barbers.map(barber => {
                    const age = new Date().getFullYear() - barber.birthYear;
                    return `
                        <div class="barber-item" onclick="showBookingModal('${barber.id}', '${barber.firstName} ${barber.lastName}')">
                            <div class="barber-avatar"><i class="fas fa-user-secret"></i></div>
                            <div class="barber-info-div">
                                <div class="barber-name">${barber.firstName} ${barber.lastName}</div>
                                <div class="barber-info">🎂 ${age} yosh | ⭐ ${barber.experience} yil</div>
                            </div>
                            <i class="fas fa-chevron-right" style="color: var(--gold); font-size: 14px;"></i>
                        </div>
                    `;
                }).join('')}
            </div>
        </div>
        
        <div class="card">
            <div class="card-title">
                <i class="fas fa-history"></i> Mening bronlarim
            </div>
            <div id="myBookings">
                ${myBookings.length === 0 ? '<div class="empty-state"><i class="fas fa-calendar"></i><div>Bronlaringiz yo\'q</div></div>' : ''}
                ${myBookings.map(booking => {
                    const barber = barbers.find(b => b.id === booking.barberId);
                    return `
                        <div class="booking-item">
                            <div class="booking-header">
                                <span class="booking-client">${barber ? barber.firstName + ' ' + barber.lastName : 'Sartarosh'}</span>
                                <span class="status status-${booking.status}">${getStatusText(booking.status)}</span>
                            </div>
                            <div class="booking-time">📅 ${booking.date} | ⏰ ${booking.time}</div>
                            ${booking.status === 'pending' ? `
                                <button class="btn btn-danger" style="margin-top: 8px;" onclick="cancelBooking('${booking.id}')">Bekor qilish</button>
                            ` : ''}
                        </div>
                    `;
                }).join('')}
            </div>
        </div>
    `;
}

window.showBookingModal = function(barberId, barberName) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-title">
                <i class="fas fa-calendar-plus"></i> Bron: ${barberName}
            </div>
            <div class="modal-input">
                <label>Sana kiriting</label>
                <input type="text" id="bookingDate" placeholder="Masalan: 25.12.2024">
            </div>
            <div class="modal-input">
                <label>Vaqt kiriting</label>
                <input type="text" id="bookingTime" placeholder="Masalan: 14:30">
            </div>
            <div class="modal-buttons">
                <button class="btn btn-primary" onclick="confirmBooking('${barberId}')">Tasdiqlash</button>
                <button class="btn btn-secondary" onclick="closeModal()">Bekor</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
};

window.confirmBooking = function(barberId) {
    const date = document.getElementById('bookingDate')?.value.trim();
    const time = document.getElementById('bookingTime')?.value.trim();
    const clientName = localStorage.getItem(STORAGE_KEYS.CURRENT_CLIENT);
    
    if (!date || !time) {
        alert("Sanani va vaqtni kiriting!");
        return;
    }
    
    const bookings = getBookings();
    bookings.push({
        id: Date.now().toString(),
        clientName: clientName,
        barberId: barberId,
        date: date,
        time: time,
        status: 'pending'
    });
    saveBookings(bookings);
    closeModal();
    renderApp();
    alert("✅ Bron muvaffaqiyatli yaratildi!");
};

window.cancelBooking = function(bookingId) {
    if (confirm("Bronni bekor qilmoqchimisiz?")) {
        let bookings = getBookings();
        bookings = bookings.filter(b => b.id !== bookingId);
        saveBookings(bookings);
        renderApp();
        alert("✅ Bron bekor qilindi!");
    }
};

// Barber Dashboard
function renderBarberDashboard(barber) {
    const bookings = getBookings();
    const today = getCurrentDate();
    const myBookings = bookings.filter(b => b.barberId === barber.id);
    const todayBookings = myBookings.filter(b => b.date === today);
    
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const monthlyBookings = myBookings.filter(b => {
        const d = new Date(b.date);
        return !isNaN(d) && d.getMonth() === currentMonth && d.getFullYear() === currentYear;
    });
    
    const total = monthlyBookings.length;
    const came = monthlyBookings.filter(b => b.status === 'came').length;
    const missed = monthlyBookings.filter(b => b.status === 'missed').length;
    const pending = total - came - missed;
    
    const camePercent = total > 0 ? Math.round((came / total) * 100) : 0;
    const missedPercent = total > 0 ? Math.round((missed / total) * 100) : 0;
    const pendingPercent = total > 0 ? Math.round((pending / total) * 100) : 0;
    
    const app = document.getElementById('app');
    app.innerHTML = `
        <div class="header">
            <div class="logo">
                <i class="fas fa-crown"></i>
                <h1>Crown Barber Shop</h1>
            </div>
            <div class="profile">
                <div class="profile-avatar">${barber.firstName.charAt(0)}</div>
                <span class="profile-name">${barber.firstName} ${barber.lastName}</span>
                <button class="logout-btn" onclick="logout()"><i class="fas fa-sign-out-alt"></i> Chiqish</button>
            </div>
        </div>
        
        <div class="stats-grid">
            <div class="stat-card">
                <i class="fas fa-users"></i>
                <div class="number">${total}</div>
                <div class="label">Jami</div>
            </div>
            <div class="stat-card">
                <i class="fas fa-check-circle"></i>
                <div class="number">${came}</div>
                <div class="percent">${camePercent}%</div>
                <div class="label">Kelgan</div>
            </div>
            <div class="stat-card">
                <i class="fas fa-clock"></i>
                <div class="number">${pending}</div>
                <div class="percent">${pendingPercent}%</div>
                <div class="label">Kutilmoqda</div>
            </div>
            <div class="stat-card">
                <i class="fas fa-times-circle"></i>
                <div class="number">${missed}</div>
                <div class="percent">${missedPercent}%</div>
                <div class="label">Kelmagan</div>
            </div>
        </div>
        
        <div class="card">
            <div class="row-flex">
                <div class="card-title" style="margin-bottom: 0;">
                    <i class="fas fa-calendar-day"></i> Bugungi mijozlar
                </div>
                <button class="add-btn" onclick="showAddClientModal()">
                    <i class="fas fa-plus"></i> Qo'shish
                </button>
            </div>
            <div id="todayList">
                ${todayBookings.length === 0 ? '<div class="empty-state"><i class="fas fa-calendar"></i><div>Bugungi bronlar yo\'q</div></div>' : ''}
                ${todayBookings.map(booking => `
                    <div class="booking-item">
                        <div class="booking-header">
                            <span class="booking-client">${booking.clientName}</span>
                            <span class="status status-${booking.status}">${getStatusText(booking.status)}</span>
                        </div>
                        <div class="booking-time">⏰ ${booking.time}</div>
                        ${booking.status === 'pending' ? `
                            <div class="booking-buttons">
                                <button class="btn btn-success" onclick="updateStatus('${booking.id}', 'came')">Keldi</button>
                                <button class="btn btn-danger" onclick="updateStatus('${booking.id}', 'missed')">Kelmadi</button>
                                <button class="btn btn-secondary" onclick="cancelBookingByBarber('${booking.id}')">Bekor</button>
                            </div>
                        ` : ''}
                    </div>
                `).join('')}
            </div>
        </div>
        
        <div class="card">
            <div class="card-title">
                <i class="fas fa-history"></i> Barcha bronlar
            </div>
            <div id="allBookings">
                ${myBookings.length === 0 ? '<div class="empty-state"><i class="fas fa-folder-open"></i><div>Bronlar yo\'q</div></div>' : ''}
                ${myBookings.filter(b => b.date !== today).sort((a,b) => new Date(b.date) - new Date(a.date)).map(booking => `
                    <div class="booking-item">
                        <div class="booking-header">
                            <span class="booking-client">${booking.clientName}</span>
                            <span class="status status-${booking.status}">${getStatusText(booking.status)}</span>
                        </div>
                        <div class="booking-time">📅 ${booking.date} | ⏰ ${booking.time}</div>
                        <button class="btn btn-secondary" style="margin-top: 8px;" onclick="cancelBookingByBarber('${booking.id}')">Bekor qilish</button>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

window.showAddClientModal = function() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-title">
                <i class="fas fa-user-plus"></i> Yangi mijoz
            </div>
            <div class="modal-input">
                <label>Mijoz ismi</label>
                <input type="text" id="newClientName" placeholder="Mijoz ismi">
            </div>
            <div class="modal-input">
                <label>Vaqt kiriting</label>
                <input type="text" id="newClientTime" placeholder="Masalan: 14:30">
            </div>
            <div class="modal-buttons">
                <button class="btn btn-primary" onclick="addClientByBarber()">Qo'shish</button>
                <button class="btn btn-secondary" onclick="closeModal()">Bekor</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
};

window.addClientByBarber = function() {
    const name = document.getElementById('newClientName')?.value.trim();
    const time = document.getElementById('newClientTime')?.value.trim();
    const barberId = localStorage.getItem(STORAGE_KEYS.CURRENT_BARBER);
    
    if (!name || !time) {
        alert("Mijoz ismini va vaqtni kiriting!");
        return;
    }
    
    const bookings = getBookings();
    bookings.push({
        id: Date.now().toString(),
        clientName: name,
        barberId: barberId,
        date: getCurrentDate(),
        time: time,
        status: 'pending'
    });
    saveBookings(bookings);
    closeModal();
    renderApp();
    alert("✅ Mijoz qo'shildi!");
};

window.cancelBookingByBarber = function(bookingId) {
    if (confirm("Bronni bekor qilmoqchimisiz?")) {
        let bookings = getBookings();
        bookings = bookings.filter(b => b.id !== bookingId);
        saveBookings(bookings);
        renderApp();
        alert("✅ Bron bekor qilindi!");
    }
};

window.updateStatus = function(bookingId, status) {
    let bookings = getBookings();
    const index = bookings.findIndex(b => b.id === bookingId);
    if (index !== -1) {
        bookings[index].status = status;
        saveBookings(bookings);
        renderApp();
    }
};

function getStatusText(status) {
    const map = { pending: 'Kutilmoqda', came: 'Kelgan', missed: 'Kelmagan' };
    return map[status];
}

window.logout = function() {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_CLIENT);
    localStorage.removeItem(STORAGE_KEYS.CURRENT_BARBER);
    toggleDarkMode(false);
    renderApp();
};

initData();
renderApp();