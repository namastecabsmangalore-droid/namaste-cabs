
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = mainNav.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    mainNav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        mainNav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  document.querySelectorAll("#year").forEach(element => {
    element.textContent = new Date().getFullYear();
  });

  const form = document.getElementById("bookingForm");

  if (form) {
    form.addEventListener("submit", async event => {
      event.preventDefault();

      if (!form.reportValidity()) return;

      const button = form.querySelector('button[type="submit"]');
      const message = document.getElementById("formMessage");
      const formData = new FormData(form);

      button.disabled = true;
      button.textContent = "Sending enquiry...";

      try {
        const response = await fetch(
          "https://formsubmit.co/ajax/namastecabsmangalore@gmail.com",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify(Object.fromEntries(formData))
          }
        );

        const result = await response.json();

        if (!response.ok || result.success === "false") {
          throw new Error("Unable to submit enquiry");
        }

        message.textContent =
          "Your enquiry has been submitted. Our team will contact you.";
        message.style.color = "green";
        form.reset();

      } catch (error) {
        message.textContent =
          "Online submission failed. Please use WhatsApp or call us.";
        message.style.color = "red";
      } finally {
        button.disabled = false;
        button.textContent = "Submit Booking Enquiry";
      }
    });
  }
});
