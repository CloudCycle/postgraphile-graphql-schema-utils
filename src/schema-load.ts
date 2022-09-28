import { loadSchema } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';


export async function loadSchemaFromFile(filename: string) {
    const schema = await loadSchema(
        filename,
        {
            loaders: [
                new GraphQLFileLoader()
            ]
        }
    );
    return schema;
}
