// ===================================
// GLOBAL STATE MANAGEMENT
// ===================================
const AppState = {
    currentPage: 'dashboard',
    journeyStartDate: new Date(),
    userData: {
        name: '',
        email: '',
        startWeight: 99.8,
        currentWeight: 99.8,
        targetWeight: 75.0,
        height: 182,
        startDate: new Date().toISOString().split('T')[0],
        measurements: {
            chest: 105,
            waist: 110,
            hip: 118,
            thigh: 120
        }
    },
    dailyLogs: [],
    progressPhotos: {},
    settings: {
        weeklyReports: false,
        monthlyReports: false,
        reportTime: '08:00',
        reminders: {}
    },
    emailConfig: {
        serviceId: '',
        templateIdWeekly: '',
        publicKey: ''
    }
};

// ===================================
// INITIALIZATION
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    loadStoredData();
    updateDashboard();
    setupEventListeners();
    initializeCharts();
    displayCurrentDate();
    setupFormHandlers();
});

function initializeApp() {
    console.log('🚀 Fitness Tracker App Initialized');
    
    // Initialize EmailJS if configured
    if (AppState.emailConfig.publicKey) {
        emailjs.init(AppState.emailConfig.publicKey);
    }
    
    // Set up daily reminders
    setupDailyReminders();
}

function displayCurrentDate() {
    const dateElement = document.getElementById('current-date');
    const today = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    dateElement.textContent = today.toLocaleDateString('en-US', options);
    
    // Calculate journey day
    const startDate = new Date(AppState.userData.startDate);
    const daysDiff = Math.floor((today - startDate) / (1000 * 60 * 60 * 24)) + 1;
    document.getElementById('journey-day').textContent = daysDiff;
}

// ===================================
// LOCAL STORAGE MANAGEMENT
// ===================================
function saveToLocalStorage() {
    try {
        localStorage.setItem('fitnessTrackerData', JSON.stringify(AppState));
        console.log('✅ Data saved to local storage');
    } catch (error) {
        console.error('❌ Error saving to local storage:', error);
    }
}

function loadStoredData() {
    try {
        const stored = localStorage.getItem('fitnessTrackerData');
        if (stored) {
            const data = JSON.parse(stored);
            Object.assign(AppState, data);
            console.log('✅ Data loaded from local storage');
            
            // Update UI with stored data
            updateDashboard();
            populateSettings();
        }
    } catch (error) {
        console.error('❌ Error loading from local storage:', error);
    }
}

// ===================================
// NAVIGATION
// ===================================
function setupEventListeners() {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = link.dataset.page;
            showPage(page);
        });
    });
}

function showPage(pageName) {
    // Update navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    document.querySelector(`[data-page="${pageName}"]`).classList.add('active');
    
    // Update pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageName).classList.add('active');
    
    AppState.currentPage = pageName;
    
    // Load page-specific content
    if (pageName === 'meal-plan') {
        loadMealPlan();
    } else if (pageName === 'exercise') {
        loadExercisePlans();
    } else if (pageName === 'progress') {
        loadProgressData();
    }
}

// ===================================
// DASHBOARD UPDATES
// ===================================
function updateDashboard() {
    // Update current weight
    document.getElementById('current-weight').textContent = AppState.userData.currentWeight.toFixed(1);
    
    // Calculate weight change
    const weightChange = AppState.userData.startWeight - AppState.userData.currentWeight;
    document.getElementById('weight-change').textContent = 
        (weightChange > 0 ? '-' : '+') + Math.abs(weightChange).toFixed(1);
    
    // Calculate remaining weight
    const remainingWeight = AppState.userData.currentWeight - AppState.userData.targetWeight;
    document.getElementById('remaining-weight').textContent = remainingWeight.toFixed(1);
    
    // Calculate progress percentage
    const totalToLose = AppState.userData.startWeight - AppState.userData.targetWeight;
    const progressPercent = ((totalToLose - remainingWeight) / totalToLose * 100).toFixed(1);
    document.getElementById('progress-percent').textContent = progressPercent;
    
    // Update streak
    const streak = calculateStreak();
    document.getElementById('streak-days').textContent = streak;
    
    // Update weight chart
    updateWeightChart();
}

