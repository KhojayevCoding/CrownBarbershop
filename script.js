// Storage keys
const STORAGE_KEYS = {
  BARBERS: 'barbers',
  BOOKINGS: 'bookings',
  CURRENT_CLIENT: 'currentClient',
  CURRENT_BARBER: 'currentBarber'
};

// Initialize default data (faqat 3 ta sartarosh)
function initData() {
  if (!localStorage.getItem(STORAGE_KEYS.BARBERS)) {
      const defaultBarbers = [
          { id: '1', firstName: 'John', lastName: 'Smith', birthYear: 1990, experience: 8, registered: true },
          { id: '2', firstName: 'Mike', lastName: 'Johnson', birthYear: 1988, experience: 10, registered: true },
          { id: '3', firstName: 'David', lastName: 'Brown', birthYear: 1995, experience: 5, registered: true }
      ];
      localStorage.setItem(STORAGE_KEYS.BARBERS, JSON.stringify(defaultBarbers));
  }
  
  if (!localStorage.getItem(STORAGE_KEYS.BOOKINGS)) {
      localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify([]));
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

function calculateAge(birthYear) {
  return new Date().getFullYear() - birthYear;
}

function getCurrentDate() {
  const today = new Date();
  return today.toISOString().split('T')[0];
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
      <div class="role-buttons">
          <button class="role-btn" onclick="showClientLogin()">
              <i class="fas fa-user"></i>
              Mijoz
              <small style="display: block; font-size: 12px; margin-top: 10px;">Kirish</small>
          </button>
          <button class="role-btn" onclick="showBarberLogin()">
              <i class="fas fa-cut"></i>
              Sartarosh
              <small style="display: block; font-size: 12px; margin-top: 10px;">Kirish yoki Ro'yxatdan o'tish</small>
          </button>
      </div>
  `;
}

// Client login
window.showClientLogin = function() {
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.style.display = 'flex';
  modal.innerHTML = `
      <div class="modal-content">
          <h2><i class="fas fa-sign-in-alt"></i> Mijoz Kirish</h2>
          <input type="text" id="clientName" placeholder="Ismingizni kiriting" required>
          <div class="modal-buttons">
              <button class="btn btn-primary" onclick="clientLogin()">Kirish</button>
              <button class="btn btn-secondary" onclick="closeModal()">Bekor qilish</button>
          </div>
      </div>
  `;
  document.body.appendChild(modal);
};

window.clientLogin = function() {
  const name = document.getElementById('clientName')?.value;
  if (name && name.trim()) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_CLIENT, name.trim());
      closeModal();
      renderApp();
  } else {
      alert("Iltimos, ismingizni kiriting!");
  }
};

// Barber login/register
window.showBarberLogin = function() {
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.style.display = 'flex';
  modal.innerHTML = `
      <div class="modal-content">
          <h2><i class="fas fa-cut"></i> Sartarosh</h2>
          <div class="modal-buttons" style="flex-direction: column;">
              <button class="btn btn-primary" onclick="showBarberRegister()">Ro'yxatdan o'tish</button>
              <button class="btn btn-secondary" onclick="showBarberLoginForm()">Kirish</button>
              <button class="btn btn-secondary" onclick="closeModal()">Bekor qilish</button>
          </div>
      </div>
  `;
  document.body.appendChild(modal);
};

window.showBarberRegister = function() {
  closeModal();
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.style.display = 'flex';
  modal.innerHTML = `
      <div class="modal-content">
          <h2><i class="fas fa-user-plus"></i> Sartarosh Ro'yxatdan o'tish</h2>
          <input type="text" id="barberFirstName" placeholder="Ism" required>
          <input type="text" id="barberLastName" placeholder="Familiya" required>
          <input type="number" id="barberBirthYear" placeholder="Tug'ilgan yil" required>
          <input type="number" id="barberExperience" placeholder="Tajriba (yil)" required>
          <div class="modal-buttons">
              <button class="btn btn-primary" onclick="registerBarber()">Ro'yxatdan o'tish</button>
              <button class="btn btn-secondary" onclick="closeModal()">Bekor qilish</button>
          </div>
      </div>
  `;
  document.body.appendChild(modal);
};

window.showBarberLoginForm = function() {
  closeModal();
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.style.display = 'flex';
  modal.innerHTML = `
      <div class="modal-content">
          <h2><i class="fas fa-sign-in-alt"></i> Sartarosh Kirish</h2>
          <input type="text" id="barberFirstName" placeholder="Ism" required>
          <input type="text" id="barberLastName" placeholder="Familiya" required>
          <div class="modal-buttons">
              <button class="btn btn-primary" onclick="barberLogin()">Kirish</button>
              <button class="btn btn-secondary" onclick="closeModal()">Bekor qilish</button>
          </div>
      </div>
  `;
  document.body.appendChild(modal);
};

window.barberLogin = function() {
  const firstName = document.getElementById('barberFirstName')?.value;
  const lastName = document.getElementById('barberLastName')?.value;
  
  const barbers = getBarbers();
  const barber = barbers.find(b => b.firstName === firstName && b.lastName === lastName);
  
  if (barber) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_BARBER, barber.id);
      closeModal();
      renderApp();
  } else {
      alert("Sartarosh topilmadi! Iltimos, ro'yxatdan o'ting.");
  }
};

window.registerBarber = function() {
  const firstName = document.getElementById('barberFirstName')?.value;
  const lastName = document.getElementById('barberLastName')?.value;
  const birthYear = parseInt(document.getElementById('barberBirthYear')?.value);
  const experience = parseInt(document.getElementById('barberExperience')?.value);
  
  if (firstName && lastName && birthYear && experience) {
      const barbers = getBarbers();
      const newBarber = {
          id: Date.now().toString(),
          firstName,
          lastName,
          birthYear,
          experience,
          registered: true
      };
      barbers.push(newBarber);
      saveBarbers(barbers);
      localStorage.setItem(STORAGE_KEYS.CURRENT_BARBER, newBarber.id);
      closeModal();
      renderApp();
      alert("✅ Muvaffaqiyatli ro'yxatdan o'tdingiz!");
  } else {
      alert("Iltimos, barcha maydonlarni to'ldiring!");
  }
};

window.closeModal = function() {
  const modals = document.querySelectorAll('.modal');
  modals.forEach(modal => modal.remove());
};

// Mijoz dashboard (bron tarixi bilan)
function renderClientDashboard(clientName) {
  const barbers = getBarbers();
  const bookings = getBookings();
  const clientBookings = bookings.filter(b => b.clientName === clientName).sort((a, b) => new Date(b.date) - new Date(a.date));
  
  const app = document.getElementById('app');
  
  app.innerHTML = `
      <div class="header">
          <h1><i class="fas fa-crown crown-icon"></i> Crown Barber Shop</h1>
          <div class="profile-section">
              <div class="profile-img"><i class="fas fa-user"></i></div>
              <div class="profile-name">${clientName}</div>
              <button class="btn logout-btn" onclick="logout()"><i class="fas fa-sign-out-alt"></i> Chiqish</button>
          </div>
      </div>
      
      <div class="card">
          <h2 class="section-title"><i class="fas fa-users"></i> Sartaroshlar</h2>
          <div class="barbers-grid" id="barbersGrid"></div>
      </div>
      
      <div class="card">
          <h2 class="section-title"><i class="fas fa-history"></i> Mening bronlarim</h2>
          <div id="clientBookings">
              ${clientBookings.length === 0 ? '<p style="text-align: center; color: var(--text-secondary);"><i class="fas fa-folder-open"></i> Sizning bronlaringiz mavjud emas</p>' : ''}
              ${clientBookings.map(booking => {
                  const barber = barbers.find(b => b.id === booking.barberId);
                  return `
                      <div class="booking-item">
                          <div class="booking-info">
                              <div class="booking-client"><i class="fas fa-cut"></i> Sartarosh: ${barber ? barber.firstName + ' ' + barber.lastName : 'Noma\'lum'}</div>
                              <div class="booking-time"><i class="fas fa-calendar"></i> ${booking.date} | <i class="fas fa-clock"></i> ${booking.time}</div>
                              <div><span class="status-${booking.status}">${getStatusText(booking.status)}</span></div>
                          </div>
                          <div class="booking-buttons">
                              ${booking.status === 'pending' ? `
                                  <button class="btn btn-danger" onclick="cancelBooking('${booking.id}')"><i class="fas fa-trash"></i> Bekor qilish</button>
                              ` : ''}
                          </div>
                      </div>
                  `;
              }).join('')}
          </div>
      </div>
  `;
  
  const grid = document.getElementById('barbersGrid');
  if (barbers.length === 0) {
      grid.innerHTML = '<p style="text-align: center; color: var(--text-secondary);">Hozircha sartaroshlar mavjud emas</p>';
  } else {
      grid.innerHTML = barbers.map(barber => `
          <div class="barber-card" onclick="selectBarber('${barber.id}')">
              <div class="barber-avatar"><i class="fas fa-user-secret"></i></div>
              <div class="barber-name">${barber.firstName} ${barber.lastName}</div>
              <div class="barber-info"><i class="fas fa-birthday-cake"></i> Yoshi: ${calculateAge(barber.birthYear)}</div>
              <div class="barber-info"><i class="fas fa-star"></i> Tajriba: ${barber.experience} yil</div>
          </div>
      `).join('');
  }
}

// Bekor qilish funksiyasi
window.cancelBooking = function(bookingId) {
  if (confirm("Bronni bekor qilmoqchimisiz?")) {
      let bookings = getBookings();
      bookings = bookings.filter(b => b.id !== bookingId);
      saveBookings(bookings);
      alert("✅ Bron muvaffaqiyatli bekor qilindi!");
      renderApp();
  }
};

window.selectBarber = function(barberId) {
  const barber = getBarbers().find(b => b.id === barberId);
  if (!barber) return;
  
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.style.display = 'flex';
  modal.innerHTML = `
      <div class="modal-content">
          <h2><i class="fas fa-calendar-check"></i> Bron qilish: ${barber.firstName} ${barber.lastName}</h2>
          <input type="date" id="bookingDate" min="${getCurrentDate()}" required>
          <input type="time" id="bookingTime" required>
          <div class="modal-buttons">
              <button class="btn btn-primary" onclick="confirmBooking('${barberId}')">Tasdiqlash</button>
              <button class="btn btn-secondary" onclick="closeModal()">Bekor qilish</button>
          </div>
      </div>
  `;
  document.body.appendChild(modal);
};

window.confirmBooking = function(barberId) {
  const date = document.getElementById('bookingDate').value;
  const time = document.getElementById('bookingTime').value;
  const clientName = localStorage.getItem(STORAGE_KEYS.CURRENT_CLIENT);
  
  if (!date || !time) {
      alert("Iltimos, sana va vaqtni tanlang!");
      return;
  }
  
  const bookings = getBookings();
  const newBooking = {
      id: Date.now().toString(),
      clientName: clientName,
      barberId: barberId,
      date: date,
      time: time,
      status: 'pending'
  };
  
  bookings.push(newBooking);
  saveBookings(bookings);
  closeModal();
  alert("✅ Bron muvaffaqiyatli yaratildi!");
  renderApp();
};

// Sartaroshga o'zi mijoz qo'shish
window.showAddClientModal = function() {
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.style.display = 'flex';
  modal.innerHTML = `
      <div class="modal-content">
          <h2><i class="fas fa-user-plus"></i> Yangi mijoz qo'shish</h2>
          <input type="text" id="newClientName" placeholder="Mijoz ismi" required>
          <input type="time" id="newClientTime" placeholder="Soat" required>
          <div class="modal-buttons">
              <button class="btn btn-primary" onclick="addClientByBarber()">Qo'shish</button>
              <button class="btn btn-secondary" onclick="closeModal()">Bekor qilish</button>
          </div>
      </div>
  `;
  document.body.appendChild(modal);
};

window.addClientByBarber = function() {
  const clientName = document.getElementById('newClientName')?.value;
  const time = document.getElementById('newClientTime')?.value;
  const currentBarberId = localStorage.getItem(STORAGE_KEYS.CURRENT_BARBER);
  const today = getCurrentDate();
  
  if (!clientName || !time) {
      alert("Iltimos, mijoz ismini va vaqtni kiriting!");
      return;
  }
  
  const bookings = getBookings();
  const newBooking = {
      id: Date.now().toString(),
      clientName: clientName,
      barberId: currentBarberId,
      date: today,
      time: time,
      status: 'pending'
  };
  
  bookings.push(newBooking);
  saveBookings(bookings);
  closeModal();
  alert("✅ Mijoz muvaffaqiyatli qo'shildi!");
  renderApp();
};

// Sartarosh bronni bekor qilish
window.cancelBookingByBarber = function(bookingId) {
  if (confirm("Bronni bekor qilmoqchimisiz?")) {
      let bookings = getBookings();
      bookings = bookings.filter(b => b.id !== bookingId);
      saveBookings(bookings);
      alert("✅ Bron muvaffaqiyatli bekor qilindi!");
      renderApp();
  }
};

function renderBarberDashboard(barber) {
  const bookings = getBookings();
  const today = getCurrentDate();
  
  const todayBookings = bookings.filter(b => b.barberId === barber.id && b.date === today);
  
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const monthlyBookings = bookings.filter(b => {
      const bookingDate = new Date(b.date);
      return b.barberId === barber.id && 
             bookingDate.getMonth() === currentMonth && 
             bookingDate.getFullYear() === currentYear;
  });
  
  const cameCount = monthlyBookings.filter(b => b.status === 'came').length;
  const missedCount = monthlyBookings.filter(b => b.status === 'missed').length;
  const totalCount = monthlyBookings.length;
  
  const app = document.getElementById('app');
  app.innerHTML = `
      <div class="header">
          <h1><i class="fas fa-crown crown-icon"></i> Crown Barber Shop</h1>
          <div class="profile-section">
              <div class="profile-img"><i class="fas fa-user-secret"></i></div>
              <div class="profile-name">${barber.firstName} ${barber.lastName}</div>
              <button class="btn logout-btn" onclick="logout()"><i class="fas fa-sign-out-alt"></i> Chiqish</button>
          </div>
      </div>
      
      <div class="stats-grid">
          <div class="stat-card">
              <i class="fas fa-users"></i>
              <h3>Jami mijozlar (oylik)</h3>
              <div class="number">${totalCount}</div>
          </div>
          <div class="stat-card">
              <i class="fas fa-check-circle"></i>
              <h3>Kelganlar</h3>
              <div class="number">${cameCount}</div>
          </div>
          <div class="stat-card">
              <i class="fas fa-times-circle"></i>
              <h3>Kelmaganlar</h3>
              <div class="number">${missedCount}</div>
          </div>
      </div>
      
      <div class="card">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; flex-wrap: wrap; gap: 15px;">
              <h2 class="section-title" style="margin-bottom: 0;"><i class="fas fa-calendar-day"></i> Bugungi mijozlar (${today})</h2>
              <button class="btn btn-primary" onclick="showAddClientModal()">
                  <i class="fas fa-plus"></i> Mijoz qo'shish
              </button>
          </div>
          <div id="todayBookings">
              ${todayBookings.length === 0 ? '<p style="text-align: center; color: var(--text-secondary);"><i class="fas fa-info-circle"></i> Bugungi bronlar mavjud emas</p>' : ''}
              ${todayBookings.map(booking => `
                  <div class="booking-item">
                      <div class="booking-info">
                          <div class="booking-client"><i class="fas fa-user"></i> ${booking.clientName}</div>
                          <div class="booking-time"><i class="fas fa-clock"></i> ${booking.time}</div>
                          <div><span class="status-${booking.status}">${getStatusText(booking.status)}</span></div>
                      </div>
                      <div class="booking-buttons">
                          ${booking.status === 'pending' ? `
                              <button class="btn btn-success" onclick="updateBookingStatus('${booking.id}', 'came')"><i class="fas fa-check"></i> Keldi</button>
                              <button class="btn btn-danger" onclick="updateBookingStatus('${booking.id}', 'missed')"><i class="fas fa-times"></i> Kelmadi</button>
                              <button class="btn btn-secondary" onclick="cancelBookingByBarber('${booking.id}')"><i class="fas fa-trash"></i> Bekor qilish</button>
                          ` : ''}
                      </div>
                  </div>
              `).join('')}
          </div>
      </div>
      
      <div class="card">
          <h2 class="section-title"><i class="fas fa-history"></i> Bronlar tarixi</h2>
          <div id="historyBookings"></div>
      </div>
  `;
  
  const otherBookings = bookings.filter(b => b.barberId === barber.id && b.date !== today)
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  
  const historyDiv = document.getElementById('historyBookings');
  if (otherBookings.length === 0) {
      historyDiv.innerHTML = '<p style="text-align: center; color: var(--text-secondary);"><i class="fas fa-folder-open"></i> Tarix bo\'sh</p>';
  } else {
      historyDiv.innerHTML = otherBookings.map(booking => `
          <div class="booking-item">
              <div class="booking-info">
                  <div class="booking-client"><i class="fas fa-user"></i> ${booking.clientName}</div>
                  <div class="booking-time"><i class="fas fa-calendar"></i> ${booking.date} | <i class="fas fa-clock"></i> ${booking.time}</div>
                  <div><span class="status-${booking.status}">${getStatusText(booking.status)}</span></div>
              </div>
              <div class="booking-buttons">
                  <button class="btn btn-secondary" onclick="cancelBookingByBarber('${booking.id}')"><i class="fas fa-trash"></i> Bekor qilish</button>
              </div>
          </div>
      `).join('');
  }
}

function getStatusText(status) {
  const statusMap = {
      'pending': '⏳ Kutilmoqda',
      'came': '✅ Kelgan',
      'missed': '❌ Kelmagan'
  };
  return statusMap[status] || status;
}

window.updateBookingStatus = function(bookingId, newStatus) {
  const bookings = getBookings();
  const bookingIndex = bookings.findIndex(b => b.id === bookingId);
  if (bookingIndex !== -1) {
      bookings[bookingIndex].status = newStatus;
      saveBookings(bookings);
      renderApp();
  }
};

window.logout = function() {
  localStorage.removeItem(STORAGE_KEYS.CURRENT_CLIENT);
  localStorage.removeItem(STORAGE_KEYS.CURRENT_BARBER);
  renderApp();
};

initData();
renderApp();