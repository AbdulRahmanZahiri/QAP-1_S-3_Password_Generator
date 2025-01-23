# Password Generator CLI

## What is this?

This is a simple tool you can use in your terminal to create secure passwords. It's written in Node.js and gives you options to customize your passwords.

## What can it do?

- Creates passwords with lowercase letters by default.
- Lets you add uppercase letters, numbers, and symbols if you want.
- Lets you choose how long your password should be.
- Shows helpful messages if something goes wrong or if you need help.

## How to Use It

### Install It

To use this tool, follow these steps:

#### **1. Install Dependencies**

Run this command to install the required Node.js dependencies:

```bash
npm install
```

#### After installing the dependencies, you can generate passwords with the following commands:

1: Generate a default password:

```bash
npx pass-gen
```

2: Specify the length of the password:

```bash
npx pass-gen --length ("Amount of Numbers")
```

3: Customize the password:

Use the --customize flag to include specific character types:

c for uppercase letters.
n for numbers.
s for symbols.
a for all options (uppercase, numbers, symbols).

```bash
npx pass-gen --length 12 --customize acns
```
