console.log("Bangalore Projectors site loaded. (Updated with Comments)");


// Add this code inside your js/scripts.js file
// Or directly in a <script> tag just before the closing </body> tag
// It's crucial this code runs AFTER your form HTML has loaded

document.addEventListener('DOMContentLoaded', function() {
     console.log("DOMContentLoaded event fired. Attempting to find contact form.");
    const contactForm = document.getElementById('contactForm');
    const submitButton = contactForm ? contactForm.querySelector('button[type="submit"]') : null;

    if (contactForm && submitButton) {
        console.log("Contact form and submit button found. Attaching event listener."); 
        contactForm.addEventListener('submit', async function(event) {
            // Prevent the default form submission (which would send to Formspree directly)
            event.preventDefault();

            // Disable button and show loading state
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';

            console.log("Form submission disabled, sending state active.");
            const formData = new FormData(contactForm);
            
            try {
                // Send form data to Formspree using fetch API
                const response = await fetch(contactForm.action, {
                    method: contactForm.method,
                    body: formData,
                    headers: {
                        'Accept': 'application/json' // Important for Formspree AJAX response
                    }
                });

                if (response.ok) {
                    // Form submitted successfully!
                    console.log('Formspree submission successful!');
                    console.log('Attempting to fire Google Ads conversion event...');
                    // --- FIRE YOUR GOOGLE ADS CONVERSION HERE ---
                    // REPLACE 'AW-17107698105/ABCDEF123XYZabc-' with your ACTUAL new Form Submission Conversion Label
                    gtag('event', 'conversion', {
                        'send_to': 'AW-17107698105/9DyvCJ2M0e8aELmDy90_' // !! IMPORTANT: Update this with your new conversion label from Step 2 !!
                    });
                    console.log('Google Ads conversion event fired for form submission!');
                    // Update UI for success
                    submitButton.textContent = 'Inquiry Sent! 🎉';
                    submitButton.classList.remove('bg-blue-700', 'hover:bg-blue-800');
                    submitButton.classList.add('bg-green-600'); // Optional: change color to green
                    contactForm.reset(); // Clear the form fields

                } else {
                    // Handle errors from Formspree
                    const errorData = await response.json();
                    console.error('Formspree error:', errorData);
                    submitButton.textContent = 'Error! Please try again.';
                    submitButton.classList.remove('bg-blue-700');
                    submitButton.classList.add('bg-red-600'); // Optional: change color to red
                }
            } catch (error) {
                // Handle network errors or other unexpected issues
                console.error('Network or unexpected error:', error);
                submitButton.textContent = 'Network Error! Please try again.';
                submitButton.classList.remove('bg-blue-700');
                submitButton.classList.add('bg-red-600'); // Optional: change color to red
            } finally {
                // Re-enable the button after a short delay for user to see message, or immediately
                setTimeout(() => {
                    submitButton.disabled = false;
                    if (submitButton.textContent.includes('Error')) {
                        submitButton.textContent = 'Send Inquiry';
                        submitButton.classList.remove('bg-red-600');
                        submitButton.classList.add('bg-blue-700');
                    }
                }, 3000); // Re-enable after 3 seconds for error messages
                // For success, you might not want to re-enable or change text back
            }
        });
    }else{
        console.error("ERROR: Contact form with ID 'contactForm' or its submit button not found!"); // Logs if form elements are missing
    }
    }
});