function calculateStreak() {
    if (AppState.dailyLogs.length === 0) return 0;
    
    let streak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Sort logs by date (newest first)
    const sortedLogs = [...AppState.dailyLogs].sort((a, b) => 
        new Date(b.date) - new Date(a.date)
    );
    
    for (let i = 0; i < sortedLogs.length; i++) {
        const logDate = new Date(sortedLogs[i].date);
        logDate.setHours(0, 0, 0, 0);
        
        const expectedDate = new Date(today);
        expectedDate.setDate(expectedDate.getDate() - i);
        
        if (logDate.getTime() === expectedDate.getTime()) {
            streak++;
        } else {
            break;
        }
    }
    
    return streak;
}

// ===================================
// CHARTS
// ===================================
let weightChart = null;
let measurementsChart = null;

function initializeCharts() {
    const ctx = document.getElementById('weight-chart');
    if (ctx && !weightChart) {
        weightChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: [],
                datasets: [{
                    label: 'Weight (kg)',
                    data: [],
                    borderColor: '#4F46E5',
                    backgroundColor: 'rgba(79, 70, 229, 0.1)',
                    tension: 0.4,
                    fill: true
                }, {
                    label: 'Target',
                    data: [],
                    borderColor: '#10B981',
                    borderDash: [5, 5],
                    pointRadius: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        min: 70,
                        max: 105
                    }
                }
            }
        });
    }
}

function updateWeightChart() {
    if (!weightChart) return;
    
    // Get weight logs
    const weightLogs = AppState.dailyLogs
        .filter(log => log.weight)
        .sort((a, b) => new Date(a.date) - new Date(b.date));
    
    const labels = weightLogs.map(log => {
        const date = new Date(log.date);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    });
    
    const weights = weightLogs.map(log => log.weight);
    const targets = new Array(weights.length).fill(AppState.userData.targetWeight);
    
    weightChart.data.labels = labels;
    weightChart.data.datasets[0].data = weights;
    weightChart.data.datasets[1].data = targets;
    weightChart.update();
}

function updateMeasurementsChart() {
    const ctx = document.getElementById('measurements-chart');
    if (!ctx) return;
    
    if (measurementsChart) {
        measurementsChart.destroy();
    }
    
    // Get measurement logs
    const measurementLogs = AppState.dailyLogs
        .filter(log => log.measurements)
        .sort((a, b) => new Date(a.date) - new Date(b.date));
    
    const labels = measurementLogs.map(log => {
        const date = new Date(log.date);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    });
    
    measurementsChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Chest (cm)',
                    data: measurementLogs.map(log => log.measurements.chest),
                    borderColor: '#4F46E5',
                    backgroundColor: 'transparent'
                },
                {
                    label: 'Waist (cm)',
                    data: measurementLogs.map(log => log.measurements.waist),
                    borderColor: '#F59E0B',
                    backgroundColor: 'transparent'
                },
                {
                    label: 'Hip (cm)',
                    data: measurementLogs.map(log => log.measurements.hip),
                    borderColor: '#10B981',
                    backgroundColor: 'transparent'
                },
                {
                    label: 'Thigh (cm)',
                    data: measurementLogs.map(log => log.measurements.thigh),
                    borderColor: '#EF4444',
                    backgroundColor: 'transparent'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                }
            }
        }
    });
}

// ===================================
// DAILY LOG FORM
// ===================================
function setupFormHandlers() {
    const logForm = document.getElementById('daily-log-form');
    if (logForm) {
        // Set default date to today
        document.getElementById('log-date').valueAsDate = new Date();
        
        // Energy slider
        const energySlider = document.getElementById('log-energy');
        const energyValue = document.getElementById('energy-value');
        energySlider.addEventListener('input', (e) => {
            energyValue.textContent = e.target.value;
        });
        
        logForm.addEventListener('submit', handleLogSubmit);
    }
}

