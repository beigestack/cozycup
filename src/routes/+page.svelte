<script>
  import { fade } from 'svelte/transition';
  import { onMount } from 'svelte';

  const quotes = [
    "Believe in yourself.",
    "Growth isn’t linear.",
    "Take a deep breath.",
    "Progress, not perfection.",
    "You are enough.",
    "Be yourself. The rest will figure itself out.",
    "Perfection is the enemy of great.",
    "Trust yourself."
  ];

  let mood = '';
  let write = '';
  let thanks = '';
  let quote = '';
  let save = '';
  let reflection = ''; // textarea value
  let showTextarea = false;

  const hour = new Date().getHours();
  const today = new Date().toDateString(); // e.g. "Tue Oct 29 2025"
  let greeting = "";
  let greetingQuote = "";

  if (hour >= 5 && hour < 12) {
    greeting = "Good morning!";
    greetingQuote = "You'll rock the day :)";
  } else if (hour >= 12 && hour < 17) {
    greeting = "Good afternoon!";
    greetingQuote = "You should work on your goals!";
  } else if (hour >= 17 && hour < 20) {
    greeting = "Good evening!";
    greetingQuote = "It's time to relax..";
  } else {
    greeting = "Good night!";
    greetingQuote = "Time to rest, pal :)";
  }

  //Load saved reflection on startup
  onMount(() => {
    const saved = JSON.parse(localStorage.getItem('userData'));
    if (saved && saved.date === today) {
      reflection = saved.text;
      showTextarea = false; // reopen textarea
      save = 'Save reflection';
    } else {
      localStorage.removeItem('userData'); // clear old day
    }
  });

  function setFeeling(feeling) {
    mood = feeling.target.textContent;
    document.getElementById("selectMood")?.remove();
  }

  function setNotes(notes) {
    write = notes.target.textContent;
    document.getElementById("aboutDay")?.remove();
    if (write === "nah, not today.") {
      thanks = "okay. thank you for taking time out of your day!";
      quote = "\"" + quotes[Math.floor(Math.random() * quotes.length)] + "\"";
    } else if (write === "sure!") {
      showTextarea = true;
      save = 'Save reflection';
    }
  }

  function saveNotes() {
    localStorage.setItem('userData', JSON.stringify({
      date: today,
      text: reflection
    }));
    save = 'Saved!';
    setTimeout(() => save = 'Save reflection', 1500);
  }
</script>

<main class="p-6 text-center">
  <div class="wrapper">
  <p>{greeting}</p>
  <p in:fade={{ delay: 200 }} class="text-lg italic mb-2">{greetingQuote}</p>
  <br />
  <h1 in:fade class="text-4xl font-bold mb-4">cozycup :)</h1>
  <p in:fade={{ delay: 200 }} class="text-lg italic mb-2">"Always there for you :D"</p>
  <br />

  <div id="selectMood">
    <p>"how are you feeling?"</p>
    <button on:click={setFeeling}>😀</button>
    <button on:click={setFeeling}>😊</button>
    <button on:click={setFeeling}>😐</button>
    <button on:click={setFeeling}>🙁</button>
    <button on:click={setFeeling}>😔</button>
    <br />
  </div>

  <p>{mood ? `you chose ${mood}` : 'select a mood :) (optional ofc :3)'}</p>
  <br /><br />

  <div id="aboutDay">
    <p>would you like to write about your day? (goals, wishes etc.)</p>
    <button on:click={setNotes}>nah, not today.</button>
    <button on:click={setNotes}>sure!</button>
  </div>

  {#if showTextarea}
    <textarea
      bind:value={reflection}
      placeholder="Write your reflection here..."
      rows="4"
      cols="30"
      style="margin: 20px auto;"
    ></textarea>
    <br />
    <button on:click={saveNotes}>{save}</button>
  {/if}

  <p>{thanks}</p>
  <p in:fade={{ delay: 200 }} class="text-lg italic mb-2">{quote}</p>
</div>
</main>
