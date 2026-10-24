<script lang="ts">
	interface Props {
		keyword: string;
	}

	let { keyword }: Props = $props();
</script>

<div>
	<div>
		No search result found for {keyword}
	</div>
	<p>Try using a different keyword or quality.</p>
</div>