function handleLogSubmit(e) {
    e.preventDefault();
    
    const formData = {
        date: document.getElementById('log-date').value,
        weight: parseFloat(document.getElementById('log-weight').value) || null,
        measurements: {
            chest: parseFloat(document.getElementById('log-chest').value) || null,
            waist: parseFloat(document.getElementById('log-waist').value) || null,
            hip: parseFloat(document.getElementById('log-hip').value) || null,
            thigh: parseFloat(document.getElementById('log-thigh').value) || null
        },
        meals: {
            preBreakfast: document.getElementById('log-pre-breakfast').value,
            breakfast: document.getElementById('log-breakfast').value,
            midMorning: document.getElementById('log-mid-morning').value,
            lunch: document.getElementById('log-lunch').value,
            evening: document.getElementById('log-evening').value,
            dinner: document.getElementById('log-dinner').value
        },
        water: parseInt(document.getElementById('log-water').value) || 0,
        exercise: {
            morningWorkout: document.getElementById('log-morning-workout').checked,
            walkStation: document.getElementById('log-walk-station').checked,
            stoodCommute: document.getElementById('log-stood-commute').checked,
            officeBreaks: document.getElementById('log-office-breaks').checked,
            eveningWalk: document.getElementById('log-evening-walk').checked,
            totalMinutes: parseInt(document.getElementById('log-exercise-minutes').value) || 0
        },
        greensAndSprouts: {
            ateGreens: document.getElementById('log-ate-greens').checked,
            ateSprouts: document.getElementById('log-ate-sprouts').checked,
            greensType: document.getElementById('log-greens-type').value
        },
        mood: document.getElementById('log-mood').value,
        energy: parseInt(document.getElementById('log-energy').value),
        sleep: {
            sleepTime: document.getElementById('log-sleep-time').value,
            wakeTime: document.getElementById('log-wake-time').value
        },
        notes: {
            wins: document.getElementById('log-wins').value,
            challenges: document.getElementById('log-challenges').value
        },
        timestamp: new Date().toISOString()
    };
    
    // Check if log for this date already exists
    const existingIndex = AppState.dailyLogs.findIndex(log => log.date === formData.date);
    if (existingIndex >= 0) {
        AppState.dailyLogs[existingIndex] = formData;
        showMessage('Log updated successfully!', 'success');
    } else {
        AppState.dailyLogs.push(formData);
        showMessage('Log saved successfully!', 'success');
    }
    
    // Update current weight if provided
    if (formData.weight) {
        AppState.userData.currentWeight = formData.weight;
    }
    
    // Save to local storage
    saveToLocalStorage();
    
    // Update dashboard
    updateDashboard();
    
    // Update today's checklist
    updateTodayChecklist(formData);
    
    // Clear form
    clearForm();
}

function updateTodayChecklist(logData) {
    document.getElementById('check-water').checked = logData.water >= 12;
    document.getElementById('check-workout').checked = logData.exercise.morningWorkout;
    document.getElementById('check-breakfast').checked = !!logData.meals.breakfast;
    document.getElementById('check-greens').checked = logData.greensAndSprouts.ateGreens;
    document.getElementById('check-sprouts').checked = logData.greensAndSprouts.ateSprouts;
    document.getElementById('check-water-intake').checked = logData.water >= 12;
    document.getElementById('check-walk').checked = logData.exercise.totalMinutes >= 30;
    
    // Sleep will be checked the next day
    const sleepTime = logData.sleep.sleepTime;
    if (sleepTime && sleepTime <= '22:30') {
        document.getElementById('check-sleep').checked = true;
    }
}

function clearForm() {
    document.getElementById('daily-log-form').reset();
    document.getElementById('log-date').valueAsDate = new Date();
    document.getElementById('energy-value').textContent = '5';
}

// Water increment/decrement
function incrementWater() {
    const input = document.getElementById('log-water');
    input.value = Math.min(20, parseInt(input.value) + 1);
    updateWaterVisual();
}

function decrementWater() {
    const input = document.getElementById('log-water');
    input.value = Math.max(0, parseInt(input.value) - 1);
    updateWaterVisual();
}

function updateWaterVisual() {
    const count = parseInt(document.getElementById('log-water').value) || 0;
    const container = document.getElementById('water-visual');
    container.innerHTML = '';
    
    for (let i = 0; i < 14; i++) {
        const glass = document.createElement('div');
        glass.className = 'water-glass';
        if (i < count) {
            glass.classList.add('filled');
        }
        container.appendChild(glass);
    }
}

