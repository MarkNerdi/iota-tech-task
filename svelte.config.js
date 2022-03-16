import sveltePreprocess from "svelte-preprocess";
import makeAttractionsImporter from "attractions/importer.js";

export default {
    preprocess: sveltePreprocess({
        scss: {
            importer: makeAttractionsImporter(),
            prependData: `
                @use "./src/styles/variables.scss" as *;
                @forward "~attractions/_variables" with ($main: $primary, $font: $fontFamily);
            `
        }
    })
};
