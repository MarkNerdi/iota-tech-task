<Dialog title={$confirmDialog.title} class="confirm-dialog" onClose={closeConfirmDialog}>
    <div class="dialog-body">{$confirmDialog.content}</div>
    <svelte:fragment slot="footer">
        <Button neutral on:click={closeConfirmDialog}>{$t("buttons.cancel")}</Button>
        <Button filled on:click={executeAction} class="ml2">{$t("buttons.ok")}</Button>
    </svelte:fragment>
</Dialog>

<script>
    import {Button} from "attractions";
    import {Dialog} from "@/components";
    import {closeConfirmDialog, confirmDialog} from "@/store/ui";
    import {t} from "svelte-i18n";

    function executeAction() {
        $confirmDialog.action();
        closeConfirmDialog();
    }
</script>

<style>
    :global(.confirm-dialog .dialog-body) {
        white-space: pre-wrap;
    }
</style>
