const form = document.getElementById('bookingForm');
const toast = document.getElementById('toast');

function showToast(message){
  toast.textContent = message;
  toast.classList.add('show');
  toast.setAttribute('aria-hidden','false');
  setTimeout(()=>{
    toast.classList.remove('show');
    toast.setAttribute('aria-hidden','true');
  },3500);
}

form.addEventListener('submit', function(e){
  e.preventDefault();

  const data = {
    name: form.name.value.trim(),
    email: form.email.value.trim(),
    date: form.date.value,
    destination: form.destination.value,
    notes: form.notes.value.trim()
  };

  if(!data.name || !data.email || !data.date || !data.destination){
    showToast('Please complete all required fields.');
    return;
  }

  // Simple email format check
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email);
  if(!emailValid){
    showToast('Please enter a valid email address.');
    return;
  }

  // Simulate submission (placeholder)
  const confirmation = document.getElementById('confirmationMsg');
  const when = new Date(data.date).toLocaleDateString();
  confirmation.textContent = `Thanks, ${data.name}! We've received your request for ${data.destination} (${when}). We'll contact you at ${data.email}.`;
  showToast('Booking request submitted — check confirmation below.');
  form.reset();
});
