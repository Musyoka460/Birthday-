// Birthday data with profile images from Unsplash
const birthdays = [
    { 
        name: "Cornellius", 
        date: "2025-02-28", 
        message: "The visionary with big dreams and even bigger heart! Always inspiring those around you with your creativity and determination.", 
        image: "musyo.jpg",
        theme: "card-theme-1"
    },
    { 
        name: "Cleo", 
        date: "2025-04-09", 
        message: "Creative soul who brings color to every moment. Your artistic spirit brightens everyone's day!", 
        image: "profile photo.png",
        theme: "card-theme-2"
    },
    { 
        name: "Ally", 
        date: "2025-04-21", 
        message: "The reliable friend who's always there when needed. Your loyalty and kindness never go unnoticed.", 
        image: "Ally.jpg",
        theme: "card-theme-3"
    },
    { 
        name: "Brayo", 
        date: "2025-05-07", 
        message: "Life of the party with infectious energy! You have a gift for making people laugh and feel welcome.", 
        image: "profile photo.png",
        theme: "card-theme-4"
    },
    { 
        name: "Korea", 
        date: "2025-06-15", 
        message: "Thoughtful and kind, with wisdom beyond years. Your insights always provide valuable perspective.", 
        image: "korea.jpg",
        theme: "card-theme-5"
    },
    { 
        name: "Hellen", 
        date: "2025-09-22", 
        message: "Elegant and graceful in everything you do. You bring sophistication and warmth to every gathering.", 
        image: "Hellen.jpg",
        theme: "card-theme-6"
    },
    { 
        name: "Mitchy", 
        date: "2025-10-21", 
        message: "The problem solver with a solution for everything. Your resourcefulness is truly admirable!", 
        image: "profile photo.png",
        theme: "card-theme-7"
    },
    { 
        name: "Crinah", 
        date: "2025-10-28", 
        message: "Warm personality that makes everyone feel welcome. Your hospitality creates lasting memories.", 
        image: "profile photo.png",
        theme: "card-theme-8"
    },
    { 
        name: "Jael", 
        date: "2025-10-30", 
        message: "Adventurous spirit always ready for new challenges. Your courage inspires us to step outside our comfort zones.", 
        image: "profile photo.png",
        theme: "card-theme-9"
    },
    { 
        name: "Mercy", 
        date: "2025-12-15", 
        message: "Generous heart that puts others before yourself. The world needs more people with your compassion.", 
        image: "mercy.jpg",
        theme: "card-theme-10"
    }
];

// DOM elements
const birthdayGrid = document.getElementById('birthdayGrid');
const birthdayModal = document.getElementById('birthdayModal');
const closeModal = document.getElementById('closeModal');
const modalName = document.getElementById('modalName');
const modalDate = document.getElementById('modalDate');
const countdown = document.getElementById('countdown');
const modalMessage = document.getElementById('modalMessage');
const modalImage = document.getElementById('modalImage');
const searchInput = document.getElementById('search');
const filterButtons = document.querySelectorAll('.filter-btn');
const nextBirthdayName = document.getElementById('next-birthday-name');
const nextBirthdayDate = document.getElementById('next-birthday-date');

// Countdown elements
const countdownDays = document.getElementById('countdown-days');
const countdownHours = document.getElementById('countdown-hours');
const countdownMinutes = document.getElementById('countdown-minutes');
const countdownSeconds = document.getElementById('countdown-seconds');

// Current date
const today = new Date();
const currentYear = today.getFullYear();

// Find next birthday
function findNextBirthday() {
    let nextBirthday = null;
    let closestDiff = Infinity;
    
    birthdays.forEach(birthday => {
        const birthdayDate = new Date(birthday.date);
        birthdayDate.setFullYear(currentYear);
        
        // If birthday already passed this year, set to next year
        if (birthdayDate < today) {
            birthdayDate.setFullYear(currentYear + 1);
        }
        
        const diff = birthdayDate - today;
        
        if (diff > 0 && diff < closestDiff) {
            closestDiff = diff;
            nextBirthday = birthday;
            nextBirthday.dateObj = birthdayDate;
        }
    });
    
    return nextBirthday;
}

// Update next birthday display
function updateNextBirthdayDisplay() {
    const nextBirthday = findNextBirthday();
    if (nextBirthday) {
        nextBirthdayName.textContent = nextBirthday.name;
        nextBirthdayDate.textContent = formatDate(nextBirthday.dateObj);
    } else {
        nextBirthdayName.textContent = "No upcoming birthdays";
        nextBirthdayDate.textContent = "";
    }
}

// Set party date to next birthday
function getPartyDate() {
    const nextBirthday = findNextBirthday();
    if (nextBirthday) {
        // Set party time to 7:00 PM on the birthday
        const partyDate = new Date(nextBirthday.dateObj);
        partyDate.setHours(19, 0, 0, 0);
        return partyDate;
    }
    return new Date(); // Fallback to current date if no birthdays found
}

const partyDate = getPartyDate();

// Update countdown to party
function updatePartyCountdown() {
    const now = new Date();
    const diff = partyDate - now;
    
    if (diff <= 0) {
        countdownDays.textContent = '00';
        countdownHours.textContent = '00';
        countdownMinutes.textContent = '00';
        countdownSeconds.textContent = '00';
        return;
    }
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    countdownDays.textContent = days.toString().padStart(2, '0');
    countdownHours.textContent = hours.toString().padStart(2, '0');
    countdownMinutes.textContent = minutes.toString().padStart(2, '0');
    countdownSeconds.textContent = seconds.toString().padStart(2, '0');
}

// Update countdown every second
setInterval(updatePartyCountdown, 1000);
updatePartyCountdown();

