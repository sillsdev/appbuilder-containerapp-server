# appbuilder-containerapp-server

[Scripture App Builder](https://software.sil.org/scriptureappbuilder) supports creating a iOS container app. The container app has a URL for the web server that provides the starting UI of the container app. From the web page, the user taps on an entry which causes the container app to download an asset package (which is a zip file of the assets that would be included in a dedicated app), extracts the asset package into local storage, and then starts the scripture app using those assets.

For a container app to work, there needs to be a server on the internet that has a catalog of asset packages and displays a page which allows the user to select from the catalog. This project provides an implementation of a server that can:

-   receive notifications of new asset packages published by Scriptoria
-   provides an admin interface to approve of packages to be available
-   provides a page to be included in an SAB iOS container app
    -   users can enter the language name, country or language code
-   emails admin users when new packages are ready for review

## Dependencies

Firebase is the backend-as-a-service to store data and do user authentication.

## Developing

Install dependencies with `npm install` and start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
