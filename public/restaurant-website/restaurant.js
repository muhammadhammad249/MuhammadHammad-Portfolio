document.addEventListener('DOMContentLoaded', function () {

    // --- Smooth Scrolling ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return; // Ignore empty links like cart

            const targetPosition = document.querySelector(targetId).offsetTop;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });

    // --- Navbar Background on Scroll ---
    window.addEventListener('scroll', function () {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(26, 26, 26, 0.98)';
        } else {
            navbar.style.background = 'rgba(26, 26, 26, 0.95)';
        }
    });

    // --- Cart Functionality ---
    const cart = [];
    const cartBtn = document.getElementById('cart-btn');
    const cartModal = document.getElementById('cartModal');
    const closeCartBtn = document.querySelector('.close-cart');
    const cartItemsContainer = document.getElementById('cartItems');
    const cartTotalElement = document.getElementById('cartTotal');
    const cartCountElement = document.getElementById('cart-count');

    // Add to Cart
    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            const name = this.getAttribute('data-name');
            const price = parseFloat(this.getAttribute('data-price'));

            cart.push({ name, price });
            updateCartCount();
            alert(`${name} added to cart!`);
        });
    });

    function updateCartCount() {
        if (cart.length > 0) {
            cartCountElement.style.display = 'inline-block';
            cartCountElement.textContent = cart.length;
        } else {
            cartCountElement.style.display = 'none';
        }
    }

    function renderCart() {
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p style="text-align: center; color: var(--text-muted);">Your cart is empty.</p>';
            cartTotalElement.textContent = '$0.00';
            return;
        }

        let html = '';
        let total = 0;

        cart.forEach((item, index) => {
            total += item.price;
            html += `
                <div style="display: flex; justify-content: space-between; margin-bottom: 10px; border-bottom: 1px solid #333; padding-bottom: 5px;">
                    <div>
                        <span style="color: #fff; font-weight: 500;">${item.name}</span>
                    </div>
                    <div style="color: var(--primary); font-weight: bold;">
                        $${item.price}
                    </div>
                </div>
            `;
        });

        cartItemsContainer.innerHTML = html;
        cartTotalElement.textContent = '$' + total.toFixed(2);
    }

    // Open Cart Modal
    cartBtn.addEventListener('click', function (e) {
        e.preventDefault();
        renderCart();
        cartModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });

    // Close Cart Modal
    closeCartBtn.addEventListener('click', function () {
        cartModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });


    // --- Reservation Modal Logic ---
    const reservationBtn = document.querySelector('.btn-reserve');
    const reservationModal = document.getElementById('reservationModal');
    const closeReservationBtn = document.querySelector('.close-reservation');
    const reservationForm = document.getElementById('reservationForm');
    const dateInput = document.getElementById('date');

    // Set min date to today
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }

    // Open Reservation Modal
    if (reservationBtn) {
        reservationBtn.addEventListener('click', function (e) {
            e.preventDefault();
            reservationModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    }

    // Close Reservation Modal
    if (closeReservationBtn) {
        closeReservationBtn.addEventListener('click', function () {
            reservationModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }

    // Close Modals on Outside Click
    window.addEventListener('click', function (e) {
        if (e.target === reservationModal) {
            reservationModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
        if (e.target === cartModal) {
            cartModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Handle Reservation Submit
    if (reservationForm) {
        reservationForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const guests = document.getElementById('guests').value;
            const date = document.getElementById('date').value;
            const time = document.getElementById('time').value;
            const confirmMsg = document.getElementById('confirmationMessage');

            // Format date for display
            const formattedDate = new Date(date).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });

            confirmMsg.innerHTML = `
                <strong>Reservation Confirmed!</strong><br><br>
                Thank you, ${name}!<br> 
                Table for ${guests} confirmed for ${formattedDate} at ${time}.
            `;
            confirmMsg.classList.add('show');

            reservationForm.reset();

            setTimeout(() => {
                reservationModal.style.display = 'none';
                document.body.style.overflow = 'auto';
                confirmMsg.classList.remove('show');
            }, 3000);
        });
    }

    console.log('Restaurant logic loaded');
});