// ===================================
// MEAL PLAN
// ===================================
const mealPlans = {
    week1: {
        monday: {
            preBreakfast: "Sprouts salad (1 cup)",
            breakfast: "Ragi dosa (1) + sambar + mint chutney",
            midMorning: "Buttermilk + 1 apple",
            lunch: "Brown rice (1/2 cup) + spinach dal + mixed veg + salad",
            evening: "Sprouts sundal (1/2 cup) + green tea",
            dinner: "Whole wheat chapathi (2) + fenugreek curry + cucumber salad"
        },
        tuesday: {
            preBreakfast: "2 boiled eggs",
            breakfast: "Oats upma (1 cup) with vegetables",
            midMorning: "Green tea + orange",
            lunch: "Jowar roti (2) + drumstick leaves poriyal + dal + salad",
            evening: "Roasted chana + black coffee",
            dinner: "Bajra roti (2) + amaranth curry + raita"
        },
        wednesday: {
            preBreakfast: "Sprouts chaat (small portion)",
            breakfast: "Wheat bread (2) + egg omelette (with spinach)",
            midMorning: "Sprouts soup + green tea",
            lunch: "Brown rice (1/2 cup) + methi curry + sambar + salad",
            evening: "Fruit (guava) + black coffee",
            dinner: "Ragi dosa (1) + palak curry + salad"
        },
        thursday: {
            preBreakfast: "2 boiled eggs + cucumber",
            breakfast: "Broken wheat upma + sambar",
            midMorning: "Buttermilk + 10 almonds",
            lunch: "Whole wheat chapathi (2) + radish greens poriyal + dal + salad",
            evening: "Sprouts sundal + green tea",
            dinner: "Vegetable soup (2 bowls) + 1 small chapathi"
        },
        friday: {
            preBreakfast: "Sprouts salad (raw)",
            breakfast: "Oats dosa (1) + coconut chutney",
            midMorning: "Green tea + fruit",
            lunch: "Brown rice (1/2 cup) + mustard greens curry + dal + salad",
            evening: "Vegetable soup + black coffee",
            dinner: "Whole wheat chapathi (2) + mixed vegetable curry + raita"
        },
        saturday: {
            preBreakfast: "2 boiled eggs",
            breakfast: "Idli (2) + sambar + chutney",
            midMorning: "Sprouts chaat (small) + green tea",
            lunch: "Quinoa pulao (1 cup) + spinach raita + salad",
            evening: "Fruit + roasted chana",
            dinner: "Ragi mudde (small) + greens curry + sambar"
        },
        sunday: {
            preBreakfast: "Sprouts salad",
            breakfast: "Ragi porridge with milk",
            midMorning: "Buttermilk + fruit",
            lunch: "CHEAT MEAL - Parotta (2) + chicken curry OR biryani (moderate)",
            evening: "Green tea only",
            dinner: "Vegetable soup (2 bowls) + small salad (light)"
        }
    }
};

function loadMealPlan() {
    const container = document.getElementById('meal-plan-content');
    const week = mealPlans.week1;
    
    container.innerHTML = '';
    
    Object.keys(week).forEach(day => {
        const dayCard = document.createElement('div');
        dayCard.className = 'day-card';
        
        const dayName = day.charAt(0).toUpperCase() + day.slice(1);
        dayCard.innerHTML = `
            <div class="day-header">${dayName}</div>
            ${createMealItem('Pre-Breakfast (6:30 AM)', week[day].preBreakfast)}
            ${createMealItem('Breakfast (8:30 AM)', week[day].breakfast)}
            ${createMealItem('Mid-Morning (11:00 AM)', week[day].midMorning)}
            ${createMealItem('Lunch (1:00 PM)', week[day].lunch)}
            ${createMealItem('Evening (4:00 PM)', week[day].evening)}
            ${createMealItem('Dinner (8:30 PM)', week[day].dinner)}
        `;
        
        container.appendChild(dayCard);
    });
}

function createMealItem(time, description) {
    return `
        <div class="meal-item">
            <div class="meal-time">${time}</div>
            <div class="meal-description">${description}</div>
        </div>
    `;
}

function generateShoppingList() {
    const shoppingList = {
        greens: ['Spinach - 1 bunch', 'Fenugreek leaves - 1 bunch', 'Amaranth - 1 bunch', 
                 'Drumstick leaves - 1 bunch', 'Coriander - 2 bunches', 'Mint - 1 bunch'],
        cereals: ['Whole wheat atta - 2kg', 'Brown rice - 1kg', 'Oats - 500g', 
                  'Ragi flour - 500g', 'Broken wheat - 250g'],
        sprouts: ['Moong dal - 500g', 'Chana dal - 500g', 'Black chana - 250g'],
        proteins: ['Eggs - 2 dozen', 'Toor dal - 500g', 'Moong dal - 500g'],
        vegetables: ['Onions - 2kg', 'Tomatoes - 2kg', 'Cucumber - 1kg', 'Carrot - 500g', 
                     'Beans - 500g', 'Cabbage - 1 small', 'Capsicum - 250g'],
        fruits: ['Apples - 7', 'Oranges - 7', 'Guava - 4', 'Papaya - 1'],
        dairy: ['Curd - 1kg', 'Milk - 2L'],
        nuts: ['Almonds - 250g', 'Roasted chana - 500g']
    };
    
    const content = document.getElementById('shopping-list-content');
    content.innerHTML = '<div class="shopping-categories"></div>';
    const categoriesDiv = content.querySelector('.shopping-categories');
    
    Object.keys(shoppingList).forEach(category => {
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'shopping-category';
        categoryDiv.innerHTML = `
            <h4>${category.charAt(0).toUpperCase() + category.slice(1)}</h4>
            <ul>
                ${shoppingList[category].map(item => `<li>${item}</li>`).join('')}
            </ul>
        `;
        categoriesDiv.appendChild(categoryDiv);
    });
}

