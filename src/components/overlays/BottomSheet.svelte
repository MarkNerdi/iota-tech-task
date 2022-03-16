<div class="bottom-sheet">
    <slot />
</div>

<script>
    import {CupertinoPane} from "cupertino-pane";
    import {onMount} from "svelte";

    export let onClose;
    export let fitHeight = true;

    let pane;

    onMount(async () => {
        pane = new CupertinoPane(".bottom-sheet", {
            fitHeight: fitHeight,
            backdrop: true,
            backdropOpacity: 0.3,
            animationDuration: 150,
            bottomClose: true,
            fastSwipeClose: true,
            onBackdropTap: () => pane.destroy({animate: true}),
            // called whenever closed, also onBackdropTab
            onDidDismiss: () => onClose()
        });
        await pane.present({animate: true});
    });
</script>

<style lang="scss">
    :global {
        .cupertino-pane-wrapper {
            z-index: 1000;

            .pane {
                padding-top: 30px;
            }
        }
    }

    .bottom-sheet {
        padding: 10px;
        padding-bottom: 30px;
    }
</style>
