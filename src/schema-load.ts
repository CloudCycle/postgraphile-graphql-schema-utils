import { loadSchema, loadSchemaSync } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';


export async function loadSchemaFromFile(filename: string) {
    const schema = await loadSchema(
        filename,
        createFileLoader()
    );
    return schema;
}

export function loadSchemaFromFileSync(filename: string) {
    const schema = loadSchemaSync(
        filename,
        createFileLoader()
    );
    return schema;
}

function createFileLoader() {
    return {
        loaders: [
            new GraphQLFileLoader()
        ]
    };
}