// ===================================
// EXERCISE PLANS
// ===================================
function loadExercisePlans() {
    showExerciseTab('thighs');
}

function showExerciseTab(type) {
    const exercises = {
        thighs: [
            { name: 'Squats', details: '3 sets × 15 reps', description: 'Bodyweight, then add resistance' },
            { name: 'Lunges', details: '3 sets × 10 each leg', description: 'Forward, reverse, side variations' },
            { name: 'Wall Sits', details: '3 sets × 30-60 seconds', description: 'Hold position against wall' },
            { name: 'Step-ups', details: '3 sets × 12 each leg', description: 'Use stairs or bench' }
        ],
        butt: [
            { name: 'Glute Bridges', details: '3 sets × 15 reps', description: 'Lie on back, lift hips' },
            { name: 'Donkey Kicks', details: '3 sets × 12 each leg', description: 'On all fours, kick back' },
            { name: 'Fire Hydrants', details: '3 sets × 12 each leg', description: 'Leg raises to side' },
            { name: 'Squats with Glute Squeeze', details: '3 sets × 15 reps', description: 'Squeeze at top' }
        ],
        mid: [
            { name: 'Plank', details: '3 sets × 30-60 seconds', description: 'Front and side variations' },
            { name: 'Mountain Climbers', details: '3 sets × 20 reps', description: 'Fast-paced cardio' },
            { name: 'Bicycle Crunches', details: '3 sets × 20 reps', description: 'Alternating knee to elbow' },
            { name: 'Russian Twists', details: '3 sets × 20 reps', description: 'With or without weight' }
        ]
    };
    
    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Display exercises
    const content = document.getElementById('exercise-tab-content');
    content.innerHTML = '<div class="exercise-list"></div>';
    const listDiv = content.querySelector('.exercise-list');
    
    exercises[type].forEach(exercise => {
        const item = document.createElement('div');
        item.className = 'exercise-item';
        item.innerHTML = `
            <div>
                <div class="exercise-name">${exercise.name}</div>
                <div class="exercise-detail">${exercise.description}</div>
            </div>
            <div class="exercise-detail">${exercise.details}</div>
        `;
        listDiv.appendChild(item);
    });
}

// ===================================
// WORKOUT TIMER
// ===================================
let workoutTimer = null;
let timerSeconds = 900; // 15 minutes
let timerRunning = false;

function startWorkoutTimer(type) {
    const modal = document.getElementById('workout-timer-modal');
    modal.style.display = 'block';
    
    timerSeconds = 900;
    updateTimerDisplay();
    
    document.getElementById('start-timer').addEventListener('click', startTimer);
    document.getElementById('pause-timer').addEventListener('click', pauseTimer);
    document.getElementById('reset-timer').addEventListener('click', resetTimer);
}

function startTimer() {
    if (timerRunning) return;
    timerRunning = true;
    
    workoutTimer = setInterval(() => {
        timerSeconds--;
        updateTimerDisplay();
        
        if (timerSeconds <= 0) {
            clearInterval(workoutTimer);
            timerRunning = false;
            playCompletionSound();
            alert('Workout Complete! Great job! 💪');
        }
    }, 1000);
}

function pauseTimer() {
    if (!timerRunning) return;
    clearInterval(workoutTimer);
    timerRunning = false;
}

function resetTimer() {
    clearInterval(workoutTimer);
    timerRunning = false;
    timerSeconds = 900;
    updateTimerDisplay();
}

