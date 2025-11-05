<script>
  import { onMount } from 'svelte';
  import Dialog from './Dialog.svelte';

  let dialog;

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
  let reflection = '';
  let showTextarea = false;
  let showNameArea = false;
  let name = '';
  let greeting = '';
  let greetingQuote = '';
  let selected = false;
  const today = new Date().toDateString();
  const hour = new Date().getHours();

  onMount(() => {
    const saved = JSON.parse(localStorage.getItem('userData'));
    const savedNameObj = JSON.parse(localStorage.getItem('nameData')) || {};
    name = savedNameObj.name || '';

    if (saved && saved.date === today) {
      reflection = saved.text;
      showTextarea = false;
      save = 'Save reflection';
    } else {
      localStorage.removeItem('userData');
    }

    if (!name) {
      showNameArea = true;
    }
  });

 $: {
    if (hour >= 5 && hour < 12) {
      greeting = `Good morning${name ? ', ' + name : ''}!`;
      greetingQuote = "You'll rock the day :)";
    } else if (hour >= 12 && hour < 17) {
      greeting = `Good afternoon${name ? ', ' + name : ''}!`;
      greetingQuote = "You should work on your goals!";
    } else if (hour >= 17 && hour < 20) {
      greeting = `Good evening${name ? ', ' + name : ''}!`;
      greetingQuote = "It's time to relax..";
      selected = true;
    } else {
      greeting = `Good night${name ? ', ' + name : ''}!`;
      greetingQuote = "Time to rest, pal :)";
      selected = true;
    }
  }
  function setFeeling(feeling) {
    mood = feeling.target.textContent;
    document.getElementById("selectMood")?.remove();
  }

  function setNotes(notes) {
    write = notes.target.textContent;
    document.getElementById("aboutDay")?.remove();

    if (write === "nah, not today.") {
      thanks = "okay. thank you for taking time out of your day!";
      quote = `"${quotes[Math.floor(Math.random() * quotes.length)]}"`;
    } else if (write === "sure!") {
      showTextarea = true;
      save = 'Save reflection';
    }
  }

  function saveNotes() {
    localStorage.setItem('userData', JSON.stringify({
      date: today,
      text: reflection,
    }));
    save = 'Saved!';
    setTimeout(() => save = 'Save reflection', 1500);
  }

  function saveNaming() {
    if (name.trim() === '') return;
    localStorage.setItem('nameData', JSON.stringify({ name }));
    dialog.close();
    showNameArea = false;
  }

  $: if (showNameArea && dialog) {
    dialog.showModal();
  }
</script>

<main class="p-6 text-center" class:selected>
  {#if showNameArea}
    <Dialog bind:dialog on:close={() => console.log('closed')}>
      <textarea class:selected
        bind:value={name}
        placeholder="What's your name?"
        rows="4"
        cols="30"
        style="margin: 20px auto;"
      ></textarea>
      <br />
      <button on:click={saveNaming}>Save name</button>
    </Dialog>
  {/if}

  <div class="wrapper" class:selected>
    <p>{greeting}</p>
    <p class="text-lg italic mb-2">{greetingQuote}</p>

    <h1 class="text-4xl font-bold mb-4">cozycup :)</h1>

    <div id="selectMood">
      <p>how are you feeling?</p>
      <button on:click={setFeeling}>😀</button>
      <button on:click={setFeeling}>😊</button>
      <button on:click={setFeeling}>😐</button>
      <button on:click={setFeeling}>🙁</button>
      <button on:click={setFeeling}>😔</button>
    </div>

    <p>{mood ? `you chose ${mood}` : 'select a mood :) (optional ofc :3)'}</p>
    <br />

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
    <p class="text-lg italic mb-2">{quote}</p>
  </div>
</main>
