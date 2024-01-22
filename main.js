try {
  if ('serviceWorker' in navigator) {
    // Весь код регистрации у нас асинхронный.
    navigator.serviceWorker.register('./sw.js')
      .then(() => navigator.serviceWorker.ready.then((worker) => {
        worker.sync.register('syncdata');
      }))
      .catch((err) => console.log(err));
  }

  let deferredPrompt; // Allows to show the install prompt
  const installButton = document.getElementById("click");

  window.addEventListener("beforeinstallprompt", (event) => {
    // Prevent the mini-infobar from appearing on mobile.
    event.preventDefault();
    alert('before listening');
    // Stash the event so it can be triggered later.
    deferredPrompt = event;
  });

  installButton.addEventListener("click", async () => {
    console.log("👍", "butInstall-clicked");
    if (!deferredPrompt) {
      // The deferred prompt isn't available.
      alert('NETY');
      return;
    }
    // Show the install prompt.
    deferredPrompt.prompt();
    // Log the result
    const result = await deferredPrompt.userChoice;
    console.log("👍", "userChoice", result);
    // Reset the deferred prompt variable, since
    // prompt() can only be called once.
    deferredPrompt = null;
  });
} catch (e) {
  alert(e);
}