function updateTimerDisplay() {
    const minutes = Math.floor(timerSeconds / 60);
    const seconds = timerSeconds % 60;
    document.getElementById('timer-display').textContent = 
        `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function playCompletionSound() {
    // Play notification sound (browser API)
    if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('Workout Complete!', {
            body: 'Great job! You completed your workout! 💪',
            icon: '/favicon.ico'
        });
    }
}

// ===================================
// PROGRESS TRACKING
// ===================================
function loadProgressData() {
    updateMeasurementsChart();
    loadMilestones();
}

function handlePhotoUpload(event, type) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
        const preview = document.getElementById(`preview-${type}`);
        preview.innerHTML = `<img src="${e.target.result}" alt="${type} photo">`;
        
        // Store in app state
        const currentMonth = new Date().toISOString().slice(0, 7);
        if (!AppState.progressPhotos[currentMonth]) {
            AppState.progressPhotos[currentMonth] = {};
        }
        AppState.progressPhotos[currentMonth][type] = e.target.result;
    };
    reader.readAsDataURL(file);
}

function saveProgressPhotos() {
    saveToLocalStorage();
    showMessage('Progress photos saved successfully!', 'success');
}

function loadMilestones() {
    const milestones = [
        { month: 3, targetWeight: 92, completed: false },
        { month: 6, targetWeight: 85, completed: false },
        { month: 9, targetWeight: 78, completed: false },
        { month: 12, targetWeight: 75, completed: false }
    ];
    
    const container = document.getElementById('milestone-timeline');
    container.innerHTML = '';
    
    milestones.forEach(milestone => {
        const isCompleted = AppState.userData.currentWeight <= milestone.targetWeight;
        const item = document.createElement('div');
        item.className = `milestone-item ${isCompleted ? 'completed' : ''}`;
        item.innerHTML = `
            <h4>Month ${milestone.month}</h4>
            <p>Target: ${milestone.targetWeight}kg</p>
            <p class="milestone-status">
                ${isCompleted ? '✅ Achieved!' : '⏳ In Progress'}
            </p>
        `;
        container.appendChild(item);
    });
}

// ===================================
// EXCEL EXPORT
// ===================================
function exportToExcel() {
    try {
        // Create workbook
        const wb = XLSX.utils.book_new();
        
        // Sheet 1: Daily Logs
        const dailyLogsData = AppState.dailyLogs.map(log => ({
            'Date': log.date,
            'Weight (kg)': log.weight || '',
            'Chest (cm)': log.measurements?.chest || '',
            'Waist (cm)': log.measurements?.waist || '',
            'Hip (cm)': log.measurements?.hip || '',
            'Thigh (cm)': log.measurements?.thigh || '',
            'Water Glasses': log.water || 0,
            'Exercise Minutes': log.exercise?.totalMinutes || 0,
            'Ate Greens': log.greensAndSprouts?.ateGreens ? 'Yes' : 'No',
            'Ate Sprouts': log.greensAndSprouts?.ateSprouts ? 'Yes' : 'No',
            'Mood': log.mood || '',
            'Energy Level': log.energy || '',
            'Wins': log.notes?.wins || '',
            'Challenges': log.notes?.challenges || ''
        }));
        
        const ws1 = XLSX.utils.json_to_sheet(dailyLogsData);
        XLSX.utils.book_append_sheet(wb, ws1, 'Daily Logs');
        
        // Sheet 2: Weight Progress
        const weightData = AppState.dailyLogs
            .filter(log => log.weight)
            .map(log => ({
                'Date': log.date,
                'Weight (kg)': log.weight,
                'Difference from Start': (AppState.userData.startWeight - log.weight).toFixed(1),
                'Remaining to Target': (log.weight - AppState.userData.targetWeight).toFixed(1),
                'Progress %': (((AppState.userData.startWeight - log.weight) / 
                              (AppState.userData.startWeight - AppState.userData.targetWeight)) * 100).toFixed(1)
            }));
        
        const ws2 = XLSX.utils.json_to_sheet(weightData);
        XLSX.utils.book_append_sheet(wb, ws2, 'Weight Progress');
        
        // Sheet 3: Measurements Progress
        const measurementData = AppState.dailyLogs
            .filter(log => log.measurements)
            .map(log => ({
                'Date': log.date,
                'Chest (cm)': log.measurements.chest,
                'Waist (cm)': log.measurements.waist,
                'Hip (cm)': log.measurements.hip,
                'Thigh (cm)': log.measurements.thigh
            }));
        
        const ws3 = XLSX.utils.json_to_sheet(measurementData);
        XLSX.utils.book_append_sheet(wb, ws3, 'Measurements');
        
        // Sheet 4: Weekly Summary
        const weeklySummary = generateWeeklySummary();
        const ws4 = XLSX.utils.json_to_sheet(weeklySummary);
        XLSX.utils.book_append_sheet(wb, ws4, 'Weekly Summary');
        
        // Sheet 5: Meal Tracking
        const mealData = AppState.dailyLogs.map(log => ({
            'Date': log.date,
            'Pre-Breakfast': log.meals?.preBreakfast || '',
            'Breakfast': log.meals?.breakfast || '',
            'Mid-Morning': log.meals?.midMorning || '',
            'Lunch': log.meals?.lunch || '',
            'Evening': log.meals?.evening || '',
            'Dinner': log.meals?.dinner || ''
        }));
        
        const ws5 = XLSX.utils.json_to_sheet(mealData);
        XLSX.utils.book_append_sheet(wb, ws5, 'Meal Tracking');
        
        // Generate filename with current date
        const filename = `Fitness_Tracker_${new Date().toISOString().slice(0, 10)}.xlsx`;
        
        // Write file
        XLSX.writeFile(wb, filename);
        
        showMessage('Excel file exported successfully!', 'success');
    } catch (error) {
        console.error('Error exporting to Excel:', error);
        showMessage('Error exporting data to Excel', 'error');
    }
}

function generateWeeklySummary() {
    const weeks = {};
    
    AppState.dailyLogs.forEach(log => {
        const date = new Date(log.date);
        const weekNumber = getWeekNumber(date);
        
        if (!weeks[weekNumber]) {
            weeks[weekNumber] = {
                week: weekNumber,
                daysLogged: 0,
                totalWater: 0,
                totalExercise: 0,
                greensCount: 0,
                sproutsCount: 0,
                averageEnergy: 0,
                weights: []
            };
        }
        
        weeks[weekNumber].daysLogged++;
        weeks[weekNumber].totalWater += log.water || 0;
        weeks[weekNumber].totalExercise += log.exercise?.totalMinutes || 0;
        if (log.greensAndSprouts?.ateGreens) weeks[weekNumber].greensCount++;
        if (log.greensAndSprouts?.ateSprouts) weeks[weekNumber].sproutsCount++;
        weeks[weekNumber].averageEnergy += log.energy || 0;
        if (log.weight) weeks[weekNumber].weights.push(log.weight);
    });
    
    return Object.values(weeks).map(week => ({
        'Week': week.week,
        'Days Logged': week.daysLogged,
        'Avg Water (glasses)': (week.totalWater / week.daysLogged).toFixed(1),
        'Total Exercise (min)': week.totalExercise,
        'Greens Days': week.greensCount,
        'Sprouts Days': week.sproutsCount,
        'Avg Energy': (week.averageEnergy / week.daysLogged).toFixed(1),
        'Avg Weight': week.weights.length > 0 ? 
            (week.weights.reduce((a, b) => a + b) / week.weights.length).toFixed(1) : ''
    }));
}

function getWeekNumber(date) {
    const startDate = new Date(AppState.userData.startDate);
    const diffTime = Math.abs(date - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.ceil(diffDays / 7);
}

// ===================================
// EMAIL AUTOMATION
// ===================================
function showEmailSettings() {
    document.getElementById('email-modal').style.display = 'block';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

function saveEmailConfig() {
    AppState.emailConfig = {
        serviceId: document.getElementById('emailjs-service').value,
        templateIdWeekly: document.getElementById('emailjs-template-weekly').value,
        publicKey: document.getElementById('emailjs-public-key').value
    };
    
    if (AppState.emailConfig.publicKey) {
        emailjs.init(AppState.emailConfig.publicKey);
    }
    
    saveToLocalStorage();
    closeModal('email-modal');
    showMessage('Email configuration saved!', 'success');
}

function setupEmailAutomation() {
    if (!AppState.emailConfig.publicKey) {
        showEmailSettings();
        return;
    }
    
    // Schedule weekly email (runs on browser, needs server for production)
    const now = new Date();
    const dayOfWeek = now.getDay(); // 0 = Sunday
    
    if (dayOfWeek === 0 && AppState.settings.weeklyReports) {
        sendWeeklyReport();
    }
}

function sendWeeklyReport() {
    if (!AppState.emailConfig.serviceId || !AppState.userData.email) {
        console.error('Email not configured');
        return;
    }
    
    const weekData = generateWeeklySummary();
    const latestWeek = weekData[weekData.length - 1];
    
    const templateParams = {
        to_email: AppState.userData.email,
        to_name: AppState.userData.name,
        week_number: latestWeek['Week'],
        current_weight: AppState.userData.currentWeight,
        weight_lost: (AppState.userData.startWeight - AppState.userData.currentWeight).toFixed(1),
        remaining: (AppState.userData.currentWeight - AppState.userData.targetWeight).toFixed(1),
        days_logged: latestWeek['Days Logged'],
        avg_water: latestWeek['Avg Water (glasses)'],
        total_exercise: latestWeek['Total Exercise (min)'],
        greens_days: latestWeek['Greens Days'],
        sprouts_days: latestWeek['Sprouts Days']
    };
    
    emailjs.send(
        AppState.emailConfig.serviceId,
        AppState.emailConfig.templateIdWeekly,
        templateParams
    ).then(
        (response) => {
            console.log('Email sent successfully!', response);
            showMessage('Weekly report sent to your email!', 'success');
        },
        (error) => {
            console.error('Email send failed:', error);
            showMessage('Failed to send email report', 'error');
        }
    );
}

// ===================================
// SETTINGS
// ===================================
function populateSettings() {
    document.getElementById('settings-name').value = AppState.userData.name || '';
    document.getElementById('settings-email').value = AppState.userData.email || '';
    document.getElementById('settings-start-date').value = AppState.userData.startDate;
    document.getElementById('settings-start-weight').value = AppState.userData.startWeight;
    document.getElementById('settings-target-weight').value = AppState.userData.targetWeight;
    document.getElementById('settings-height').value = AppState.userData.height;
    
    document.getElementById('settings-weekly-report').checked = AppState.settings.weeklyReports;
    document.getElementById('settings-monthly-report').checked = AppState.settings.monthlyReports;
    document.getElementById('settings-report-time').value = AppState.settings.reportTime;
}

function saveSettings() {
    AppState.userData.name = document.getElementById('settings-name').value;
    AppState.userData.email = document.getElementById('settings-email').value;
    AppState.userData.startDate = document.getElementById('settings-start-date').value;
    AppState.userData.startWeight = parseFloat(document.getElementById('settings-start-weight').value);
    AppState.userData.targetWeight = parseFloat(document.getElementById('settings-target-weight').value);
    AppState.userData.height = parseInt(document.getElementById('settings-height').value);
    
    AppState.settings.weeklyReports = document.getElementById('settings-weekly-report').checked;
    AppState.settings.monthlyReports = document.getElementById('settings-monthly-report').checked;
    AppState.settings.reportTime = document.getElementById('settings-report-time').value;
    
    saveToLocalStorage();
    showMessage('Settings saved successfully!', 'success');
    updateDashboard();
}

function exportAllData() {
    exportToExcel();
}

function importData() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const data = JSON.parse(event.target.result);
                Object.assign(AppState, data);
                saveToLocalStorage();
                updateDashboard();
                showMessage('Data imported successfully!', 'success');
            } catch (error) {
                showMessage('Error importing data', 'error');
            }
        };
        reader.readAsText(file);
    };
    input.click();
}

function backupData() {
    const dataStr = JSON.stringify(AppState, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `fitness_tracker_backup_${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    showMessage('Backup created successfully!', 'success');
}

function resetAllData() {
    if (confirm('Are you sure you want to reset ALL data? This cannot be undone!')) {
        if (confirm('This will delete all your progress, logs, and photos. Are you ABSOLUTELY sure?')) {
            localStorage.clear();
            location.reload();
        }
    }
}

// ===================================
// DAILY REMINDERS
// ===================================
function setupDailyReminders() {
    if ('Notification' in window && Notification.permission !== 'granted') {
        Notification.requestPermission();
    }
    
    const reminders = [
        { time: '06:15', message: 'Wake up! Time to start your fitness journey! 🌅' },
        { time: '06:20', message: 'Workout time! Get moving! 💪' },
        { time: '08:30', message: 'Breakfast time! Eat healthy! 🥗' },
        { time: '13:00', message: 'Lunch time! Don\'t forget greens! 🥬' },
        { time: '16:00', message: 'Evening snack! Time for sprouts! 🌱' },
        { time: '20:30', message: 'Dinner time! Keep it light! 🍲' },
        { time: '22:30', message: 'Time to sleep! Rest is important! 😴' }
    ];
    
    setInterval(() => {
        const now = new Date();
        const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
        
        reminders.forEach(reminder => {
            if (currentTime === reminder.time) {
                sendNotification(reminder.message);
            }
        });
    }, 60000); // Check every minute
}

function sendNotification(message) {
    if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('Fitness Tracker Reminder', {
            body: message,
            icon: '/favicon.ico'
        });
    }
}

// ===================================
// UTILITY FUNCTIONS
// ===================================
function showMessage(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
}

function previousWeek() {
    showMessage('Feature coming soon: Navigate to previous weeks', 'info');
}

function nextWeek() {
    showMessage('Feature coming soon: Navigate to next weeks', 'info');
}

// ===================================
// AUTO-SAVE
// ===================================
setInterval(() => {
    saveToLocalStorage();
}, 60000); // Auto-save every minute

// Save before page unload
window.addEventListener('beforeunload', () => {
    saveToLocalStorage();
});

console.log('✅ Fitness Tracker App Fully Loaded!');
