# NxApolloAngularCourse

## Adding capabilities to your workspace

Nx supports many plugins which add capabilities for developing different types of applications and different tools.

These capabilities include generating applications, libraries, etc as well as the devtools to test, and build projects as well.

## Generate an application

Run `ng g @nrwl/angular:app my-app` to generate an application.

> You can use any of the plugins above to generate applications as well.

When using Nx, you can create multiple applications and libraries in the same workspace.

## Generate a library

Run `ng g @nrwl/angular:lib my-lib` to generate a library.

### Examples:

`ng generate @nrwl/angular:library data-access --style scss`

`ng generate @nrwl/angular:library feature-courses --style scss`

> You can also use any of the plugins above to generate libraries as well.

Libraries are shareable across libraries and applications. They can be imported from `@nx-apollo-angular-course/mylib`.

## Development server

Run `ng serve my-app` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

## API server

Run `ng serve api` to start nest server. Navigate to http://localhost:3333/graphql to launch GraphQL playground.

## GraphQL code generation

Run `ng run data-access:generate` to update GraphQL queries and mutations

## Populate seed data

Run `ng run api:seed` to clear tables and populate seed data

## Code scaffolding

Run `ng g component my-component --project=my-app --export` to generate a new component.
Run `ng generate @schematics/angular:component --name=<name> --project=feature-courses --module=<module name> --export` to generate a new component

Run `ng generate @schematics/angular:service --name=<name> --project=data-access --export` to generate a new service

## Build

Run `ng build my-app` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test my-app` to execute the unit tests via [Jest](https://jestjs.io).

Run `nx affected:test` to execute the unit tests affected by a change.

Run `ng test api` to execute unit tests of api.

Run `ng test api --watch` to execute unit tests of api in watch mode.

## Create api-e2e project

Run `ng g @nrwl/node:app api-e2e`

```
"architect": {
  "lint": {
    "builder": "@nrwl/linter:eslint",
    "options": {
      "lintFilePatterns": ["apps/api-e2e/**/*.ts"]
    }
  },
  "test": {
    "builder": "@nrwl/jest:jest",
    "outputs": ["coverage/apps/api-e2e"],
    "options": {
      "tsConfig": "apps/api-e2e/tsconfig.spec.json",
      "jestConfig": "apps/api-e2e/jest.config.js",
      "passWithNoTests": true
    }
  }
}
```

## Running end-to-end tests

Run `ng e2e my-app` to execute the end-to-end tests via [Cypress](https://www.cypress.io).

Run `nx affected:e2e` to execute the end-to-end tests affected by a change.

Run `ng test api-e2e` to execute the api end-to-end tests.

## Understand your workspace

Run `nx dep-graph` to see a diagram of the dependencies of your projects.

## Further help

Visit the [Nx Documentation](https://nx.dev/angular) to learn more.
