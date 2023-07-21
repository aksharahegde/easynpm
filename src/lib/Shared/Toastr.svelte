
<script lang="ts">
// @ts-nocheck

    import { fly } from "svelte/transition";
    import { notifications } from "../stores/notifications";
	import { Toast } from "flowbite-svelte";
	import { CheckCircleSolid } from "flowbite-svelte-icons";
</script>

<div class="fixed top-20 z-50 notifications">
    {#each $notifications as notification (notification.id)}
    <Toast transition={fly} position="top-right" class="fixed top-20 z-10 mb-4" open={true}>
        <CheckCircleSolid size="lg" slot="icon" />
        <span class="dark:text-gray-300">{notification.message}</span>
    </Toast>
    {/each}
</div>