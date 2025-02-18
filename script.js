// Performance criteria
const criteria = {
    nonFulfillRate: 2.0,
    lateShipmentRate: 1.0,
    prepTime: 1.0,
    handover: 95,
    responseRate: 98,
    avgResponse: 2.0,
    shopRating: 4.7,
    onTimeRate: 95,
    avgDelay: 2.0,
    lowRatedOrders: 1
};

// Sample data
const performanceData = [
    {
        shopName: "Adelmar",
        nonFulfillRate: 0.00,
        lateShipmentRate: 0.00,
        prepTime: 0.75,
        handover: 100.00,
        responseRate: 100.00,
        avgResponse: 1.62,
        shopRating: 4.71,
        penalty: 0
    },
    {
        shopName: "Bahemas",
        nonFulfillRate: 1.32,
        lateShipmentRate: 0.00,
        prepTime: 0.65,
        handover: 97.52,
        responseRate: 100.00,
        avgResponse: 1.60,
        shopRating: 4.76,
        penalty: 0
    },
    {
        shopName: "Centigrade",
        nonFulfillRate: 2.15,
        lateShipmentRate: 1.23,
        prepTime: 0.82,
        handover: 95.33,
        responseRate: 98.50,
        avgResponse: 1.75,
        shopRating: 4.68,
        penalty: 1
    }
];

// Overview metrics data
const overviewMetrics = {
    nonFulfillRate: { value: 3.5, change: -0.8 },
    shopRating: { value: 4.85, change: 0.2 },
    penaltyPoints: { value: 0, change: 0.0 },
    lateOrders: { value: 2, change: -1.5 },
    avgDelay: { value: 2.5, change: 0.5 },
    onTimeRate: { value: 95, change: 1.2 },
    lowRatedOrders: { value: 2, change: -2.0 },
    avgRating: { value: 1.5, change: -0.5 },
    responseTime: { value: 24, change: 1.0 }
};

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const content = document.getElementById('content');
    sidebar.classList.toggle('collapsed');
    content.classList.toggle('expanded');
}

function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show selected page
    document.getElementById(pageId).classList.add('active');
    
    // Update active nav link
    document.querySelectorAll('#sidebar .nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    // Find and activate the clicked nav link
    const clickedLink = Array.from(document.querySelectorAll('#sidebar .nav-link')).find(link => {
        return link.getAttribute('onclick').includes(pageId);
    });
    
    if (clickedLink) {
        clickedLink.classList.add('active');
    }
}

