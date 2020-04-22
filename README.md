# DigiPay

A React Native app to demonstrate a payment concept.

## Note

This project has been archived, so the backend is no longer available.

## Introduction

This application demonstrates a way to ease the payment process between two people without the use of cash.

Since it serves school purposes, no real money is transiting on the application, it is just a model.

## Description

Once the application is running, the user is invited to login or to register if it has no account.
There will be a balance charged with some money once an account is created, so we can start using the application.

The logged user can navigate to three different screens, accessible through a bottom navigation bar with three buttons ordered as follow:
Home, History, and Profile, that each lead to the associated screen.

The balance screen allows for two type of transactions, one of the main feature is to send money using a QR Code, while the other one consists to transfer money to another user thanks to its registered mail address.

The History screen contains all of our past transactions shown from earliest to latest.

Finally, the profile screen contains the informations recorded when the user signed up, as well as the logout button. It is possible to set a profile picture by clicking it, the application will ask for user permission (if not already allowed) to use the camera.

### Technical specifications

The back end relies on [Firebase](https://firebase.google.com/) for database, storage and authentication.

Expo has been used during the development, it helps to run the application on a computer and is even capable of building final APK/IPA ready to be pushed to both Android and Apple stores. Find more information about [Expo](https://expo.io/)

The application uses Redux for the state management.

This project is fully ES6 compliant and uses Airbnb-config style, you can check it by issuing this command:

```sh
npm run lint
```

## Running project using Android environment

Make sure you installed both Android Studio and an image of an Android system ready to be launched using AVD for example. ([https://developer.android.com/studio/run/managing-avds](https://developer.android.com/studio/run/managing-avds))

Then execute inside the repository:

```sh
$> npm install

$> npm start

```
