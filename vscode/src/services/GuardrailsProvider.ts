import { summariseAttribution, type Editor, type Guardrails } from '@sourcegraph/cody-shared'

export class GuardrailsProvider {
    // TODO(keegancsmith) this provider should create the client since the guardrails client requires a dotcom graphql connection.
    constructor(
        private client: Guardrails,
        private editor: Editor
    ) {}

    public async debugEditorSelection(): Promise<void> {
        const snippet = this.editor.getActiveTextEditorSelection()?.selectedText
        if (snippet === undefined) {
            return
        }

        const msg = await this.client.searchAttribution(snippet).then(summariseAttribution)

        await this.editor.showWarningMessage(msg)
    }
}