function updateOverviewMetrics() {
    // Update non-fulfillment rate
    const nonFulfillElement = document.getElementById('nonFulfillRate');
    nonFulfillElement.className = overviewMetrics.nonFulfillRate.value <= criteria.nonFulfillRate ? 'text-success' : 'text-danger';
    nonFulfillElement.innerHTML = `${overviewMetrics.nonFulfillRate.value}% <i class="bi bi-arrow-${overviewMetrics.nonFulfillRate.change < 0 ? 'down' : 'up'}"></i> ${overviewMetrics.nonFulfillRate.change}%`;

    // Update shop rating
    const shopRatingElement = document.getElementById('shopRating');
    shopRatingElement.className = overviewMetrics.shopRating.value >= criteria.shopRating ? 'text-success' : 'text-danger';
    shopRatingElement.innerHTML = `${overviewMetrics.shopRating.value} <i class="bi bi-arrow-${overviewMetrics.shopRating.change < 0 ? 'down' : 'up'}"></i> ${overviewMetrics.shopRating.change > 0 ? '+' : ''}${overviewMetrics.shopRating.change}`;

    // Update penalty points
    const penaltyElement = document.getElementById('penaltyPoints');
    penaltyElement.className = overviewMetrics.penaltyPoints.value === 0 ? 'text-success' : 'text-danger';
    penaltyElement.innerHTML = `${overviewMetrics.penaltyPoints.value} <i class="bi bi-arrow-${overviewMetrics.penaltyPoints.change <= 0 ? 'down' : 'up'}"></i> ${overviewMetrics.penaltyPoints.change > 0 ? '+' : ''}${overviewMetrics.penaltyPoints.change}`;

    // Update late orders
    const lateOrdersElement = document.getElementById('lateOrders');
    lateOrdersElement.className = overviewMetrics.lateOrders.value <= criteria.lowRatedOrders ? 'text-success' : 'text-danger';
    lateOrdersElement.innerHTML = `${overviewMetrics.lateOrders.value} <i class="bi bi-arrow-${overviewMetrics.lateOrders.change < 0 ? 'down' : 'up'}"></i> ${overviewMetrics.lateOrders.change}%`;

    // Update average delay
    const avgDelayElement = document.getElementById('avgDelay');
    avgDelayElement.className = overviewMetrics.avgDelay.value <= criteria.avgDelay ? 'text-success' : 'text-danger';
    avgDelayElement.innerHTML = `${overviewMetrics.avgDelay.value} days <i class="bi bi-arrow-${overviewMetrics.avgDelay.change < 0 ? 'down' : 'up'}"></i> ${overviewMetrics.avgDelay.change > 0 ? '+' : ''}${overviewMetrics.avgDelay.change}%`;

    // Update on-time rate
    const onTimeElement = document.getElementById('onTimeRate');
    onTimeElement.className = overviewMetrics.onTimeRate.value >= criteria.onTimeRate ? 'text-success' : 'text-danger';
    onTimeElement.innerHTML = `${overviewMetrics.onTimeRate.value}% <i class="bi bi-arrow-${overviewMetrics.onTimeRate.change < 0 ? 'down' : 'up'}"></i> ${overviewMetrics.onTimeRate.change > 0 ? '+' : ''}${overviewMetrics.onTimeRate.change}%`;

    // Update low rated orders
    const lowRatedElement = document.getElementById('lowRatedOrders');
    lowRatedElement.className = overviewMetrics.lowRatedOrders.value <= criteria.lowRatedOrders ? 'text-success' : 'text-danger';
    lowRatedElement.innerHTML = `${overviewMetrics.lowRatedOrders.value} <i class="bi bi-arrow-${overviewMetrics.lowRatedOrders.change < 0 ? 'down' : 'up'}"></i> ${overviewMetrics.lowRatedOrders.change}%`;

    // Update average rating
    const avgRatingElement = document.getElementById('avgRating');
    avgRatingElement.className = overviewMetrics.avgRating.value >= 4.0 ? 'text-success' : 'text-danger';
    avgRatingElement.innerHTML = `${overviewMetrics.avgRating.value}★ <i class="bi bi-arrow-${overviewMetrics.avgRating.change < 0 ? 'down' : 'up'}"></i> ${overviewMetrics.avgRating.change}%`;

    // Update response time
    const responseTimeElement = document.getElementById('responseTime');
    responseTimeElement.className = overviewMetrics.responseTime.value <= 24 ? 'text-success' : 'text-danger';
    responseTimeElement.innerHTML = `${overviewMetrics.responseTime.value}h <i class="bi bi-arrow-${overviewMetrics.responseTime.change < 0 ? 'down' : 'up'}"></i> ${overviewMetrics.responseTime.change > 0 ? '+' : ''}${overviewMetrics.responseTime.change}%`;
}

function getColorClass(value, threshold, isHigherBetter = true) {
    if (isHigherBetter) {
        return value >= threshold ? 'text-success' : 'text-danger';
    } else {
        return value <= threshold ? 'text-success' : 'text-danger';
    }
}

function updateTableData() {
    const tableBody = document.getElementById('performanceTable');
    tableBody.innerHTML = '';

    performanceData.forEach(data => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${data.shopName}</td>
            <td class="${getColorClass(data.nonFulfillRate, criteria.nonFulfillRate, false)}">${data.nonFulfillRate}%</td>
            <td class="${getColorClass(data.lateShipmentRate, criteria.lateShipmentRate, false)}">${data.lateShipmentRate}%</td>
            <td class="${getColorClass(data.prepTime, criteria.prepTime, false)}">${data.prepTime}</td>
            <td class="${getColorClass(data.handover, criteria.handover)}">${data.handover}%</td>
            <td class="${getColorClass(data.responseRate, criteria.responseRate)}">${data.responseRate}%</td>
            <td class="${getColorClass(data.avgResponse, criteria.avgResponse, false)}">${data.avgResponse}</td>
            <td class="${getColorClass(data.shopRating, criteria.shopRating)}">${data.shopRating}</td>
            <td class="${data.penalty > 0 ? 'text-danger' : 'text-success'}">${data.penalty}</td>
        `;
        
        tableBody.appendChild(row);
    });
}

// Initialize calendar and metrics
document.addEventListener('DOMContentLoaded', function() {
    // Initialize flatpickr calendar
    flatpickr("#calendar", {
        dateFormat: "F Y",
        defaultDate: "February 2025",
        plugins: [],
        onMonthChange: function(selectedDates, dateStr) {
            updateTableData();
        }
    });

    // Initial data population
    updateTableData();
    updateOverviewMetrics();
});