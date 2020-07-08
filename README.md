## Getting Started

After cloning the repo, run:

```bash
$ cd atlas
$ yarn install
$ yarn start
```

To start the app on `localhost:1234`, Storybook on `localhost:6006` and the bundler in watch mode.

To build the app for distribution, run:

```bash
$ yarn build
```

To run tests (Currently WIP) run:

```bash
$ yarn test
```

## Packages

This repo is managed with [yarn workspaces](https://classic.yarnpkg.com/en/docs/workspaces/)

To run a command in a workspace:

```bash
$ yarn workspace YOUR_WORKSPACE_NAME YOUR_COMMAND
```

For example, to add `react-spring` to `atlas-app`:

```bash
$ yarn workspace atlas-app add react-spring
```

### App package

The app package is located under `./packages/app` and is where the actual Atlas application lives.
Business logic, full pages and data fetching should all reside here.

### Shared folder

Historically, Atlas codebase was split between two packages - `app` and `@joystream/components`. Due to build process and developer experience issues it was decided to merge those packages into one until the separation is actually needed. Hence the `shared` directory under `app/src`. This folder is what used to be `@joystream/components` and it's intended to be application-agnostic. That means no Atlas-specific logic (like routing) should be put there, only atomic UI components.

## Deploy Previews

Each PR has deploy previews for both for Storybook and for the App on Chromia and Netlify respectively.
