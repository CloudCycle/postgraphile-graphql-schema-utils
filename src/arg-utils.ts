import { GraphQLSchema, isObjectType } from 'graphql';

/**
 * Get a mapping of argument names to their types for a given field
 * @returns A mapping of argument names to their type objects
 */
export function getGraphQLFieldArgTypes(
    schema: GraphQLSchema,
    rootTypeName: string,
    fieldName: string,
    options?: {
        argNames: string[]
    }
) {
    const rootType = schema.getType(rootTypeName);
    if (!rootType || !isObjectType(rootType)) {
        throw new Error(`No root type: ${rootTypeName}`);
    }
    const field = rootType.getFields()[fieldName];
    if (!field) {
        throw new Error(`No such field ${fieldName}`);
    }

    const { argNames } = options ?? {};
    const result = Object.fromEntries((field.args ?? [])
        .filter(arg => !argNames || argNames.includes(arg.name))
        .map(arg => [arg.name, arg.type])
    );
    return result;
}

export type ArgTypeMap = ReturnType<typeof getGraphQLFieldArgTypes>;

/**
 * Make an expression declaring GraphQL variables whose names and types
 * correspond to the arguments of a field
 * @returns The expression including parentheses
 */
export function makeGraphQLArgDeclaration(
    argTypeMap: ArgTypeMap
) {
    const argDecl = joinInsideParens(
        Object.entries(argTypeMap)
            .map(([name, type]) => `$${name}: ${type.toString()}`)
    );
    return argDecl;
}

/**
 * Make an expression passing arguments a field as correspondingly named variables
 * @returns The expression including parentheses
 */
 export function makeGraphQLArgPassing(
    argTypeMap: ArgTypeMap
) {
    const argDecl = joinInsideParens(
        Object.keys(argTypeMap)
            .map(name => `${name}: $${name}`)
    );
    return argDecl;
}

function joinInsideParens(strings: string[]) {
    return `(${strings.join(', ')})`
}
