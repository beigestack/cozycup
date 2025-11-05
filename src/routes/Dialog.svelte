<script>
  import { createEventDispatcher } from 'svelte';
  export let dialog;
  const dispatch = createEventDispatcher();

  function handleClose() {
    dispatch('close');
  }
</script>

<dialog bind:this={dialog} on:close={handleClose}>
  <slot />
</dialog>
