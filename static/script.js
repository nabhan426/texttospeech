// Speed display
document.getElementById("speedControl").addEventListener("input", function () {
    document.getElementById("speedValue").innerText = this.value;
  });
  
  // Convert and play audio
  document.getElementById("convertBtn").addEventListener("click", async function () {
    const text = document.getElementById("textInput").value;
    const speed = parseFloat(document.getElementById("speedControl").value);
  
    const response = await fetch("/tts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, speed })
    });
  
    if (!response.ok) {
      alert("Error generating speech.");
      return;
    }
  
    const audioBlob = await response.blob();
    const audioUrl = URL.createObjectURL(audioBlob);
  
    const audio = document.getElementById("audioPlayer");
    audio.src = audioUrl;
    audio.playbackRate = speed;
    audio.play();
  
    const downloadLink = document.getElementById("downloadLink");
    downloadLink.href = audioUrl;
    downloadLink.style.display = "inline-block";
  });
  
  // Theme toggle logic
  const toggle = document.getElementById('themeToggle');
  const root = document.documentElement;
  
  toggle.addEventListener('change', function () {
    const isDark = root.getAttribute('data-theme') === 'dark';
    root.setAttribute('data-theme', isDark ? 'light' : 'dark');
  });