// Display all birthdays
function displayBirthdays(filter = 'all', searchTerm = '') {
    birthdayGrid.innerHTML = '';
    
    const filteredBirthdays = birthdays.filter(birthday => {
        const matchesFilter = 
            filter === 'all' ||
            (filter === 'upcoming' && isUpcoming(birthday.date)) ||
            (filter === 'past' && isPast(birthday.date)) ||
            (filter === 'today' && isToday(birthday.date));
        
        const matchesSearch = birthday.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            formatDate(new Date(birthday.date)).toLowerCase().includes(searchTerm.toLowerCase());
        
        return matchesFilter && matchesSearch;
    });

    if (filteredBirthdays.length === 0) {
        birthdayGrid.innerHTML = `
            <div class="no-results">
                <i class="fas fa-birthday-cake"></i>
                <p>No birthdays found matching your criteria</p>
            </div>
        `;
        return;
    }

    filteredBirthdays.forEach((birthday, index) => {
        const birthdayDate = new Date(birthday.date);
        const card = document.createElement('div');
        card.className = `birthday-card ${birthday.theme}`;
        
        // Add animation delay for staggered entrance
        card.style.animation = `fadeInUp 0.5s ease ${index * 0.1}s both`;
        
        if (isToday(birthday.date)) {
            card.classList.add('active');
            card.innerHTML += '<div class="today-badge">Today! <i class="fas fa-birthday-cake"></i></div>';
        }
        
        const daysRemaining = getDaysRemaining(birthday.date);
        let daysText = '';
        let daysClass = '';
        if (daysRemaining === 0) {
            daysText = '🎉 Birthday Today! 🎉';
            daysClass = 'today';
        } else if (daysRemaining < 0) {
            daysText = `Celebrated ${Math.abs(daysRemaining)} days ago`;
            daysClass = 'past';
        } else {
            daysText = `${daysRemaining} days until birthday`;
            daysClass = 'upcoming';
        }

        card.innerHTML += `
            <img src="${birthday.image}" alt="${birthday.name}" class="profile-image">
            <h3>${birthday.name}</h3>
            <div class="birthday-date">
                <i class="fas fa-calendar-alt"></i> ${formatDate(birthdayDate)}
            </div>
            <div class="days-remaining ${daysClass}">${daysText}</div>
        `;
        
        card.addEventListener('click', () => openModal(birthday));
        birthdayGrid.appendChild(card);
    });
}

// Check if birthday is upcoming
function isUpcoming(dateString) {
    const birthday = new Date(dateString);
    birthday.setFullYear(currentYear);
    return birthday > today;
}

// Check if birthday is in the past
function isPast(dateString) {
    const birthday = new Date(dateString);
    birthday.setFullYear(currentYear);
    return birthday < today && !isToday(dateString);
}

// Check if birthday is today
function isToday(dateString) {
    const birthday = new Date(dateString);
    return birthday.getDate() === today.getDate() && 
           birthday.getMonth() === today.getMonth();
}

// Format date as "Month Day"
function formatDate(date) {
    const options = { month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// Get days remaining until birthday
function getDaysRemaining(dateString) {
    const birthday = new Date(dateString);
    const nextBirthday = new Date(currentYear, birthday.getMonth(), birthday.getDate());
    
    // If birthday already passed this year, set to next year
    if (nextBirthday < today) {
        nextBirthday.setFullYear(currentYear + 1);
    }
    
    const diffTime = nextBirthday - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
}

// Open modal with birthday details
function openModal(birthday) {
    modalName.textContent = birthday.name;
    modalDate.textContent = formatDate(new Date(birthday.date));
    modalMessage.textContent = birthday.message;
    modalImage.src = birthday.image;
    modalImage.alt = birthday.name;
    
    const daysRemaining = getDaysRemaining(birthday.date);
    if (daysRemaining === 0) {
        countdown.innerHTML = "🎉 <span>Happy Birthday!</span> 🎉";
        createConfetti();
        document.body.style.background = 'linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)';
    } else if (daysRemaining < 0) {
        countdown.innerHTML = `Birthday was <span>${Math.abs(daysRemaining)} days ago</span>`;
        document.body.style.background = 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)';
    } else {
        countdown.innerHTML = `<span>${daysRemaining}</span> days until the birthday`;
        document.body.style.background = 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)';
    }
    
    birthdayModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close modal
function closeModalFunc() {
    birthdayModal.classList.remove('active');
    document.body.style.overflow = 'auto';
    document.body.style.background = 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)';
}

// Create confetti effect
function createConfetti() {
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFBE0B', '#FB5607', '#8338EC', '#3A86FF', '#FF006E', '#8AC926', '#6A4C93'];
    
    for (let i = 0; i < 150; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.width = Math.random() * 10 + 5 + 'px';
        confetti.style.height = confetti.style.width;
        confetti.style.animationDuration = Math.random() * 3 + 2 + 's';
        confetti.style.animationDelay = Math.random() * 2 + 's';
        
        // Random shapes
        if (Math.random() > 0.5) {
            confetti.style.borderRadius = '0';
            confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
        }
        
        document.body.appendChild(confetti);
        
        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }
}

// Event listeners
closeModal.addEventListener('click', closeModalFunc);
birthdayModal.addEventListener('click', (e) => {
    if (e.target === birthdayModal) {
        closeModalFunc();
    }
});

searchInput.addEventListener('input', (e) => {
    const activeFilter = document.querySelector('.filter-btn.active').dataset.filter;
    displayBirthdays(activeFilter, e.target.value);
});

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        displayBirthdays(button.dataset.filter, searchInput.value);
    });
});

// Initialize
displayBirthdays();
updateNextBirthdayDisplay();