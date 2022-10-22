import { GraphQLSchema } from 'graphql';


export function resolverNamesInSchema(schema: GraphQLSchema) {
    const queryFieldsToIgnore = [
        'query', 'id', 'node'
    ];
    const query = Object.keys(schema.getQueryType()?.getFields() ?? {})
        .filter(fieldName => !queryFieldsToIgnore.includes(fieldName));
    const mutation = Object.keys(schema.getMutationType()?.getFields() ?? {});
    return { query, mutation };
}
