import { GraphQLSchema, GraphQLObjectType } from 'graphql';


function getTypeFieldNames(
    schema: GraphQLSchema,
    typeName: string
) {
    return Object.keys(
        (schema.getType(typeName) as GraphQLObjectType)?.getFields() ?? {}
    );
}

export function resolverNamesInSchema(schema: GraphQLSchema) {
    const queryFieldsToIgnore = [
        'query', 'id', 'node'
    ];
    const query = getTypeFieldNames(schema, 'Query')
        .filter(fieldName => !queryFieldsToIgnore.includes(fieldName));
    const mutation = getTypeFieldNames(schema, 'Mutation');
    return { query, mutation };
}
